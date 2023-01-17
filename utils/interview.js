import { sheet } from '../libs/googleSpreadsheet.lib.js';
import moment from 'moment';
import pkg from 'rrule';
const { RRule } = pkg;
moment.locale('pt-br');

export const getCallVideoDates = async () => {
    const rows = await sheet.getRows();

    const datesRemove = rows.map((row) => row['Data da Entrevista'])
        .filter((e, i, a) => a.indexOf(e) !== i);

    const dates = {};

    const now = moment().add(3, 'day')

    const day = now.format('D'),
          month = now.format('M') - 1,
          year = now.format('YYYY');

    const rule = new RRule({
        freq: RRule.WEEKLY,
        dtstart: new Date(Date.UTC(year, month, day, 19, 12, 0)),
        count: 14,
        interval: 1,
        byweekday: [RRule.TU, RRule.TH],
    });

    dates.all = rule.all().map((date) => moment(date).format('L'))
        .filter(date => !datesRemove.includes(date));

    dates.list = dates.all.map((date) => {
        let dateFormat = {};

        dateFormat.title = moment(date, 'DD/MM/YYYY').format('LLLL')
            .replace(" às 00:00", "")
            .replace("-feira", "")
            .replace(/\b[a-z]/g, match => match.toUpperCase())
            .replace("çA", "ça")
            .replace(/De/g, "de");

        return dateFormat;
    });

    return dates;
}

export const getPresentialDates = async () => {
    const rows = await sheet.getRows();

    const datesRemove = rows.map((row) => row['Data da Entrevista']);

    const dates = {};

    const now = moment().add(3, 'day')

    const day = now.format('D'),
          month = now.format('M') - 1,
          year = now.format('YYYY');

    const rule = new RRule({
      freq: RRule.WEEKLY,
      dtstart: new Date(Date.UTC(year, month, day, 19, 12, 0)),
      count: 21,
      interval: 1,
      byweekday: [RRule.MO, RRule.WE, RRule.FR]
    });

    dates.all = rule.all().map((date) => moment(date).format('L'))
        .filter(date => !datesRemove.includes(date));

    dates.list = dates.all.map((date) => {
        let dateFormat = {};

        dateFormat.title = moment(date, 'DD/MM/YYYY').format('LLLL')
            .replace(" às 00:00", "")
            .replace("-feira", "")
            .replace(/\b[a-z]/g, match => match.toUpperCase())
            .replace("çA", "ça")
            .replace(/De/g, "de");

        return dateFormat;
    });

    return dates;
}

export const getTimes = async (date) => {
    const rows = await sheet.getRows();

    const periodsInterview = rows.filter((row) => row['Data da Entrevista'] === date)
        .map(row => row['Período da Entrevista']);

    const times = {};

    times.all = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

    periodsInterview.forEach((period) => {
        if (period === 'Manhã') {
            times.all.splice(0, 3);
        }

        if (period === 'Tarde') {
            times.all.splice(3, 3);
        }
    });

    times.list = times.all.map((time) => {
        let timeFormat = {};
        timeFormat.title = "Às " + time;
        return timeFormat;
    });

    return times;
}

export const getPeriod = (time) => {
    if (time === '09:00' || time === '10:00' || time === '11:00')
        return "Manhã";
    else
        return "Tarde";
}

export const formatDateInterview = (date) => {
    return moment(date, 'DD/MM/YYYY').format("DD [de] MMMM");
}

export const formatTimeInterview = (time) => {
    return time.replace(":00", "");
}
