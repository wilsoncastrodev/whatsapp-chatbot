import RecruiterService from "../services/recruiter.service.js";
import BotService from "../services/bot.service.js";
import menuContext from "./menu.context.js";

global.context = [];

const contexts = (client) => {
    client.onMessage(async (message) => {
        const isActiveBot = await BotService.disableDirectContact(message);
        const option = message.body;

        if (isActiveBot === 'Ativado') {
            return;
        }

        if (option != '👋🏻 Encerrar Conversa') {
            await BotService.inactiveBot(client, message);
        } else {
            clearTimeout(global.time[message.from]);
        }

        switch (option) {
            case '👦🏻 Sobre Mim':
                global.context[message.from] = 'Sobre Mim';
                break;
            case '👨🏻‍💻 Perfil Profissional':
                global.context[message.from] = 'Perfil Profissional';
                break;
            case '🏫 Formação Acadêmica':
                global.context[message.from] = 'Formação Acadêmica';
                break;
            case '🏢 Experiência Profissional':
                global.context[message.from] = 'Experiência Profissional';
                break;
            case '📚 Habilidades':
                global.context[message.from] = 'Habilidades';
                break;
            case '💻 Projetos Pessoais':
                global.context[message.from] = 'Projetos Pessoais';
                break;
            case '💬 Perguntas e Respostas':
                global.context[message.from] = 'Perguntas e Respostas';
                break;
            case '📄 Visualizar Currículo':
                global.context[message.from] = 'Visualizar Currículo';
                break;
            case '🛣️ Calcular a Distância':
                global.context[message.from] = 'Calcular a Distância';
                break;
            case '📆 Agendar Entrevista':
                global.context[message.from] = 'Agendar Entrevista';
                break;
            case '❌ Cancelar Entrevista':
                global.context[message.from] = 'Cancelar Entrevista';
                break;
            case '📲 Falar Diretamente Comigo':
                global.context[message.from] = 'Falar Diretamente Comigo';
                break;
            case '👋🏻 Encerrar Conversa':
            case 'Encerrar Conversa':
                global.context[message.from] = 'Encerrar Conversa';
                break;
            case 'Voltar ao Menu Principal':
                global.context[message.from] = 'Menu Principal';
                break;
            default:
				const isAuthRecruiter = await RecruiterService.verifyAuthRecruiter(message);

				if (!isAuthRecruiter) {
					global.context[message.from] = 'Inicial';
				} else if (global.context[message.from] === undefined) {
			        global.context[message.from] = 'Menu Principal';
				}
        }

        menuContext(global.context[message.from], message, client);
    })
};

export default contexts;
