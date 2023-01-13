import wppconnect from "@wppconnect-team/wppconnect";
import { executablePath } from 'puppeteer';

wppconnect
	.create({
		session: 'whatsapp-chatbot',
		autoClose: false,
		useChrome: false,
		puppeteerOptions: { args: ['--no-sandbox'], executablePath: executablePath() }
	})
	.then((client) => {
		console.log("Conexão Estabelecida!");
		start(client);
	})
	.catch((error) => console.log(error));


const start = (client) => {
    client.onMessage(async (message) => {
        if (message.body == 'Teste') {
            client.sendText(message.from, 'Olá Teste!');
        }
    })
}