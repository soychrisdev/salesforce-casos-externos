import { useNavigate } from "react-router-dom";
import LoadingOverlayComponent from "../component/LoadingOverlay";
import { useAuth } from "../hooks/query/useAuth";
import { useValidador } from "../hooks/query/useValidador";
import { useAppStore } from "../store/store";
import { formatRut, validateRut } from "../utils/RutValidator";
import { validate } from "./validate";

export default function Ingreso() {

    const { userInfo, setUserInfo } = useAppStore((state) => state);
    const { data: url } = useAuth();
    const { postForm: postValidador, isLoading } = useValidador();
    const navigate = useNavigate();
    //@ts-ignore
    const handleValidateRut = (rut) => {
        const isValid = validateRut(rut);
        return isValid;
    };

    const handleSubmit = async () => {
        //@ts-ignore
        if (validate(userInfo) === true) {

            setUserInfo({ ...userInfo })
            const response = await postValidador({

                validador: "contacto",
                rut: userInfo?.rut,
                instance_url: url?.instance_url,
                token: url?.access_token
            })

            if (response?.status === 400) {
                if (userInfo?.userIsValid === false) {
                    setUserInfo({ ...userInfo, userIsValid: true })

                    navigate("/CRM_SF/SF_CASOS_EXTERNO/ingreso");

                }
            }
            if (response?.status === 200) {
                //@ts-ignore
                toastr.error('El rut ingresado corresponde a un Alumno, favor ingrese por su plataforma.');
            }
        } else {
            //@ts-ignore
            toastr.error(validate(userInfo));
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo, [name]: name === "rut" ? formatRut(value, false) : value
        });
    };

    return (
        <div>
            {isLoading && <LoadingOverlayComponent />}
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
                                name="name"
                                id="name"
                                className="form-control mb-0"
                                placeholder="Ingrese nombre y apellido"
                                onChange={(e) => handleOnChange(e)}
                                value={(userInfo?.name)}
                            />

                            <label htmlFor="name" className="active">
                                Nombre y Apellido (*)
                            </label>
                        </div>
                    </div>

                    <div className="col-md-4 mb-2 mt-3">
                        <div className="md-form my-3">
                            <input
                                type="text"
                                name="rut"
                                id="rut"
                                className="form-control mb-0"
                                placeholder="Ingrese RUT"
                                // onChange={handleChange}
                                onChange={(e) => handleOnChange(e)}
                                // onChange={(e) => setUserInfo({ ...userInfo, rut: formatRut(e.target.value, false) })}
                                value={
                                    userInfo?.rut === "-" ? "" : userInfo?.rut
                                }
                            />

                            <label htmlFor="campo_rut" className="active">
                                RUT (*)
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2 mt-3">
                        <div className="md-form my-3">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="form-control mb-0"
                                placeholder="Ingrese su correo"
                                onChange={(e) => handleOnChange(e)}
                                // onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                value={userInfo?.email}
                            />

                            <label htmlFor="campo_email" className="active">
                                Email (*)
                            </label>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="md-form my-3">
                            <input
                                type="number"
                                name="phoneNumber"
                                id="phoneNumber"
                                className="form-control mb-0"
                                placeholder="Ingrese numero de telefono"
                                onChange={(e) => handleOnChange(e)}
                                value={userInfo?.phoneNumber}
                            />

                            <label htmlFor="name" className="active">
                                Ingrese numero de telefono (*)
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
                            onClick={handleSubmit}
                            disabled={isLoading}

                        >
                            {isLoading ? 'Cargando...' : 'Enviar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
