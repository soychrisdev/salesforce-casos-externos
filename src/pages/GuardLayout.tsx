import { Navigate, Outlet } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useAppStore } from "../store/store";

export default function GuardLayout() {
    const { userInfo } = useAppStore(useShallow((state) => state));
    if (!userInfo?.userIsValid) return Navigate({ to: "/CRM_SF/SF_CASOS_EXTERNO", replace: true });
    return (
        <div>
            <Outlet />
        </div>
    )

}
