import FileSaver from "file-saver";
import * as XLSX from "xlsx";
//@ts-ignore
export const ExportToExcel = ({ apiData, fileName }) => {
	const fileType =
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const fileExtension = ".xlsx";
	//@ts-ignore
	const exportToCSV = (apiData, fileName) => {
		const ws = XLSX.utils.json_to_sheet(apiData);
		//PLAN_FINICIO	PLAN_FTERMINO	PVCM_TROL_DOCENTE	PVCM_TTIPO_BENEFICIARIO	PVCM_NRUT_PERSONA	PVCM_TNOMBRE_PERSONA	PVCM_NCORR	EMCE_NCORR	SEUN_NCORR_GESTOR	CERT_NCORR

		const columnNamesMap = {
			ANIO_PROGRAMA: "ANIO PROGRAMAD",
			PLAN_NCORR: "NUMERO DE PROGRAMA",
			PROG_TNOMBRE: "NOMBRE PROGRAMA",
			INICIATIVA: "INICIATIVA",
			ACCION: "ACCION",
			PLAN_FINICIO: "FECHA INICIO",
			PLAN_FTERMINO: "FECHA TERMINO",
			PVCM_TROL_DOCENTE: "ROL DOCENTE",
			PVCM_TTIPO_BENEFICIARIO: "TIPO BENEFICIARIO",
			PVCM_NRUT_PERSONA: "RUT",
			PVCM_TNOMBRE_PERSONA: "NOMBRE",
			PVCM_NCORR: "NUMERO DE CERTIFICADO",
			EMCE_NCORR: "NUMERO DE CONSTANCIA",
			SEUN_NCORR_GESTOR: "NUMERO DE GESTION",
			CERT_NCORR: "ID CERTIFICADO",
		};
		// Obtener los nombres de las columnas del mapeo o las claves originales
		//@ts-ignore
		const columnNames = Object.keys(apiData[0]).map(originalName => columnNamesMap[originalName] || originalName);

		XLSX.utils.sheet_add_aoa(ws, [columnNames], { origin: "A1" });

		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	}
	return (
		<button
			type="button"
			className="btn btn-round btn-outline dataTables_actions-button waves-effect waves-light"
			data-toggle="tooltip"
			data-placement="top"
			title="Descargar Excel"
			//@ts-ignore
			onClick={(e) => exportToCSV(apiData, fileName)}
		>
			<i className="material-icons icon-1x">arrow_downward</i>
		</button>
	);
};
