import wppconnect from "@wppconnect-team/wppconnect";

import { welcome } from './components/welcome.js';
import { mainMenu } from './components/menus/mainMenu.js';
import { aboutMe } from "./components/aboutMe.js";
import { professionalProfile } from "./components/professionalProfile.js";
import { academyTrajectory } from "./components/academyTrajectory.js";
import { professionalTrajectory } from "./components/professionalTrajectory.js";
import { personalProjects } from "./components/personalProjects.js";
import { skills } from "./components/skills.js";
import { scheduleInterview } from "./components/scheduleInterview.js";
import { calculateDistance } from "./components/calculateDistance.js";
import { questionsAnswers } from "./components/questionsAnswers.js";
import { cv } from "./components/cv.js";
import { speakDirectly } from "./components/speakDirectly.js";
import { endConversation } from "./components/endConversation.js";
import { doc } from './libs/google-spreadsheet.js';
import { firstWordName, disableBot } from "./utils/helpers.js";
import moment from 'moment-timezone';
import sleep from "es7-sleep";
moment.locale('pt-br');

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

let time = [];
global.context = [];

global.inactiveBot = async (client, message) => {
	clearTimeout(time[message.from]);

	if (global.context[message.from] !== 'Falar Diretamente Comigo') {
		time[message.from] = setTimeout(async () => {
			let timeCurrent = moment().tz('America/Sao_Paulo').format('HH'),
				textPeriod = timeCurrent < 6 || timeCurrent >= 18 ? 'tenha uma noite maravilhosa' : 'tenha um dia maravilhoso';

			client.sendText(message.from, firstWordName(message.notifyName) + ", eu vou encerrar a nossa conversa agora. Que *Deus te abençoe* e que você *" + textPeriod + "*.");
			await sleep(1000);
			client.sendText(message.from, 'E *lembre-se sempre*, se precisar eu estou aqui para te ajudar, é só me *mandar um "Oi"*! 😉');

			if (global.context[message.from] == 'Inicial') {
				const sheet = doc.sheetsByIndex[0];
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
			time[message.from] = setTimeout(async () => {
				const sheet = doc.sheetsByIndex[0];
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

const start = (client) => {
	client.onMessage(async (message) => {
		const isEnable = await disableBot(message);

		if (isEnable !== 'Ativado') {
			if (message.body != '👋🏻 Encerrar Conversa') {
				global.inactiveBot(client, message);
			} else {
				clearTimeout(time[message.from]);
			}

			if (message.body == '👦🏻 Sobre Mim') {
				global.context[message.from] = "Sobre Mim";
			} else if (message.body == '👨🏻‍💻 Perfil Profissional') {
				global.context[message.from] = "Perfil Profissional";
			} else if (message.body == '🏫 Formação Acadêmica') {
				global.context[message.from] = "Formação Acadêmica";
			} else if (message.body == '🏢 Experiência Profissional') {
				global.context[message.from] = "Experiência Profissional";
			} else if (message.body == '💻 Projetos Pessoais') {
				global.context[message.from] = "Projetos Pessoais";
			} else if (message.body == '📆 Agendar Entrevista' || message.body == '❌ Cancelar Entrevista') {
				global.context[message.from] = "Agendar Entrevista";
			} else if (message.body == '📚 Habilidades') {
				global.context[message.from] = "Habilidades";
			} else if (message.body == '🛣️ Calcular a Distância') {
				global.context[message.from] = "Calcular a Distância";
			} else if (message.body == '💬 Perguntas e Respostas') {
				global.context[message.from] = "Perguntas e Respostas";
			} else if (message.body == '📄 Visualizar Currículo') {
				global.context[message.from] = "Visualizar Currículo";
			} else if (message.body == '📲 Falar Diretamente Comigo') {
				global.context[message.from] = "Falar Diretamente Comigo";
			} else if (message.body == '👋🏻 Encerrar Conversa' || message.body == 'Encerrar Conversa') {
				global.context[message.from] = "Encerrar Conversa";
			} else if (message.body == 'Voltar ao Menu Principal') {
				global.context[message.from] = "Menu Principal";
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
		}

		if (global.context[message.from] == 'Inicial') {
			await welcome(message, client);
		}

		if (global.context[message.from] == 'Sobre Mim') {
			await aboutMe(message, client);
		}

		if (global.context[message.from] == 'Perfil Profissional') {
			await professionalProfile(message, client);
		}

		if (global.context[message.from] == 'Formação Acadêmica') {
			await academyTrajectory(message, client);
		}

		if (global.context[message.from] == 'Experiência Profissional') {
			await professionalTrajectory(message, client);
		}

		if (global.context[message.from] == 'Projetos Pessoais') {
			await personalProjects(message, client);
		}
		
		if (global.context[message.from] == 'Habilidades') {
			await skills(message, client);
		}
		
		if (global.context[message.from] == 'Agendar Entrevista') {
			await scheduleInterview(message, client);
		}

		if (global.context[message.from] == 'Calcular a Distância') {
			await calculateDistance(message, client);
		}

		if (global.context[message.from] == 'Perguntas e Respostas') {
			await questionsAnswers(message, client);
		}
		
		if (global.context[message.from] == 'Visualizar Currículo') {
			await cv(message, client);
		}

		if (global.context[message.from] == 'Falar Diretamente Comigo') {
			await speakDirectly(message, client);
		}
		
		if (global.context[message.from] == 'Encerrar Conversa') {
			await endConversation(message, client);
		}

		if (global.context[message.from] == 'Menu Principal') {
			await mainMenu(message, client);
		}

		console.log(global.context[message.from]);
	});
}