import { Outlet } from "react-router-dom";
import { useGetToken } from "../hooks/query/useGetToken";
import GlobalLoadingIndicator from "./GlobalLoadingIndicator";
import HeaderComponent from "./Header";
import LoadingOverlayComponent from "./LoadingOverlay";
import Menu from "./Menu";

export default function Layout() {

  // const { userInfo, setUserInfo } = useAppStore( useShallow((state) => state);
  const { isLoading } = useGetToken();

  return (
    <div>
      {isLoading && <LoadingOverlayComponent />}
      <GlobalLoadingIndicator />
      <HeaderComponent
        title="Titulo"
        accessibility={undefined}
        headerFn={undefined}
      />
      <Menu />
      <div className="container">

        <Outlet />

      </div>
      {/* <FooterComponent /> */}
    </div>
  )
}


// export default function Layout() {

//   const { userInfo, setUserInfo } = useAppStore(useShallow((state) => state));

//   if (userInfo?.userIsValid) {
//     return (
//       <div>
//         <GlobalLoadingIndicator />
//         <HeaderComponent
//           title="Titulo"
//           accessibility={undefined}
//           headerFn={undefined}
//         />
//         <Menu />
//         <div className="container">

//           <Outlet />

//         </div>
//         <FooterComponent />
//       </div>
//     )
//   } else {
//     return <Ingreso />
//   }
// }
