import React,{useState,useRef} from 'react';
import calImage from '../../assets/calendar.png';
import { Calendar } from '@icon-park/react';

const DateInput = ({labelText,value,onDataFromChild}) => {

    const [inputValue,setInputValue] = useState(value);
    const [display,setDisplay] = useState(false);
    const [status,setStatus] = useState('');
    const inputElement = useRef();

    return (
        <>
            <div className={`form-input ${status}`}>
                <label>{labelText}</label>
                <div className="input-wrapper">
                    <input 
                        type="text"
                        value={inputValue}
                        placeholder='mm/dd/yyyy'
                        ref={inputElement}
                        onFocus={(e) => setDisplay(true)}
                        onBlur={(e) => setDisplay(false)}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={(e) => {
                        e.preventDefault();
                        inputElement.current.focus()
                    }}>
                        <Calendar className="text-stone-500"/>
                    </button>
                </div>
                {display &&
                    <div className="inputSelection z-40 absolute top-24">
                        <div className="Frame2430 w-64 h-64 p-2 bg-white rounded-lg shadow border border-gray-600 flex-col justify-center items-center inline-flex">
                            <img className="Image1 w-60 h-64" alt="Calendar placeholder" src={calImage} />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default DateInput;
