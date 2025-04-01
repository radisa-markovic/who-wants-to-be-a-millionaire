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
    fiftyFiftyIsUsed: boolean,
    phoneAFriendIsUsed: boolean,
    askAudienceIsUsed: boolean,
    allAnswers: string[]
}

const initialState: QuizState = {
    questionIsLoaded: false,
    currentQuestionNumber: -1,
    loadedQuestion: null,
    answerIsGiven: false,
    fiftyFiftyIsUsed: false,
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
        loadQuestion: (state, action) => {

        },
        giveAnswer: (state, action: PayloadAction<string>) => {
            // alert("Bushongoma");
        },
        useFiftyFifty: (state) => {
            state.fiftyFiftyIsUsed = true;
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
                const allAnswers: string[] = action.payload.incorrectAnswers.concat(action.payload.correctAnswer);
                shuffle(allAnswers)
                console.log(action.payload);
                state.loadedQuestion = action.payload; 
                state.questionIsLoaded = true;
                state.allAnswers = allAnswers;
            }
        );
    }
});

export default quizSlice.reducer;
export const { loadQuestion, giveAnswer } = quizSlice.actions;

export const getCurrentQuestion = (state: RootState) => state.quiz.loadedQuestion;
export const getQuestionIsLoaded = (state: RootState) => state.quiz.questionIsLoaded;
export const getAllAnswers = (state: RootState) => state.quiz.allAnswers;