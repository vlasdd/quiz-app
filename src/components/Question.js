import React from "react"
import Answer from "./Answer"
import { nanoid } from "nanoid"

export default function Question(props) {
    const answers = props.wrongAnswers
        .slice(0, props.randomIndex)
        .concat(props.correctAnswer, props.wrongAnswers.slice(props.randomIndex, 4))
        .map(elem => {
            return <Answer
                key={nanoid()}
                index={nanoid()}
                id={props.id}
                answer={elem}
                insertIntoState={props.insertIntoState}
                value={props.selectedAnswers[props.id]}
                buttonClicked={props.buttonClicked}
                isCorrect={elem == props.correctAnswer ? true : false}
            />
        })

    return (
        <section>
            <h1 className="big--text">
                {props.question}
            </h1>
            <fieldset>
                {answers}
            </fieldset>
        </section>
    )
}