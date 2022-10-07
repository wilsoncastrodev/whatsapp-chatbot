export const menu = async (message, client) => {
    const description = `*Menu Principal*
  
  👦🏻 Sobre Mim
  👨🏻‍💻 Perfil Profissional                   
  🏫 Formação Acadêmica                        
  🏢 Experiência Profissional                  
  📚 Habilidades
  💻 Projetos Pessoais
  🛣️ Calcular a Distância
  💬 Perguntas e Respostas
  📄 Visualizar Currículo
  📆 Agendar Entrevista
  📲 Falar Diretamente Comigo
  👋🏻 Encerrar Conversa`;

    client.sendListMessage(message.from, {
        buttonText: 'Opções',
        description: description,
        sections: [
            {
                title: 'Selecione uma opção:',
                rows: [
                    {
                        title: '👦🏻 Sobre Mim',
                    },
                    {
                        title: '👨🏻‍💻 Perfil Profissional',
                    },
                    {
                        title: '🏫 Formação Acadêmica',
                    },
                    {
                        title: '🏢 Experiência Profissional',
                    },
                    {
                        title: '📚 Habilidades',
                    },
                    {
                        title: '💻 Projetos Pessoais',
                    },
                    {
                        title: '🛣️ Calcular a Distância',
                    },
                    {
                        title: '💬 Perguntas e Respostas',
                    },
                    {
                        title: '📄 Visualizar Currículo',
                    },
                    {
                        title: '📆 Agendar Entrevista',
                    },
                    {
                        title: '📲 Falar Diretamente Comigo',
                    },
                    {
                        title: '👋🏻 Encerrar Conversa',
                    },
                ],
            },
        ],
    });
}