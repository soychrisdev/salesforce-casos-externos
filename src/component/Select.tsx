import { useEffect } from "react";
import { useAppStore } from "../store/store";

type SelectProps = {
	id: string;
	required: boolean;
	label: string;
	data: [] | null;
	isLoading: boolean;
	disabled: boolean;
};

export default function Select({
	id,
	label,
	required,
	data,
	disabled,
}: SelectProps) {
	const { ambitoSelected, tematicaSelected, subMotivoSelected, dataSede, tipoDataSelected, setAmbito, setTematica, setSubMotivo, setTipoDataSelected, setDataSede } = useAppStore((state) => state);
	useEffect(() => {
		if (data) {
			const chosenSelect = $(`#${id}`);
			const sede = document.getElementById("select-sede") as HTMLSelectElement;
			const tipo = document.getElementById("select-tipo") as HTMLSelectElement;
			const ambito = document.getElementById(
				"select-ambito",
			) as HTMLSelectElement;

			const tematicaMotivo = document.getElementById(
				"select-tematica",
			) as HTMLSelectElement;
			const subMotivo = document.getElementById(
				"select-submotivo",
			) as HTMLSelectElement;

			setTipoDataSelected(tipo?.value);
			setAmbito(ambito?.value);
			setTematica(tematicaMotivo?.value);
			setSubMotivo(subMotivo?.value);
			//@ts-ignore
			setDataSede(sede?.value);
			chosenSelect.trigger("chosen:updated");

			chosenSelect.chosen({
				disable_search_threshold: 10,
				no_results_text: "Sin Resultados para: ",
				width: "100%",
				placeholder_text_single: "Sin resultados...",
			}).change((e) => {
				if (id === "select-sede") {
					//@ts-ignore
					setDataSede(e.target.value);
				}
				if (id === "select-ambito") {
					//@ts-ignore
					setAmbito(e.target.value);
				}
				if (id === "select-tematica") {
					//@ts-ignore
					setTematica(e.target.value);
				}

				if (id === "select-submotivo") {
					//@ts-ignore
					setSubMotivo(e.target.value);
				}

				if (id === "select-tipo") {
					//@ts-ignore
					setTipoDataSelected(e.target.value);
				}
			});
		}
	}, [data, ambitoSelected, tematicaSelected, subMotivoSelected, dataSede, tipoDataSelected]);

	if (!data) return 'Loading...'

	return (
		<>
			<select
				id={id}
				className="chosen-select"
				required={required}
				disabled={disabled}
			>
				{data?.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>

			<label htmlFor={id} className="active">
				{label}
			</label>
			{required && (
				<div className="invalid-feedback">*Este campo es requerido</div>
			)}
		</>
	);
}
