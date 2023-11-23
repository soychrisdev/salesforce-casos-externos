import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDataCasos } from "../hooks/query/useDataCasos";
import { usefetchSedes } from "../hooks/query/useSede";
import { useFormData } from "../hooks/query/useSendForm";
import { useAmbitoData } from "../hooks/useAmbitoData";
import { useSubMotivoData } from "../hooks/useSubMotivoData";
import { useTematicaData } from "../hooks/useTematicaData";
import { useTipoData } from "../hooks/useTipoData";
import { useAppStore } from "../store/store";
import LoadingOverlayComponent from "./LoadingOverlay";
import Select from "./Select";
import SelectSede from "./SelectSede";




//@ts-ignore
const FormSectionComponent = (props) => {

	const navigate = useNavigate();
	const { caseDescription, setCaseDescription: setCaseDescrip, dataSede } = useAppStore((state) => state)
	//@ts-ignore
	const { data: dataTipoCasos, isLoading } = useDataCasos(
		//@ts-ignore
		props?.auth?.access_token,
		//@ts-ignore
		props?.auth?.instance_url,
	);
	const { data: dataSedes, isLoading: isLoadingDataSedes } = usefetchSedes();

	const { tipoDataStored } = useTipoData(dataTipoCasos);

	const {
		ambitoSelected,
		ambitoData,
		tipoDataSelected,
		filteredDataByTipoValue,
	} = useAmbitoData(dataTipoCasos);


	const { tematicaData, tematicaSelected } = useTematicaData(
		dataTipoCasos,
		ambitoSelected,
		tipoDataStored,
	);
	const { subMotivoData, subMotivoSelected } = useSubMotivoData(
		dataTipoCasos,
		ambitoSelected,
		tematicaSelected,
	);

	const { postForm, status } = useFormData();
	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		//@ts-ignore
		const getLabelValue = filteredDataByTipoValue?.map(
			//@ts-ignore
			(data) =>
				data?.ambitos[`${ambitoSelected}`]?.tematicas[`${tematicaSelected}`]
					?.submotivos[`${subMotivoSelected}`]?.label,
		);

		const caseDescriptionInput = caseDescription?.trim();
		if (!caseDescriptionInput) {
			//@ts-ignore
			toastr.error(
				"La descripción del caso no puede estar en blanco y debe tener 5 caracteres como mínimo.",
			);
			return;
		}


		if (caseDescriptionInput.length < 5) {
			//@ts-ignore
			toastr.error(
				"La descripción del caso no puede estar en blanco y debe tener 5 caracteres como mínimo.",
			);
			return;
		}

		// Validar que los campos seleccionados no sean nulos
		if (!ambitoSelected || !tematicaSelected || !tipoDataSelected || !dataSede) {
			//@ts-ignore
			toastr.error("Debe seleccionar todos los campos obligatorios");
			return;
		}

		// Obtener los valores de las submotivos y hacer una comprobación de nulos

		const sendValues = {
			label: getLabelValue,
			description: caseDescriptionInput,
			token: props?.auth?.access_token,
			email: props?.email,
			url: props?.auth?.instance_url,
			rut: props?.rut,
			phoneNumber: props?.phoneNumber,
			tipoPostulante: tipoDataSelected,
			nombre: props?.nombre,
			apellido: props?.apellido,
			sede: dataSede
		};

		const resp = await postForm(sendValues);
	};

	useEffect(() => {
		if (status === "success") {
			//@ts-ignore
			toastr.success("Caso creado con éxito.");
			setTimeout(() => {
				//reload webpage
				navigate(0);
			}, 1000);
		}

	}, [status])

	const limit = 250; // Set your character limit here
	const charCount = caseDescription?.length;

	//@ts-ignore
	if (isLoading && dataTipoCasos?.length < 0) return "Loading..."

	if (!dataTipoCasos && !ambitoSelected && !tematicaSelected) return "Loading..."

	return (
		<div className="card">
			<form id="1" className="needs-validation mt-3" noValidate>
				{status === "loading" && <LoadingOverlayComponent />}
				<div className="row">

					<div className="col-12 col-md-4 mb-3">
						<div className="md-form">
							{tipoDataStored && <Select
								id="select-tipo"
								label="Tipo (*)"
								data={tipoDataStored}
								isLoading={isLoading}
								required={true}
								disabled={false} />}

						</div>
					</div>
					<div className="col-12 col-md-4 mb-3">
						<div className="md-form">
							{ambitoData && <Select
								id="select-ambito"
								label="&Aacute;mbito (*)"
								data={ambitoData}
								isLoading={isLoading}
								required={true}
								disabled={false} />}
						</div>
					</div>
					<div className="col-12 col-md-4 mb-3">
						<div className="md-form">
							{tematicaData && <Select
								id="select-tematica"
								label="Tem&aacute;tica motivo (*)"
								data={tematicaData}
								isLoading={isLoading}
								required={true}
								disabled={
									//@ts-ignore
									tematicaData === null
										? true
										: false}
							/>}
						</div>
					</div>

					<div className="col-12 col-md-4 mb-3">
						<div className="md-form">
							{subMotivoData && <Select
								id="select-submotivo"
								label="Submotivo (*)"
								data={subMotivoData}
								isLoading={isLoading}
								required={true}
								disabled={subMotivoData?.length <= 1 && true} />
							}
						</div>
					</div>

					<div className="col-12 col-md-4 mb-3">
						<div className="md-form">
							{isLoadingDataSedes ? 'loading' : <SelectSede
								id="select-sede"
								label="Sede (*)"
								//@ts-ignore
								data={dataSedes}
								isLoading={isLoadingDataSedes}
								required={true}
								disabled={false} />}
						</div>
					</div>

					<div className="col-md-12 mb-4 mt-3 mb-2">
						<div className="md-form" id="textarea2">
							<textarea
								id="campo_mensaje2"
								name="campo_mensaje"
								rows={4}
								className={`form-control md-textarea ${charCount ? (charCount > limit ? "count-error" : "") : ""} w-full`}
								placeholder="Ingrese descripción"
								maxLength={limit}
								value={caseDescription ? caseDescription : ""}
								onChange={(e) => setCaseDescrip(e.target.value)}
								required />
							<label
								className="count active"
								style={{
									transform: "none",
									right: 0,
									left: "auto",
									top: -20,
									color: "#999",
								}}
							>
								{charCount}/{limit}
							</label>
							<label htmlFor="campo_mensaje2" className="active">
								Descripción del caso (*)
							</label>
							{charCount ? (
								charCount > limit && (
									<div className="invalid-feedback">
										El campo excede el límite de caracteres
									</div>
								)
							) : (
								<div className="invalid-feedback">
									El campo excede el límite de caracteres
								</div>
							)}
						</div>
					</div>
				</div><div className="row mt-2">
					<div className="col-12 mb-4 d-flex align-items-center justify-content-end">
						<button
							id="btnFormulario"
							type="button"
							className="btn btn-default ml-0"
							// rome-ignore lint/suspicious/noExplicitAny: <explanation>
							onClick={(e: any) => handleSubmit(e)}
							disabled={status === "loading"}
						>
							{status === "loading" ? 'Registrando...' : 'Registrar'}
						</button>
					</div>
				</div>

			</form>
		</div>
	);
};

export default FormSectionComponent;
