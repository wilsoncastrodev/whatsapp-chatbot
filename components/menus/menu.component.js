import InterviewService from "../../services/interview.service.js";

export const menu = async (message, client) => {
    const interviewer = await InterviewService.getInterviewerName(message);

    const description = `*Menu Principal*

  👦🏻 Sobre Mim
  👨🏻‍💻 Perfil Profissional
  🏫 Formação Acadêmica
  🏢 Experiência Profissional
  📚 Habilidades
  💻 Projetos Pessoais
  💬 Perguntas e Respostas
  📄 Visualizar Currículo
  🛣️ Calcular a Distância
  ${!interviewer ? '📆 Agendar Entrevista' : '❌ Cancelar Entrevista'}
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
                        title: '💬 Perguntas e Respostas',
                    },
                    {
                        title: '📄 Visualizar Currículo',
                    },
                    {
                        title: '🛣️ Calcular a Distância',
                    },
                    {
                        title: !interviewer ? '📆 Agendar Entrevista' : '❌ Cancelar Entrevista',
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
