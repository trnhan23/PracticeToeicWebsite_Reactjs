import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import { getAllCategoryExams } from "../services/categoryExamService";

const mock = new axiosMockAdapter(axios);

describe("Category Exam Service API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    describe("getCategoryExams", () => {
        it("should successfully fetch category exams with status 200", async () => {
            const mockData = [
                {
                    id: 1,
                    userId: 1,
                    titleCategoryExam: "2018",
                    createdAt: "2024-10-08T06:52:11.000Z",
                    updatedAt: "2024-10-08T06:52:11.000Z"
                },
                {
                    id: 2,
                    userId: 1,
                    titleCategoryExam: "2019",
                    createdAt: "2024-10-08T06:52:11.000Z",
                    updatedAt: "2024-10-08T06:52:11.000Z"
                },
            ];

            mock.onGet("/api/get-all-category-exam").reply(200, {
                errCode: 0,
                errMessage: "ok",
                cateExams: mockData,
            });

            const response = await getAllCategoryExams();

            expect(response.cateExams).toEqual(mockData);
            expect(mock.history.get.length).toBe(1);
        });

        it("should return an error when fetching category exams fails", async () => {
            mock.onGet("/api/get-all-category-exam").reply(500, { error: "Internal Server Error" });

            try {
                await getAllCategoryExams();
            } catch (error) {
                expect(error.response.status).toBe(500);
                expect(error.response.data.error).toEqual("Internal Server Error");
            }
            expect(mock.history.get.length).toBe(1);
        });
    });
});