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
		const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		const data = new Blob([excelBuffer], { type: fileType });
		FileSaver.saveAs(data, fileName + fileExtension);
	};

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
