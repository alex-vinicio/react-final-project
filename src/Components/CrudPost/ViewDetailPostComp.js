import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewDetailPostComp(props) {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [id]);

  const styleCenter = {
    textAlign: "left",
  };

  return (
    <div>
      <div style={styleCenter} className="p-2 m-1">
        <Link to="/">home</Link>/<Link to="/posts">listado</Link>/
        <Link to="#">carrito</Link>
      </div>
      <h2>
        <b>ID: </b>
        {products.id}
      </h2>
      <h2>
        <b>Nombre: </b>
        {products.title}
      </h2>
      <br />
      <h2>
        <b>Detalle</b>
        <br />
        {products.body}
      </h2>
      <h2>
        <b>userId: </b>
        {products.userId}
      </h2>
    </div>
  );
}

export default ViewDetailPostComp;
