import axios from "../axios";
import MockAdapter from "axios-mock-adapter";
import { importFileExam } from "../services/questionAndAnswerService";

const mock = new MockAdapter(axios);

const sampleData = [
    {
        audioFile: "audio1.mp3",
        images: "image1.png",
        text: "This is a passage about Japan.",
        questionType: "multiple-choice",
        examId: 1,
        questions: [
            {
                numberQuestion: 1,
                questionText: "What is the capital of Japan?",
                answerA: "Tokyo",
                answerB: "Beijing",
                answerC: "Seoul",
                answerD: "Bangkok",
                correctAnswer: "A",
            },
        ],
    },
    {
        audioFile: "audio2.mp3",
        images: "image2.png",
        text: "This is a passage about the solar system.",
        questionType: "multiple-choice",
        examId: 2,
        questions: [
            {
                numberQuestion: 1,
                questionText: "Which planet is closest to the Sun?",
                answerA: "Venus",
                answerB: "Mars",
                answerC: "Mercury",
                answerD: "Jupiter",
                correctAnswer: "C",
            },
            {
                numberQuestion: 2,
                questionText: "How many planets are in our solar system?",
                answerA: "7",
                answerB: "8",
                answerC: "9",
                answerD: "10",
                correctAnswer: "B",
            },
        ],
    },
];

describe("importFileExam API", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should import exam data successfully", async () => {
        const mockResponse = {
            errCode: 0,
            errMessage: "ok",
        };

        mock.onPost("/api/import-exam", sampleData).reply(200, mockResponse);

        const response = await importFileExam(sampleData);

        expect(response.errCode).toBe(0);
        expect(response.errMessage).toBe("ok");
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual(sampleData);
    });

    it("should return error if data is empty", async () => {
        const mockErrorResponse = {
            errCode: 1,
            errMessage: "No data",
        };

        mock.onPost("/api/import-exam", []).reply(400, mockErrorResponse);

        try {
            await importFileExam([]);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toEqual(mockErrorResponse);
        }
    });
});
