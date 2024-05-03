import { useContext, useState } from "react";
import { DefinitionContext } from "./DefinitionContext";
import { useNavigate } from "react-router-dom";

import DefinitionDetail from "./DefinitionDetail";
import { Button, Card, CardFooter, CardHeader, CardTitle, Form, FormGroup, FormLabel } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiPencil, mdiTrashCan } from "@mdi/js";

function DefinitionRoute({ setShowDefinitionForm}) {
  const navigate = useNavigate();
  const { definition, handlerMap} = useContext(DefinitionContext);
  const [showAlert, setShowAlert] = useState(null);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  

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
          <hr className="hr" />
          <div>
            <Card className="text-center">
              <Card.Body>
              <Form
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                var formData = Object.fromEntries(new FormData(e.target));
                try {
                  if (definition.id) {
                    formData.id = definition.id;
                    await handlerMap.createComment(formData);
                  } else {
                    await handlerMap.createComment(formData);
                  }
      
                  setShowDefinitionForm(false);
                } catch (e) {
                  console.error(e);
                  setShowAlert(e.message);
                }
               }}>
                <FormGroup className="mb-3" controlId="formBasicComment">
                  <Form.Control 
                  as="textarea"
                  name="comment"
                  rows={3}
                  required
                  />
                </FormGroup>
                <Button type="submit" variant="primary">Přidejte komentář</Button>
              </Form>
              </Card.Body>
            </Card>
          </div>
          <div className="row" style={{ margin: "0%", height:"auto", overflow: "auto"}}>
            {definition.comments.map(function (comment){
              return <Card key={comment.id}>
                      <Card.Body>
                        <Card.Text>
                          {comment.text}
                        </Card.Text>
                        <div style={{
                          display: "grid",
                          gap: "2px",
                          justifyContent: "right",
                          alignItems: "center"
                        }}>
                        <Button variant="primary">
                          <Icon path={mdiPencil} size={0.7}></Icon>
                        </Button>
                        <Button 
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          try {
                            if (comment.id) {
                              await handlerMap.deleteComment(comment);
                            } else {
                              await handlerMap.deleteComment(comment);
                            }
                          } catch (e) {
                            console.error(e);
                            setShowAlert(e.message);
                          }
                        }}>
                          <Icon path={mdiTrashCan} size={0.7}></Icon>
                        </Button>
                        </div>
                      </Card.Body>
                    </Card>
            })}
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
    columnGap: "8px",
    maxWidth: "640px",
  };
}

export default DefinitionRoute;
