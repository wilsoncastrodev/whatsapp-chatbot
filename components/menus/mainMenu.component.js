import { menu } from './menu.component.js';
import sleep from "es7-sleep";

const mainMenu = async (message, client) => {
    await sleep(2000);
    client.sendText(message.from, 'Para me *conhecer mais*, ver alguns de meus *projetos pessoais*, marcar uma *entrevista* ou entrar em *contato diretamente comigo*, toque no botão "Opções" do menu abaixo 👇 e selecione uma das opções:');
    await sleep(1500);
    menu(message, client);
}

export default mainMenu;
