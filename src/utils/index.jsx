export const renderUserData = (username, email) => {
  return (
    <div className="user-container">
      <div className="circle" />
      <div className="user-data">
        <div>{username}</div>
        <div className="email">{email}</div>
      </div>
    </div>
  );
};
