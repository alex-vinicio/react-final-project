import { Link, Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function ContainerExternalComp(props) {
  // <i class="bi bi-eye"></i>

  return (
    <>
      <div className="card mb-3">
        <br />
        <br />
        <Outlet />
      </div>
    </>
  );
}

export default ContainerExternalComp;
