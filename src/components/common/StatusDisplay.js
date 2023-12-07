import React, {useEffect} from 'react';

const StatusDisplay = ({ message, setMessage }) => {

    useEffect(() => {
       setTimeout(() => {
        setMessage('');
       },2000)
    }, [message,setMessage]);

    return(
        <div className="fixed z-40 top-24 w-full">
            <div className="text-center font-bold font-jost text-slate-800 relative w-full max-w-sm mx-auto p-4 border border-slate-500 bg-slate-200 drop-shadow rounded" >
                <p>{message}</p>
            </div>
        </div>
    )
}

export default StatusDisplay;