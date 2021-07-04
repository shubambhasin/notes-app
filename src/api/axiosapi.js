import axios from 'axios';

export const instance = axios.create({
  baseURL: "https://notes-app-db.shubambhasin.repl.co",
});
