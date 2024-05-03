import { useContext, useEffect, useRef, useState } from "react";
import { DefinitionListContext } from "./DefinitionListContext.js";

import {Button, Row} from "react-bootstrap";

import DefinitionCard from "./DefinitionCard.js";
import DefinitionForm from "./DefinitionForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function DefinitionList() {
  const { definitionList } = useContext(DefinitionListContext);
  const [showDefinitionForm, setShowDefinitionForm] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  const buttonsRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonsRef.current && !buttonsRef.current.contains(event.target)) {
        setShowButtons(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredDefinitionList = definitionList.filter(
    (definition) => String(definition.name) > String()
  );

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-start", gap: "8px" }}>
        <Button variant="light" onClick={() => setShowButtons({})}>
          <Icon path={mdiPlus} size={1} color={"#366DD9"} />
        </Button>
      </div>
      {!!showButtons ? (
        <>
        <div  ref={buttonsRef}>
          <Button variant="light" onClick={() => setShowDefinitionForm({})}>
            Vytvořit definici
          </Button> 
          <Button variant="light">
            Vytvořit kategorii (placeholder)
          </Button>
        </div>
        </>): null}
       
      
      {!!showDefinitionForm ? (
        <DefinitionForm definition={showDefinitionForm} setShowDefinitionForm={setShowDefinitionForm} />
      ) : null}
      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          definition={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      <Row>
      {filteredDefinitionList.map((definition) => {
        return (
          <DefinitionCard
            key={definition.id}
            definition={definition}
            setShowDefinitionForm={setShowDefinitionForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
      </Row>
    </Container>
  );
}

export default DefinitionList;
