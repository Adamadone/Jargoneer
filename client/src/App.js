import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import DefinitionList from "./DefinitionList";
import UserProvider from "./UserProvider";
import DefinitionListProvider from "./DefinitionListProvider";
import DefinitionProvider from "./DefinitionProvider";
import DefinitionRoute from "./DefinitionRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <UserProvider>
        <DefinitionListProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<DefinitionList />} />
                <Route
                  path="definitionDetail"
                  element={
                    <DefinitionProvider>
                      <DefinitionRoute />
                    </DefinitionProvider>
                  }
                />
                <Route path="*" element={"not found"} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DefinitionListProvider>
      </UserProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#D9D9D9",
  };
}

export default App;
