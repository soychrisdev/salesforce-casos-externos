import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { MESSAGES } from "../utils/types";

export default function Error() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return <div>La pagina no existe! <Link role="button" to={'/CRM_SF/SF_CASOS_EXTERNO'} reloadDocument>
                Volver
            </Link></div>;
        }

        if (error.status === 401) {
            return <div>Sin autorización <Link role="button" to={'/CRM_SF/SF_CASOS_EXTERNO'} reloadDocument>
                Volver
            </Link></div>;
        }

        if (error.status === 503) {
            return <div>Problema con la API <Link role="button" to={'/CRM_SF/SF_CASOS_EXTERNO'} reloadDocument>
                Volver
            </Link></div>;
        }

        if (error.status === 418) {
            <Link role="button" to={'/CRM_SF/SF_CASOS_EXTERNO'} reloadDocument>
                Volver
            </Link>
        }
    }

    return <div>{MESSAGES.ERROR_CARGAR_PAGINA}
        <Link role="button" to={'/CRM_SF/SF_CASOS_EXTERNO'} reloadDocument>
            Volver
        </Link>
    </div>;
}