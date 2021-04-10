import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { USER, AUTH_STATE, CRED, LOGIN_USER } from "../types";

const initialState: AUTH_STATE = {
  isLoginView: true,
  loginUser: {
    id: 0,
    name: "",
    token: "",
    percent: 0,
    AnsweredIds: JSON,
    point: 0,
  },
};

export const fetchAsyncLogin = createAsyncThunk(
  "auth/login", //action名
  async (auth: CRED) => {
    const res = await axios.post<USER>(
      `${process.env.REACT_APP_API_URL}/api/login`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data; //extra reducersの payloadに渡される
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: CRED) => {
    const res = await axios.post<LOGIN_USER>(
      `${process.env.REACT_APP_API_URL}/api/register`,
      auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);
    return res.data;
  }
);

// export const fetchAsyncGetMyProf = createAsyncThunk(
//   "auth/loginuser",
//   async () => {
//     const res = await axios.get<LOGIN_USER>(
//       `${process.env.REACT_APP_API_URL}/api/loginuser/`,
//       {
//         headers: {
//           Authorization: `JWT ${localStorage.localJWT}`,
//         },
//       }
//     );
//     return res.data;
//   }
// );

// export const fetchAsyncCreateProf = createAsyncThunk(
//   "auth/createProfile",
//   async () => {
//     const res = await axios.post<PROFILE>(
//       `${process.env.REACT_APP_API_URL}/api/profile/`,
//       { img: null },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${localStorage.localJWT}`,
//         },
//       }
//     );
//     return res.data;
//   }
// );

// export const fetchAsyncGetProfs = createAsyncThunk(
//   "auth/getProfiles",
//   async () => {
//     const res = await axios.get<PROFILE[]>(
//       `${process.env.REACT_APP_API_URL}/api/profile/`,
//       {
//         headers: {
//           Authorization: `JWT ${localStorage.localJWT}`,
//         },
//       }
//     );
//     return res.data;
//   }
// );

// export const fetchAsyncUpdateProf = createAsyncThunk(
//   "auth/updateProfile",
//   async (profile: POST_PROFILE) => {
//     const uploadData = new FormData();
//     profile.img && uploadData.append("img", profile.img, profile.img.name);
//     const res = await axios.put<PROFILE>(
//       `${process.env.REACT_APP_API_URL}/api/profile/${profile.id}/`,
//       uploadData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `JWT ${localStorage.localJWT}`,
//         },
//       }
//     );
//     return res.data;
//   }
// );

//pending fulfilled rejected

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     toggleMode(state) {
//       state.isLoginView = !state.isLoginView;
//     },
//   },

//     builder.addCase(
//       fetchAsyncGetMyProf.fulfilled,
//       //pending
//       //rejected
//       (state, action: PayloadAction<LOGIN_USER>) => {
//         return {
//           ...state,
//           loginUser: action.payload,
//         };
//       }
//     );
//     builder.addCase(
//       fetchAsyncGetProfs.fulfilled,
//       (state, action: PayloadAction<PROFILE[]>) => {
//         return {
//           ...state,
//           profiles: action.payload,
//         };
//       }
//     );
//     builder.addCase(
//       fetchAsyncUpdateProf.fulfilled,
//       (state, action: PayloadAction<PROFILE>) => {
//         return {
//           ...state,
//           profiles: state.profiles.map((prof) =>
//             prof.id === action.payload.id ? action.payload : prof
//           ),
//         };
//       }
//     );
//   },
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAsyncLogin.fulfilled,
      (state, action: PayloadAction<any>) => {
        localStorage.setItem("token", action.payload.token);
        action.payload.token && (window.location.href = "/tasks");
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
    builder.addCase(
      fetchAsyncRegister.fulfilled,
      (state, action: PayloadAction<any>) => {
        localStorage.setItem("token", action.payload.token);
        action.payload.token && (window.location.href = "/tasks");
        return {
          ...state,
          loginUser: action.payload,
        };
      }
    );
    builder.addCase(
      fetchAsyncRegister.rejected,
      (state, action: PayloadAction<any>) => {
        action.payload.token && (window.location.href = "/");
        return {
          ...state,
        };
      }
    );
  },
});
export const { toggleMode } = authSlice.actions; //通常のreducerだけ

export const selectIsLoginView = (state: RootState) => state.auth.isLoginView;
export const selectLoginUser = (state: RootState) => state.auth.loginUser;
// export const selectProfiles = (state: RootState) => state.auth.profiles;

//stpre.tsを参照している

export default authSlice.reducer;
