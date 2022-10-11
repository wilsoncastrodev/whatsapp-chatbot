import sleep from "es7-sleep";

export const skills = async (message, client) => {
    if (message.body === '📚 Habilidades') {
        client.sendText(message.from, "Por aqui, você poderá ver as minhas *habilidades de desenvolvimento Back-End, Front-End e muitas outras.*");
        await sleep(1500);
        client.sendText(message.from, 'Toque em um dos botões 👇 para ver a *informação desejada*: ', {
            useTemplateButtons: true,
            buttons: [
              { text: 'Ver Habilidades Back-End' },
              { text: 'Ver Habilidades Front-End' },
              { text: 'Ver Outras Habilidades' }
            ]
        });
    }

    if(message.body === 'Ver Habilidades Back-End') {
        await skillsBackend(message, client);
    }

    if(message.body === 'Ver Habilidades Front-End') {
        await skillsFrontEnd(message, client);
    }

    if(message.body === 'Ver Outras Habilidades') {
        await othersSkills(message, client);
    }
}

const skillsBackend = async (message, client) => {
    const backEnd = `*Habilidades em Back-End*                                                                               
😀 PHP (Intermediário para Avançado)
😀 Laravel (Intermediário para Avançado)
🙂 Node.js (Noções Básicas)
😀 MySQL (Intermediário para Avançado)
😁 Lógica de Programação (Avançado)
😀 Orientação à Objetos (Intermediário para Avançado)`;
    
    client.sendText(message.from, backEnd);
    await sleep(1500);
    client.sendText(message.from, 'Toque em um dos botões 👇 para ver *mais informações*: ', {
        useTemplateButtons: true,
        buttons: [
          { text: 'Ver Habilidades Front-End' },
          { text: 'Ver Outras Habilidades' },
          { text: 'Voltar ao Menu Principal' }
        ]
    });
}

const skillsFrontEnd = async (message, client) => {
    const frontEnd = `*Habilidades em Front-End*                                                                                      
😀 Javascript (Intermediário)
😀 React JS (Intermediário)
🙂 Vue JS (Noções Básicas)
😁 CSS3 (Avançado)
😀 SASS (Intermediário para Avançado)
🤩 HTML5 (Domínio)
😀 jQuery (Intermediário para Avançado)
😁 Bootstrap (Avançado)`;

    client.sendText(message.from, frontEnd);
    await sleep(1500);
    client.sendText(message.from, 'Toque em um dos botões 👇 para ver *mais informações*: ', {
        useTemplateButtons: true,
        buttons: [
          { text: 'Ver Habilidades Back-End' },
          { text: 'Ver Outras Habilidades' },
          { text: 'Voltar ao Menu Principal' }
        ]
    });
}

const othersSkills = async (message, client) => {
    const webServices = `*Habilidades em Web Services*                                                                            
😀 APIs REST (Intermediário)   `;
    
    const cms = `*Habilidades em CMS*                                                                                    
😀 Wordpress (Intermediário)  `;
    
    const servers = `*Habilidades em Servidores*                                                                             
😀 Apache2 (Intermediário)      
🙂 Nginx (Noções Básicas)`;
    
    const os = `*Habilidades em SO*                                                                                   
😀 Linux (Bash) (Intermediário)          
😁 Windows (Avançado)`;
    
    const vcs = `*Habilidades em Controle de Versão*                                                                      
😀 Git/GitFlow (Intermediário) `;

    const knowledgeComplementary = `*Conhecimentos Complementares*

_*Ferramentas de Desenvolvimento:*_
• Visual Studio Code (VSCode)
• HeidiSQL
• phpMyAdmin
• DevTools

_*Ferramentas de Controle de Versão:*_
• Bitbucket
• GitHub

_*Ferramentas de Gerenciamento de Dependências/Pacotes:*_
• Composer
• NPM 
• Yarn

_*Ferramenta de Teste de APIs:*_
• Postman 
• Insomnia

_*Padrões de Projetos:*_
• Padrão MVC

_*Outros Conhecimentos:*_
• Ajax
• Axios
• JSON
• Design Responsivo 
• Expressões Regulares (Regex)`

    client.sendText(message.from, webServices);
    await sleep(1500);
    client.sendText(message.from, cms);
    await sleep(1500);
    client.sendText(message.from, vcs);
    await sleep(1500);
    client.sendText(message.from, servers);
    await sleep(1500);
    client.sendText(message.from, os);
    await sleep(1500);
    client.sendText(message.from, knowledgeComplementary);
    await sleep(1500);
    client.sendText(message.from, 'Toque em um dos botões 👇 para ver *mais informações*: ', {
        useTemplateButtons: true,
        buttons: [
          { text: 'Ver Habilidades Back-End' },
          { text: 'Ver Habilidades Front-End' },
          { text: 'Voltar ao Menu Principal' }
        ]
    });
}
