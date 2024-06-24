import { useAuthStore } from "../store/store";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DashboardRibbon = () => {
    const navigate = useNavigate();

    const setStateUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore.getState().user;
    //console.log(user)

    const handleLogout = () => {
        setStateUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-danger">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to={"/dashboard"}>
                    Dashboard
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        { (user.role === 1) ? <>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-light "
                                    to={"/coordinators/list"}
                                >
                                    Coordinators
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link text-light "
                                    to={"/coordinators/new"}
                                >
                                    Add coordinator
                                </Link>
                            </li> 
                            </>
                        : null }
                        <li className="nav-item">
                            <Link
                                className="nav-link text-light"
                                to={"/password-reset"}
                                state={user}
                            >
                                Reset Password
                            </Link>
                        </li>
                    </ul>
                    <hr className="text-light" />
                    <button
                        className="btn btn-danger navbar-text text-light"
                        onClick={() => handleLogout()}
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default DashboardRibbon;