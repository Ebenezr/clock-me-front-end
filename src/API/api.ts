import axios from 'axios';

//fetch data
export const axiosRequest =
    axios.create({
        baseURL: 'http://localhost:8004/'
    });

