import { useEffect, useState } from "react";
import { DefinitionListContext } from "./DefinitionListContext.js";

function DefinitionListProvider({ children }) {
  const [definitionLoadObject, setDefinitionLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/definition/list`, {
      method: "GET",
    });
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

  async function handleCreate(dtoIn) {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/definition/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setDefinitionLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setDefinitionLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleUpdate(dtoIn) {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/definition/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setDefinitionLoadObject((current) => {
        const definitionIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data[definitionIndex] = responseJson;
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setDefinitionLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleDelete(dtoIn) {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/definition/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setDefinitionLoadObject((current) => {
        const definitionIndex = current.data.findIndex(
          (e) => e.id === responseJson.id
        );
        current.data.splice(definitionIndex, 1);
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setDefinitionLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleCategory(dtoIn) {
    setDefinitionLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8000/category/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      await handleLoad();
    } else {
      setDefinitionLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  const value = {
    state: definitionLoadObject.state,
    definitionList: definitionLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete, handleCategory },
  };

  return (
    <DefinitionListContext.Provider value={value}>
      {children}
    </DefinitionListContext.Provider>
  );
}

export default DefinitionListProvider;
