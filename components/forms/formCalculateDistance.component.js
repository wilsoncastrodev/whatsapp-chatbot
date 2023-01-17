import CompanyService from "../../services/company.service.js";
import sleep from "es7-sleep";

global.distanceStages = [];
global.address = {};

const formCalculateDistance = async (message, client) => {
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
            address = await CompanyService.getAddressCompany(message.body);

            if (address.state) {
                if (address.state !== 'SP') {
                    client.sendText(message.from, "😥 *Sinto muito!* Só é possível realizar o cálculo, se a *empresa* estiver localizada no *estado de São Paulo*.");
                    return false;
                }

                client.sendText(message.from, "Agora, por favor, me diga qual é o *número onde está localizada a empresa*?");
                distanceStages[message.from] = 'NumeroEmpresa';
            }

            if (address === false) {
                client.sendText(message.from, "😥 *Que pena, não entendi.* Verifique e digite novamente o *CEP da empresa*:");
                distanceStages[message.from] = 'Endereco';
            }

            break;
        case 'NumeroEmpresa':
            address.number = message.body;
            client.sendText(message.from, `*Endereço:* ${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`);
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
                let fullAddress = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}`;
                let route = await CompanyService.calculateDistanceCompany(fullAddress);

                client.sendText(message.from, route.info);
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

                await CompanyService.createCompany(message, fullAddress, route);
            }

            if (message.body === 'Alterar o Endereço') {
                client.sendText(message.from, "Por favor, me diga qual é o *CEP da empresa*? ");
                distanceStages[message.from] = 'Endereco';
            }

            break;
    }
}

export default formCalculateDistance;
