import { useRef } from "react";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import { useStore } from "../../../../context";
import "./index.css";
import { renderUserData } from "../../../../utils";

const SuggestionsList = ({
  suggestions,
  activeSuggestion,
  positionsDisabled,
  setPositionsDisabled,
  setShowSuggestions,
  onClickSuggestion
}) => {
  const list = useRef(null);
  const { state } = useStore();

  useOutsideClick(list, () => setShowSuggestions(false));

  return (
    <ul className="suggestions" ref={list}>
      {suggestions.map((suggestion, index) => {
        const isDisabled =
          state.filter((item) => item.username === suggestion.username).length >
          0;
        if (isDisabled && !positionsDisabled.includes(index)) {
          setPositionsDisabled(positionsDisabled.concat(index));
        }
        return (
          <li
            className={`suggestion-item ${
              index === activeSuggestion ? "suggestion-active" : ""
            }`}
            key={index}
            disabled={isDisabled}
            onClick={() => onClickSuggestion(suggestion)}
          >
            {renderUserData(suggestion.username, suggestion.email)}
            {isDisabled && <div className="disabled-text">Selected</div>}
          </li>
        );
      })}
    </ul>
  );
};

export default SuggestionsList;
