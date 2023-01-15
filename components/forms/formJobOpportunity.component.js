import RecruiterService from "../../services/recruiter.service.js";
import { mainMenuBoot } from "../menus/mainMenuBoot.component.js";
import { firstWordName, generateCode } from "../../utils/commons.js";
import sleep from "es7-sleep";
import validator from "validator";

global.recruiterStages = [];
global.recruiter = {};

const formJobOpportunity = async (message, client) => {
    const recruiter = global.recruiter;

    if (message.body === 'Aceito') {
        await RecruiterService.createRecruiter(message);
        global.recruiterStages[message.from] = 'Nome';
    }

    const stage = global.recruiterStages[message.from];

    switch (stage) {
        case 'Nome':
            client.sendText(message.from, 'Agora, eu vou fazer algumas *perguntas sobre você e a vaga em questão* para que possamos prosseguir.');
            await sleep(3000);
            client.sendText(message.from, "Por favor, qual é o seu *nome completo*?");
            global.recruiterStages[message.from] = 'Email';
            break;
        case 'Email':
            client.sendText(message.from, "Certo! Qual é o seu *e-mail*?");
            global.recruiterStages[message.from] = 'NomeEmpresaRepresenta';
            recruiter.nome = message.body;
            break;
        case 'NomeEmpresaRepresenta':
            if(validator.isEmail(message.body)) {
                client.sendText(message.from, firstWordName(message.notifyName) + ", qual é o *nome da empresa* que você *representa*?");
                global.recruiterStages[message.from] = 'NomeEmpresaVaga';
                recruiter.email = message.body;
                break;
            } 
            client.sendText(message.from, "😥 *Que pena, não entendi.* Verifique e digite novamente seu *e-mail*:");
            global.recruiterStages[message.from] = 'NomeEmpresaRepresenta';
            break;
        case 'NomeEmpresaVaga':
            client.sendText(message.from, "Agora, por favor, qual é o *nome da empresa* que está *oferecendo a vaga*?");
            global.recruiterStages[message.from] = 'Cargo';
            recruiter.nomeEmpresaRepresenta = message.body;
            break;
        case 'Cargo':
            client.sendText(message.from, "Ok! Qual é o *cargo*?");
            global.recruiterStages[message.from] = 'Descricao';
            recruiter.nomeEmpresaVaga = message.body;
            break;
        case 'Descricao':
            client.sendText(message.from, "Por favor, me informe a *descrição da vaga*.");
            global.recruiterStages[message.from] = 'RegimeTrabalho';
            recruiter.cargo = message.body;
            break;
        case 'RegimeTrabalho':
            client.sendText(message.from, "Qual é o *regime de trabalho* da empresa (ex.: Home Office, Híbrido ou Presencial)?");
            global.recruiterStages[message.from] = 'FormaContratacao';
            recruiter.descricao = message.body;
            break;
        case 'FormaContratacao':
            client.sendText(message.from, "Me diga, qual é a *forma de contratação* da empresa (ex.: PJ, CLT)?");
            global.recruiterStages[message.from] = 'Salario';
            recruiter.regimeTrabalho = message.body;
            break;
        case 'Salario':
            client.sendText(message.from, "Qual é o *salário*?");
            global.recruiterStages[message.from] = 'SiteCV';
            recruiter.formaContratacao = message.body;
            break;
        case 'SiteCV':
            if(validator.isNumeric(message.body)) {
                client.sendText(message.from, "Para finalizar " + firstWordName(message.notifyName) + ", *onde encontrou o meu currículo* (ex.: Catho, Infojobs, Vagas.com)?");
                global.recruiterStages[message.from] = 'CodigoVerificacao';
                recruiter.salario = message.body;
                break;
            } 
            client.sendText(message.from, "😥 *Que pena, não entendi.* Digite novamente o *salário* utilizando *apenas números* e *sem vírgula*:");
            global.recruiterStages[message.from] = 'SiteCV';
            break;
        case 'CodigoVerificacao':
            client.sendText(message.from, "Para *confirmar sua identidade*, um *código de verificação* será enviado para seu endereço de *e-mail*.");
            recruiter.siteCV = message.body;
            recruiter.codigoVerificacao = generateCode();

            await RecruiterService.updateRecruiter(message, recruiter);

            await sleep(3000);
            client.sendText(message.from, "Pronto! Foi enviado um *código de verificação* para o endereço de *e-mail* que você informou. ");
            await sleep(500);
            client.sendText(message.from, "Por favor, informe o *código* para continuar:");
            
            global.recruiterStages[message.from] = 'Fim';
            break;
        case 'Fim':
            if(recruiter.codigoVerificacao === message.body) {
                await mainMenuBoot(message, client);
                await RecruiterService.createAuthRecruiter(message);
                global.recruiterStages[message.from] = '';
                break;
            } 
        
            client.sendText(message.from, "😥 *Que pena, código inválido.*");
            await sleep(500);
            client.sendText(message.from, "_Caso não tenha recebido o código por e-mail ou tenha algum outro problema, entre em contato com o *Wilson* pelo e-mail contato@wilsoncastro.dev_");
            await sleep(500);
            client.sendText(message.from, "Agora, se você recebeu, verifique o *código* e tente digitá-lo novamente:");
            global.recruiterStages[message.from] = 'Fim';
            break;
    }
}

export default formJobOpportunity;