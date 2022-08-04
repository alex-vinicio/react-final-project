function FooterComp(props) {
  const getYear = new Date().getFullYear();
  return (
    <div className="card-footer  text-light navbar-dark bg-dark">
      <br />
      Todos los derechos reservados @Alex-Vinicio © Copyright {getYear} <br />
      <br />
    </div>
  );
}

export default FooterComp;
