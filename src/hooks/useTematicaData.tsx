import { useMemo } from "react";
import { useAppStore } from "../store/store";
//@ts-ignore
export const useTematicaData = (data, ambitoSelected, tipoDataStored) => {
	const { tematicaSelected, setTematicaData, tematicaData, setSubMotivoData, tipoDataSelected } = useAppStore((state) => state);

	useMemo(() => {
		if (ambitoSelected) {
			const filteredDataByTipo = data?.filter(
				//@ts-ignore
				(item) => item?.nombre === tipoDataSelected,
			);

			if (filteredDataByTipo) {
				const tematicaMotivo = filteredDataByTipo
					//@ts-ignore
					?.map((data) => data?.ambitos[`${ambitoSelected}`]?.tematicas)
					//@ts-ignore
					?.reduce((result, obj) => {
						return obj ? [...result, ...Object.keys(obj)] : result;
					}, []);
				setTematicaData(tematicaMotivo);
				setSubMotivoData([]);
			}
		}
	}, [ambitoSelected]);

	return { tematicaSelected, tematicaData };
};
