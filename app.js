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
			} else if (message.body == '🛣️ Calcular a Distância') {
				global.context[message.from] = "Calcular a Distância";
			} else if (message.body == '💬 Perguntas e Respostas') {
				global.context[message.from] = "Perguntas e Respostas";
			} else if (message.body == '📄 Visualizar Currículo') {
				global.context[message.from] = "Visualizar Currículo";
			} else if (message.body == '📲 Falar Diretamente Comigo') {
				global.context[message.from] = "Falar Diretamente Comigo";
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

			if (global.context[message.from] == 'Menu Principal') {
				await mainMenu(message, client);
			}
	});
}