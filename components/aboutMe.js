import sleep from "es7-sleep";

export const aboutMe = async (message, client) => {
    if (message.body === '👦🏻 Sobre Mim') {
        client.sendText(message.from, `Veja abaixo um pouco *sobre mim* e *meus objetivos*:`);
        await sleep(1000);
        client.sendText(message.from, `Meu nome é *Wilson Castro da Paixão*, tenho *31 anos* e sou natural de São Bernardo do Campo.`);
        await sleep(1000);
        client.sendText(message.from, `Sou formado em *Análise e Desenvolvimento de Sistemas* pela *Fatec São Caetano do Sul*, trabalho no desenvolvimento de *aplicações Web* desde 2019.`);
        await sleep(1000);
        client.sendText(message.from, `Trabalhei como *desenvolvedor Full Stack PHP Junior* na empresa Studio Visual, atualmente tenho como objetivo trabalhar tanto no *front-end* quanto no *back-end* para atuar na criação de novas aplicações e na manutenção de projetos já existentes.`);
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