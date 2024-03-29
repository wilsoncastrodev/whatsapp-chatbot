import welcome from '../components/sections/welcome.component.js';
import aboutMe from '../components/sections/aboutMe.component.js';
import professionalProfile from "../components/sections/professionalProfile.component.js";
import academyTrajectory from "../components/sections/academyTrajectory.component.js";
import professionalTrajectory from "../components/sections/professionalTrajectory.component.js";
import skills from "../components/sections/skills.component.js";
import personalProjects from "../components/sections/personalProjects.component.js";
import questionsAnswers from "../components/sections/questionsAnswers.component.js";
import cv from "../components/sections/cv.component.js";
import calculateDistance from "../components/sections/calculateDistance.component.js";
import scheduleInterview from "../components/sections/scheduleInterview.component.js";
import cancelInterview from "../components/sections/cancelInterview.component.js";
import speakDirectly from "../components/sections/speakDirectly.component.js";
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
        case 'Perfil Profissional':
            await professionalProfile(message, client);
            break;
        case 'Formação Acadêmica':
            await academyTrajectory(message, client);
            break;
        case 'Experiência Profissional':
            await professionalTrajectory(message, client);
            break;
        case 'Habilidades':
            await skills(message, client);
            break;
        case 'Perguntas e Respostas':
            await questionsAnswers(message, client);
            break;
        case 'Projetos Pessoais':
            await personalProjects(message, client);
            break;
        case 'Visualizar Currículo':
            await cv(message, client);
            break;
        case 'Calcular a Distância':
            await calculateDistance(message, client);
            break;
        case 'Agendar Entrevista':
            await scheduleInterview(message, client);
            break;
        case 'Cancelar Entrevista':
            await cancelInterview(message, client);
            break;
        case 'Falar Diretamente Comigo':
            await speakDirectly(message, client);
            break;
        case 'Encerrar Conversa':
            await endConversation(message, client);
            break;
        case 'Menu Principal':
            await mainMenu(message, client);
            break;
    }

    console.log('Contexto: ', context);
};


export default menuContexts;
