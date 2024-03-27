import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../store/store";

export default function GuardLayout() {
    const { userInfo } = useAppStore((state) => state);

    if (!userInfo?.userIsValid) {
        return <Navigate to="/CRM_SF/SF_CASOS_EXTERNO" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );

}
