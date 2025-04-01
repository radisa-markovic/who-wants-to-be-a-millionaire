import Question from "./models/Question";

export const testQuestions: Question[] = [
    {
        id: 1,
        question: "Kako se preziva Stojan koga je BalkanBoy zezao?",
        correctAnswer: "Vasić",
        incorrectAnswers: [
            "Tasić", "Jovanović", "Kisić",
        ]
    },
    {
        id: 2,
        question: "Kako se zove Stojanova žena?",
        correctAnswer: "Dragica",
        incorrectAnswers: [
            "Ružica", "Ljubica", "Mileva",
        ]
    },
    {
        id: 3,
        question: "Koji je glavni grad Butana?",
        correctAnswer: "Timpu",
        incorrectAnswers: [
            "Timbe", "Zinbe", "Bdat Džutim",
        ]
    },
];