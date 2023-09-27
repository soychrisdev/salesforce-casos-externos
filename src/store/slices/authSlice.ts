import { StateCreator } from "zustand";

export interface AuthSlice {
	auth: string | undefined;
	userInfo: {} | undefined;
	setAuth: (value: string) => void;
	setUserInfo: (value: {} | undefined) => void;
}
export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
	auth: undefined,
	userInfo: {},
	setUserInfo: (value) => set({ userInfo: value }),
	setAuth: (value) => set({ auth: value }),
});
