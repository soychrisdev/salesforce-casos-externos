import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../component/Layout";
import Resultados from '../pages/ConsultaPage';
import ErrorBoundary from '../pages/Error';
import GuardLayout from "../pages/GuardLayout";
import Ingreso from '../pages/Ingreso';
import IngresoCaso from '../pages/IngresoCaso';
import PublicLayout from "../pages/PublicLayout";

export const router = createBrowserRouter([
	{
		path: "/CRM_SF/SF_CASOS_EXTERNO",
		element: <Layout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				element: <PublicLayout />,
				children: [{
					index: true,
					element: <Ingreso />,
				}]
			},
			{
				element: <GuardLayout />,
				children: [
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
				]
			},

		],
	},
	{
		path: "*",
		element: <Navigate to="/CRM_SF/SF_CASOS_EXTERNO" />,
	},
]);	