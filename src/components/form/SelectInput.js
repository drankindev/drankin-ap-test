import React,{useState,useRef} from 'react';
import { Down } from '@icon-park/react';

const SelectInput = ({labelText,options,onDataFromChild}) => {

    const [inputValue,setInputValue] = useState({});
    const [display,setDisplay] = useState(false);
    const [status,setStatus] = useState('');
    const inputElement = useRef();

    return (
        <>
            <div className={`form-input relative ${status}`}>
                <label>{labelText}</label>
                <button 
                    className="input-wrapper"
                    ref={inputElement}
                    onClick={(e) => {
                        e.preventDefault();
                        setDisplay(!display)
                    }}
                >
                {inputValue.label ? inputValue.label : 'Select...'}
                <Down className="absolute right-2 top-12 text-stone-500"/>
                </button>
                {display &&
                    <div className="inputSelection z-40 absolute top-24">
                        <div className="Frame2430 w-64 px-4 py-2 bg-white rounded-lg shadow border border-gray-600 flex-col justify-center items-center inline-flex">
                            {options.map((value,index) => 
                                <button className="Option w-full text-left text-black py-2 text-base font-normal font-['Figtree'] leading-snug" key={index} onClick={(e) => {
                                    e.preventDefault();
                                    setInputValue({id:index,label:value});
                                    setDisplay(false);
                                }}>
                                    {value}
                                </button>
                            )}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default SelectInput;
