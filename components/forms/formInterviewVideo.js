import { getCallVideoDates, getTimes, getPeriod, firstWordName } from "../../utils/helpers.js";
import sleep from "es7-sleep";
import { doc } from '../../libs/google-spreadsheet.js';
import moment from 'moment';
moment.locale('pt-br');

var interviewVideoStages = [];
var interviewVideo = {};
var times;

export const formInterviewVideo = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];
    let dates = await getCallVideoDates();

    if (message.body === 'Entrevista por Vídeo') {
        interviewVideoStages[message.from] = 'Nome';
        interviewVideo.tipoEntrevista = 'Por vídeo';
    }

    const stage = interviewVideoStages[message.from];

    switch (stage) {
        case 'Nome':
            client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
            interviewVideoStages[message.from] = 'Data';
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

            interviewVideoStages[message.from] = 'Horarios';
            interviewVideo.nomeEntrevistador = message.body;
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
                interviewVideoStages[message.from] = 'Horarios';
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

            interviewVideoStages[message.from] = 'Plataforma';
            interviewVideo.dataEntrevista = dates.all[indexDate];
            break;
        case 'Plataforma':
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
                interviewVideoStages[message.from] = 'Revisar';
                break;
            }

            let indexTime = times.list.findIndex(x => x.title === message.body);

            client.sendText(message.from, 'Qual é a *plataforma* onde será realizada a *entrevista* (ex.: Google Meet, Zoom)?');

            interviewVideoStages[message.from] = 'PerguntaLink1';
            interviewVideo.horarioEntrevista = times.all[indexTime];
            interviewVideo.periodoEntrevista = getPeriod(interviewVideo.horarioEntrevista);
            break;
        case 'PerguntaLink1':
            client.sendText(message.from, 'Certo! Poderia me passar o *link de acesso à plataforma agora*?', {
                useTemplateButtons: true,
                buttons: [
                    { text: 'Sim' },
                    { text: 'Não' },
                ]
            });

            interviewVideo.plataformaEntrevista = message.body;
            interviewVideoStages[message.from] = 'PerguntaLink2';
            break;
        case 'PerguntaLink2':
            if (message.body === 'Sim') {
                client.sendText(message.from, 'Ótimo! Por favor, qual é o *link*?');
                interviewVideoStages[message.from] = 'InformacaoAdicional';
            }

            if (message.body === 'Não') {
                client.sendText(message.from, 'O *link de acesso à plataforma* será enviado no *dia da entrevista*?', {
                    useTemplateButtons: true,
                    buttons: [
                        { text: 'Sim' },
                        { text: 'Não' },
                    ]
                });
                interviewVideoStages[message.from] = 'Link';
            }
            break;
        case 'Link':
            if (message.body === 'Sim') {
                client.sendText(message.from, 'Ok! Tem alguma *informação adicional* sobre a *entrevista* que você considera *importante*?');

                interviewVideo.linkEntrevista = "Link será enviado no dia da entrevista.";
                interviewVideoStages[message.from] = 'Revisar';
            }

            if (message.body === 'Não') {
                client.sendText(message.from, 'Por favor ' + firstWordName(message.notifyName) + ', me diga quando será *enviado o link*?');
                interviewVideoStages[message.from] = 'InformacaoAdicional';
            }

            break;
        case 'InformacaoAdicional':
            client.sendText(message.from, 'Ok! Tem alguma *informação adicional* sobre a *entrevista* que você considera *importante*?');

            interviewVideo.linkEntrevista = message.body;
            interviewVideoStages[message.from] = 'Revisar';
            break;
        case 'Revisar':
            interviewVideo.infoEntrevista = message.body;
            client.sendText(message.from, `*Informações da Entrevista*

*Entrevistador:* ${interviewVideo.nomeEntrevistador}
*Tipo da Entrevista:* ${interviewVideo.tipoEntrevista}
*Data:* ${interviewVideo.dataEntrevista}
*Horário:* ${interviewVideo.horarioEntrevista} horas
*Plataforma:* ${interviewVideo.plataformaEntrevista}
*Link:* ${interviewVideo.linkEntrevista.replace(/(^\w+:|^)\/\//, '')}
*Informação Adicional:* ${interviewVideo.infoEntrevista}
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

            
            interviewVideoStages[message.from] = 'ConfirmarPorVideo';
            break;
        case 'ConfirmarPorVideo':
            if (message.body === 'Confirmar Agendamento' && Object.keys(interviewVideo).length !== 0) {
                let dateInterview = moment(interviewVideo.dataEntrevista, 'DD/MM/YYYY').format("DD [de] MMMM"),
                    timeInterview = interviewVideo.horarioEntrevista.replace(":00", "");

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

                rows[rowIndex]["Nome do Entrevistador"] = interviewVideo.nomeEntrevistador;
                rows[rowIndex]["Tipo da Entrevista"] = interviewVideo.tipoEntrevista;
                rows[rowIndex]["Data da Entrevista"] = interviewVideo.dataEntrevista;
                rows[rowIndex]["Horário da Entrevista"] = interviewVideo.horarioEntrevista;
                rows[rowIndex]["Período da Entrevista"] = interviewVideo.periodoEntrevista;
                rows[rowIndex]["Plataforma da Entrevista"] = interviewVideo.plataformaEntrevista;
                rows[rowIndex]["Link da Entrevista"] = interviewVideo.linkEntrevista;
                rows[rowIndex]["Informação da Entrevista"] = interviewVideo.infoEntrevista;

                await rows[rowIndex].save();
                interviewVideo = '';
            }

            if (message.body === 'Refazer Agendamento') {
                client.sendText(message.from, "Por favor, qual o *nome da pessoa* que irá *conduzir a entrevista*?");
                interviewVideoStages[message.from] = 'Data';
            }
            break;
    }
}