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

export default function SelectSede({
	id,
	label,
	required,
	data,
	disabled,
}: SelectProps) {
	const { setDataSede } = useAppStore((state) => state);
	useEffect(() => {
		if (data) {
			const chosenSelect = $(`#${id}`);
			const sede = document.getElementById("select-sede") as HTMLSelectElement;
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

			});
		}
	}, [data, setDataSede]);

	if (!data) return 'Loading...'


	return (
		<>
			<select
				id={id}
				className="chosen-select"
				required={required}
				disabled={disabled}
			>

				{/*  ID, NAME, SIGACODE, STATUS, ACTIVO_PILOTO */}
				{data?.map(({ ID, NAME }) => (
					<option key={ID} value={ID}>
						{NAME}
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
