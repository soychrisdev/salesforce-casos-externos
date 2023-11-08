import { useMutation, useQueryClient } from "react-query";
import { ResponseError } from "../../utils/ResponseError";

//@ts-ignore
const postFormData = async (value) => {
	console.log(JSON.stringify(value))
	const toSendObject = {
		label: value.label[0],
		rut: value.rut,
		instance_url: value.url,
		descripcion: value.description,
		telefono: value.phoneNumber,
		email: value.email,
		tipoPostulante: value.tipoPostulante,
		nombre: value.nombre,
		apellido: value.apellido,
	};

	const response = await fetch(
		//@ts-ignore
		`${config?.baseUrl}/api/crearCasoPublico`,
		{
			method: "POST",
			body: JSON.stringify(toSendObject),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${value.token}`,
			},
		},
	);

	const mensaje = await response.json().then((res) => res.Message);
	if (!response.ok) {
		// console.log(await response.status);
		throw new ResponseError(mensaje, mensaje);

		// Adjunta información extra al objeto de error.
	}

	return response;
};
export const useFormData = () => {
	const queryClient = useQueryClient();
	const { mutate: postForm, error, status, isLoading } = useMutation(postFormData, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(["DataCasos"]);
			//@ts-ignore
			toastr.success("Caso creado con éxito.");
		},
		onError: () => {
			// If there was an error, revert the optimistic update
			//@ts-ignore
			toastr.error("Se ha producido un error en crear el caso, favor intente nuevamente.");
		},
		onSettled: () => {
			queryClient.invalidateQueries(["DataCasos"]);
		},
	});

	return {
		postForm,
		error,
		status,
		isLoading
	};
};
//cuestionario de alinamiento de la norma chilena 2770
//declaracion jurada de planitillas de trraajadores
//al balance clasificado del periodo 2021
