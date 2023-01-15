import { sheet } from '../libs/google-spreadsheet.lib.js';
import { transporter } from '../libs/nodemailer.lib.js';

const createRecruiter = async (message) => {
    await sheet.addRow({ "ID": message.from });
}

const verifyRecruiter = async (message) => {
    const rows = await sheet.getRows();
    return rows.some(row => row.ID === message.from);
}

const updateRecruiter = async (message, recruiter) => {
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);

    rows[rowIndex]["Nome"] = recruiter.nome;
    rows[rowIndex]["Email"] = recruiter.email;
    rows[rowIndex]["Nome da Empresa da Vaga"] = recruiter.nomeEmpresaVaga;
    rows[rowIndex]["Nome da Empresa do Recrutador"] = recruiter.nomeEmpresaRepresenta;
    rows[rowIndex]["Cargo"] = recruiter.cargo;
    rows[rowIndex]["Descrição da Vaga"] = recruiter.descricao;
    rows[rowIndex]["Regime de Trabalho"] = recruiter.regimeTrabalho;
    rows[rowIndex]["Forma de Contratação"] = recruiter.formaContratacao;
    rows[rowIndex]["Salário"] = recruiter.salario;
    rows[rowIndex]["Site"] = recruiter.siteCV;
    rows[rowIndex]["Código de Verificação"] = recruiter.codigoVerificacao;

    await rows[rowIndex].save();
    
    const mailOptions = {
        from: 'Wilson Castro da Paixão <contato@wilsoncastro.dev>',
        to: recruiter.email,
        subject: 'Código de Verificação do Assistente Virtual do Whatsapp (Wilson Castro)',
        html: 'Olá ' + recruiter.nome + '!' +
                '<br><br>Por favor, utilize o código <mark style="background: #f5f5f5;padding: 7px;border-radius: 8px;font-weight: bolder;letter-spacing: 1.1px;">' + recruiter.codigoVerificacao + 
                '</mark> no assistente virtual do Whatsapp para concluir a verificação de identidade.' +
                '<br><br>Atenciosamente,<br><strong>Wilson Castro</strong>.'
    };

    transporter.sendMail(mailOptions);
}

export default {
    createRecruiter,
    verifyRecruiter,
    updateRecruiter
}