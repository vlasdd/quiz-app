import React from "react"
import Start from "./components/Start"
import Question from "./components/Question"
import { nanoid } from "nanoid"

export default function App() {
    const [gameStarted, setGameStarted] = React.useState(false);
    const [allData, setAllData] = React.useState([]);
    const [randomIndexes, setRandomIndexes] = React.useState([-1, -1, -1, -1, -1]);
    const [selectedAnswers, setSelectedAnswers] = React.useState(["", "", "", "", ""]);
    const [buttonClicked, setButtonClicked] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [playAgain, setPlayAgain] = React.useState(false)

    React.useEffect(() => {
        setRandomIndexes(prevArr => prevArr.map(elem => Math.floor(Math.random() * 4)))
        fetch("https://opentdb.com/api.php?amount=5&category=22&type=multiple")
            .then(res => res.json())
            .then(res => setAllData(res.results))
    }, [playAgain])

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function startGame() {
        setGameStarted(prevValue => !prevValue);
    }

    function insertIntoState(val, index) {
        setSelectedAnswers(prevArr => prevArr.reduce((arr, elem, counter) => {
            counter == index ? arr.push(val) : arr.push(elem)
            return arr
        }, []))
    }

    function showAnswers() {
        setButtonClicked(prevValue => !prevValue);
        setScore(allData.reduce((counter, elem, index) => {
            decodeHtml(elem.correct_answer) == selectedAnswers[index] && counter++
            return counter;
        }, 0));
    }

    function gameAgain() {
        setButtonClicked(prevValue => !prevValue);
        setPlayAgain(prevValue => !prevValue)
    }

    const questions = allData.map((elem, index) => {
        return <Question
            key={nanoid()}
            randomIndex={randomIndexes[index]}
            id={index}
            question={decodeHtml(elem.question)}
            wrongAnswers={elem.incorrect_answers.map(elem => {
                return decodeHtml(elem)
            })}
            correctAnswer={decodeHtml(elem.correct_answer)}
            insertIntoState={insertIntoState}
            selectedAnswers={selectedAnswers}
            buttonClicked={buttonClicked}
        />
    })

    return (
        !gameStarted ?
            <Start startGame={startGame} /> :
            <main>
                <div className="questions--container">
                    {questions}
                </div>
                <div className="score--button">
                    {buttonClicked &&
                        <p className="big--text">You scored {score}/5 correct answers</p>
                    }
                    <button
                        className="start--button"
                        onClick={buttonClicked ? gameAgain : showAnswers}>
                        <p>{buttonClicked ? "Play again" : "Check answers"}</p>
                    </button>
                </div>
            </main>
    )
}