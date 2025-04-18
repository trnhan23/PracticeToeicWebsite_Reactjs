import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import { getComments, createComment, deleteComment } from "../services/commentService";

const mock = new axiosMockAdapter(axios);

describe("Comment Service API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    // ----------------------------
    // Test: createComment
    // ----------------------------
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

    // ----------------------------
    // Test: getComments
    // ----------------------------
    it("should fetch comments based on examId and userId", async () => {
        const examId = 42;
        const userId = 2;

        const mockResponse = [
            {
                id: 38,
                examId: 42,
                userId: 2,
                parentCmtId: 36,
                contentComment: "không",
                cmtDate: "2024-11-24T00:00:00.000Z",
                createdAt: "2024-11-24T07:49:32.000Z",
                updatedAt: "2024-11-24T07:49:32.000Z",
                comment_UserData: {
                    id: 2,
                    fullName: "Nhân Phạm",
                    avatar: "https://i.pravatar.cc/300?img=2"
                }
            }
        ];

        mock.onGet("/api/get-comment", { params: { examId, userId } }).reply(200, mockResponse);

        const response = await getComments(examId, userId);

        expect(response).toEqual(mockResponse);
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ examId, userId });
    });

    it("should return error when fetching comments with invalid examId", async () => {
        const examId = null;
        const userId = 2;

        mock.onGet("/api/get-comment", { params: { examId, userId } }).reply(400, {
            error: "Missing examId",
        });

        try {
            await getComments(examId, userId);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toEqual("Missing examId");
        }

        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ examId, userId });
    });

    // ----------------------------
    // Test: deleteComment
    // ----------------------------
    it("should delete comment successfully", async () => {
        const commentId = 5;
        const currentId = 101;

        mock.onDelete("/api/delete-comment", {
            data: { commentId, currentId }
        }).reply(200, {
            errCode: 0,
            errMessage: `The comment is delete`
        });

        const response = await deleteComment(commentId, currentId);

        expect(response.errMessage).toEqual("The comment is delete");
        expect(response.errCode).toEqual(0);
        expect(mock.history.delete.length).toBe(1);
        expect(JSON.parse(mock.history.delete[0].data)).toEqual({ commentId, currentId });
    });

    it("should return error when deleting comment with invalid ID", async () => {
        const commentId = null;
        const currentId = 101;

        mock.onDelete("/api/delete-comment", {
            data: { commentId, currentId }
        }).reply(200, {
            errCode: 1,
            errMessage: "Missing required parameters!"
        });

        try {
            const response = await deleteComment(commentId, currentId);
            expect(response.errMessage).toEqual("Missing required parameters!");
            expect(response.errCode).toEqual(1);
            expect(mock.history.delete.length).toBe(1);
            expect(JSON.parse(mock.history.delete[0].data)).toEqual({ commentId, currentId });

        } catch (error) {
            expect(error.response.status).toBe(200);
            expect(error.response.errMessage).toBe("Missing required parameters!");
        }
    });
});
