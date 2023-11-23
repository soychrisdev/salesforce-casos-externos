import FormSectionComponent from "../component/FormSectionComponent";
import { useAuth } from "../hooks/query/useAuth";
import { useAppStore } from "../store/store";


export default function IngresoCaso() {
  const { userInfo } = useAppStore((state) => state)
  const { data: url, isLoading: isLoadingAuth } = useAuth();


  return (
    <div>
      <FormSectionComponent
        valid={userInfo?.userIsValid}
        rut={userInfo?.rut}
        email={userInfo?.email}
        phoneNumber={userInfo?.phoneNumber}
        nombre={userInfo?.name?.split(" ")[0]}
        apellido={userInfo?.name?.split(" ")[1]}
        auth={url}
        isLoadingAuth={isLoadingAuth}
      />
    </div>

  )
}
