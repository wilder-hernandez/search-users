import { useStore } from "../../context";
import "./index.css";
import { orderByName, removeUser } from "../../context/reducer";
import { renderUserData } from "../../utils";

const ItemsList = () => {
  const { state, dispatch } = useStore();

  const onClickRemove = (username) => {
    dispatch(removeUser(username));
  };

  const onClickOrderBy = () => {
    dispatch(orderByName());
  };

  return (
    <>
      <div className="title-container">
        <div className="title">Results List</div>
        <div className="order-btn" onClick={() => onClickOrderBy()}>
          Order by name
        </div>
      </div>
      {state?.map((item, index) => {
        return (
          <div key={index} className="item-container">
            {renderUserData(item.username, item.email)}
            <div>
              <button
                className="remove-btn"
                onClick={() => onClickRemove(item.username)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ItemsList;
