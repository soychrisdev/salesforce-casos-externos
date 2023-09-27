import { useEffect, useState } from "react";
import isEmail from "validator/es/lib/isEmail";
import FooterComponent from "./component/Footer";
import FormSectionComponent from "./component/FormSectionComponent";
import HeaderComponent from "./component/Header";
import LoadingOverlayComponent from "./component/LoadingOverlay";
import DataTableComponent from "./component/TablaResultados";
import { useAuth } from "./hooks/query/useAuth";
import { useAppStore } from "./store/store";
import { formatRut, validateRut } from "./utils/RutValidator";
function App() {
	const [isValid, setIsValid] = useState(false);
	const { data: token, isLoading } = useAuth(isValid);
	const setToken = useAppStore((state) => state.setAuth);
	const [rut, setRut] = useState("");
	const [email, setEmail] = useState("");
	//@ts-ignore
	const handleValidateRut = (rut) => {
		const isValid = validateRut(rut);
		return isValid;
	};

	const handleSubmit = () => {
		const rutIsValid = validateRut(rut);
		const emailIsValid = isEmail(email);
		//@ts-ignore
		emailIsValid || toastr.error("Email invalido.");
		//@ts-ignore
		rutIsValid || toastr.error("Rut invalido.");

		rutIsValid && emailIsValid ? setIsValid(true) : setIsValid(false);
		//@ts-ignore
		if (rutIsValid && emailIsValid === true) toastr.success("Datos validados!");
	};

	useEffect(() => {
		setRut(formatRut(rut, false));
	}, [rut]);

	useEffect(() => {
		//@ts-ignore
		if (token) {
			//@ts-ignore
			setToken(token?.access_token);
		}
	}, [token]);

	return (
		<>
			<div id="appBody" className="d-flex flex-column">
				<div className="page-content">
					<div className="navbar-overlay" />
					{/* Header */}
					<HeaderComponent
						title="Titulo"
						accessibility={undefined}
						headerFn={undefined}
						rut={isValid ? rut : "Desconocido"}
					/>
					{/* Main Content */}
					<main id="main" className="container">
						<section>
							{isValid || (
								<div className="card" id="rut">
									<div className="card-header">
										<h4 className="float-left heading h4-responsive mb-0">
											Ingreso de datos
										</h4>
									</div>
									<div className="row">
										<div className="col-md-4 mb-2 mt-3">
											<div className="md-form my-3">
												<input
													type="text"
													name="campo_rut"
													id="campo_rut"
													className="form-control mb-0"
													placeholder="Ingrese RUT sin puntos, ni gui&oacute;n"
													onChange={(e) => setRut(e.target.value)}
													value={
														rut === "-" ? undefined : formatRut(rut, false)
													}
												/>

												<label htmlFor="campo_rut" className="active">
													RUT (*Ingrese RUT sin puntos, ni gui&oacute;n)
												</label>
											</div>
										</div>
										<div className="col-md-4 mb-2 mt-3">
											<div className="md-form my-3">
												<input
													type="text"
													name="campo_email"
													id="campo_email"
													className="form-control mb-0"
													placeholder="Ingrese su correo"
													onChange={(e) => setEmail(e.target.value)}
													value={email}
												/>

												<label htmlFor="campo_email" className="active">
													Email (*ejemplo@mail.com)
												</label>
											</div>
										</div>
									</div>
									<div className="row mt-2">
										<div className="col-12 mb-4 d-flex align-items-center justify-content-end">
											<button
												id="btnFormulario"
												type="button"
												className="btn btn-default ml-0"
												onClick={() => handleSubmit()}
											>
												Enviar
											</button>
										</div>
									</div>
								</div>
							)}

							{isValid && (
								<div className="card" id="buscar">
									<div className="card-header">
										<h4 className="float-left heading h4-responsive mb-0">
											B&uacute;squeda
										</h4>
									</div>
									{isLoading ? (
										"loading card selects"
									) : (
										<FormSectionComponent
											rut={isValid ? rut : "Desconocido"}
											email={isValid ? email : "Desconocido"}
										/>
									)}
									<DataTableComponent rut={isValid ? rut : "Desconocido"} />
								</div>
							)}
						</section>
						{/* Form Section */}
					</main>
				</div>
				{/* Footer */}
				<FooterComponent />
				{/* Loading Overlay */}
				{isLoading && <LoadingOverlayComponent />}
			</div>
		</>
	);
}

export default App;
