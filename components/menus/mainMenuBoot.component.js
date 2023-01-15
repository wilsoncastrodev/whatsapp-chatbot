import { menu } from './menu.component.js'; 
import sleep from "es7-sleep";

export const mainMenuBoot = async (message, client) => {
    client.sendText(message.from, 'Muito obrigado 😀, te agradeço pelas informações.');
    await sleep(1000);
    client.sendText(message.from, 'Agora, para me *conhecer mais*, ver alguns de meus *projetos pessoais*, marcar uma *entrevista* ou entrar em *contato diretamente comigo*, toque no botão "Opções" do menu abaixo 👇 e selecione uma das opções:');
    await sleep(2000);
    menu(message, client);
}