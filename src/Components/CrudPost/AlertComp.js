import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertComp(props) {
  const [show, setShow] = useState(props.alertView);
  const [typeList] = useState([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]);

  const handleClose = () => {
    props.handleExitALert(false);
    setShow(false);
  };

  const type = typeList.find((item) => item === props.value);

  const alertShow = (
    <Alert show={show} key={type} variant={type}>
      <Alert.Heading>{props.head}</Alert.Heading>
      <p>{props.message}!</p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={handleClose} variant="outline-success">
          Salir!
        </Button>
      </div>
    </Alert>
  );
  return <div className="p-1 m-1">{alertShow}</div>;
}

export default AlertComp;
