import { useEffect } from "react";
import { useAppStore } from "../store/store";
//@ts-ignore
export const useTematicaData = (data, ambitoSelected, tipoDataStored) => {
	const tematicaSelected = useAppStore((state) => state.tematicaSelected);
	const setTematicaData = useAppStore((state) => state.setTematicaData);
	const tematicaData = useAppStore((state) => state.tematicaData);
	const setSubmotivoData = useAppStore((state) => state.setSubMotivoData);
	const tipoDataSelected = useAppStore((state) => state.tipoDataSelected);
	useEffect(() => {
		if (ambitoSelected) {
			const filteredDataByTipo = data?.filter(
				//@ts-ignore
				(item) => item?.nombre === tipoDataSelected,
			);

			const tematicaMotivo = filteredDataByTipo
				//@ts-ignore
				?.map((data) => data?.ambitos[`${ambitoSelected}`]?.tematicas)
				//@ts-ignore
				?.reduce((result, obj) => {
					return Object?.keys(obj);
				}, {});
			setTematicaData(tematicaMotivo);
			setSubmotivoData([]);
		}
	}, [ambitoSelected]);

	return { tematicaSelected, tematicaData };
};
