import React,{useState,useRef} from 'react';
import { Down } from '@icon-park/react';

const MultiSelectInput = ({labelText,options,onDataFromChild}) => {

    const [inputValue,setInputValue] = useState({});
    const [display,setDisplay] = useState(false);
    const [status,setStatus] = useState('');
    const inputElement = useRef();

    return (
        <>
            <div className={`form-input ${status}`}>
                <label>{labelText}</label>
                {/* <input 
                    type="button"
                    className="input-wrapper"
                    value={inputValue.label ? inputValue.label : 'Select Multiple'}
                    ref={inputElement}
                    onClick={(e) => {
                        e.preventDefault();
                        setDisplay(!display)
                    }}
                    readOnly
                /> */}
                <button 
                    className="input-wrapper"
                    ref={inputElement}
                    onClick={(e) => {
                        e.preventDefault();
                        setDisplay(!display)
                    }}
                >
                {inputValue.label ? inputValue.label : 'Select Multiple'}
                <Down className="absolute right-2 top-12 text-stone-500"/>
                </button>
                {display &&
                    <div className="inputSelection z-40 absolute top-24">
                        <div className="Frame2430 w-64 px-4 py-2 bg-white rounded-lg shadow border border-gray-600 flex-col justify-center items-center inline-flex">
                            {options.map((value,index) => 
                                <div className="Option w-full text-left text-black py-2 text-base font-normal font-['Figtree'] leading-snug" key={index}>
                                    <input className="inline w-8" type="checkbox" name="name" value={index}/>{value}
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default MultiSelectInput;
