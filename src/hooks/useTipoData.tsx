import { useEffect } from "react";
import { useAppStore } from "../store/store";
//@ts-ignore
export const useTipoData = (data) => {
	const setTipoData = useAppStore((state) => state.setTipoData);
	const tipoDataStored = useAppStore((state) => state.tipoData);
	useEffect(() => {
		if (data) {
			const tipoData = data
				//@ts-ignore
				?.map((data) => data.nombre);
			//@ts-ignore
			// ?.reduce((result, obj) => {
			// 	return Object.keys(obj);
			// }, {});
			// console.log(tipoData);
			setTipoData(tipoData);
		}
	}, [data]);

	return { tipoDataStored };
};
