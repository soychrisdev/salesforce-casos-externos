import { Navigate } from "react-router-dom";
import FormSectionComponent from "../component/FormSectionComponent";
import { useAuth } from "../hooks/query/useAuth";
import { useAppStore } from "../store/store";


export default function IngresoCaso() {
  const { userInfo } = useAppStore((state) => state)
  const { data: url, isLoading: isLoadingAuth } = useAuth();

  if (!userInfo?.userIsValid) return Navigate({ to: '/CRM_SF/SF_CASOS_EXTERNO' });
  return (
    <div>
      <FormSectionComponent
        rut={userInfo?.rut}
        email={userInfo?.email}
        phoneNumber={userInfo?.phoneNumber}
        nombre={userInfo?.name?.split(" ")[0]}
        apellido={userInfo?.name?.split(" ")[1]}
        // dataValidador={dataValidador}
        auth={url}
        isLoadingAuth={isLoadingAuth}
      />
    </div>

  )
}
