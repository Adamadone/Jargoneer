import { useContext } from "react";
import { DefinitionContext } from "./DefinitionContext";
import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import DefinitionDateTimeBadge from "./DefinitionDateTimeBadge";
import DefinitionDetail from "./DefinitionDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil } from "@mdi/js";

function DefinitionRoute({ setShowDefinitionForm }) {
  const navigate = useNavigate();
  const { definition } = useContext(DefinitionContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {definition ? (
        <>
          <DefinitionDateTimeBadge definition={definition} />
          <DefinitionDetail definition={definition} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/definitionDetail?id=" + definition.id)}
              size={"sm"}
            >
              <Icon path={mdiEyeOutline} size={0.7} />
            </Button>
            <Button onClick={() => setShowDefinitionForm(definition)} size={"sm"}>
              <Icon path={mdiPencil} size={0.7} />
            </Button>
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
