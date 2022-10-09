import sleep from "es7-sleep";

export const professionalTrajectory = async (message, client) => {
    if (message.body === '🏢 Experiência Profissional') {
        client.sendText(message.from, "Veja as minhas *experiências profissionais*:");
        await sleep(1500);
        client.sendText(message.from, `*Desenvolvedor Full Stack Junior*
_Maio 2019 -  Outubro 2020_

*Empresa:* Studio Visual

*Descrição:* Atuei na área de sustentação de aplicações Web em PHP utilizando o framework Laravel e o CMS Wordpress, realizando correções de bugs e falhas, construindo e mantendo APIs RESTful que integram outros sistemas e desenvolvendo novas features e melhorias dentro das aplicações para atender às necessidades dos clientes. Atuei também no desenvolvimento front-end de sites e portais com Wordpress.

*Tecnologias utilizadas na empresa:* _PHP, Laravel, Wordpress, Mysql, APIs, Javascript, jQuery, SASS, CSS3, HTML5, Bootstrap, Linux e Git_`);
        await sleep(1500);

        client.sendText(message.from, `*Estágio em Desenvolvimento de Sistemas*
_Abril 2014 -  Maio 2017_

*Empresa:* Faculdade de Tecnologia de São Caetano do Sul - Antonio Russo

*Descrição:* Estágio na área de TI. Durante o período de estágio desempenhei a função de programador de sistemas e participei do acompanhamento das atividades referentes ao campo de tecnologia.`);
        await sleep(1500);
        client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇 para *voltar ao menu principal*, ou *encerrar a nossa conversar*: `,
        {
            useTemplateButtons: true,
            buttons: [
                { text: 'Voltar ao Menu Principal' },
                { text: 'Encerrar Conversa' }
            ],
        });
    }
}