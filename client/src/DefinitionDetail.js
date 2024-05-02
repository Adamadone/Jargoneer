
function DefinitionDetail({ definition }) {
  

  return (
    <div style={{ display: "contents", rowGap: "0px", }}>
      <div style={{ fontSize: "25px" }}>
        {definition.name}
      </div>
      <div className="row" style={{ margin: "5%"}}>
        Popis:
      </div>
      <div className="row" style={{ margin: "5%"}}>
        {definition.desc}
      </div>
    </div>
  );
}

export default DefinitionDetail;
