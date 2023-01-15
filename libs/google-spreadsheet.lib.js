import { GoogleSpreadsheet } from "google-spreadsheet";
import * as dotenv from 'dotenv'
dotenv.config()

export const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_SHEET_ID);

await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SPREADSHEET_CLIENTE_EMAIL,
  private_key: process.env.GOOGLE_SPREADSHEET_PRIVATE_KEY,
});

await doc.loadInfo();

export const sheet = doc.sheetsByIndex[0];