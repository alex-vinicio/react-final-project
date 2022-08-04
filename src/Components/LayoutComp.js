import { Link, Outlet } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function LayoutComp(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid justify-content-center">
          <Link className="navbar-brand" to="/">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-steam"
                viewBox="0 0 16 16"
              >
                <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.198 2.198 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.217 2.217 0 0 1-1.312-1.568L.33 10.333Z" />
                <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.705 1.705 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027Zm2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048Z" />
              </svg>
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  index
                </Link>
              </li>
            </ul>
            <Dropdown>
              <Dropdown.Toggle
                variant=" primary"
                id="dropdown-basic"
                className="btn btn-dark"
              >
                Productos improtados
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link
                  className="nav-link active text-dark p-1 m-1"
                  to="/posts/lista"
                >
                  Listado
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>
      <br />
      <Outlet />
    </div>
  );
}

export default LayoutComp;
