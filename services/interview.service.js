import { sheet } from '../libs/google-spreadsheet.lib.js';

const createInterviewCall = async (message, interviewCall) => {
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);

    rows[rowIndex]["Nome do Entrevistador"] = interviewCall.nomeEntrevistador;
    rows[rowIndex]["Tipo da Entrevista"] = interviewCall.tipoEntrevista;
    rows[rowIndex]["Data da Entrevista"] = interviewCall.dataEntrevista;
    rows[rowIndex]["Horário da Entrevista"] = interviewCall.horarioEntrevista;
    rows[rowIndex]["Período da Entrevista"] = interviewCall.periodoEntrevista;

    await rows[rowIndex].save();
}

const createInterviewPresential = async (message, interviewPresential) => {
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);

    rows[rowIndex]["Nome do Entrevistador"] = interviewPresential.nomeEntrevistador;
    rows[rowIndex]["Tipo da Entrevista"] = interviewPresential.tipoEntrevista;
    rows[rowIndex]["Data da Entrevista"] = interviewPresential.dataEntrevista;
    rows[rowIndex]["Horário da Entrevista"] = interviewPresential.horarioEntrevista;
    rows[rowIndex]["Período da Entrevista"] = interviewPresential.periodoEntrevista;
    rows[rowIndex]["Endereço da Entrevista"] = interviewPresential.enderecoEntrevista;
    rows[rowIndex]["Informação da Entrevista"] = interviewPresential.infoEntrevista;

    await rows[rowIndex].save();
}

const createInterviewVideo = async (message, interviewVideo) => {
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);

    rows[rowIndex]["Nome do Entrevistador"] = interviewVideo.nomeEntrevistador;
    rows[rowIndex]["Tipo da Entrevista"] = interviewVideo.tipoEntrevista;
    rows[rowIndex]["Data da Entrevista"] = interviewVideo.dataEntrevista;
    rows[rowIndex]["Horário da Entrevista"] = interviewVideo.horarioEntrevista;
    rows[rowIndex]["Período da Entrevista"] = interviewVideo.periodoEntrevista;
    rows[rowIndex]["Plataforma da Entrevista"] = interviewVideo.plataformaEntrevista;
    rows[rowIndex]["Link da Entrevista"] = interviewVideo.linkEntrevista;
    rows[rowIndex]["Informação da Entrevista"] = interviewVideo.infoEntrevista;

    await rows[rowIndex].save();
}

export default {
    createInterviewCall,
    createInterviewPresential,
    createInterviewVideo
}
