import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import {
    saveTestResult,
    getTestResult,
    getAllTestResult,
    getDetailTestResult,
    getTitleExam,
    getInfoStatistic
} from "../services/testService";

const mock = new axiosMockAdapter(axios);

describe("Test API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should save test result and return success", async () => {
        const testData = {
            examId: 1,
            userId: 2,
            score: 90,
            answers: {
                "1": "A",
                "2": "B"
            }
        };

        mock.onPost("/api/save-test-result").reply(200, { errCode: 0, errMessage: "ok" });

        const response = await saveTestResult(testData);
        expect(response.errCode).toEqual(0);
        expect(response.errMessage).toEqual("ok");
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].data).toEqual(JSON.stringify(testData));
    });

    it("should fetch test result for a specific exam and user", async () => {
        const examId = 1;
        const userId = 2;

        mock.onGet("/api/get-test-result").reply(200, { result: {}, errCode: 0 });

        const response = await getTestResult(examId, userId);

        expect(response.errCode).toEqual(0);
        expect(response.result).toEqual({});
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ examId, userId });
    });

    it("should fetch all test results for a user", async () => {
        const userId = 2;

        mock.onGet("/api/get-all-test-result").reply(200, { results: [], errCode: 0 });

        const response = await getAllTestResult(userId);

        expect(response.errCode).toEqual(0);
        expect(response.results).toEqual([]);
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ userId });
    });

    it("should fetch detailed test result for a test ID", async () => {
        const testId = 18;

        mock.onGet("/api/get-detail-test-result").reply(200, { details: {}, errCode: 1 });

        const response = await getDetailTestResult(testId);

        expect(response.errCode).toEqual(1);
        expect(response.details).toEqual({});
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ testId });
    });

    it("should fetch exam title for a test ID", async () => {
        const testId = 10;

        mock.onGet("/api/get-title-exam").reply(200, { title: "Test Exam", errCode: 0 });

        const response = await getTitleExam(testId);
        expect(response.errCode).toEqual(0);
        expect(response.title).toEqual("Test Exam");
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ testId });
    });

    it("should fetch statistics info for a user by type", async () => {
        const userId = 2;
        const type = "LIS";

        mock.onGet("/api/get-info-statistic").reply(200, { statistics: {}, errCode: 0 });

        const response = await getInfoStatistic(userId, type);
        expect(response.errCode).toEqual(0);
        expect(response.statistics).toEqual({});
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ userId, type });
    });
});
