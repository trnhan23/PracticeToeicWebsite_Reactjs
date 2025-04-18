import axios from "../axios";
import MockAdapter from "axios-mock-adapter";
import {
    createSituationApi,
    createQuestionOrAnswerApi,
    createQuestionOrAnswerApi1
} from "../services/geminiService";

const mock = new MockAdapter(axios);

describe("Gemini API", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should create a situation with topic", async () => {
        const topic = "travel";
        const mockResponse = { situation: "You are at the airport..." };

        mock.onPost("/api/gemini-situation", { topic }).reply(200, mockResponse);

        const response = await createSituationApi(topic);

        expect(response).toEqual(mockResponse);
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual({ topic });
    });

    it("should create a question or answer with text", async () => {
        const text = "How are you?";
        const mockResponse = { answer: "I'm fine, thank you!" };

        mock.onPost("/api/gemini-questionandanswer", { text }).reply(200, mockResponse);

        const response = await createQuestionOrAnswerApi(text);

        expect(response).toEqual(mockResponse);
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual({ text });
    });

    it("should create Q&A with text, situation, and question", async () => {
        const text = "Introduce yourself";
        const situation = "Job interview";
        const question = "Can you tell me about yourself?";
        const mockResponse = { answer: "I'm a software developer..." };

        mock.onPost("/api/gemini-questionandanswer1", { text, situation, question }).reply(200, mockResponse);

        const response = await createQuestionOrAnswerApi1(text, situation, question);

        expect(response).toEqual(mockResponse);
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual({ text, situation, question });
    });
});
