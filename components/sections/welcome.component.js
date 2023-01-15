import RecruiterService from "../../services/recruiter.service.js";
import formJobOpportunity from "../forms/formJobOpportunity.component.js";
import sleep from "es7-sleep";
import { firstWordName } from "../../utils/commons.js";

const welcome = async (message, client) => {
    const recruiterAccepted = await RecruiterService.verifyRecruiter(message);

    let order = 1;

    if (message.body !== "Aceito" && message.body !== "Não Aceito") {
        if (!recruiterAccepted) {
            if(order == 1) {
                client.sendText(message.from, '_Olá, eu sou *Wilson*, caso você tenha interesse em me contratar, eu desenvolvi o *WILL* 🤖 meu assistente virtual para que através dele você possa me conhecer um pouco melhor e também para facilitar e agilizar o nosso primeiro contato._');
                order++;
                await sleep(3000);
            }

            if(order == 2) {
                client.sendText(message.from, '_Eu e ele somos praticamente um só. Conversando com ele é como se você estivesse conversando comigo. Então, sinta-se a vontade para conversar com ele. 😊_');
                order++;
                await sleep(2500);
            }

            if(order == 3) {
                client.sendText(message.from, 'Oi ' + firstWordName(message.notifyName) + ', sou *WILL* 🤖, assistente virtual do Wilson e estou aqui para te ajudar!');
                order++;
                await sleep(1000);
            }

            if(order == 4) {
                client.sendText(message.from, 'Antes de continuarmos, é preciso que você aceite a minha *Política de Privacidade*.');
                order++;
                await sleep(2500);
            }

            if(order == 5) {
                client.sendText(message.from, `🔒 Conheça a minha *Política de Privacidade* em: www.wilsoncastro.dev/#politica-privacidade-whatsapp

Ao tocar no botão "Aceito" abaixo 👇, você concorda com a minha *Política de Privacidade*.`, {
                    useTemplateButtons: true,
                    buttons: [{ text: 'Aceito' }, { text: 'Não Aceito' }]
                });
                order++;
            }
        }
    }

    await formJobOpportunity(message, client);
};

export default welcome;
