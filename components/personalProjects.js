import sleep from "es7-sleep";

export const personalProjects = async (message, client) => {
    if (message.body === '💻 Projetos Pessoais') {
        await projects(message, client);
    } else if(message.body === '📂 Projeto - Site Pessoal') {
        client.sendText(message.from, `*Projeto: Site Pessoal*

Este projeto tem como objetivo o desenvolvimento de um *site pessoal* para realizar a *divulgação do meu currículo e dos meus projetos pessoais* e também colocar em prática os meus estudos sobre *React JS*.

*Link de acesso ao Site Pessoal:* 
www.wilsoncastro.dev`);
        await sleep(1500);
        client.sendText(message.from, `*Tecnologias utilizadas no projeto:* _React, Javascript, HTML5, CSS3, SASS e Bootstrap_`);
        await sleep(1500);
        client.sendText(message.from, `Veja abaixo 👇 algumas *imagens do projeto*:`);
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot1.cb0c9e7c.png', 'Site Pessoal 1')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot2.dcd97262.png', 'Site Pessoal 2')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot3.b56eb7d8.png', 'Site Pessoal 3')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot4.53e892c0.png', 'Site Pessoal 4')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot5.6d658f9b.png', 'Site Pessoal 5')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot6.c9888ee1.png', 'Site Pessoal 6')
        await sleep(10000);
        client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇 para *voltar ao menu principal*, ou *encerrar a nossa conversar*: `,
        {
            useTemplateButtons: true,
            buttons: [
                { text: 'Voltar ao Menu Anterior' },
                { text: 'Voltar ao Menu Principal' },
                { text: 'Encerrar Conversa' }
            ],
        });
    } else if(message.body === '📂 Projeto - E-commerce') {
        client.sendText(message.from, `*Projeto: E-commerce*

Este projeto tem como objetivo a construção de um *e-commerce* do zero usando *Laravel* com intuito de aprimorar cada vez mais as minhas habilidades em *PHP, Laravel e MySQL*.

*Link de acesso ao E-commerce:* 
www.ecommerce-test.wilsoncastro.dev
*Link de acesso ao Painel de Controle do E-commerce:*
www.ecommerce-test.wilsoncastro.dev/admin`);
        await sleep(1500);
        client.sendText(message.from, `*Tecnologias utilizadas no projeto:* _PHP, Laravel, MySQL, Javascript, HTML5, CSS3, SASS e Bootstrap_`);
        await sleep(1500);
        client.sendText(message.from, `Veja abaixo 👇 algumas *imagens do projeto*:`);
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot1.ed031289.png', 'E-commerce 1')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot2.b44c4490.png', 'E-commerce 2')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot3.1ddcd008.png', 'E-commerce 3')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot4.30218f73.png', 'E-commerce 4')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot5.6a5f61f4.png', 'E-commerce 5')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot6.43e3f4be.png', 'E-commerce 6')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot7.14c1b8a4.png', 'E-commerce 7')
        await sleep(10000);
        client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇 para *voltar ao menu principal*, ou *encerrar a nossa conversar*: `,
        {
            useTemplateButtons: true,
            buttons: [
                { text: 'Voltar ao Menu Anterior' },
                { text: 'Voltar ao Menu Principal' },
                { text: 'Encerrar Conversa' }
            ],
        });
    } else if(message.body === '📂 Projeto - Whatsapp Bot') {
        client.sendText(message.from, `*Projeto: Whatsapp Chatbot*

O projeto visa o desenvolvimento de um *assistente virtual para Whatsapp* com objetivo de *facilitar e agilizar o meu primeiro contato com o recrutador/headhunter*. Este *assistente virtual* será capaz de auxiliar o *recrutador/headhunter* na sua avaliação para saber se o *meu perfil* está de acordo com o *perfil da vaga*. Além disso, o projeto tem o intuito de me ajudar a me aprofundar um pouco mais em *Javascript*, utilizando *Node.js* no Back-End..

*Link de acesso ao Whatsapp Chatbot:* 
wa.me/5511914640755`);
        await sleep(1500);
        client.sendText(message.from, `*Tecnologias utilizadas no projeto:* _Javascript e Node.js_`);
        await sleep(1500);
        client.sendText(message.from, `Veja abaixo 👇 algumas *imagens do projeto*:`);
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot1.354f3d50.jpeg', 'Whatsapp Chatbot 1')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot2.02c6c620.jpeg', 'Whatsapp Chatbot 2')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot3.4469bffe.jpeg', 'Whatsapp Chatbot 3')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot4.99bb3aa3.jpeg', 'Whatsapp Chatbot 4')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot5.aa4230e0.jpeg', 'Whatsapp Chatbot 5')
        client.sendImage(message.from, 'https://wilsoncastro.dev/static/media/screenshot6.543dfdb2.jpeg', 'Whatsapp Chatbot 6')
        await sleep(10000);
        client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇 para *voltar ao menu principal*, ou *encerrar a nossa conversar*: `,
        {
            useTemplateButtons: true,
            buttons: [
                { text: 'Voltar ao Menu Anterior' },
                { text: 'Voltar ao Menu Principal' },
                { text: 'Encerrar Conversa' }
            ],
        });
    } else {
        await projects(message, client);
    }
}

const projects = async (message, client) => {
    const description = `*Projetos Pessoais*
  
  📂 Projeto - Site Pessoal
  📂 Projeto - E-commerce
  📂 Projeto - Whatsapp Bot`;
      
    client.sendText(message.from, `Se deseja conhecer alguns de meus *projetos pessoais*, toque no botão "Projetos" do menu abaixo 👇 e selecione um dos projetos:`);
    await sleep(1500);
    client.sendListMessage(message.from, {
        buttonText: 'Projetos',
        description: description,
        sections: [
            {
                title: 'Selecione um projeto:',
                rows: [
                    {
                        title: '📂 Projeto - Site Pessoal',
                    },
                    {
                        title: '📂 Projeto - E-commerce',
                    },
                    {
                        title: '📂 Projeto - Whatsapp Bot',
                    },
                ],
            },
        ],
    });
}