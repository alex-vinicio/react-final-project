import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlertComp from "./AlertComp";

function DeleteModalComp(props) {
  //TODO: estados para control de los botones de accion y del componente alerta
  const [show, setShow] = useState(props.deleteView);
  const [statusResponse, setStatusResponse] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  //TODO: estados para enviar como propeidad al modal de alerta, generando el contenido dinamico
  const [message, setMessage] = useState("");
  const [head, setHead] = useState("");
  const [alertView, setAlertView] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  //TODO: funciones que manejan el estado y propiedades par ala alerta, como del modal del mismo componente
  const handleSend = async () => {
    setButtonDisabled(true);
    await sendRequest();
  };
  const handleDelete = () => {
    props.handleDelete(0, false);
    setShow(false);
  };
  const handleExitALert = (value) => {
    setAlertView(value);
    handleDelete();
  };
  //TODO: hook que genera el estado de la alerta, se activa cuando cambia el estado ge guarda el response de la API
  useEffect(() => {
    if (statusResponse !== null) {
      if (statusResponse === 200) {
        setTypeAlert("success");
        setHead("Exito!");
        setMessage("El registro se elimino correctamente");
        setAlertView(true);
        // props.handleDelete(0, false);
        // setShow(false);
      } else {
        setTypeAlert("danger");
        setMessage("Error al eliminar el registro");
        setHead("Error");
        setAlertView(true);
      }
    }
  }, [statusResponse]);
  //TODO: funcion que consulta la API para eliminar el registro
  const sendRequest = async () => {
    fetch(process.env.REACT_APP_API_URL + "/" + props.id, {
      method: "DELETE",
    }).then((res) => setStatusResponse(res.status));
  };

  return (
    <>
      <Modal show={show} onHide={handleDelete} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Va a eliminar el Post con ID: {props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Si desea continuar presione Confirmar!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSend}
            disabled={buttonDisabled}
          >
            Confirmar
          </Button>
        </Modal.Footer>
        {alertView && (
          <AlertComp
            value={typeAlert}
            head={head}
            message={message}
            alertView={alertView}
            handleExitALert={handleExitALert}
          />
        )}
      </Modal>
    </>
  );
}

export default DeleteModalComp;
