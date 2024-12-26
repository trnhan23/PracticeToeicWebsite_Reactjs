import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import { createComment } from "../services/commentService";

const mock = new axiosMockAdapter(axios);

describe("API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should successfully create a new comment with status 200", async () => {
        const commentData = {
            examId: 1,
            userId: 101,
            parentCmtId: null,
            contentComment: "This is a test comment",
        };

        mock.onPost("/api/create-comment").reply(200, { data: "Comment added successfully!" });

        const response = await createComment(commentData);

        expect(response.data).toEqual("Comment added successfully!");
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual(commentData);
    });

    it("should return an error when creating a comment with invalid data", async () => {
        const invalidCommentData = {
            examId: null,
            userId: 101,
            parentCmtId: null,
            contentComment: "",
        };

        mock.onPost("/api/create-comment").reply(400, { error: "Invalid comment data!" });

        try {
            await createComment(invalidCommentData);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toEqual("Invalid comment data!");
        }
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual(invalidCommentData);
    });
});
