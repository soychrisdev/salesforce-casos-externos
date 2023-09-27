// import $ from "jquery"; // Import jQuery if needed
import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/query/useAuth";
import { useDataResultadoCasos } from "../hooks/query/useDataResultadoCasos";
import { useAppStore } from "../store/store";
import { ExportToExcel } from "./ExportToExcel";
import LoadingOverlayComponent from "./LoadingOverlay";
// import 'datatables.net'; // Import DataTables library CSS
//@ts-ignore

import $ from "jquery";
const DataTableComponent = (props) => {
	const token = useAppStore((state) => state.auth);
	const { data: url } = useAuth(props?.rut);
	//@ts-ignore
	const userInfo = useAppStore((state) => state.userInfo);
	const { data, isRefetching } = useDataResultadoCasos(
		token,
		props?.rut,
		//@ts-ignore
		url?.instance_url,
	);
	const tableRef = useRef();

	useEffect(() => {
		//@ts-ignore
		let dataTableInstanceRef: DataTables.Api | null = null;


		
		if (data) {
			const initializeDataTable = () => {
				if (tableRef.current) {
					// Initialize DataTable only once
					//@ts-ignore
					dataTableInstanceRef = $(tableRef.current).DataTable({
						dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
						scrollY: "60vh",
						scrollX: true,
						lengthMenu: [
							[20, 30, 40, -1],
							[20, 30, 40, "Todas"],
						],
						aaSorting: [],
						destroy: true,

						// Add more options here as needed
					});
				}
			};

			initializeDataTable();
		}

		return () => {
			// Clean up by destroying the DataTable instance
			if (dataTableInstanceRef) {
				dataTableInstanceRef.destroy();
			}
		};
	}, [data, isRefetching]);

	if (isRefetching) {
		return <LoadingOverlayComponent />;
	}

	return (
		<div className="mt-4 expand_less" id="resultados">
			<div className="card-header d-flex align-items-center justify-content-between flex-wrap">
				<h4 className="heading h4-responsive mb-0">Resultados</h4>
				<ExportToExcel apiData={data} fileName={Date.now()} />
			</div>

			<div className="card-body">
				<div className="row mt-2">
					<div className="col-12">
						<table
							id="TablaResultados"
							className="datatables table table-hover table-striped table-bordered m-0"
							ref={tableRef}
						>
							<thead>
								<tr>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Tipo Postulante
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Tem&aacute;tica
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										T&eacute;lefono
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Nombre Alumno
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Correo
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Submotivo
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Estatus
									</th>

									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Tiempo Max Respuesta
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										RUT
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Prioridad
									</th>

									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										Descripci&oacute;n
									</th>

									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										N&uacute;mero de contacto
									</th>
									<th className="align-center text-uppercase font-weight-bold text-nowrap">
										&Aacute;mbito
									</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((item) => (
									//@ts-ignore
									<tr key={item?.caseNumber}>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.tipoPostulante ? "sin valor" : item.tipoPostulante
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.tematica ? "sin valor" : item.tematica
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.suppliedPhone ? "sin valor" : item.suppliedPhone
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.suppliedName ? "sin valor" : item.suppliedName
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.contactEmail ? "sin valor" : item.contactEmail
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.submotivo ? "sin valor" : item.submotivo
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.status ? "sin valor" : item.status
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.slaExitDate ? "sin valor" : item.slaExitDate
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.rutWeb ? "sin valor" : item.rutWeb
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.priority ? "sin valor" : item.priority
											}
										</td>
										<td className="">
											{
												//@ts-ignore
												!item.description ? "sin valor" : item.description
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.contactPhone ? "sin valor" : item.contactPhone
											}
										</td>
										<td className="text-nowrap">
											{
												//@ts-ignore
												!item.ambito ? "sin valor" : item.ambito
											}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataTableComponent;
