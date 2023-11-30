import React,{useState} from 'react';

const TextInput = ({labelText,value,onDataFromChild}) => {

    const [inputValue,setInputValue] = useState(value);
    const [status,setStatus] = useState('');

    return (
        <>
            <div className={`form-input ${status}`}>
                {labelText && <label>{labelText}</label> }
                <div className="input-wrapper">
                    <input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
                <span className="error-message">Error</span>
            </div>
        </>
    )
}

export default TextInput;
