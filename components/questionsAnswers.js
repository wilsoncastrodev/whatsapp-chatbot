import sleep from "es7-sleep";

export const questionsAnswers = async (message, client) => {
    if (message.body === '💬 Perguntas e Respostas') {
        client.sendText(message.from, `Veja abaixo 👇 algumas *perguntas e respostas* sobre mim:`);
        await sleep(500);
        client.sendText(message.from, `*Entre CLT e PJ, qual você prefere?*
Após eu ter feito uma análise dos modelos de trabalho CLT e PJ, percebi que o modelo CLT se enquadra melhor ao meu perfil profissional. Devido a isso, eu tenho preferência em trabalhar como CLT, mas estou aberto à propostas do tipo PJ.`);
        await sleep(500);
        client.sendText(message.from, `*Qual a modalidade de trabalho você prefere: home office, presencial ou híbrido?* 
Não tenho uma preferência. Desde que a empresa forneça os equipamentos necessários como, por exemplo, computador ou notebook no caso de trabalho híbrido ou presencial.`);
        await sleep(500);
        client.sendText(message.from, `*Tem disponibilidade para início imediato?* 
Atualmente estou fora do mercado de trabalho. Então, estou a disposição para iniciar os serviços a qualquer momento.`);
        await sleep(500);
        client.sendText(message.from, `*Qual é o seu o nível de inglês?* 
O meu nível de inglês eu considero que seja pré-intermediário. Eu tenho uma boa leitura e compreensão de texto.
Apesar de eu nunca ter feito um curso de inglês, eu tive seis semestre de inglês na faculdade. E há muito tempo o inglês faz parte do meu dia-a-dia, são muitos anos estudando para área de tecnologia e hoje também atuo na área, então estou bastante habituado com o vocabulário técnico.`);
        await sleep(500);
        client.sendText(message.from, `*Você escreve seus códigos em inglês?* 
Sim. Na Studio Visual empresa em que eu trabalhei, todos os códigos eram escritos em inglês para manter uma padronização no desenvolvimento dos projetos, então acabei adquirindo o hábito de escrever os meus códigos em inglês.`);
        await sleep(500);
        client.sendText(message.from, `*Você também trabalha como Designer UX/UI?* 
Não. Não é a minha área, eu tenho como objetivo trabalhar apenas no desenvolvimento Front-End e Back-End de aplicações. Mas, eu tenho uma pequena noção de UI/UX  que me ajuda no desenvolvimento Front-End. Quando eu estou desenvolvendo os meus projetos pessoais faço uso dessa noção para criar os meus próprios layouts.`);
        await sleep(500);
        client.sendText(message.from, `*Que tipo de ambiente de trabalho você prefere?* 
Um ambiente em que haja um respeito mútuo entre todos os colaboradores e que um ajude o outro na medida do possível para que a gente consiga obter os melhores resultados possíveis.
Eu também prefiro um ambiente onde não haja muitas distrações para que eu possa focar no que realmente precisa ser feito.`);
        await sleep(500);
        client.sendText(message.from, `*Você gosta de trabalhar em equipe?* 
Posso dizer que eu gosto de trabalhar em equipe, pois eu sei da importância de se trabalhar em equipe para alcançar bons resultados. E quando estou trabalhando em equipe procuro sempre ter um bom relacionamento com todos os membros.
Na Studio Visual eu trabalhei em duas equipes diferentes. Não tive problema com ninguém e procurava sempre ajudar os meus colegas na medida do possível.`);
        await sleep(500);
        client.sendText(message.from, `*Você tem redes sociais?* 
Somente o Whatsapp e o LinkedIn que eu criei recentemente.
Eu evito usar as redes sociais porque tira a minha concentração e o meu foco do trabalho e também acaba atrapalhando o meu raciocínio e reduzindo a minha produtividade.`);
        await sleep(500);
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