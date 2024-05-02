import { useContext } from "react";
import { DefinitionContext } from "./DefinitionContext";
import { useNavigate } from "react-router-dom";

import DefinitionDetail from "./DefinitionDetail";

function DefinitionRoute({ setShowDefinitionForm }) {
  const navigate = useNavigate();
  const { definition } = useContext(DefinitionContext);
  

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {definition ? (
        <>
          <DefinitionDetail definition={definition} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
          </div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    display: "grid",
    gridTemplateColumns: "max-content auto 32px",
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default DefinitionRoute;
