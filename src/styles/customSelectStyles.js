export const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "45px",
    backgroundColor: "#1e1e1e",
    borderColor: state.isFocused ? "#A7A7A7" : "#4B4B4B",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#A7A7A7",
    },
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1e1e1e",
    border: "1px solid #4B4B4B",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#A7A7A7"
      : state.isFocused
      ? "#333"
      : "#1e1e1e",
    color: state.isSelected ? "#000" : "#fff",
    cursor: "pointer",
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#333",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: "#ccc",
    ":hover": {
      backgroundColor: "#ff4d4d",
      color: "#fff",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#888",
  }),

  input: (provided) => ({
    ...provided,
    color: "#fff",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};
