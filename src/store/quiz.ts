import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Question from "../models/Question";
import { testQuestions } from "../data";
import { RootState } from "./index";

interface QuizState
{
    questionIsLoaded: boolean,
    currentQuestionNumber: number,
    loadedQuestion: Question | null,
    answerIsGiven: boolean,
    givenAnswer: string | null,
    fiftyFiftyIsUsed: boolean,
    fiftyFiftyWrongAnswerIndeces: number[],
    phoneAFriendIsUsed: boolean,
    askAudienceIsUsed: boolean,
    allAnswers: string[]
}

const initialState: QuizState = {
    questionIsLoaded: false,
    currentQuestionNumber: 0, //zero based index, adds 1 when loaded
    loadedQuestion: null,
    answerIsGiven: false,
    givenAnswer: null,
    fiftyFiftyIsUsed: false,
    fiftyFiftyWrongAnswerIndeces: [],
    phoneAFriendIsUsed: false,
    askAudienceIsUsed: false,
    allAnswers: []
};

function shuffle(array: any[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

export const loadNextQuestion = createAsyncThunk(
    "quiz/loadNextQuestion",
    async (questionNumber: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1_000));
        return testQuestions[questionNumber];
    }
);

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        newGame: (state) => {
            state = initialState;
        },
        blockOtherAnswers: (state) => {
            state.answerIsGiven = true;
        },
        giveAnswer: (state, action: PayloadAction<string>) => {
            state.answerIsGiven = true;
            state.givenAnswer = action.payload;
        },
        increaseQuestionNumber: (state) => {
            state.currentQuestionNumber += 1;
            state.answerIsGiven = false;
        },
        useFiftyFifty: (state) => {
            state.fiftyFiftyIsUsed = true;
            let randomIndex: number = Math.floor(Math.random() * 10) % state.allAnswers.length;//amount of answers
            let indecesToBeRemoved: number[] = [];
            while(indecesToBeRemoved.length !== 2)
            {
                //this is to not include the correct answer and to insert a same value twice
                if(
                    state.allAnswers[randomIndex] !== state.loadedQuestion?.correctAnswer &&
                    indecesToBeRemoved[0] !== randomIndex
                )
                    indecesToBeRemoved.push(randomIndex);
                randomIndex = Math.floor(Math.random() * 10) % state.allAnswers.length;
            }

            state.fiftyFiftyWrongAnswerIndeces = indecesToBeRemoved;                        
        },
        usePhoneAFriend: (state) => {
            state.phoneAFriendIsUsed = true;
        },
        useAskAudience: (state) => {
            state.askAudienceIsUsed = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            loadNextQuestion.pending,
            (state) => {
                state.questionIsLoaded = false;
            }
        ).addCase(
            loadNextQuestion.fulfilled,
            (state, action: PayloadAction<Question>) => {
                state.fiftyFiftyWrongAnswerIndeces = [];
                const allAnswers: string[] = action.payload.incorrectAnswers.concat(action.payload.correctAnswer);
                shuffle(allAnswers)
                state.loadedQuestion = action.payload; 
                state.questionIsLoaded = true;
                state.allAnswers = allAnswers;
            }
        );
    }
});

export default quizSlice.reducer;
export const { giveAnswer, increaseQuestionNumber, useFiftyFifty, blockOtherAnswers, newGame } = quizSlice.actions;

export const getCurrentQuestion = (state: RootState) => state.quiz.loadedQuestion;
export const getQuestionIsLoaded = (state: RootState) => state.quiz.questionIsLoaded;
export const getAllAnswers = (state: RootState) => state.quiz.allAnswers;
export const getCurrentQuestionNumber = (state: RootState) => state.quiz.currentQuestionNumber;
export const getFiftyFiftyIndeces = (state: RootState) => state.quiz.fiftyFiftyWrongAnswerIndeces;
export const getAnswerIsGiven = (state: RootState) => state.quiz.answerIsGiven;
export const getGivenAnswer = (state: RootState) => state.quiz.givenAnswer;
export const getCorrectAnswer = (state: RootState) => state.quiz.loadedQuestion?.correctAnswer;