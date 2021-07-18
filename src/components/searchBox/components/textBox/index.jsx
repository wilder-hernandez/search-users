import "./index.css";

const TextBox = ({ inputValue, email, isActive, onChange, onKeyDown }) => {
  return (
    <>
      <div>Add User</div>
      <div>
        <div
          className={`circle circle-position ${
            isActive ? "circle-blue" : "circle-grey"
          }`}
        />
        {email && <div className="text-box-email">{email}</div>}
        <input
          className="input-box"
          value={inputValue}
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      </div>
    </>
  );
};

export default TextBox;
