import axios from "../axios";
import MockAdapter from "axios-mock-adapter";
import {
    getAllTopics,
    deleteTopic,
    createTopic,
    updateTopic
} from "../services/topicService";

const mock = new MockAdapter(axios);

describe("Topic API", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should fetch all topics with id", async () => {
        const mockResponse = {
            errCode: 0,
            errMessage: "ok",
            topics: [
                {
                    "id": 1,
                    "title": "Work",
                    "image": "https://res.cloudinary.com/practicetoeic/image/upload/v1743725671/uploads/wid9zxoarkoiporfjozt.jpg",
                    "createdAt": "2025-03-21T03:28:11.000Z",
                    "updatedAt": "2025-04-04T00:06:55.000Z"
                },
                {
                    "id": 2,
                    "title": "Travel",
                    "image": "https://res.cloudinary.com/practicetoeic/image/upload/v1743725682/uploads/ntvv5ps2n8hvh5gmr1bp.jpg",
                    "createdAt": "2025-03-21T05:56:08.000Z",
                    "updatedAt": "2025-04-04T00:07:06.000Z"
                }
            ]
        };
        const id = 1;

        mock.onGet("/api/get-topics", { params: { id } }).reply(200, mockResponse);

        const response = await getAllTopics(id);
        expect(response.errCode).toBe(0);
        expect(response.topics).toEqual(mockResponse.topics);
    });

    it("should delete a topic by id", async () => {
        const mockResponse = {
            errCode: 0,
            errMessage: `Topic deleted successfully`
        };
        const id = 1;

        mock.onDelete("/api/delete-topic", { data: { id } }).reply(200, mockResponse);

        const response = await deleteTopic(id);
        expect(response.errCode).toBe(0);
        expect(response.errMessage).toBe("Topic deleted successfully");
    });

    it("should create a topic with title and file", async () => {
        const mockResponse = {
            errCode: 0,
            errMessage: "Topic created successfully"
        };

        const title = "New Topic";
        const file = new Blob(["dummy content"], { type: "text/plain" });

        mock.onPost("/api/create-topic").reply((config) => {
            const formData = config.data;
            return [200, mockResponse];
        });

        const response = await createTopic(title, file);
        expect(response.errCode).toBe(0);
        expect(response.errMessage).toBe("Topic created successfully");
    });

    it("should update a topic with title and file", async () => {
        const mockResponse = {
            errCode: 0,
            errMessage: "Topic updated successfully"
        };

        const id = 1;
        const title = "Updated Title";
        const file = new Blob(["new content"], { type: "text/plain" });

        mock.onPut("/api/update-topic").reply((config) => {
            return [200, mockResponse];
        });

        const response = await updateTopic(id, title, file);
        expect(response.errCode).toBe(0);
        expect(response.errMessage).toBe("Topic updated successfully");
    });

    it("should update a topic without file", async () => {
        const mockResponse = {
            errCode: 3,
            errMessage: "Failed to upload image!"
        };

        const id = 2;
        const title = "Only Title";

        mock.onPut("/api/update-topic").reply((config) => {
            return [200, mockResponse];
        });

        const response = await updateTopic(id, title, null);
        expect(response.errCode).toBe(3);
        expect(response.errMessage).toBe("Failed to upload image!");
    });
});
