import { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import DeleteModalComp from "./DeleteModalComp";
import EditModalComp from "./EditModalComp";
import ViewCommentsComp from "./ViewCommentsComp";
import OperationContext from "../Context/OperationProvider";
import { useNavigate } from "react-router-dom";

function TablePostComp(props) {
  //TODO: contexto que permite gestionar el Verbo para crear y actualizar, reutilizando el modal editar, conjuntamente con la alerta
  const { setOperation } = useContext(OperationContext);
  const navegation = useNavigate();
  const [products, setProducts] = useState([]);
  //TODO: estados boleanos que controlan el mostrado de los modales
  const [editView, setEditView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [commentsView, setCommentsView] = useState(false);
  //TODO: estados que almacenan valores para el modal de editar, delete, comments
  const [idComment, setIdComment] = useState(0);
  const [idDelete, setIdDelete] = useState(0);
  const [editProd, setEditProd] = useState(null);
  //TODO: estados para manejo de paginado, tanto desabilitar botones, como el numero de paginas
  const [limit, setLimit] = useState(5);
  const [active, setActive] = useState(1);
  const [statePrevButton, setStatePrevButton] = useState(false);
  const [stateNextButton, setStateNextButton] = useState(false);
  //TODO: accion de paginado
  let itemsPaginado = [];
  //TODO: hook que se ejecuta al cambiar el numero de pagina, el numero del limite del paginado
  useEffect(() => {
    if (active === 1) {
      setStatePrevButton(true);
    } else {
      setStatePrevButton(false);
    }
    if (
      active ===
      (products.length % 5 === 0
        ? parseInt(products.length / 5)
        : parseInt(products.length / 5) + 1)
    ) {
      setStateNextButton(true);
    } else {
      setStateNextButton(false);
    }

    const url = process.env.REACT_APP_API_URL;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [active]); //unicamente propiedades y estados, no variables normales

  const styleSubFooter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  };
  const styleContainerText = {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  };
  //TODO: accion de edicion con modal, donde activa el modal de editar y envia las propiedades necesrias
  const handleEdit = (product, valueBoolean) => {
    setEditView(valueBoolean);
    setEditProd(product);
    setOperation(
      product,
      "PUT",
      true,
      "actualizar el Post con ID: " + product.id,
      "actualizo el post"
    );
  };

  const handleDelete = (productId, valueBoolean) => {
    setDeleteView(valueBoolean);
    setIdDelete(productId);
  };

  const handleView = (id, valueBoolean) => {
    setIdComment(id);
    setCommentsView(valueBoolean);
  };
  //TODO: funcion que se ejecuta al clickear los botones del paginado
  const handlePageChange = (page) => {
    setActive(page);
    setLimit(page * 5);
  };
  const handlePrevPag = (value) => {
    if (active === -1) {
      setActive(1);
      setStatePrevButton(true);
    } else {
      setActive(active + value);
      setStatePrevButton(false);
    }
    setLimit(limit + 5 * value);
  };
  const handleReset = (value) => {
    if (value === 1) {
      setLimit(5);
      setActive(1);
    } else {
      setLimit(products.length);
      setActive(
        products.length % 5 === 0
          ? parseInt(products.length / 5)
          : parseInt(products.length / 5) + 1
      );
    }
  };
  //TODO: bucle que genera la cantidad de paginas segun el tamaño del response/producto, divindiendo para 5(paginado de 5 items)
  for (
    let number = 1;
    number <=
    (products.length % 5 === 0
      ? parseInt(products.length / 5)
      : parseInt(products.length / 5) + 1);
    number++
  ) {
    itemsPaginado.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  //TODO: constante que genera el contenido de la tabla, tanto las acciones como columnas de presentacion
  const items = products.map((product, index) => {
    if (index < limit && index >= limit - 5) {
      return (
        <tr key={index}>
          <td>{product.id}</td>
          <td style={styleContainerText}>{product.title}</td>
          <td style={styleContainerText}>{product.body}</td>
          <td>{product.userId}</td>
          <td>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-12">
                <button
                  className="btn btn-primary p-1 -m1"
                  onClick={() => handleView(product.id, true)}
                >
                  comments
                </button>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12">
                <button
                  className="btn btn-primary p-1 m-1"
                  onClick={() => handleEdit(product, true)}
                >
                  Edit
                </button>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12">
                <button
                  className="btn btn-primary p-1 m-1"
                  onClick={() => navegation(`/posts/view/${product.id}`)}
                >
                  View
                </button>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-12">
                <button
                  className="btn btn-danger p-1 m-1"
                  onClick={() => handleDelete(product.id, true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    }
  });

  return (
    <Card className="text-center">
      <Card.Header>
        Listado pagindado {""}
        <br />
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover variant="ligth">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Cuerpo</th>
              <th>Id Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </Table>
        {deleteView && (
          <DeleteModalComp
            id={idDelete}
            deleteView={deleteView}
            handleDelete={handleDelete}
          />
        )}
        {editView && (
          <EditModalComp
            item={editProd}
            formView={editView}
            handleForm={handleEdit}
          />
        )}
        {commentsView && (
          <ViewCommentsComp
            id={idComment}
            commentsView={commentsView}
            handleView={handleView}
          />
        )}
      </Card.Body>
      <Card.Footer className="text-muted" style={styleSubFooter}>
        <Pagination>
          <Pagination.First onClick={() => handleReset(1)} />
          <Pagination.Prev
            disabled={statePrevButton}
            onClick={() => handlePrevPag(-1)}
          />
          {itemsPaginado}
          <Pagination.Next
            disabled={stateNextButton}
            onClick={() => handlePrevPag(1)}
          />
          <Pagination.Last onClick={() => handleReset(0)} />
        </Pagination>
      </Card.Footer>
    </Card>
  );
}

export default TablePostComp;
