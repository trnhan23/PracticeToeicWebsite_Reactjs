import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import {
    getAllExams,
    get8LatestExams,
    createExam,
    practiceExam,
    getAnswerExam,
    getAnswerByPart,
    getExam
} from "../services/examService";

const mock = new axiosMockAdapter(axios);

describe("Exam API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should fetch all exams with correct parameters", async () => {
        const cateExamId = 1;
        const userId = 2;
        const page = 1;

        mock.onGet("/api/get-all-exam").reply(200, { exams: [], errCode: 0 });
        const response = await getAllExams(cateExamId, userId, page);
        expect(response.errCode).toEqual(0);
    });

    it("should fetch 8 latest exams", async () => {
        mock.onGet("/api/get-latest-exam").reply(200, { exams: [], errCode: 0 });

        const response = await get8LatestExams();
        expect(response.errCode).toEqual(0);
        expect(response.exams).toEqual([]);
    });

    it("should create an exam and return success", async () => {
        const examData = { name: "New Exam", description: "Test Exam" };

        mock.onPost("/api/create-exam").reply(200, { errCode: 0, errMessage: "ok" });

        const response = await createExam(examData);
        expect(response.errCode).toEqual(0);
        expect(response.errMessage).toEqual("ok");
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].data).toEqual(JSON.stringify(examData));
    });

    it("should fetch practice exam data by examId and questionType", async () => {
        const examId = 1;
        const questionType = "Part 1";

        mock.onGet("/api/get-practice-exam").reply(200, { questions: [], errCode: 0 });
        const response = await practiceExam(examId, questionType);
        expect(response.errCode).toEqual(0);
        expect(response.questions).toEqual([]);
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ examId, questionType });
    });

    it("should fetch answers for an exam", async () => {
        const examId = 1;

        mock.onGet("/api/get-answer-exam").reply(200, { answers: {}, errCode: 0 });

        const response = await getAnswerExam(examId);

        expect(response.errCode).toEqual(0);
        expect(response.answers).toEqual({});
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ examId });
    });

    it("should fetch answers by part for an exam", async () => {
        const examId = 1;
        const part = "Part 1";

        mock.onGet("/api/get-answer-by-part").reply(200, { answers: {}, errCode: 0 });

        const response = await getAnswerByPart(examId, part);

        expect(response.errCode).toEqual(0);
        expect(response.answers).toEqual({});
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ examId, part });
    });

    it("should fetch exam details by examId", async () => {
        const examId = 1;

        mock.onGet("/api/get-exam").reply(200, { exam: {}, errCode: 0 });

        const response = await getExam(examId);
        expect(response.errCode).toEqual(0);
        expect(response.exam).toEqual({});
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ examId });
    });
});
