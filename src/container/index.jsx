import SearchBox from "../components/searchBox";
import ItemsList from "../components/itemsList";
import "./index.css";

const App = () => {
  return (
    <div className="container-app">
      <SearchBox />
      <ItemsList />
    </div>
  );
};

export default App;
