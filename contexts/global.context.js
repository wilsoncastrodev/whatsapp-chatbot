import RecruiterService from "../services/recruiter.service.js";
import menuContext from "./menu.context.js";

global.context = [];

const contexts = (client) => {
    client.onMessage(async (message) => {
        const option = message.body;


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
