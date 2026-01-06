const Button = ({ name, func }) => {
  return (
    <>
      <button className="search-btn" onClick={func}>
        {name}
      </button>
    </>
  );
};
export default Button;
