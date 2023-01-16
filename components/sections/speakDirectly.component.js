import BotService from "../../services/bot.service.js";
import mainMenu from '../menus/mainMenu.component.js';
import { firstWordName } from "../../utils/commons.js";

const speakDirectly = async (message, client) => {
    if (message.body === '📲 Falar Diretamente Comigo') {
        client.sendText(message.from, `Para *conversar diretamente comigo*, basta tocar no botão abaixo 👇 "Conversar com o Wilson": `,
        {
            useTemplateButtons: true,
            buttons: [
                { text: 'Conversar com o Wilson' },
                { text: 'Voltar ao Menu Principal' },
                { text: 'Encerrar Conversa' }
            ],
        });
    } else if(message.body === 'Conversar com o Wilson') {
        await BotService.activateDirectContact(message);
        client.sendText(message.from, '_' + firstWordName(message.notifyName) + ', por favor, peço que você aguarde que *em breve estarei retornando* o seu contato._');
    } else {
        const isEnable = await BotService.disableDirectContact(message);

        if (isEnable !== 'Ativado') {
            global.context[message.from] = undefined;
            await mainMenu(message, client);
        }
    }
}

export default speakDirectly;
