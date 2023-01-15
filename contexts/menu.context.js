import welcome from '../components/sections/welcome.component.js';
import aboutMe from '../components/sections/aboutMe.component.js';
import endConversation from '../components/sections/endConversation.component.js';
import mainMenu from '../components/menus/mainMenu.component.js';

const menuContexts = async (context, message, client) => {
    switch (context) {
        case 'Inicial':
            await welcome(message, client);
            break;
        case 'Sobre Mim':
            await aboutMe(message, client);
            break;
        case 'Encerrar Conversa':
            await endConversation(message, client);
            break;
        case 'Menu Principal':
            await mainMenu(message, client);
            break;
    }
};


export default menuContexts;
