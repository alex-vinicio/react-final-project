import { Route, Routes } from "react-router-dom";
import HomeContentComp from "./HomeContentComp";
import LayoutComp from "./LayoutComp";
import ErrorNotFoundComp from "./ErrorsComp/ErrorNotFoundComp";
import ContainerSubHeaderComp from "./CrudPost/ContainerSubHeaderComp";
import TablePostComp from "./CrudPost/TablePostComp";
import FooterComp from "./GeneralsViews/FooterComp";

function ContainerLayoutComp(props) {
  return (
    <div className=" text-center  bg-secondar">
      <Routes>
        <Route path="/" element={<LayoutComp />}>
          <Route index element={<HomeContentComp />}></Route>
          <Route path="/posts" element={<ContainerSubHeaderComp />}>
            <Route index element={<TablePostComp />}></Route>
            <Route path="lista" element={<TablePostComp />}></Route>
          </Route>
          <Route path="*" element={<ErrorNotFoundComp />}></Route>
        </Route>
        {/* <Route path="login" element={<LoginFormComp />}></Route> */}
      </Routes>

      <br />
      <FooterComp />
    </div>
  );
}

export default ContainerLayoutComp;
