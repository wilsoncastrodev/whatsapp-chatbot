import { getCallVideoDates, getTimes, getPeriod, firstWordName } from "../../utils/helpers.js";
import sleep from "es7-sleep";
import { doc } from '../../libs/google-spreadsheet.js';
import moment from 'moment';
moment.locale('pt-br');

var interviewCallStages = [];
var interviewCall = {};
var times;

export const formInterviewCall = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];
    let dates = await getCallVideoDates();

    if (message.body === 'Entrevista por Chamada') {
        interviewCallStages[message.from] = 'Nome';
        interviewCall.tipoEntrevista = 'Por chamada';
    }

    const stage = interviewCallStages[message.from];

    switch (stage) {
        case 'Nome':
            client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
            interviewCallStages[message.from] = 'Data';
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

            interviewCallStages[message.from] = 'Horarios';
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
                interviewCallStages[message.from] = 'Horarios';
                break;
            }


            let indexDate = dates.list.findIndex(x => x.title === message.body);
            times = await getTimes(dates.all[indexDate]);

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

            interviewCallStages[message.from] = 'Revisar';
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
                interviewCallStages[message.from] = 'Revisar';
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

            interviewCallStages[message.from] = 'ConfirmarPorChamada';
            break;
        case 'ConfirmarPorChamada':
            if (message.body === 'Confirmar Agendamento' && Object.keys(interviewCall).length !== 0) {
                let dateInterview = moment(interviewCall.dataEntrevista, 'DD/MM/YYYY').format("DD [de] MMMM"),
                    timeInterview = interviewCall.horarioEntrevista.replace(":00", "");

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

                const rows = await sheet.getRows();
                const rowIndex = rows.findIndex(row => row.ID === message.from);

                rows[rowIndex]["Nome do Entrevistador"] = interviewCall.nomeEntrevistador;
                rows[rowIndex]["Tipo da Entrevista"] = interviewCall.tipoEntrevista;
                rows[rowIndex]["Data da Entrevista"] = interviewCall.dataEntrevista;
                rows[rowIndex]["Horário da Entrevista"] = interviewCall.horarioEntrevista;
                rows[rowIndex]["Período da Entrevista"] = interviewCall.periodoEntrevista;

                await rows[rowIndex].save();
                interviewCall = '';
            }

            if (message.body === 'Refazer Agendamento') {
                client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
                interviewCallStages[message.from] = 'Data';
            }
            break;
    }
}