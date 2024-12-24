import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import { getSearchVocabularyApi } from "../services/vocabularyService";

const mock = new axiosMockAdapter(axios);

describe("API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should return data with status 200 for search vocabulary API", async () => {
        const word = "apple";
        const language = "en";

        mock.onGet("/api/search-vocabulary", { params: { word, language } }).reply(200, { data: "mocked data" });

        const response = await getSearchVocabularyApi(word, language);
        console.log("Kiểm tra: ", response);

        expect(response.data).toEqual("mocked data");
        expect(mock.history.get.length).toBe(1);
    });

});
