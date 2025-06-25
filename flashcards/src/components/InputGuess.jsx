import React from "react";
import { Component, useState, useEffect } from "react";
import './InputGuess.css';

const InputGuess = ({answer, input, onChange}) => {
    const [checkAnswer, setCheckedAnswer] = useState('');

    const onCheckAnswer = () => {
        if (input.trim().toLowerCase() != answer.toLowerCase()) {
            setCheckedAnswer('wrong');
            alert("Wrong!");
          }
          else {
            setCheckedAnswer("correct");
            alert("Correct!");
          }
    }

    return(
        <div className="submitContainer">
            <form>
                <input
                type="text"
                value={input}
                placeholder="Guess the species..."
                onChange={onChange}
                className={"inputBox"}
                />
            </form>

            <button
            onClick={onCheckAnswer}
            className="submitButton"
            >Submit</button>
        </div>
    )
}

export default InputGuess;