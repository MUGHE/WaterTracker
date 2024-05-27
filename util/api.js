// import axios from 'axios';
// import { response } from 'express';
// const BASE_URL = 'http://localhost:3000';

// export const fetchDataFromDB = async (id) => {
//   try {
//     console.log("tryong to hit api")
//     const response = await axios.get(`${BASE_URL}/goal`, { params: { id } });
//     console.log(response);
//     if (response.status === 200 && response.data.length > 0) {
//       return response.data;
//     }
//     else if(
//         response.status === 200 && response.data.length === 0) {
//             const response = await axios.post(`${BASE_URL}/goal`, { data: { id : 1} });
//             fetchDataFromDB(id);
//         }
//     return null;
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//     return null;
//   }
// };

// export const fetchDefaultDataFromDB = async (id) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/default-data`, { params: { id } });
//     if (response.status === 200) {
//       return response.data;
//     }
//     return [];
//   } catch (error) {
//     console.error('Failed to fetch default data:', error);
//     return [];
//   }
// };
