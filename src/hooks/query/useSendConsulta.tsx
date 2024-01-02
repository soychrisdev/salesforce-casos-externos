import { useMutation } from "react-query";
import { ResponseError } from "../../utils/ResponseError";

//@ts-ignore
const postFormData = async (value) => {
    const toSendObject = {
        numero: value.numCaso,
        rut: value.rut,

    };

    const response = await fetch(
        //@ts-ignore
        `${config?.baseUrl}/api/dataCasosByRutPublic`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toSendObject),
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
            //@ts-ignore
            toastr.error("No existen registros asociados a la consulta.");
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