import { useQuery } from "react-query";
//@ts-ignore
const fetchDataCasos = async () => {
	const response = await fetch(
		//@ts-ignore
		`${config?.baseUrl}/api/data`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },

			// mode: "cors",
			// credentials: "include",

		},
	);

	if (!response.ok) {
		const error = await response.json().then((res) => res);
		return error;
		// Adjunta información extra al objeto de error.
	}

	const data = (await response.json().then((res) => res)) as [];
	return data;
};

export const useDataCasos = () => {
	return useQuery<[], Error>(
		["DataTipoCasos"],
		() => fetchDataCasos(),
		{
			//@ts-ignore
			select: (data) => data.filter((item) => item.nombre !== "Estudiante"),
		},
	);
};

