import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { getCurrentQuestionNumber, useFiftyFifty } from "../store/quiz";
import { AppDispatch } from "../store";

const Sidebar = () => {
    const questionPrizes: string[] = [
        "1.000", "2.000", "3.000", "4.000", "5.000",
        "10.000", "20.000", "40.000", "80.000", "160.000",
        "320.000", "640.000", "1.125.000", "2.500.000", "5.000.000" 
    ];

    const currentQuestionNumber = useSelector(getCurrentQuestionNumber);
    const dispatch = useDispatch<AppDispatch>();

    const isGuaranteedSum = (questionNumber: number): boolean => {
        return (questionNumber + 1) % 5 === 0;
    }

    const onFiftyFifty = (fiftyFiftyButton: HTMLButtonElement) => {
        fiftyFiftyButton.disabled = true;
        fiftyFiftyButton.classList.add("line-through");
        fiftyFiftyButton.classList.remove("hover:cursor-pointer");
        fiftyFiftyButton.classList.remove("hover:brightness-50");
        dispatch(useFiftyFifty());
    }

    return (
        <aside>
            <header className="grid grid-cols-3 gap-1.5">
                <button 
                    className="text-white rounded-full border-2 border-amber-500 hover:cursor-pointer hover:brightness-50"
                    onClick={(event) => onFiftyFifty(event.target as HTMLButtonElement)}
                >
                    50:50
                </button>
                <button className="text-white rounded-full border-2 border-amber-500">
                    Prijatelj
                </button>
                <button className="text-white rounded-full border-2 border-amber-500">
                    Publika
                </button>
            </header>
            <ul className='flex flex-col-reverse'>
                {questionPrizes.map((questionPrize, index) => (
                    <li 
                        key={"answerPrize--" + index}
                        data-number={index}
                        className={clsx(
                            "grid grid-cols-2 text-2xl",
                            index % 5 === 0 ? "text-white" : "text-amber-500", 
                            currentQuestionNumber === index? "border-2 border-amber-500" : ''
                        )}
                    >
                        <span className={clsx(
                            "text-right mr-4",
                            isGuaranteedSum(index) ? "text-white" : "text-amber-500"
                        )}>
                            {index + 1}
                        </span>
                        <span className={isGuaranteedSum(index) ? "text-white" : "text-amber-500"}>
                            {questionPrize} RSD
                        </span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar