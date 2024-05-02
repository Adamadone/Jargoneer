import Dropdown from "react-bootstrap/Dropdown";

import { useContext } from "react";
import { UserContext } from "./UserContext";
import { DefinitionListContext } from "./DefinitionListContext";

import Icon from "@mdi/react";
import {
  mdiEmoticonHappyOutline,
  mdiEmoticonSadOutline,
  mdiEmoticonNeutralOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

function AttendeeDecision({ definition }) {
  const { loggedInUser } = useContext(UserContext);
  const { handlerMap } = useContext(DefinitionListContext);

  const loggedInUserCategory = getLoggedInUserCategory(definition, loggedInUser);
  const guestsCount = definition.userMap?.[loggedInUser?.id]?.guests || 0;
  const guestsColor = getGuestsCount(guestsCount);

  return loggedInUser ? (
    <>
      <Dropdown>
        <Dropdown.Toggle
          id="attencanceDecision"
          variant="light"
          style={dropdownStyle()}
        >
          <Icon
            path={loggedInUserCategory.iconPath}
            size={0.8}
            color={loggedInUserCategory.color}
          />{" "}
          <span style={componentStyle(loggedInUserCategory.color)}>
            {loggedInUserCategory.category}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {decisionButton({
            handlerMap,
            definition,
            loggedInUser,
            color: "#69a765",
            text: "jdu",
          })}
          {decisionButton({
            handlerMap,
            definition,
            loggedInUser,
            color: "#ff2216",
            text: "nejdu",
          })}
          {decisionButton({
            handlerMap,
            definition,
            loggedInUser,
            color: "#ffb447",
            text: "nevím",
          })}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Toggle
          id="plusGuests"
          variant="light"
          style={dropdownStyle()}
        >
          <Icon path={mdiPlusCircleOutline} size={0.8} color={guestsColor} />{" "}
          <span style={componentStyle(guestsColor)}>{guestsCount}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {[0, 1, 2, 3, 4, 5, 6].map((numberOfGuests) => {
            return guestsButton({
              handlerMap,
              definition,
              loggedInUser,
              numberOfGuests,
            });
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  ) : null;
}

function dropdownStyle() {
  return {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    background: "none",
    border: "none",
  };
}

function getLoggedInUserCategory(definition, loggedInUser) {
  let category;
  let iconPath;
  let color;
  if (loggedInUser && definition.userMap?.[loggedInUser?.id]?.category === "yes") {
    category = "jdu";
    iconPath = mdiEmoticonHappyOutline;
    color = "#69a765";
  } else if (
    loggedInUser &&
    definition.userMap?.[loggedInUser?.id]?.category === "no"
  ) {
    category = "nejdu";
    iconPath = mdiEmoticonSadOutline;
    color = "#ff2216";
  } else {
    category = "nevím";
    iconPath = mdiEmoticonNeutralOutline;
    color = "#ffb447";
  }
  return { category, iconPath, color };
}

function componentStyle(color) {
  return {
    fontSize: "18px",
    color: color,
  };
}

function decisionButton({ handlerMap, definition, loggedInUser, color, text }) {
  return (
    <Dropdown.Item
      key={text}
      style={{ color }}
      onClick={() =>
        handlerMap.handleCategory({
          definitionId: definition.id,
          userId: loggedInUser.id,
          category: text === "jdu" ? "yes" : text === "nejdu" ? "no" : null,
        })
      }
    >
      {text}
    </Dropdown.Item>
  );
}

function guestsButton({ handlerMap, definition, loggedInUser, numberOfGuests }) {
  return (
    <Dropdown.Item
      key={numberOfGuests.toString()}
      style={{ color: getGuestsCount(numberOfGuests) }}
      onClick={() =>
        handlerMap.handleCategory({
          definitionId: definition.id,
          userId: loggedInUser.id,
          guests: numberOfGuests,
        })
      }
    >
      {numberOfGuests}
    </Dropdown.Item>
  );
}

function getGuestsCount(guestsCount) {
  return guestsCount > 0 ? "#69a765" : "#707373";
}

export default AttendeeDecision;
