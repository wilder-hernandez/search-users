import { useEffect, useState } from "react";
import { debounceTime, Subject, tap } from "rxjs";
import axios from "axios";
import { useStore } from "../../context";
import { addUser } from "../../context/reducer";
import SuggestionsList from "./components/suggestionsList";
import TextBox from "./components/textBox";
import "./index.css";
import { apiUrl } from "../../utils/constants";

const input$ = new Subject();

const SearchBox = () => {
  const { dispatch } = useStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsFiltered, setSuggestionsFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [positionsDisabled, setPositionsDisabled] = useState([]);

  useEffect(() => {
    const subscription = input$
      .pipe(
        tap((value) => {
          setInputValue(value);
          setEmailValue("");
          if (value.length === 0) {
            setSuggestionsFiltered([]);
            setShowSuggestions(false);
          }
        }),
        debounceTime(2000)
      )
      .subscribe((value) => {
        if (value.length > 0) {
          setLoading(true);
          axios
            .get(apiUrl)
            .then((response) => {
              const suggestions = response.data.results
                .map((item) => ({
                  username: item.login.username,
                  email: item.email
                }))
                .filter(
                  (item) => value === item.username.substring(0, value.length)
                );
              setSuggestionsFiltered(suggestions.slice(0, 3));
              setShowSuggestions(true);
              setPositionsDisabled([]);
            })
            .catch((error) => console.error("Axios error: ", error))
            .finally(() => setLoading(false));
        }
      });
    return () => subscription.unsubscribe();
  }, []);

  const onChange = (e) => {
    input$.next(e.target.value);
  };

  const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 40: //arrow down
        if (activeSuggestion === suggestionsFiltered.length - 1) {
          break;
        }
        setActiveSuggestion(activeSuggestion + 1);
        break;
      case 38: //arrow up
        if (activeSuggestion === 0) {
          break;
        }
        setActiveSuggestion(activeSuggestion - 1);
        break;
      case 13: //enter key
        if (
          !inputValue ||
          !showSuggestions ||
          positionsDisabled.includes(activeSuggestion)
        ) {
          break;
        }
        setInputValue(suggestionsFiltered[activeSuggestion]?.username);
        setEmailValue(suggestionsFiltered[activeSuggestion]?.email);
        setShowSuggestions(false);
        setActiveSuggestion(0);
        dispatch(
          addUser(
            suggestionsFiltered[activeSuggestion].username,
            suggestionsFiltered[activeSuggestion].email
          )
        );
        break;
      case 27: //escape key
        setShowSuggestions(false);
        setActiveSuggestion(0);
        break;
      default:
    }
  };

  const onClickSuggestion = (suggestion) => {
    setInputValue(suggestion.username);
    setEmailValue(suggestion.email);
    setShowSuggestions(false);
    setActiveSuggestion(0);
    dispatch(addUser(suggestion.username, suggestion.email));
  };

  return (
    <div className="container">
      <TextBox
        inputValue={inputValue}
        email={emailValue}
        isActive={suggestionsFiltered.length > 0}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {loading && <div className="empty-suggestions">Fetching data...</div>}
      {!loading &&
        showSuggestions &&
        (suggestionsFiltered.length > 0 ? (
          <SuggestionsList
            suggestions={suggestionsFiltered}
            activeSuggestion={activeSuggestion}
            positionsDisabled={positionsDisabled}
            setShowSuggestions={setShowSuggestions}
            setPositionsDisabled={setPositionsDisabled}
            onClickSuggestion={onClickSuggestion}
          />
        ) : (
          <div className="empty-suggestions">Not matching users</div>
        ))}
    </div>
  );
};

export default SearchBox;
