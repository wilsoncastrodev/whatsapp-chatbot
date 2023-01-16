import formInterviewCall from '../forms/formInterviewCall.component.js';
import formInterviewVideo from '../forms/formInterviewVideo.component.js';
import formInterviewPresential from '../forms/formInterviewPresential.component.js';
import { firstWordName } from "../../utils/commons.js";

const scheduleInterview = async (message, client) => {
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
}

export default scheduleInterview;

