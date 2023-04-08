import {DIJKSTRAS_ALGORITHM_PAGE, DISTANCE_VECTOR_ALGORITHM_PAGE} from "../constants/pages";
import {DIJKSTRAS_ALGORITHM_ROUTE, DISTANCE_VECTOR_ALGORITHM_ROUTE, HOME_ROUTE} from "../constants/routes";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav aria-label="main navigation" className="navbar box p-3 pb-0 mb-0" id="navbar" role="navigation">
                <div className="navbar-brand">
                    <Link to={HOME_ROUTE} rel="noopener noreferrer">
                        <figure>
                            {/*<img alt="Busy Bits Logo" src={Logo} width="200"/>*/}
                        </figure>
                    </Link>

                    <a aria-expanded="false" aria-label="menu" className="navbar-burger" data-target="navbarBasicExample"
                       role="button">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-menu" id="navbarMenu">
                    <div className="navbar-end">
                        <Link className="navbar-item" to={HOME_ROUTE}>Home</Link>
                        <Link className="navbar-item" to={DIJKSTRAS_ALGORITHM_ROUTE}>{DIJKSTRAS_ALGORITHM_PAGE}</Link>
                        <Link className="navbar-item" to={DISTANCE_VECTOR_ALGORITHM_ROUTE}>{DISTANCE_VECTOR_ALGORITHM_PAGE}</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
