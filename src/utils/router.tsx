import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../component/Layout";
import Resultados from '../pages/ConsultaPage';
import ErrorBoundary from '../pages/Error';
import Ingreso from '../pages/Ingreso';
import IngresoCaso from '../pages/IngresoCaso';

export const router = createBrowserRouter([
	{
		path: "/CRM_SF/SF_CASOS_EXTERNO",
		element: <Layout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				path: "/CRM_SF/SF_CASOS_EXTERNO",
				element: <Ingreso />,
			},
			{
				path: "/CRM_SF/SF_CASOS_EXTERNO/ingreso",
				element: <IngresoCaso />,
			},
			{
				path: "/CRM_SF/SF_CASOS_EXTERNO/consulta",
				element: <Resultados />,
			},
			{
				path: "*",
				element: <Navigate to="/CRM_SF/SF_CASOS_EXTERNO" />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/CRM_SF/SF_CASOS_EXTERNO" />,
	},
]);	