import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function ViewCommentsComp(props) {
  const [show, setShow] = useState(props.commentsView);
  const [statusResponse, setStatusResponse] = useState([]);
  //TODO: funcion para retornar el estado en falso de modal al padre
  const handleView = () => {
    props.handleView(0, false);
    setShow(false);
  };
  //TODO: hook para manejar el Request si la propiedad id cambia
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `/${props.id}/comments`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setStatusResponse(json);
      });
  }, [props.id]);
  //TODO: constante que genera la card para cada comentario/comments segun el ID
  const listCards = statusResponse.map((item) => {
    return (
      <div className="col-xl-12 col-lg-12 col-md-12 p-1" key={item.id}>
        <Card>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              <b>ID:</b>
              {item.id}
              <br />
              <b>Post ID:</b>
              {item.postId}
              <br />
              {item.body}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{item.email}</small>
          </Card.Footer>
        </Card>
      </div>
    );
  });

  return (
    <>
      <Modal show={show} onHide={handleView} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Visualizacion de comentario por ID: {props.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardGroup>
            <div className="row">{listCards}</div>
          </CardGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleView}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewCommentsComp;
