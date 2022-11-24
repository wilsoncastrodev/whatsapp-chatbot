import sleep from "es7-sleep";

export const academyTrajectory = async (message, client) => {
    if (message.body === '🏫 Formação Acadêmica') {
        await academicEducation(message, client);
    }

    await courses(message, client);
}

const academicEducation = async (message, client) => {
    client.sendText(message.from, "Confira a minha *formação acadêmica*:");
    await sleep(1500);
    client.sendText(message.from, `*Tecnólogo em Análise e Desenvolvimento de Sistemas*
2014 - 2017
_Superior Completo_ 

*Instituição:* Faculdade de Tecnologia de São Caetano do Sul - Antonio Russo
*Carga Horária:* 2800 Horas`);
    await sleep(1500);
    client.sendText(message.from, `Veja abaixo 👇 o meu *Trabalho de Conclusão de Curso* (TCC) realizado na Faculdade de Tecnologia de São Caetano do Sul, onde desenvolvi ao lado de outros companheiros de equipe:`);
    await sleep(1500);
    client.sendText(message.from, '*TCC - Campark System: Sistema de controle de acesso ao estacionamento por meio de câmeras*');

    try {
        await client.sendFile(
            message.from,
            'https://wilsoncastro.dev/tcc/tcc-campark-system-sistema-de-controle-de-acesso-ao-estacionamento-por-meio-de-cameras.pdf',
            'TCC - Wilson Castro da Paixão',
            'TCC - Wilson Castro da Paixão'
        );
    } catch (e) {
        client.sendText(message.from, '_Ocorreu um problema no carregamento do arquivo. Por favor, volte a tentar mais tarde._');
    }

    await sleep(1500);
    client.sendText(message.from, `Toque no botão abaixo 👇 para ver as *disciplinas cursadas* durante o curso:`,
        {
            useTemplateButtons: true,
            buttons: [
                {
                    id: 'courses-fatec',
                    text: 'Ver Disciplinas Cursadas',
                },
            ],
        });

    await sleep(1500);
    client.sendText(message.from, `*Bacharelado em Ciência da Computação*
2010 - 2012
_Superior Incompleto_

*Instituição:* Universidade Nove de Julho 
*Carga Horária:* 1600 de 3660 horas`);
    await sleep(1500);
    client.sendText(message.from, `Toque no botão abaixo 👇 para ver as *disciplinas cursadas* durante o curso:`,
        {
            useTemplateButtons: true,
            buttons: [
                {
                    id: 'courses-uninove',
                    text: 'Ver Disciplinas Cursadas',
                },
            ],
        });

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

const courses = async (message, client) => {
    if (message.selectedId == 'courses-fatec') {
        client.sendText(message.from, 'Veja abaixo as *disciplinas cursadas* na Fatec São Caetano do Sul:');
        await sleep(2000);
        client.sendText(message.from, `✔ Administração Geral	
✔ Algoritmos e Lógica de Programação	
✔ Arquitetura e Organização de Computadores	
✔ Inglês I	
✔ Laboratório de Hardware	
✔ Matemática Discreta	
✔ Programação em Microinformática	
✔ Cálculo	
✔ Comunicação e Expressão	
✔ Contabilidade	
✔ Engenharia de Software I	
✔ Inglês II	
✔ Linguagem de Programação	
✔ Sistemas de Informação	
✔ Economia e Finanças	
✔ Engenharia de Software II	
✔ Estatística Aplicada	
✔ Estrutura de Dados	
✔ Inglês III	
✔ Interação Humano Computador	
✔ Sistemas Operacionais I	
✔ Sociedade e Tecnologia	
✔ Banco de Dados	
✔ Engenharia de Software III	
✔ Inglês IV	
✔ Metodologia da Pesquisa Científico-Tecnológica	
✔ Programação de Scripts	
✔ Programação Orientada a Objetos	
✔ Sistemas Operacionais II	
✔ Inglês V	
✔ Laboratório de Engenharia de Software	
✔ Programação Linear e Aplicações	
✔ Programação para Mainframe	
✔ Redes de Computadores	
✔ Segurança da Informação	
✔ Sistemas Distribuídos	
✔ Empreendedorismo	
✔ Estágio Curricular Supervisionado (Análise e Desenvolvimento de Sistemas)	
✔ Ética e Responsabilidade Social	
✔ Gestão de Equipes	
✔ Gestão de Projetos	
✔ Gestão e Governança de Tecnologia da Informação	
✔ Inglês VI	
✔ Inteligência Artificial	
✔ Tópicos Especiais em Informática	
✔ Trabalho de Graduação (Análise e Desenvolvimento de Sistemas)`);
        client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇: `,
            {
                useTemplateButtons: true,
                buttons: [
                    { id: 'academy', text: 'Voltar' },
                    { text: 'Voltar ao Menu Principal' },
                    { text: 'Encerrar Conversa' }
                ],
            });
    }

    if (message.selectedId == 'courses-uninove') {
        client.sendText(message.from, 'Veja abaixo as *disciplinas cursadas* na Uninove:');
        await sleep(2000);
        client.sendText(message.from, `✔ Algoritmos e Lógica de Programação
✔ Arquitetura de Computadores
✔ Fundamentos de Sistemas de Informação
✔ Leitura e Produção Textual I
✔ Lógica Computacional
✔ Matemática para Informática
✔ Álgebra Linear e Geometria Analítica para Computação
✔ Introdução Aos Sistemas Operacionais
✔ Leitura e Produção Textual II
✔ Modelagem de Banco de Dados
✔ Prática de Programação (Linguagem C)
✔ Ética Profissional Em Computação
✔ Desenvolvimento em Banco de Dados
✔ Estrutura de Dados
✔ Modelagem de Sistemas
✔ Programação Visual (VB)
✔ Prática em Sistemas Operacionais
✔ Cálculo Diferencial e Integral
✔ Engenharia de Software
✔ Pesquisa e Ordenação
✔ Programação para Banco de Dados (PL/SQL)
✔ Programação para Internet`);
        client.sendText(message.from, `*Tem algo mais que eu possa ajudar?* Toque em um dos botões abaixo 👇: `,
            {
                useTemplateButtons: true,
                buttons: [
                    { id: 'academy', text: 'Voltar' },
                    { text: 'Voltar ao Menu Principal' },
                    { text: 'Encerrar Conversa' }
                ],
            });
    }

    if (message.selectedId == 'academy') {
        academicEducation(message, client);
    }
}