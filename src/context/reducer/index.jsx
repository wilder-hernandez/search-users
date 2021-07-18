export const reducer = (state = [], action) => {
  switch (action.type) {
    case "@user/create":
      return state.concat(action.payload);
    case "@user/remove":
      return state.filter((item) => item.username !== action.payload);
    case "@user/orderByName":
      return state
        .filter((item) => item)
        .sort((x, y) => (x.username > y.username ? 1 : -1));
    default:
      return state;
  }
};

export const addUser = (username, email) => {
  return {
    type: "@user/create",
    payload: {
      username,
      email
    }
  };
};

export const removeUser = (username) => {
  return {
    type: "@user/remove",
    payload: username
  };
};

export const orderByName = () => {
  return {
    type: "@user/orderByName"
  };
};
