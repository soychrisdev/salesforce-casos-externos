import FormSectionComponent from "../component/FormSectionComponent";

import { useAppStore } from "../store/store";


export default function IngresoCaso() {
  const { userInfo } = useAppStore((state) => state)


  return (
    <div>
      <FormSectionComponent
        valid={userInfo?.userIsValid}
        rut={userInfo?.rut}
        email={userInfo?.email}
        phoneNumber={userInfo?.phoneNumber}
        nombre={userInfo?.name?.split(" ")[0]}
        apellido={userInfo?.name?.split(" ")[1]}
      />
    </div>

  )
}
