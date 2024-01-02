import { useMutation } from "react-query";

//@ts-ignore
const postValidadorData = async (value) => {
    const toSendObject = {
        validador: value.validador,
        rut: value.rut,
    };

    const response = await fetch(
        //@ts-ignore
        `${config?.baseUrl}/api/validadorRut`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toSendObject),
        },
    );

    const data = await response.json().then((res) => res) as [];
    return { status: response.status, data };
};
export const useValidador = () => {
    const { mutateAsync: postForm, error, isLoading, data, isSuccess, isIdle, status, isError } = useMutation(postValidadorData);

    return {
        postForm,
        error,
        isLoading,
        data,
        isSuccess,
        isIdle,
        status,
        isError
    };
};