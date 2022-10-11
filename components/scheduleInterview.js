import { doc } from '../libs/google-spreadsheet.js';
import { formInterviewCall } from './forms/formInterviewCall.js';
import { formInterviewVideo } from './forms/formInterviewVideo.js';
import { formInterviewPresential } from './forms/formInterviewPresential.js';
import { firstWordName } from "../utils/helpers.js";
import sleep from "es7-sleep";

export const scheduleInterview = async (message, client) => {
    if (message.body === '📆 Agendar Entrevista') {
        client.sendText(message.from, 'Por aqui, você pode *agendar uma entrevista comigo*, basta tocar no botão "Novo Agendamento" abaixo 👇 e *responder as informações solicitadas.*', {
            useTemplateButtons: true,
            buttons: [
                { text: 'Novo Agendamento' },
                { text: 'Voltar ao Menu Principal' },
            ]
        });
    }

    if (message.body === 'Novo Agendamento') {
        client.sendText(message.from, firstWordName(message.notifyName) + ', qual é o *formato da entrevista*? Selecione uma das opções:', {
            useTemplateButtons: true,
            buttons: [
                { text: 'Entrevista por Chamada' },
                { text: 'Entrevista por Vídeo' },
                { text: 'Entrevista Presencial' },
            ]
        });
    }

    await formInterviewCall(message, client);
    await formInterviewVideo(message, client);
    await formInterviewPresential(message, client);

    if (message.body === '❌ Cancelar Entrevista') {
        client.sendText(message.from, 'Para *cancelar o agendamento da entrevista*, basta tocar no botão "Cancelar Entrevista" abaixo 👇: ', {
            useTemplateButtons: true,
            buttons: [
                { text: 'Cancelar Entrevista' },
                { text: 'Voltar ao Menu Principal' },
            ]
        });
    }

    if (message.body === 'Cancelar Entrevista') {
        const sheet = doc.sheetsByIndex[0];
        
        const rows = await sheet.getRows();
        const rowIndex = rows.findIndex(row => row.ID === message.from);

        rows[rowIndex]["Nome do Entrevistador"] = '';
        rows[rowIndex]["Tipo da Entrevista"] = '';
        rows[rowIndex]["Data da Entrevista"] = '';
        rows[rowIndex]["Horário da Entrevista"] = '';
        rows[rowIndex]["Período da Entrevista"] = '';
        rows[rowIndex]["Plataforma da Entrevista"] = '';
        rows[rowIndex]["Link da Entrevista"] = '';
        rows[rowIndex]["Informação da Entrevista"] = '';
        rows[rowIndex]["Endereço da Entrevista"] = '';
        
        await rows[rowIndex].save();
        
        client.sendText(message.from, '😥 *A entrevista foi cancelada, que pena*. Mas sinta-se à vontade para *agendar* uma *nova entrevista* quando quiser, eu estarei sempre aqui. 😉');
        await sleep(1500);
        client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇 para *voltar ao menu principal*, ou *encerrar a nossa conversar*: `, 
        {
            useTemplateButtons: true,
            buttons: [
                { text: 'Voltar ao Menu Principal' },
                { text: 'Encerrar Conversa' }
            ],
        });
    }
}



