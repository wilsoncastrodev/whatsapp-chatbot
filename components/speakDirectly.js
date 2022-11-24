import { doc } from '../libs/google-spreadsheet.js';
import { firstWordName, disableBot } from "../utils/helpers.js";

export const speakDirectly = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];

    if (message.body === '📲 Falar Diretamente Comigo') {
        client.sendText(message.from, `Para *conversar diretamente comigo*, basta tocar no botão abaixo 👇 "Conversar com o Wilson": `,
        {
            useTemplateButtons: true,
            buttons: [
                { text: 'Conversar com o Wilson' },
                { text: 'Voltar ao Menu Principal' },
                { text: 'Encerrar Conversa' }
            ],
        });
    } else if(message.body === 'Conversar com o Wilson') {
        const rows = await sheet.getRows();
        const rowIndex = rows.findIndex(row => row.ID === message.from);
        rows[rowIndex]["Contato Direto"] = "Ativado";
        await rows[rowIndex].save();

        client.sendText(message.from, '_' + firstWordName(message.notifyName) + ', por favor, peço que você aguarde que *em breve estarei retornando* o seu contato._');
    } else {
        const isEnable = await disableBot(message);
        
        if (isEnable !== 'Ativado') {
            global.context[message.from] = "Menu Principal";
        }
    }
}