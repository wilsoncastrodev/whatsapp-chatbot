import InterviewService from "../../services/interview.service.js";
import { getCallVideoDates, getTimes, getPeriod, formatDateInterview, formatTimeInterview } from "../../utils/interview.js";
import { firstWordName } from "../../utils/commons.js";
import sleep from "es7-sleep";

global.interviewCallStages = [];
global.interviewCall = {};
global.times;

const formInterviewCall = async (message, client) => {
    let interviewCall = global.interviewCall;
    let dates = await getCallVideoDates();

    if (message.body === 'Entrevista por Chamada') {
        global.interviewCallStages[message.from] = 'Nome';
        interviewCall.tipoEntrevista = 'Por chamada';
    }

    const stage = global.interviewCallStages[message.from];

    switch (stage) {
        case 'Nome':
            client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
            global.interviewCallStages[message.from] = 'Data';
            break;
        case 'Data':
            client.sendListMessage(message.from, {
                buttonText: 'Datas',
                description: 'Agora, toque no botão "Datas" abaixo 👇 e *escolha uma das datas disponíveis* para o *agendamento*:',
                sections: [
                    {
                        title: 'Selecione o dia da entrevista:',
                        rows: dates.list
                    },
                ],
            });

            global.interviewCallStages[message.from] = 'Horarios';
            interviewCall.nomeEntrevistador = message.body;
            break;
        case 'Horarios':
            if (!dates.list.some(date => date.title === message.body)) {
                client.sendListMessage(message.from, {
                    buttonText: 'Datas',
                    description: '😥 *Que pena, não entendi.* Toque no botão "Datas" abaixo 👇 e *escolha uma das datas disponíveis* para o *agendamento*:',
                    sections: [
                        {
                            title: 'Selecione o dia da entrevista:',
                            rows: dates.list
                        },
                    ],
                });
                global.interviewCallStages[message.from] = 'Horarios';
                break;
            }


            let indexDate = dates.list.findIndex(x => x.title === message.body);
            global.times = await getTimes(dates.all[indexDate]);

            client.sendListMessage(message.from, {
                buttonText: 'Horários',
                description: 'Certo! Por favor, toque no botão "Horários" abaixo 👇 e *escolha um dos horários disponíveis*:',
                sections: [
                    {
                        title: 'Selecione o horário da entrevista:',
                        rows: times.list
                    },
                ],
            });

            global.interviewCallStages[message.from] = 'Revisar';
            interviewCall.dataEntrevista = dates.all[indexDate];
            break;
        case 'Revisar':
            if (!times.list.some(time => time.title === message.body)) {
                client.sendListMessage(message.from, {
                    buttonText: 'Horários',
                    description: '😥 *Que pena, não entendi.* Por favor, toque no botão "Horários" abaixo 👇 e *escolha um dos horários disponíveis*:',
                    sections: [
                        {
                            title: 'Selecione o horário da entrevista:',
                            rows: times.list
                        },
                    ],
                });
                global.interviewCallStages[message.from] = 'Revisar';
                break;
            }

            let indexTime = times.list.findIndex(x => x.title === message.body);

            interviewCall.horarioEntrevista = times.all[indexTime];
            interviewCall.periodoEntrevista = getPeriod(interviewCall.horarioEntrevista);

            client.sendText(message.from, `*Informações da Entrevista*

*Entrevistador:* ${interviewCall.nomeEntrevistador}
*Tipo da Entrevista:* ${interviewCall.tipoEntrevista}
*Data:* ${interviewCall.dataEntrevista}
*Horário:* ${interviewCall.horarioEntrevista} horas
`);
            await sleep(1000);
            client.sendText(message.from, 'Para *confirmar o agendamento revise as informações 👆* e toque no botão "Confirmar Agendamento", ou toque no botão "Refazer Agendamento" para *alterar as informações do agendamento*.', {
                useTemplateButtons: true,
                buttons: [
                    { text: 'Confirmar Agendamento' },
                    { text: 'Refazer Agendamento' },
                    { text: 'Voltar ao Menu Principal' },
                ]
            });

            global.interviewCallStages[message.from] = 'ConfirmarPorChamada';
            break;
        case 'ConfirmarPorChamada':
            if (message.body === 'Confirmar Agendamento' && Object.keys(interviewCall).length !== 0) {
                let dateInterview = formatDateInterview(interviewCall.dataEntrevista),
                    timeInterview = formatTimeInterview(interviewCall.horarioEntrevista);

                client.sendText(message.from, "_*Muito obrigado " + firstWordName(message.notifyName) + " 🤝 pelo convite da entrevista, que Deus te abençoe*. 🤩_");
                await sleep(1000);
                client.sendText(message.from, "_Estou no aguardo da entrevista, *marcada para o dia " +
                    dateInterview + " às " + timeInterview +
                    " horas*. Neste dia, eu irei desativar o *Will* 🤖 meu assistente virtual e estarei à sua disposição por aqui para o que precisar. 😀_");
                await sleep(1500);
                client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇 para *voltar ao menu principal*, ou *encerrar a nossa conversar*: `,
                {
                    useTemplateButtons: true,
                    buttons: [
                        { text: 'Voltar ao Menu Principal' },
                        { text: 'Encerrar Conversa' }
                    ],
                });

                await InterviewService.createInterviewCall(message, interviewCall);

                global.interviewCall = {};
            }

            if (message.body === 'Refazer Agendamento') {
                client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
                global.interviewCallStages[message.from] = 'Data';
            }
            break;
    }
}

export default formInterviewCall;
