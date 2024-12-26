// // src/features/counter/counterSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { useState, useEffect } from "react";

// const initialState = {
//   profile: {},
// };

// const [user, setUser] = useState({});

// useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           "https://take-home-test-api.nutech-integrasi.com/profile",
//           {
//             headers: {
//               Authorization: `Bearer ${isToken}`,
//             },
//           }
//         );
//         setUser(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchUser();
//   }, []);

// const ProfileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {

//     setProfile: (state) => {
//       state.profile = user;
//     },

//   },
// });

// export const { setIsLogin } = ProfileSlice.actions;

// export default ProfileSlice.reducer;
