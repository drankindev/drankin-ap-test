import React,{useState} from 'react';

const Question = ({question,description,options,onDataFromChild}) => {
    const [status,setStatus] = useState('');
    const [selected, setSelected] = useState();

    return (
        <>
            <div className={`form-input ${status}`}>
                <h3 className="text-zinc-800 mb-1 text-base font-semibold font-['Figtree'] leading-normal">{question}</h3>
                <p className="text-stone-500 mb-3 text-sm font-normal font-['Figtree']">{description}</p>
                <div>
                {options.map((option, index)=>
                    <div key={index} className="">
                        <input 
                            type="radio"
                            value={option.id}
                            name="name"
                            onClick={(e) => setSelected(index)}
                        />
                        <span className="w-auto inline-block text-zinc-800 ml-2 text-base font-normal font-['Figtree'] leading-normal">{option.label}</span>
                        {option.followUp && 
                            <div className={`w-full overflow-hidden transition-[height] ${selected === index ? 'h-24' : 'h-0'}`}>
                                <div className="pl-5 pt-2 ml-2 pb-6 border-l border-stone-300 ">
                                    <p className="text-zinc-800 mb-2 text-sm font-normal font-['Figtree'] leading-tight">{option.followUp}</p>
                                    <div className="input-wrapper border-stone-300">
                                        <input className="text-zinc-400 text-base font-normal font-['Figtree'] leading-normal" type="text" value="0"/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )}
                </div>
            </div>
        </>
    )
}

export default Question;
