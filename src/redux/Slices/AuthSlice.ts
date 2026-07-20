import { IUser } from '@/types/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
    user: IUser | null,
    isAuthenticated: boolean,
    isLoading: boolean
}

const initialState: IInitialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false
        },
    }
});


export const { setLoading, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
