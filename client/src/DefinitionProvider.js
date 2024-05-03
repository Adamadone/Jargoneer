import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import { DefinitionContext } from "./DefinitionContext.js";

function DefinitionProvider({ children }) {
  const [definitionLoadObject, setDefinitionLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();
  console.log(location);

  const [searchParams] = useSearchParams();

  console.log(searchParams.get("id"));

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/definition/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setDefinitionLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setDefinitionLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  
  async function createComment(dtoIn) {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/comment/create`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn)
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setDefinitionLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setDefinitionLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function deleteComment(dtoIn) {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/comment/delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dtoIn)
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setDefinitionLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setDefinitionLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    definition: definitionLoadObject.data,
    handlerMap: { createComment, deleteComment }
  };

  return (
    <DefinitionContext.Provider value={value}>{children}</DefinitionContext.Provider>
  );
}

export default DefinitionProvider;
