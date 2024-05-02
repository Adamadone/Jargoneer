import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <div className="card-header">
        <NavBar />
      </div>
      <div style={bodyStyle}>
        <Outlet />
      </div>
      <div className={"card-footer text-light"} style={footerStyle}>
        © Adam Zacios
      </div>
    </>
  );
};

const bodyStyle = {
    overflow: "auto",
    padding: "16px",
    flex: "1",
    borderTop: "white 4px solid",
    borderBottom: "white 4px solid",
  };


const footerStyle = {
  padding: "8px",
   textAlign: "center",
    backgroundColor: "#366DD9"
};

export default Layout;
