import axios from "../axios";
import MockAdapter from "axios-mock-adapter";
import { uploadFile } from "../services/uploadService";

const mock = new MockAdapter(axios);

describe("uploadFile API", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should upload a file successfully", async () => {
        const mockResponse = {
            errCode: 0,
            errMessage: "Upload successful"
        };

        const file = new Blob(["test file content"], { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", file);

        mock.onPost("/api/upload").reply((config) => {
            expect(config.headers["Content-Type"]).toContain("multipart/form-data");
            return [200, mockResponse];
        });

        const response = await uploadFile(formData);
        expect(response.errCode).toBe(0);
        expect(response.errMessage).toBe("Upload successful");
    });

    it("should handle upload failure", async () => {
        const mockResponse = {
            errCode: 1,
            errMessage: "Upload failed"
        };

        const file = new Blob(["broken content"], { type: "text/plain" });
        const formData = new FormData();
        formData.append("file", file);

        mock.onPost("/api/upload").reply(400, mockResponse);

        try {
            await uploadFile(formData);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toEqual(mockResponse);
        }
    });
});
