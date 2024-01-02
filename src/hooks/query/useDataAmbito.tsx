import { useQuery } from "react-query";
//@ts-ignore

interface TDataAmbito {
	nombre: string;
	tematicas: {
		[key: string]: {
			label: string;
			submotivos: {
				[key: string]: {
					label: string;
					[key: string]: string;
				};
			};
		};
	};

}

const fetchDataAmbito = async (): Promise<TDataAmbito[]> => {
	const response = await fetch(
		//@ts-ignore
		`${config.baseUrl}/api/data`,


	);

	if (!response.ok) {
		const error = await response.json().then((res) => res);
		return error;
	}

	const data = await response.json();
	return [data];
};

export const useDataAmbito = () => {
	return useQuery<TDataAmbito[], Error>(["Data"], () => fetchDataAmbito(), {
		//@ts-ignore
		// select: (data) => data.filter((item) => item.nombre === "estudiante"),
	});
};




