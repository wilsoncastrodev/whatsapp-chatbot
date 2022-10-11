import { menu } from '../menus/menu.js'; 
import sleep from "es7-sleep";
import { doc } from '../../libs/google-spreadsheet.js';
import moment from 'moment';
moment.locale('pt-br');

export const mainMenu = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);
    const interview = {}
    
    interview.nomeEntrevistador = rows[rowIndex]['Nome do Entrevistador'];
    interview.dataEntrevista = rows[rowIndex]['Data da Entrevista'];
    interview.horarioEntrevista = rows[rowIndex]['Horário da Entrevista'];


    if (message.body === 'Voltar ao Menu Principal') {
        if(interview.horarioEntrevista) {    
            let dateInterview = moment(interview.dataEntrevista, 'DD/MM/YYYY').format("DD [de] MMMM"),
            timeInterview = interview.horarioEntrevista.replace(":00", "");
            client.sendText(message.from, '_⏰ Lembrete: *Entrevista marcada para dia ' + dateInterview + ' às ' + timeInterview + ' horas.*_');  
        }
        await sleep(2000);
        client.sendText(message.from, 'Para me *conhecer mais*, ver alguns de meus *projetos pessoais*, marcar uma *entrevista* ou entrar em *contato diretamente comigo*, toque no botão "Opções" do menu abaixo 👇 e selecione uma das opções:');
        await sleep(1500);
        menu(message, client);
    } else {
        if(interview.horarioEntrevista) {
            let dateInterview = moment(interview.dataEntrevista, 'DD/MM/YYYY').format("DD [de] MMMM"),
            timeInterview = interview.horarioEntrevista.replace(":00", "");
            client.sendText(message.from, '_⏰ Lembrete: *Entrevista marcada para dia ' + dateInterview + ' às ' + timeInterview + ' horas.*_');  
        }
        await sleep(2000);
        client.sendText(message.from, 'Para me *conhecer mais*, ver alguns de meus *projetos pessoais*, marcar uma *entrevista* ou entrar em *contato diretamente comigo*, toque no botão "Opções" do menu abaixo 👇 e selecione uma das opções:');
        await sleep(1500);
        menu(message, client);
    }
}