import { doc } from '../../libs/google-spreadsheet.js';

export const menu = async (message, client) => {
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);
    const interview = rows[rowIndex]['Nome do Entrevistador'];

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
  ${!interview ? '📆 Agendar Entrevista' : '❌ Cancelar Entrevista'}
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
                        title: !interview ? '📆 Agendar Entrevista' : '❌ Cancelar Entrevista',
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