import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  accessToken?: string;
  username?: string;
  firstName: string;
}

const initialState: IUserState = {
  accessToken: '',
  username: '',
  firstName: 'Guest',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData(state: IUserState, action: PayloadAction<{ accessToken: string; firstName: string }>) {
      const { accessToken, firstName } = action.payload;
      state.accessToken = accessToken;
      state.firstName = firstName;
    },

    setAccessToken(state: IUserState, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },

    logOut(state: IUserState) {
      state.accessToken = '';
    },
  },
});

export const { logOut, setAccessToken, setAuthData } = userSlice.actions;
export default userSlice.reducer;
