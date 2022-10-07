import { firstWordName } from "../../utils/helpers.js";
import { doc } from '../../libs/google-spreadsheet.js';
import { mainMenuBoot } from "../menus/mainMenuBoot.js";
import sleep from "es7-sleep";
import validator from "validator";

var recruiterStages = [];
var recruiter = {};

export const formJobOpportunity = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];
    
    if (message.body === 'Aceito') {
        await sheet.addRow({ "ID": message.from });
        recruiterStages[message.from] = 'Nome';
    }
    
    const stage = recruiterStages[message.from];

    switch (stage) {
        case 'Nome':
            client.sendText(message.from, 'Agora, eu vou fazer algumas *perguntas sobre você e a vaga em questão* para que possamos prosseguir.');
            await sleep(3000);
            client.sendText(message.from, "Por favor, qual é o seu *nome completo*?");
            recruiterStages[message.from] = 'Email';
            break;
        case 'Email':
            client.sendText(message.from, "Certo! Qual é o seu *e-mail*?");
            recruiterStages[message.from] = 'NomeEmpresaRepresenta';
            recruiter.nome = message.body;
            break;
        case 'NomeEmpresaRepresenta':
            if(validator.isEmail(message.body)) {
                client.sendText(message.from, firstWordName(message.notifyName) + ", qual é o *nome da empresa* que você *representa*?");
                recruiterStages[message.from] = 'NomeEmpresaVaga';
                recruiter.email = message.body;
                break;
            } 
            client.sendText(message.from, "😥 *Que pena, não entendi.* Verifique e digite novamente seu *e-mail*:");
            recruiterStages[message.from] = 'NomeEmpresaRepresenta';
            break;
        case 'NomeEmpresaVaga':
            client.sendText(message.from, "Agora, por favor, qual é o *nome da empresa* que está *oferecendo a vaga*?");
            recruiterStages[message.from] = 'Cargo';
            recruiter.nomeEmpresaRepresenta = message.body;
            break;
        case 'Cargo':
            client.sendText(message.from, "Ok! Qual é o *cargo*?");
            recruiterStages[message.from] = 'Descricao';
            recruiter.nomeEmpresaVaga = message.body;
            break;
        case 'Descricao':
            client.sendText(message.from, "Por favor, me informe a *descrição da vaga*.");
            recruiterStages[message.from] = 'RegimeTrabalho';
            recruiter.cargo = message.body;
            break;
        case 'RegimeTrabalho':
            client.sendText(message.from, "Qual é o *regime de trabalho* da empresa (ex.: Home Office, Híbrido ou Presencial)?");
            recruiterStages[message.from] = 'FormaContratacao';
            recruiter.descricao = message.body;
            break;
        case 'FormaContratacao':
            client.sendText(message.from, "Me diga, qual é a *forma de contratação* da empresa (ex.: PJ, CLT)?");
            recruiterStages[message.from] = 'Salario';
            recruiter.regimeTrabalho = message.body;
            break;
        case 'Salario':
            client.sendText(message.from, "Qual é o *salário*?");
            recruiterStages[message.from] = 'SiteCV';
            recruiter.formaContratacao = message.body;
            break;
        case 'SiteCV':
            if(validator.isNumeric(message.body)) {
                client.sendText(message.from, "Para finalizar " + firstWordName(message.notifyName) + ", *onde encontrou o meu currículo* (ex.: Catho, Infojobs, Vagas.com)?");
                recruiterStages[message.from] = 'Fim';
                recruiter.salario = message.body;
                break;
            } 
            client.sendText(message.from, "😥 *Que pena, não entendi.* Digite novamente o *salário* utilizando *apenas números* e *sem vírgula*:");
            recruiterStages[message.from] = 'SiteCV';
            break;
        case 'Fim':
            recruiter.siteCV = message.body;

            const rows = await sheet.getRows();
            const rowIndex = rows.findIndex(row => row.ID === message.from);

            rows[rowIndex]["Nome"] = recruiter.nome;
            rows[rowIndex]["Email"] = recruiter.email;
            rows[rowIndex]["Nome da Empresa da Vaga"] = recruiter.nomeEmpresaVaga;
            rows[rowIndex]["Nome da Empresa do Recrutador"] = recruiter.nomeEmpresaRepresenta;
            rows[rowIndex]["Cargo"] = recruiter.cargo;
            rows[rowIndex]["Descrição da Vaga"] = recruiter.descricao;
            rows[rowIndex]["Regime de Trabalho"] = recruiter.regimeTrabalho;
            rows[rowIndex]["Forma de Contratação"] = recruiter.formaContratacao;
            rows[rowIndex]["Salário"] = recruiter.salario;
            rows[rowIndex]["Site"] = recruiter.siteCV;

            await rows[rowIndex].save();

            recruiterStages[message.from] = '';
            await mainMenuBoot(message, client);
            break;
    }
}