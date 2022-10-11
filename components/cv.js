import sleep from "es7-sleep";

export const cv = async (message, client) => {
    if (message.body === '📄 Visualizar Currículo') {
        client.sendText(message.from, "Confira o meu *currículo atualizado* em PDF:");
        await sleep(500);
        await client.sendFile(
            message.from,
            'https://wilsoncastro.dev/cv/cv-wilson-castro-da-paixao.pdf',
            'CV - Wilson Castro da Paixão',
            'CV - Wilson Castro da Paixão'
        );
        await sleep(1500);
        client.sendText(message.from, `Você também pode acessar o meu *site pessoal*, caso deseje mais informações sobre mim. 🚀
Acesse em: 
www.wilsoncastro.dev`);
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