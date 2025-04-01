import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnswers, getCurrentQuestion, getQuestionIsLoaded, giveAnswer, loadNextQuestion } from './store/quiz';
import { AppDispatch } from './store';
import clsx from 'clsx';

function App() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [givenAnswer, setGivenAnswer] = useState<string | null>(null);
  const correctAnswerButton = useRef<HTMLButtonElement | null>(null);


  const currentQuestion = useSelector(getCurrentQuestion);
  const allAnswers = useSelector(getAllAnswers);
  const questionIsLoaded = useSelector(getQuestionIsLoaded);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadNextQuestion(currentQuestionNumber));            
  }, [currentQuestionNumber]);

  const onAnswerClick = (answerButton: HTMLButtonElement) => {
    setGivenAnswer(answerButton.value);
    console.log(correctAnswerButton.current);
    setTimeout(() => {
      //flash correct answer
      //if answer is correct, load next question
      //if answer is incorrect, show button for new start
      // correctAnswerButton.current!.classList.add("bg-teal-500");
      correctAnswerButton.current!.classList.add("animate-blink");
      correctAnswerButton.current!.classList.add("text-white");
      correctAnswerButton.current!.querySelector('[data-answer_ordinal_character]')?.classList.add("text-white");
      if(givenAnswer === currentQuestion?.correctAnswer)
      {
        alert("Tacan odgovor");
        setTimeout(() => {
          setGivenAnswer(null);
          setCurrentQuestionNumber((oldQuestionNumber) => {
            return oldQuestionNumber + 1;
          })
        }, 3_000);
      }
      else
      {
        alert("Netacan odgovor");
      }
    }, 1_000);
  }

  return (
    <main>
      <h1 className='text-black'>Who wants to be a millionaire?</h1>
      <div>
        {
          ! questionIsLoaded
          ? <p>Loading...</p>
          : (
            <article className='w-4/6 ml-auto mr-auto'>
              <h2 className='text-center text-4xl text-white bg-black mb-2 py-5'>
                {currentQuestion!.question}
              </h2>
              <ol className='grid grid-cols-2 gap-3'>
                {allAnswers!.map((answer, i) => (
                  <li 
                    key={"question--" + answer}
                    className='bg-black group'
                  >
                    <button
                      className={clsx(
                        "flex p-1 w-full text-2xl",
                        givenAnswer === answer
                        ?' bg-amber-500 text-black'
                        : clsx(' bg-black text-white', !givenAnswer && 'hover:cursor-pointer hover:bg-amber-600 hover:text-black')
                      )}
                      value={answer}
                      disabled={givenAnswer !== null}
                      onClick={(event) => onAnswerClick(event.target as HTMLButtonElement)}
                      ref={answer === currentQuestion?.correctAnswer ? correctAnswerButton : null}
                    >
                      <span className={
                        givenAnswer === answer 
                        ? 'text-black group-hover:text-black pointer-events-none'
                        : clsx("text-amber-600", !givenAnswer && "group-hover:text-black")
                      }
                        data-answer_ordinal_character
                      >
                        { String.fromCharCode(65 + i) }:
                      </span>
                      <span className='ml-auto mr-auto pointer-events-none'>
                        {answer}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </article>
          )
        }
      </div>      
    </main>
  )
}

export default App
