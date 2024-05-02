import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import DefinitionDateTimeBadge from "./DefinitionDateTimeBadge";
import DefinitionDetail from "./DefinitionDetail";

import Icon from "@mdi/react";
import { mdiEyeOutline, mdiPencil, mdiTrashCanOutline } from "@mdi/js";

function DefinitionCard({ definition, setShowDefinitionForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <DefinitionDetail definition={definition} />
      <div
        style={{
          display: "grid",
          gap: "2px",
          justifyContent: "right",
          alignItems: "center"
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
        <Button
          onClick={() => setShowConfirmDeleteDialog(definition)}
          size={"sm"}
          variant="danger"
        >
          <Icon path={mdiTrashCanOutline} size={0.7} />
        </Button>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px",
    padding: "16px",
    display: "flex",
    maxWidth: "300px",
    overflow: "auto"
  };
}

export default DefinitionCard;
