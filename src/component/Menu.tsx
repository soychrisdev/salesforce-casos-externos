import { NavLink } from "react-router-dom";

export default function Menu() {
    const handleMenu = (state: boolean) => {
        const navbar = document.getElementById("offCanvas");
        const overlay = document.querySelector(".navbar-overlay");
        const navbarItemsList = document.querySelector<HTMLElement>('.navbar-offcanvas--list');
        const navbarItems = document.querySelectorAll<HTMLElement>(".nav-item");
        if (state === true) {
            if (navbar) {
                navbar.classList.add('navbar-offcanvas--visible');
            }
            if (navbarItemsList) {
                navbarItemsList.style.display = "block";
            }
            if (overlay instanceof HTMLElement) {
                overlay.style.display = "block";
            }
            if (navbarItems) {
                navbarItems.forEach(function (item) {
                    item.style.display = "block";
                });
            }
        } else {
            if (navbar) {
                navbar.classList.remove('navbar-offcanvas--visible');
            }
            if (overlay instanceof HTMLElement) {
                overlay.style.display = "none";
            }
            if (navbarItemsList) {
                navbarItemsList.style.display = "flex";
            }
            if (navbarItems) {
                navbarItems.forEach(function (item) {
                    item.style.display = "block";
                });
            }
        }
    }
    return (
        <div className="mb-4"><nav className="navbar toggle-navbar-lg">
            <div className="container">

                <button className="d-lg-none d-flex align-items-center pl-0" id="toggle-navbar" aria-label="Ver Menu" onClick={() => handleMenu(true)} >
                    <i className="material-icons icon-lg mr-1">menu</i>
                    <span>Menu</span>
                </button>


                <ul id="offCanvas" className="nav navbar-nav navbar-offcanvas navbar-expand-lg justify-content-lg-around">

                    <a className="d-lg-none closebtn waves-effect waves-light" onClick={() => handleMenu(false)}>
                        <span role="button" className="material-icons">
                            close
                        </span>
                    </a>
                    <li className="nav-item">
                        {<NavLink to={'/CRM_SF/SF_CASOS_EXTERNO/ingreso'} className="nav-link waves-effect" >Ingreso de Casos</NavLink>}
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/CRM_SF/SF_CASOS_EXTERNO/consulta'} className="nav-link waves-effect">Consulta de Casos</NavLink>
                    </li>

                </ul>
            </div>
        </nav></div>
    )
}
