import { sheet } from '../libs/googleSpreadsheet.lib.js';
import { firstWordName } from "../utils/commons.js";
import sleep from "es7-sleep";
import moment from 'moment-timezone';
moment.locale('pt-br');

global.time = [];

const activateDirectContact = async (message) => {
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);
    rows[rowIndex]["Contato Direto"] = "Ativado";
    await rows[rowIndex].save();
}

const disableDirectContact = async (message) => {
	const rows = await sheet.getRows();
	const rowIndex = rows.findIndex(row => row.ID === message.from);
	return rowIndex >= 0 ? rows[rowIndex]['Contato Direto'] : false;
}

const inactiveBot = async (client, message) => {
	clearTimeout(global.time[message.from]);

	if (global.context[message.from] !== 'Falar Diretamente Comigo') {
		global.time[message.from] = setTimeout(async () => {
			let timeCurrent = moment().tz('America/Sao_Paulo').format('HH'),
				textPeriod = timeCurrent < 6 || timeCurrent >= 18 ? 'tenha uma noite maravilhosa' : 'tenha um dia maravilhoso';

			client.sendText(message.from, firstWordName(message.notifyName) + ", eu vou encerrar a nossa conversa agora. Que *Deus te abençoe* e que você *" + textPeriod + "*.");
			await sleep(1000);
			client.sendText(message.from, 'E *lembre-se sempre*, se precisar eu estou aqui para te ajudar, é só me *mandar um "Oi"*! 😉');

			if (global.context[message.from] == 'Inicial') {
				const rows = await sheet.getRows();
				const rowIndex = rows.findIndex(row => row.ID === message.from);

				if(rowIndex >= 0) {
					global.recruiterStages[message.from] = "";
					rows[rowIndex]["ID"] = '';

					try {
						await rows[rowIndex].save();
					}
					catch (e) {  }
				}
			}

			global.context[message.from] = undefined;
		}, 60 * 60000);
	} else {
		if(message.body === 'Conversar com o Wilson') {
			global.time[message.from] = setTimeout(async () => {
				const rows = await sheet.getRows();
				const rowIndex = rows.findIndex(row => row.ID === message.from);
				rows[rowIndex]["Contato Direto"] = "";
				await rows[rowIndex].save();

				client.sendText(message.from, "Eu vou ter que encerrar a nossa conversa agora. O *Wilson não está podendo falar no momento*, mas assim que possível ele irá retornar o seu contato.");
				await sleep(1000);
				client.sendText(message.from, 'E *lembre-se*, se precisar eu estou aqui para te ajudar, é só me *mandar um "Oi"*! 😉');
				global.context[message.from] = undefined;
			}, 60 * 240000);
		}
	}
}

export default {
    activateDirectContact,
    disableDirectContact,
    inactiveBot
}
