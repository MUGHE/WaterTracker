// // context/AppContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { fetchDataFromDB, fetchDefaultDataFromDB } from '../util/api';

// export const AppContext = createContext();
// import DeviceInfo from 'react-native-device-info';
// import { v4 as uuidv4 } from 'uuid';


// // const deviceid = async() => {
// //   const deviceId = DeviceInfo.getUniqueId();
// //   return deviceId;

// // }

// export const AppProvider = ({ children }) => {
 

//   useEffect(() => {
//     const id =  () => {
//       return uuidv4();
//     };
//     const loadData = async () => {
//       let data = await fetchDataFromDB(id);
//       if (!data) {
//         data = await fetchDefaultDataFromDB(id);
//       }
//       setState({ data, loading: false });
//     };

//     loadData();
//   }, []);

//   return (
//     <AppContext.Provider value={{ state }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
