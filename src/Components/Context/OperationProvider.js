import React, { useState } from "react";

//Crear el contexto
const OperationContext = React.createContext();

//Provider Personalizado
export function OperationProvider(props) {
  const [item, setItem] = useState(null);
  const [verb, setVerb] = useState("");
  const [show, setShow] = useState(false);
  const [tituloOperacion, setTituloOperacion] = useState("");
  const [mensajeOperacion, setMensajeOperacion] = useState("");

  const setOperation = (
    object,
    valueOp,
    valueBoolean,
    valueTitulo,
    valueMessage
  ) => {
    setVerb(valueOp);
    setItem(object);
    setShow(valueBoolean);
    setTituloOperacion(valueTitulo);
    setMensajeOperacion(valueMessage);
  };

  const value = {
    item: item,
    verb: verb,
    showInputId: show,
    titulo: tituloOperacion,
    subMessage: mensajeOperacion,
    setOperation: setOperation,
  };

  return (
    <OperationContext.Provider value={value}>
      {props.children}
    </OperationContext.Provider>
  );
}

export default OperationContext;
