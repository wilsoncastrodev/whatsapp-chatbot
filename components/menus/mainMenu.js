import { menu } from '../menus/menu.js'; 
import sleep from "es7-sleep";

export const mainMenu = async (message, client) => {
    client.sendText(message.from, 'Para me *conhecer mais*, ver alguns de meus *projetos pessoais*, marcar uma *entrevista* ou entrar em *contato diretamente comigo*, toque no botão "Opções" do menu abaixo 👇 e selecione uma das opções:');
    await sleep(1500);
    menu(message, client);
}