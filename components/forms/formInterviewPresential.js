import { getPresentialDates, getTimes, getPeriod, firstWordName } from "../../utils/helpers.js";
import sleep from "es7-sleep";
import { doc } from '../../libs/google-spreadsheet.js';
import moment from 'moment';
moment.locale('pt-br');

var interviewPresentialStages = [];
var interviewPresential = {};
var times;

export const formInterviewPresential = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];
    let dates = await getPresentialDates();

    if (message.body === 'Entrevista Presencial') {
        interviewPresentialStages[message.from] = 'Nome';
        interviewPresential.tipoEntrevista = 'Presencial';
    }

    const stage = interviewPresentialStages[message.from];

    switch (stage) {
        case 'Nome':
            client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
            interviewPresentialStages[message.from] = 'Data';
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

            interviewPresentialStages[message.from] = 'Horarios';
            interviewPresential.nomeEntrevistador = message.body;
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
                interviewPresentialStages[message.from] = 'Horarios';
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

            interviewPresentialStages[message.from] = 'Endereco';
            interviewPresential.dataEntrevista = dates.all[indexDate];
            break;
        case 'Endereco':
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
                interviewPresentialStages[message.from] = 'Revisar';
                break;
            }

            let indexTime = times.list.findIndex(x => x.title === message.body);

            client.sendText(message.from, 'Qual é o *endereço* onde será realizada a *entrevista*?');

            interviewPresentialStages[message.from] = 'InformacaoAdicional';
            interviewPresential.horarioEntrevista = times.all[indexTime];
            interviewPresential.periodoEntrevista = getPeriod(interviewPresential.horarioEntrevista);
            break;
        case 'InformacaoAdicional':
            client.sendText(message.from, 'Ok! Tem alguma *informação adicional* sobre a *entrevista* que você considera *importante*?');

            interviewPresential.enderecoEntrevista = message.body;
            interviewPresentialStages[message.from] = 'Revisar';
            break;
        case 'Revisar':
            interviewPresential.infoEntrevista = message.body;

            client.sendText(message.from, `*Informações da Entrevista*

*Entrevistador:* ${interviewPresential.nomeEntrevistador}
*Tipo da Entrevista:* ${interviewPresential.tipoEntrevista}
*Data:* ${interviewPresential.dataEntrevista}
*Horário:* ${interviewPresential.horarioEntrevista} horas
*Endereço:* ${interviewPresential.enderecoEntrevista}
*Informação Adicional:* ${interviewPresential.infoEntrevista}
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

            interviewPresentialStages[message.from] = 'ConfirmarPresencial';
            break;
        case 'ConfirmarPresencial':
            if (message.body === 'Confirmar Agendamento' && Object.keys(interviewPresential).length !== 0) {
                let dateInterview = moment(interviewPresential.dataEntrevista, 'DD/MM/YYYY').format("DD [de] MMMM"),
                    timeInterview = interviewPresential.horarioEntrevista.replace(":00", "");

                client.sendText(message.from, "_*Muito obrigado " + firstWordName(message.notifyName) + " 🤝 pelo convite da entrevista, que Deus te abençoe*. 🤩_");
                await sleep(1000);
                client.sendText(message.from, "_Estou no aguardo da entrevista, *marcada para o dia "
                    + dateInterview + " às " + timeInterview +
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

                rows[rowIndex]["Nome do Entrevistador"] = interviewPresential.nomeEntrevistador;
                rows[rowIndex]["Tipo da Entrevista"] = interviewPresential.tipoEntrevista;
                rows[rowIndex]["Data da Entrevista"] = interviewPresential.dataEntrevista;
                rows[rowIndex]["Horário da Entrevista"] = interviewPresential.horarioEntrevista;
                rows[rowIndex]["Período da Entrevista"] = interviewPresential.periodoEntrevista;
                rows[rowIndex]["Endereço da Entrevista"] = interviewPresential.enderecoEntrevista;
                rows[rowIndex]["Informação da Entrevista"] = interviewPresential.infoEntrevista;

                await rows[rowIndex].save();
                interviewPresential = {};
            }

            if (message.body === 'Refazer Agendamento') {
                client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
                interviewPresentialStages[message.from] = 'Revisar';
            }
            break;
    }
}