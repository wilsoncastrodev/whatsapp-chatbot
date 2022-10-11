import { formCalculateDistance } from './forms/formCalculateDistance.js';

export const calculateDistance = async (message, client) => {
    await formCalculateDistance(message, client);
}