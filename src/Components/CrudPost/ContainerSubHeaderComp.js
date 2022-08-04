import { Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import EditModalComp from "./EditModalComp";
import OperationContext from "../Context/OperationProvider";

function ContainerExternalComp(props) {
  const { setOperation } = useContext(OperationContext);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);
  //TODO: accion que envia los datos al Context para que sean utilizados en el modal edit
  const handleNewPost = (valueBoolean) => {
    setShow(valueBoolean);
    setProduct({ id: 0, title: "", body: "", userId: 0 });
    setOperation(
      { id: 0, title: "", body: "", userId: 0 },
      "POST",
      true,
      "crear un nuevo Post",
      "creo el nuevo Post"
    );
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body mb-3 ">
          <h5>Crear nuevo Post</h5>
          <button
            className="btn btn-primary"
            onClick={() => handleNewPost(true)}
          >
            New
          </button>
          {show && (
            <EditModalComp
              item={product}
              formView={show}
              handleForm={handleNewPost}
            />
          )}
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default ContainerExternalComp;
