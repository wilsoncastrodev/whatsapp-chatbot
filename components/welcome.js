import sleep from "es7-sleep";
import { firstWordName } from "../utils/helpers.js";
import { doc } from '../libs/google-spreadsheet.js';
import { formJobOpportunity } from "../components/forms/formJobOpportunity.js";

export const welcome = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const recruiterAccepted = rows.some(row => row.ID === message.from);

    if (message.body !== "Aceito" && message.body !== "Não Aceito") {
        if (!recruiterAccepted) {
            client.sendText(message.from, '_Olá, eu sou *Wilson*, caso você tenha interesse em me contratar, eu desenvolvi o *WILL* 🤖 meu assistente virtual para que através dele você possa me conhecer um pouco melhor e também para facilitar e agilizar o nosso primeiro contato._');
            await sleep(6000);
            client.sendText(message.from, '_Eu e ele somos praticamente um só. Conversando com ele é como se você estivesse conversando comigo. Então, sinta-se a vontade para conversar com ele. 😊_');
            await sleep(5000);
            client.sendText(message.from, 'Oi ' + firstWordName(message.notifyName) + ', sou *WILL* 🤖, assistente virtual do Wilson e estou aqui para te ajudar!');
            await sleep(2000);
            client.sendText(message.from, 'Antes de continuarmos, é preciso que você aceite a minha *Política de Privacidade*.');
            await sleep(5000);
            client.sendText(message.from, `🔒 Conheça a minha *Política de Privacidade* em: www.wilsoncastro.dev/#politica-privacidade-whatsapp
  
Ao tocar no botão "Aceito" abaixo 👇, você concorda com a minha *Política de Privacidade*.`, {
                useTemplateButtons: true,
                buttons: [{ text: 'Aceito' }, { text: 'Não Aceito' }]
            });
        }
    }

    await formJobOpportunity(message, client);
}