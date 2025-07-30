import React, { useRef, useImperativeHandle, forwardRef } from "react";

const CustomInput = (props, ref) => {

    
    
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus(),
        getValue: () => inputRef.current.value,
        clear: () => inputRef.current.value = "",
        alertHi:()=> alert("HI"),
    }));

    return <>
    
        {/* <input ref={ref} type="text" />; */}
        <input ref={inputRef} type="text" />
    </>
};

export default forwardRef(CustomInput);
