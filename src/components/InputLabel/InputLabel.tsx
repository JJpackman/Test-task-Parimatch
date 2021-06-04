import React from "react";

type InputLabelProps = {
  text: React.ReactNode;
  children?: React.ReactNode;
};

const InputLabel: React.FC<InputLabelProps> = ({ text, children }) => {
  return (
    <label>
      {text}
      {children}
    </label>
  );
};

export default InputLabel;
