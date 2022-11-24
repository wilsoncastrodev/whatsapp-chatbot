import sleep from "es7-sleep";
import { doc } from '../../libs/google-spreadsheet.js';
import cep from 'cep-promise';
import { getRoute } from "../../libs/google-maps.js";

var distanceStages = [];
var distance = {};

export const formCalculateDistance = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];

    if (message.body === '🛣️ Calcular a Distância') {
        distanceStages[message.from] = 'CEP';
    }

    const stage = distanceStages[message.from];

    switch (stage) {
        case 'CEP':
            client.sendText(message.from, "Por aqui, você consegue *calcular* a *distância* da minha *casa* até a *empresa* e o *tempo de viagem* que eu levaria utilizando *transporte público*.");
            await sleep(1000);
            client.sendText(message.from, "Para a realização do cálculo, por favor, me diga qual é o *CEP da empresa*? ");
            distanceStages[message.from] = 'Endereco';
            break;
        case 'Endereco':
            distance = {};

            cep(message.body)
                .then((response) => {
                    distance.street = response.street;
                    distance.neighborhood = response.neighborhood;
                    distance.city = response.city;
                    distance.state = response.state;
                    distance.cep = response.cep;
                }).catch(error => {
                    distance.erro = error.type;
                })

            await sleep(2000);
            if (distance.state) {
                if (distance.state !== 'SP') {
                    client.sendText(message.from, "😥 *Sinto muito!* Só é possível realizar o cálculo, se a *empresa* estiver localizada no *estado de São Paulo*.");
                    return false;
                }

                client.sendText(message.from, "Agora, por favor, me diga qual é o *número onde está localizada a empresa*?");
                distanceStages[message.from] = 'NumeroEmpresa';
            }

            if (distance.erro) {
                client.sendText(message.from, "😥 *Que pena, não entendi.* Verifique e digite novamente o *CEP da empresa*:");
                distanceStages[message.from] = 'Endereco';
            }
            break;
        case 'NumeroEmpresa':
            distance.number = message.body;
            client.sendText(message.from, `*Endereço:* ${distance.street}, ${distance.number} - ${distance.neighborhood}, ${distance.city} - ${distance.state}`
            );
            await sleep(2000);
            client.sendText(message.from, 'Se o *endereço* acima 👆 estiver *correto*, toque no botão "Confirmar Endereço" abaixo 👇 para realização do *cálculo*: ', {
                useTemplateButtons: true,
                buttons: [
                    { text: 'Confirmar Endereço' },
                    { text: 'Alterar o Endereço' },
                    { text: 'Voltar ao Menu Principal' },
                ]
            });
            distanceStages[message.from] = 'CalcularDistancia';
            break;
        case 'CalcularDistancia':
            if (message.body === 'Confirmar Endereço') {
                let address = `${distance.street}, ${distance.number} - ${distance.neighborhood}, ${distance.city} - ${distance.state}`;


                getRoute(address).then(async result => {

                    let legs = result.data.routes[0].legs[0],
                        route = {},
                        lineName = "",
                        countBus = 0,
                        countSubway = 0,
                        info = '';

                    route.distance = legs.distance.text;
                    route.duration = legs.duration.text;

                    route.line = legs.steps.map((step) => step.transit_details ? {
                        name: step.transit_details.line.name,
                        type: step.transit_details.line.vehicle.type
                    } : undefined).filter(step => step);

                    route.line.forEach((line) => {
                        if (line.type === 'BUS') {
                            lineName += "*Ônibus*: " + line.name + "\n"
                            countBus += 1;
                        }

                        if (line.type === 'SUBWAY') {
                            lineName += "*Metrô*: " + line.name + "\n"
                            countSubway += 1;
                        }
                    });

                    countBus = countBus ? countBus + " ônibus" : "";
                    countSubway = countSubway ? " + metrô" : "";

                    info = `*Informações Sobre a Viagem:* 

*Distância*: A *distância* da minha casa até a empresa é de *${route.distance}*.
*Tempo*: O *tempo de viagem* da minha casa até a empresa utilizando o transporte público é de *${route.duration}*.
`
                    if (countBus) {
                        info += `
*Para chegar até a empresa será necessário pegar ${countBus}${countSubway}*.

${lineName.slice(0, -1)}`;
                    }

                    client.sendText(message.from, info);
                    await sleep(2000);
                    client.sendText(message.from, '_Estas informações foram geradas através da *API Google Maps*._');
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

                    rows[rowIndex]["Endereço da Empresa"] = address;
                    rows[rowIndex]["Distância"] = route.distance;
                    rows[rowIndex]["Tempo"] = route.duration;
                    await rows[rowIndex].save();
                });
            }

            if (message.body === 'Alterar o Endereço') {
                client.sendText(message.from, "Por favor, me diga qual é o *CEP da empresa*? ");
                distanceStages[message.from] = 'Endereco';
            }

            break;
    }
}