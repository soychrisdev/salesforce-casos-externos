import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/authSlice";
import { DataSlice, createDataSlice } from "./slices/dataSlice";
import { FormSlice, createFormSlice } from "./slices/formSlice";

export const useAppStore = create<AuthSlice & DataSlice & FormSlice>()(
	(...a) => ({
		...createAuthSlice(...a),
		...createDataSlice(...a),
		...createFormSlice(...a),
	}),
);
