import wppconnect from "@wppconnect-team/wppconnect";
import { executablePath } from 'puppeteer';
import contexts from "./contexts/global.context.js"

wppconnect
	.create({
		session: 'whatsapp-chatbot',
		autoClose: false,
		useChrome: false,
		puppeteerOptions: { args: ['--no-sandbox'], executablePath: executablePath() }
	})
	.then((client) => {
		console.log("Conexão Estabelecida!");
		contexts(client);
	})
	.catch((error) => console.log(error));