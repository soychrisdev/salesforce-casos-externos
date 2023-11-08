import { StateCreator } from "zustand";
export interface DataSlice {
	data: [] | null;
	tipoData: [] | null;
	tematicaData: [] | null;
	subMotivoData: [] | null;
	ambitoData: [] | null;
	dataSede: [] | null;
	setDataSede: (value: []) => void;
	setTipoData: (value: []) => void;
	setData: (value: []) => void;
	setTematicaData: (value: []) => void;
	setSubMotivoData: (value: []) => void;
	setAmbitoData: (value: []) => void;
}
export const createDataSlice: StateCreator<DataSlice> = (set) => ({
	data: null, // Initial state
	tipoData: null, //
	tematicaData: null,
	subMotivoData: null,
	ambitoData: null,
	dataSede: null,
	setDataSede: (value) => set({ dataSede: value }),
	setTipoData: (value) => set({ tipoData: value }),
	setData: (value) => set({ data: value }),
	setTematicaData: (value) => set({ tematicaData: value }),
	setSubMotivoData: (value) => set({ subMotivoData: value }),
	setAmbitoData: (value) => set({ ambitoData: value }),
});
