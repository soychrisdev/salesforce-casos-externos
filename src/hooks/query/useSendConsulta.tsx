import { useMutation } from "react-query";
import { ResponseError } from "../../utils/ResponseError";

//@ts-ignore
const postFormData = async (value) => {
    const toSendObject = {
        numero: value.numCaso,
        rut: value.rut,
        url: value.instance_url

    };

    const response = await fetch(
        //@ts-ignore
        `${config?.baseUrl}/api/dataCasosByRutPublic`,
        {
            method: "POST",
            body: JSON.stringify(toSendObject),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${value.token}`,
            },
        },
    );




    if (!response.ok) {
        const error = await response.json().then((res) => res);
        throw new ResponseError(error, error);
        // Adjunta información extra al objeto de error.
    }

    const data = (await response.json().then((res) => res)) as [];
    const transformedData = []
    transformedData.push(data)
    return transformedData;
};
export const useFormConsulta = () => {
    const { mutate: postForm, error, isLoading, data, isSuccess, isIdle } = useMutation(postFormData, {
        onSuccess: async () => {
            //@ts-ignore
            toastr.success("Consulta realizada con éxito");
        },
        onError: () => {
            // If there was an error, revert the optimistic update
            //@ts-ignore
            toastr.error("Se ha producido un error al generar la consulta, favor intente nuevamente.");
        },
        onSettled: () => {
        },
    });

    return {
        postForm,
        error,
        isLoading,
        data,
        isSuccess,
        isIdle
    };
};