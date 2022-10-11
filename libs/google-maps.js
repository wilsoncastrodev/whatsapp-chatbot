import { Client } from "@googlemaps/google-maps-services-js";

export const getRoute = (destination) => {
    const client = new Client({});

    return client
        .directions({
            params: {
                origin: 'Rua Giuseppe de Luca',
                destination: destination,
                mode: "transit",
                language: "pt-BR",
                key: 'process.env.GOOGLE_MAPS_KEY',
            },
        })
}

