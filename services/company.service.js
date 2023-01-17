import { sheet } from '../libs/googleSpreadsheet.lib.js';
import { getRoute } from "../libs/googleMaps.lib.js";
import cepPromise from 'cep-promise';

const getAddressCompany = async (cep) => {
    try {
        return await cepPromise(cep);
    } catch (e) {
        return false;
    }
}

const calculateDistanceCompany = async (address) => {
    let result = await getRoute(address);

    let legs = result.data.routes[0].legs[0],
        route = {},
        countBus = 0,
        countSubway = 0;

    route.distance = legs.distance.text;
    route.duration = legs.duration.text;

    route.line = legs.steps.map((step) => step.transit_details ? {
        name: step.transit_details.line.name,
        type: step.transit_details.line.vehicle.type
    } : undefined).filter(step => step);

    route.line.forEach((line) => {
        if (line.type === 'BUS') {
            countBus += 1;
        }

        if (line.type === 'SUBWAY') {
            countSubway += 1;
        }
    });

    countBus = countBus ? countBus + " ônibus" : "";
    countSubway = countSubway ? " + metrô" : "";

    route.info = `*Informações Sobre a Viagem:*

*Distância*: A *distância* da minha casa até a empresa é de *${route.distance}*.
*Tempo*: O *tempo de viagem* da minha casa até a empresa utilizando o transporte público é de *${route.duration}*.
`
    if (countBus) {
        route.info += `
*Para chegar até a empresa será necessário pegar ${countBus}${countSubway}*.`;
    }

    return route;
}

const createCompany = async (message, address, route) => {
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.ID === message.from);

    rows[rowIndex]["Endereço da Empresa"] = address;
    rows[rowIndex]["Distância"] = route.distance;
    rows[rowIndex]["Tempo"] = route.duration;
    await rows[rowIndex].save();
}

export default {
    getAddressCompany,
    calculateDistanceCompany,
    createCompany,
}
