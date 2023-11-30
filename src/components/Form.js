import React from 'react';
import TextInput from './form/TextInput';
import DateInput from './form/DateInput';
import SelectInput from './form/SelectInput';
import MultiSelectInput from './form/MultiSelectInput';
import Question from './form/Question';

const Form = () => {

    const selectOptions = ['Option 1','Option 2','Option 3','Option 4'];
    const multiOptions = ['Multi-select 1','Multi-select 2','Multi-select 3'];
    const questionOptions = [
        {id: 0, label: 'Yes', followUp: 'Follow up question'},
        {id: 1, label: 'No'}, 
    ]

    function formSubmit (e) {
        e.preventDefault();
    }
    
    return (
        <form className="w-full p-8 bg-white shadow">
            <h2 className="SectionHeader w-full pb-1 mb-8 border-b border-gray-200 inline-block text-black text-xl font-bold font-['Playfair-Display']">Section header</h2>
       
            <div className="form-group">
                <TextInput labelText="Text field" value=""/>
            </div>

            <div className="form-group">
                <DateInput labelText="Date" value=""/>
                <TextInput labelText="Oops" value=""/>
            </div>

            <div className="form-group">
                <SelectInput labelText="Dropdown Select" options={selectOptions}/>
                <MultiSelectInput labelText="Multi-select" options={multiOptions}/>
            </div>

            <div className="form-group">
                <Question question="Question goes here" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." options={questionOptions}/>
            </div>

            <div className="w-full fixed z-30 bottom-0 left-0 h-24 p-6 bg-white shadow flex-col justify-start items-end gap-2.5 inline-flex">
                <button onClick={(e) => formSubmit(e)} className="w-4/5 mx-auto sm:w-auto sm:mx-0 sm:right px-12 py-4 bg-blue-950 hover:bg-blue-900 rounded-full text-center text-white text-base font-bold font-['Figtree']">Submit</button>
            </div>
        </form>
    )
}

export default Form;