import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import { createFlashcard } from "../services/flashcardService";

const mock = new axiosMockAdapter(axios);

describe("Flashcard API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should create a flashcard and return data with status 200", async () => {
        const flashcardData = {
            userId: 1,
            flashcardName: "My Flashcard",
            description: "This is a test flashcard",
        };

        mock.onPost("/api/create-flashcard").reply(200, { errCode: 0, errMessage: "Success" });

        const response = await createFlashcard(flashcardData);
        console.log("Kiểm tra: ", response);

        expect(response.errCode).toEqual(0);
        expect(response.errMessage).toEqual("Success");
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].data).toEqual(JSON.stringify(flashcardData));
    });
});
