import axios from 'axios';
console.log(process.env.AUTH_TOKEN);

export const axiosHandler = axios.create({
  baseURL: 'https://company.clearbit.com/v2/companies',
});
