import { firstWordName } from "../utils/helpers.js";
import sleep from "es7-sleep";
import moment from 'moment-timezone';
moment.locale('pt-br');

export const endConversation = async (message, client) => {
    if (message.body === '👋🏻 Encerrar Conversa' || message.body == 'Encerrar Conversa') {
        let timeCurrent = moment().tz('America/Sao_Paulo').format('HH'),
            textPeriod = timeCurrent < 6 || timeCurrent >= 18 ? 'tenha uma noite maravilhosa' : 'tenha um dia maravilhoso';

            client.sendText(message.from, firstWordName(message.notifyName) + ", agradeço o seu contato. Que *Deus te abençoe* e que você *" + textPeriod + "*.");

        await sleep(1000);
        client.sendText(message.from, 'E *lembre-se sempre*, se precisar eu estou aqui para te ajudar, é só me *mandar um "Oi"*! 😉');
    } else {
        global.context[message.from] = "Menu Principal";
    }
}