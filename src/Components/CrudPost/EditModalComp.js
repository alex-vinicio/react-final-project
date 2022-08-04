import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AlertComp from "./AlertComp";
import Form from "react-bootstrap/Form";
import OperationContext from "../Context/OperationProvider";

function EditModalComp(props) {
  //TODO: contexto que permite gestionar el Verbo para crear y actualizar, reutilizando el modal editar, conjuntamente con la alerta
  const { titulo, verb, showInputId, subMessage } =
    useContext(OperationContext);
  const [show, setShow] = useState(props.formView);
  const [itemResponse, setItemResponse] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  //TODO: estados para control de validacion del form, y de los campos
  const [validated, setValidated] = useState(false);
  const [idPost, setIdPost] = useState(props.item.id);
  const [titlePost, setTitlePost] = useState(props.item.title);
  const [idUsuarioPost, setIdUsuarioPost] = useState(props.item.userId);
  const [detallepost, setDetallepost] = useState(props.item.body);
  //TODO: estados para enviar como propeidad al modal de alerta, generando el contenido dinamico
  const [message, setMessage] = useState("");
  const [head, setHead] = useState("");
  const [alertView, setAlertView] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  //TODO: estados para control de los botones de accion y del componente alerta
  const handleSend = async () => {
    setButtonDisabled(true);
    await sendRequest();
  };
  const handleDelete = () => {
    props.handleForm(0, false);
    setShow(false);
  };
  const handleExitALert = (value) => {
    setAlertView(value);
    handleDelete();
  };
  //TODO: funcion que valida si los campos del formulario estan llenos
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      await handleSend();
    }
    setValidated(true);
  };
  //TODO: funciones que manejan formularios controlados con los estados
  const handlesetTitlePost = (event) => {
    setTitlePost(event.target.value);
  };
  const handleSetName = (event) => {
    setIdPost(event.target.value);
  };
  const handleIdUsuarioPost = (event) => {
    setIdUsuarioPost(event.target.value);
  };
  const handleDetallePost = (event) => {
    setDetallepost(event.target.value);
  };
  //TODO: hook que añade valores a los estados para mostrar en el modal de alerta
  useEffect(() => {
    if (itemResponse !== null) {
      if (typeof itemResponse === "object") {
        setTypeAlert("success");
        setHead("Exito!");
        setMessage(
          `El item con:\n ID:${idPost}\n y Nombre:${titlePost} \n. Se ${subMessage} correctamente`
        );
        setAlertView(true);
      } else {
        setTypeAlert("danger");
        setMessage(
          `Error al actualizar/registrar el registro con ID: ${itemResponse.id}`
        );
        setHead("Error");
        setAlertView(true);
      }
    }
  }, [itemResponse]);
  //TODO: funcion que envia la peticion al servidor, segun el valor del Context almacenado
  const sendRequest = async () => {
    if (verb !== "POST") {
      fetch(process.env.REACT_APP_API_URL + "/" + props.item.id, {
        method: "PUT",
        body: JSON.stringify({
          id: props.item.id,
          title: titlePost,
          body: detallepost,
          userId: idUsuarioPost,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setItemResponse(json);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(process.env.REACT_APP_API_URL, {
        method: verb,
        body: JSON.stringify({
          title: titlePost,
          body: detallepost,
          userId: idUsuarioPost,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => setItemResponse(json));
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleDelete} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Va a {titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3" controlId="idPost">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="id post"
                    required
                    name="idPost"
                    value={idPost}
                    onChange={(e) => handleSetName(e)}
                    disabled={showInputId}
                  />
                  <Form.Control.Feedback>Campo correcto!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Ingrese el ID del item!
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3" controlId="titlePost">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre"
                    required
                    value={titlePost}
                    onChange={(e) => handlesetTitlePost(e)}
                  />
                  <Form.Control.Feedback>Campo correcto!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Ingrese el nombre!
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3" controlId="idUsuarioPost">
                  <Form.Label>Id del Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="id usuario"
                    required
                    value={idUsuarioPost}
                    onChange={(e) => handleIdUsuarioPost(e)}
                  />
                  <Form.Control.Feedback>Campo correcto!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Ingrese el id del usuario!
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-10">
                <Form.Group className="mb-3" controlId="detallePost">
                  <Form.Label>Detalle</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ingrese el detalle"
                    required
                    value={detallepost}
                    onChange={(e) => handleDetallePost(e)}
                  />
                  <Form.Control.Feedback>Campo correcto!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Ingrese el detalle!
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4"></div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 p-1 ">
                  <Button variant="secondary" onClick={handleDelete}>
                    Cancelar
                  </Button>
                </div>
                <div className="col-md-4 p-1 ">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={buttonDisabled}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
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

export default EditModalComp;
