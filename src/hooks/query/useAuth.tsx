import { useQuery } from "react-query";
//@ts-ignore
const fetchAuth = async () => {
	const response = await fetch(
		//@ts-ignore
		`${config?.baseUrl}api/auth`,
		{
			// mode: "cors",
			// credentials: "include",
			method: "GET",
			//@ts-ignore
			// body: JSON.stringify(parametros),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (!response.ok) {
		const error = await response.json().then((res) => res);
		return error;
		// Adjunta información extra al objeto de error.
	}

	const data = await response.json().then((res) => res);
	return data;
};
//@ts-ignore
export const useAuth = (rut) => {
	return useQuery<Error>(["Authentication"], () => fetchAuth(), {
		enabled: !!rut,
	});
};
