
function DefinitionDetail({ definition }) {
  

  return (
    <div style={{ display: "inline", rowGap: "0px", }}>
      <div style={{ fontSize: "25px" }}>
        {definition.name}
      </div>
      <div className="row" style={{ margin: "0%"}}>
        Popis:
      </div>
      <></>
      <div className="row" style={{ margin: "0%", height:"150px", overflow: "auto"}}>
        {definition.desc}
      </div>
    </div>
  );
}

export default DefinitionDetail;
