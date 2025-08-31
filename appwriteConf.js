import { Client, Databases, ID, Storage, TablesDB } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://syd.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const database = new TablesDB(client)
const storage = new Storage(client);

export { database, storage };