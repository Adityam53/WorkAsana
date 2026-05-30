const Button = ({ name, func }) => {
  return (
    <>
      <button className="btn-nav" onClick={func}>
        {name}
      </button>
    </>
  );
};
export default Button;
