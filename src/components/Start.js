import React from "react";

export default function Start(props){
    return(
        <div className="starting--page">
            <h1>Quizzical</h1>
            <button 
                className="start--button"
                onClick={props.startGame}
            >
                <p>Start quiz</p>
            </button>
        </div>
    )
}