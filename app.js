import wppconnect from "@wppconnect-team/wppconnect";

import { welcome } from './components/welcome.js';
import { mainMenu } from './components/menus/mainMenu.js';
import { aboutMe } from "./components/aboutMe.js";

wppconnect
	.create({
		session: 'wcastro-bot',
		autoClose: false,
		useChrome: false,
		puppeteerOptions: { args: ['--no-sandbox'] }
	})
	.then((client) => {
		console.log("Conexão Estabelecida!");
		start(client);
	})
	.catch((error) => console.log(error));

global.context = [];

const start = (client) => {
	client.onMessage(async (message) => {
			if (message.body == '👦🏻 Sobre Mim') {
				global.context[message.from] = "Sobre Mim";
			} else {
				const sheet = doc.sheetsByIndex[0],
					rows = await sheet.getRows(),
					isUserRegister = rows.some(row => row.ID === message.from);

				if (!isUserRegister) {
					global.context[message.from] = "Inicial";
				} else if (global.context[message.from] === undefined) {
					global.context[message.from] = "Menu Principal";
				}
			}

			if (global.context[message.from] == 'Inicial') {
				await welcome(message, client);
			}

			if (global.context[message.from] == 'Sobre Mim') {
				await aboutMe(message, client);
			}

			if (global.context[message.from] == 'Menu Principal') {
				await mainMenu(message, client);
			}
	});
}