import { useQuery } from "react-query";

//this service provide us a nota final and porcentaje de asistencia, and we need to another service that patch too it
const getToken = async () => {


    //@ts-ignore
    const response = await fetch(`${config?.baseUrl}/api/token`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error al obtener el token");
    }
    const data = await response.json();

    return data;
}


export const useGetToken = () => {

    const { data, isLoading } = useQuery<[]>(["getToken"], () => getToken())


    return {
        isLoading,
        data
    }
}   