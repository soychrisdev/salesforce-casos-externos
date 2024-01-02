import isEmail from "validator/lib/isEmail";
import { validateRut } from "../utils/RutValidator";

type UserInfo = {
	rut: string;
	name: string;
	email: string;
	phoneNumber: string;
	userIsValid: boolean;
};
export const validate = (userInfo: UserInfo | undefined) => {
	let status = false;
	//validar nombre y apellido
	if (
		userInfo?.name === "" ||
		userInfo?.name === undefined ||
		userInfo.name.length > 50
	) {
		return "Nombre inválido!";
	}
	if (!validateRut(userInfo?.rut)) {
		return "Rut inválido!";
	}

	if (
		!isEmail(userInfo?.email, { blacklisted_chars: " ", require_tld: true })
	) {
		return "Email inválido!";
	}

	if (
		userInfo?.phoneNumber === "" ||
		userInfo?.phoneNumber === undefined ||
		userInfo?.phoneNumber.length !== 9
	) {
		return "Número de teléfono inválido!";
	}
	status = true;
	return status;
};
