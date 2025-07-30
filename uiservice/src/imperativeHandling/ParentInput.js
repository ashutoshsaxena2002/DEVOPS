import { useEffect, useRef } from "react";
import CustomInput from "./CustomInput";

const ParentInput = () => {
    const inputRef = useRef();


    const logValue = () => {
        console.log("Input value:", inputRef.current?.getValue());
    }
  

    const focus = () => {
        console.log("Input value:", inputRef.current?.focus());
    }
  

    const clear = () => {
        console.log("Input value:", inputRef.current?.clear());
    }
  

    const alertHi = () => {
        inputRef.current?.alertHi();
    }
  


    return (
      <>
            <CustomInput ref={inputRef} />
            <button onClick={logValue}>{"LOG VALUE"}</button>
            <button onClick={focus}>{"FOCUS VALUE"}</button>
            <button onClick={clear}>{"CLEAR VALUE"}</button>
            <button onClick={alertHi}>{ "ALERT HI"}</button>
    
      </>
    );
};
  

export default ParentInput;
  