import { GoogleSpreadsheet } from "google-spreadsheet";

export const doc = new GoogleSpreadsheet('process.env.GOOGLE_SPREADSHEET_SHEET_ID');

await doc.useServiceAccountAuth({
  client_email: "process.env.GOOGLE_SPREADSHEET_CLIENTE_EMAIL",
  private_key: "process.env.GOOGLE_SPREADSHEET_PRIVATE_KEY",
});

await doc.loadInfo();