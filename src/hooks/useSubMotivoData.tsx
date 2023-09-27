import { useEffect } from "react";
import { useAppStore } from "../store/store";
//@ts-ignore
export const useSubMotivoData = (data, ambitoSelected, tematicaSelected) => {
	const subMotivoSelected = useAppStore((state) => state.subMotivoSelected);
	const subMotivoData = useAppStore((state) => state.subMotivoData);
	const setSubmotivoData = useAppStore((state) => state.setSubMotivoData);
	const tipoDataSelected = useAppStore((state) => state.tipoDataSelected);
	useEffect(() => {
		if (tematicaSelected) {
			const filteredDataByTipo = data?.filter(
				//@ts-ignore
				(item) => item?.nombre === tipoDataSelected,
			);

			const subMotivo = filteredDataByTipo
				?.map(
					//@ts-ignore
					(data) =>
						//@ts-ignore
						data?.ambitos[`${ambitoSelected}`].tematicas[`${tematicaSelected}`]
							?.submotivos,
				)
				//@ts-ignore
				.reduce((result, obj) => {
					if (obj) {
						return Object?.keys(obj);
					}
				}, {});

			setSubmotivoData(subMotivo);
		}
	}, [tematicaSelected]);

	return { subMotivoSelected, subMotivoData };
};
