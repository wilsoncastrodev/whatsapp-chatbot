import InterviewService from "../../services/interview.service.js";
import sleep from "es7-sleep";

const cancelInterview = async (message, client) => {
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
        await InterviewService.cancelInterview(message);

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
        global.context[message.from] = undefined;
    }
}

export default cancelInterview;
