import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { blockOtherAnswers, getAnswerIsGiven, getCorrectAnswer, getCurrentQuestionNumber, getGivenAnswer, giveAnswer, increaseQuestionNumber, loadNextQuestion } from "../store/quiz";
import { AppDispatch } from "../store";

interface AnswerButtonProps
{
    optionLetter: string,
    listedAnswer: string,
    buttonIsCorrect: boolean
}

const AnswerButton = ({ optionLetter, listedAnswer, buttonIsCorrect }: AnswerButtonProps) => {    
    const answerIsGiven = useSelector(getAnswerIsGiven);
    const givenAnswer = useSelector(getGivenAnswer);
    const correctAnswer = useSelector(getCorrectAnswer);
    const currentQuestionNumber = useSelector(getCurrentQuestionNumber);

    const dispatch = useDispatch<AppDispatch>();
    
    const buttonBaseClasses: string = "flex p-1 w-full text-2xl";
    const neutralButtonClasses: string = "text-white bg-black";
    const clickedButtonClasses: string = "text-black bg-amber-600";
    const buttonHoverClasses: string = "hover:cursor-pointer hover:bg-amber-600 hover:text-black";

    const onAnswerClick = (button: HTMLButtonElement) => {
        button.classList.remove(...neutralButtonClasses.split(" "));
        button.classList.add(...clickedButtonClasses.split(" "));
        dispatch(blockOtherAnswers());
        setTimeout(() => {
            dispatch(giveAnswer(button.value));    
            if(button.value === correctAnswer)
            {
                button.classList.add("animate-blink");
                button.classList.add("text-white");
                button.querySelector('[data-answer_ordinal_character]')?.classList.add("text-white");
                setTimeout(() => {
                    dispatch(increaseQuestionNumber());
                    dispatch(loadNextQuestion(currentQuestionNumber + 1));
                }, 3_000);
            }
            else
            {
                console.log("Netacan odgovor");
            }
        }, 2_000);
    }

    return (
        <button
            className={
                clsx(
                    buttonBaseClasses, 
                    answerIsGiven && (givenAnswer === listedAnswer)? clickedButtonClasses : neutralButtonClasses, 
                    !answerIsGiven && buttonHoverClasses,
                    answerIsGiven && buttonIsCorrect && "animate-blink text-white"
                )
            }
            onClick={(event) => onAnswerClick(event.target as HTMLButtonElement)}
            disabled={answerIsGiven}
            value={listedAnswer}
        >
            <span className={
                clsx(
                    "text-amber-600 pointer-events-none", 
                    !answerIsGiven && "group-hover:text-black",
                    (answerIsGiven && givenAnswer === listedAnswer) && "text-black"
                )
            }>
                { optionLetter }:
            </span>
            <span className="ml-auto mr-auto pointer-events-none">
                { listedAnswer }
            </span>
        </button>
    );
}

export default AnswerButton