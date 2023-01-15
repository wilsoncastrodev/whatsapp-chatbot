import welcome from '../components/sections/welcome.component.js';

const contexts = (client) => {
    client.onMessage(async (message) => {
        await welcome(message, client);
    })
};

export default contexts;