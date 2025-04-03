import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnswers, getCurrentQuestion, getCurrentQuestionNumber, getFiftyFiftyIndeces, getQuestionIsLoaded, increaseQuestionNumber, loadNextQuestion } from './store/quiz';
import { AppDispatch } from './store';
import Sidebar from './components/Sidebar';
import AnswerButton from './components/AnswerButton';

function App() {
  const correctAnswerButton = useRef<HTMLButtonElement | null>(null);

  const currentQuestionNumber = useSelector(getCurrentQuestionNumber);
  const currentQuestion = useSelector(getCurrentQuestion);
  const allAnswers = useSelector(getAllAnswers);
  const fiftyFiftyIndeces = useSelector(getFiftyFiftyIndeces);
  
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadNextQuestion(currentQuestionNumber));            
  }, []);

  return (
    <main className='bg-gray-800'>
      <h1 
        className='text-white text-4xl mt-2 mb-2'
      >
        Who wants to be a millionaire?
      </h1>
      <div className='grid grid-cols-5'>
          <article className='w-4/6 ml-auto mr-auto col-span-4'>
            <h2 className='text-center text-4xl text-white bg-black mb-2 py-5'>
              { currentQuestion?.question }
            </h2>
            <ol className='grid grid-cols-2 gap-3'>
              {allAnswers!.map((answer, i) => (
                <li 
                  key={"question--" + answer}
                  className='bg-black group'
                >
                  {
                    fiftyFiftyIndeces.indexOf(i) === -1 &&
                    <AnswerButton 
                        optionLetter={String.fromCharCode(65 + i)}
                        listedAnswer={answer}
                        buttonIsCorrect={answer === currentQuestion?.correctAnswer}
                    />
                  }
                </li>
              ))}
            </ol>
          </article>
          <Sidebar/>
      </div>      
    </main>
  )
}

export default App
