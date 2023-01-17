import { Client } from "@googlemaps/google-maps-services-js";
import * as dotenv from 'dotenv'
dotenv.config()

export const getRoute = (destination) => {
    const client = new Client({});

    return client
        .directions({
            params: {
                origin: process.env.GOOGLE_MAPS_ORIGIN,
                destination: destination,
                mode: "transit",
                language: "pt-BR",
                key: process.env.GOOGLE_MAPS_KEY,
            },
        })
}
