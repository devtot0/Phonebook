import React from "react";

const Form = ({onSubmit, nameValue, numberValue, onChangeName, onChangeNumber}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={numberValue} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
