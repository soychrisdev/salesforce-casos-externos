import { useEffect } from "react";
import { useAppStore } from "../store/store";
//@ts-ignore
export const useAmbitoData = (data) => {
	const setAmbitoData = useAppStore((state) => state.setAmbitoData);
	const ambitoSelected = useAppStore((state) => state.ambitoSelected);
	const ambitoData = useAppStore((state) => state.ambitoData);
	const tipoDataSelected = useAppStore((state) => state.tipoDataSelected);
	const filteredDataByTipoValue = useAppStore(
		(state) => state.filteredDataByTipoValue,
	);
	const setFilteredDataByTipoValue = useAppStore(
		(state) => state.setFilteredDataByTipoValue,
	);
	useEffect(() => {
		if (data) {
			const filteredDataByTipo = data?.filter(
				//@ts-ignore
				(item) => item?.nombre === tipoDataSelected,
			);
			setFilteredDataByTipoValue(filteredDataByTipo);

			if (filteredDataByTipo) {
				const filtered = filteredDataByTipo
					//@ts-ignore
					?.map((data) => data.ambitos)
					//@ts-ignore
					?.reduce((result, obj) => {
						return Object.keys(obj);
					}, {});
				setAmbitoData(filtered);
			}
		}
	}, [tipoDataSelected]);

	return {
		ambitoSelected,
		tipoDataSelected,
		filteredDataByTipoValue,
		ambitoData: ambitoData as [],
	};
};
