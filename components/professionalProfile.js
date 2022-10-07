import sleep from "es7-sleep";

export const professionalProfile = async (message, client) => {
  const mainFeatures = `*Veja minhas Principais Características:*                                                                               
🧐 Me considero uma pessoa focada e gosto de resolver desafios que estejam relacionados ao desenvolvimento Web;
🤭 Sou uma pessoa que fala pouco, mas procuro entregar resultados consistentes;
🤩 Estou sempre buscando me manter atualizado com as novas tendências de desenvolvimento Web;
😀 Sou uma pessoa trabalhadora que procura sempre entregar o que foi combinado;
🤔 Quando não sei algo, estudo soluções com o máximo de empenho possível;
😃 Estou sempre a disposição para ajudar e se eu não puder ajudar, procuro não atrapalhar;
🤓 Não sou uma pessoa que compete por atenção;`;

  const otherFeatures = `*Veja outras Características:*                                                                               
🙂 Sou uma pessoa reservada e discreta;
🤭 Costumo falar o mínimo necessário;
🤔 Costumo seguir minha intuição e meus instintos;
🧐 Estou sempre procurando melhorar meu desempenho;
🧐 Não gosto de desperdiçar tempo;
😀 Busco terminar o que começo;
😁 Prefiro fazer a mandar;
🧐 Procuro colocar meu foco na solução e não no problema;
😀 Sou melhor fazendo do que falando;`;

  const strongPoints = `*Veja meus Pontos Fortes:*     
😀 Sou uma pessoa focada e concentrada;
😀 Não espero ser cobrado para fazer o meu trabalho;
😀 Não sou de desistir facilmente;
😀 Sou uma pessoa prática e comprometida com aquilo que faço;`;

  const weakPoints = `*Veja meus Pontos Fracos:* 
🙁 Não me considero uma pessoa inteligente. Mas, me considero uma pessoa estudiosa, esforçada, dedicada e comprometida com aquilo que eu me proponho a fazer;
🙁 Sou uma pessoa introvertida. Tenho um certo receio de falar em público para muitas pessoas. Eu fico muitas vezes nervoso e acabo me enrolando com as palavras. Já realizei alguns cursos online para me ajudar, mas mesmo assim ainda não me sinto confortável;
🙁 Apesar de eu me considerar uma pessoa produtiva, às vezes passo muito tempo focando nos detalhes. Mas quando o prazo é curto, eu evito focar nos detalhes para tentar cumprir o prazo`;

  if (message.body === '👨🏻‍💻 Perfil Profissional') {
    client.sendText(message.from, "Se quiser conhecer as minhas *características mais fortes*, alguns dos meus *pontos fracos* e também alguns dos meus *pontos fortes*.");
    await sleep(3000);
    client.sendText(message.from, 'Toque em um dos botões 👇 para ver a *informação desejada*: ', {
      useTemplateButtons: true,
      buttons: [
        { text: 'Ver Características' },
        { text: 'Ver Pontos Fracos' },
        { text: 'Ver Pontos Fortes' }
      ]
    });
  }

  if (message.body === 'Ver Características') {
    client.sendText(message.from, mainFeatures);
    await sleep(3000);
    client.sendText(message.from, otherFeatures);
    await sleep(2000);
    client.sendText(message.from, 'Toque em um dos botões 👇 para ver *mais informações*: ', {
      useTemplateButtons: true,
      buttons: [
        { text: 'Ver Pontos Fracos' },
        { text: 'Ver Pontos Fortes' },
        { text: 'Voltar ao Menu Principal' }
      ]
    });
  }

  if (message.body === 'Ver Pontos Fracos') {
    client.sendText(message.from, weakPoints);
    await sleep(2000);
    client.sendText(message.from, 'Toque em um dos botões 👇 para ver *mais informações*: ', {
      useTemplateButtons: true,
      buttons: [
        { text: 'Ver Pontos Fortes' },
        { text: 'Ver Características' },
        { text: 'Voltar ao Menu Principal' }
      ]
    });
  }

  if (message.body === 'Ver Pontos Fortes') {
    client.sendText(message.from, strongPoints);
    await sleep(2000);
    client.sendText(message.from, 'Toque em um dos botões 👇 para ver *mais informações*: ', {
      useTemplateButtons: true,
      buttons: [
        { text: 'Ver Pontos Fracos' },
        { text: 'Ver Características' },
        { text: 'Voltar ao Menu Principal' }
      ]
    });
  }
}