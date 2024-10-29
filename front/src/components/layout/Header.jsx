import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/main_logo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
                <Link className="nav-link ms-2" to="/">
                    <img src={logo} className="rounded-circle" height="80px" alt="Main Logo" />
                </Link>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse text-center" id="navbarColor01">
                        <ul className="navbar-nav me-auto fs-5">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/solo' ? 'active' : ''}`}
                                    to="/solo"
                                >
                                    Solo
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${location.pathname === '/multiplayer' ? 'active' : ''}`}
                                    to="/multiplayer"
                                >
                                    Multijoueur
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser} size='3x' />
                                </a>

                                <small className="text-body-secondary text-capitalize">Bonjour,
                                    NOM</small>
                                <div className="dropdown-menu dropdown-menu-end text-center fs-5" aria-labelledby="dropdownMenuButton">
                                    <a href="" className="dropdown-item">
                                        Mon compte
                                    </a>
                                    <div className="dropdown-divider"></div>

                                    <a className="dropdown-item text-danger fs-5" href="">Déconnexion</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
