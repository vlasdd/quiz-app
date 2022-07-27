import React from "react"

export default function Answer(props) {
    return (
        <div>
            <input
                type="radio"
                id={props.index}
                value={props.answer}
                onChange={() => props.insertIntoState(props.answer, props.id)}
                checked={props.answer == props.value}
                name={props.id}
            />
            <label
                htmlFor={props.index}
                className={props.buttonClicked ? props.isCorrect ? "label--correct" : "label--wrong" : "label--chosen"}
            >
                {props.answer}
            </label>
        </div>
    )
}