import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div>
                Hay un problema al cargar la pagina, favor presiona el boton "Recargar!"
                <button type="button" onClick={() => window.location.reload()}>Recargar!</button>
                <h2>{error.status}</h2>
                <p>{error.statusText}</p>
                {error.data?.message && <p>{error.data.message}</p>}
            </div>
        );
    } else {
        return <div>
            Hay un problema al cargar la pagina, favor presiona el boton "Recargar!"
            <button type="button" onClick={() => window.location.reload()}>Recargar!</button>
        </div>;
    }
}