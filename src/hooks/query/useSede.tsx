import { useQuery } from "react-query";
//@ts-ignore
const fetchSedes = async () => {
    const response = await fetch(
        //@ts-ignore
        `${config?.baseUrl}/api/sedes`,
    );

    if (!response.ok) {
        const error = await response.json().then((res) => res);
        return error;
        // Adjunta información extra al objeto de error.
    }

    const data = (await response.json().then((res) => res)) as [];
    return data
};

export const usefetchSedes = () => {
    return useQuery<[], Error>(
        ["dataSedes"],
        () => fetchSedes(),
        {
            //@ts-ignore
            select: (data) => data.sort((a, b) => a.NAME > b.NAME ? 1 : -1),
        }
    );
};

