import { useMutation, useQueryClient } from "react-query";

//@ts-ignore
const postFormData = async (value) => {
	console.log(JSON.stringify(value))
	const toSendObject = {
		label: value.label[0],
		rut: value.rut,
		instance_url: value.url,
		descripcion: value.description,
		telefono: `56${value.phoneNumber}`,
		email: value.email,
		tipoPostulante: value.tipoPostulante,
		nombre: value.nombre,
		apellido: value.apellido,
		// sede: value.sede
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

	const mensaje = await response.json()
	console.log("mensaje: ", mensaje.Message);
	if (!response.ok) {
		const newError = mensaje.Message.replace(/^Error:\s*/, '');
		throw new Error(newError)

	}

	return response;
};
export const useFormData = () => {
	const queryClient = useQueryClient();
	const { mutateAsync: postForm, error, status, isLoading } = useMutation(postFormData, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(["DataCasos"]);
			//@ts-ignore
			toastr.success("Caso creado con éxito.");
		},
		onError: (error) => {
			console.log("error: ", error);
			//@ts-ignore
			toastr.error(error);
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
