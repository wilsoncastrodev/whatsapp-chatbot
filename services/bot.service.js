import { sheet } from '../libs/googleSpreadsheet.lib.js';

const activateDirectContact = async (message) => {
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);
    rows[rowIndex]["Contato Direto"] = "Ativado";
    await rows[rowIndex].save();
}

const disableDirectContact = async (message) => {
	const rows = await sheet.getRows();
	const rowIndex = rows.findIndex(row => row.ID === message.from);
	return rowIndex >= 0 ? rows[rowIndex]['Contato Direto'] : false;
}

export default {
    activateDirectContact,
    disableDirectContact
}
