import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCode,
    verifyEmailAccount,
    sendCode,
    checkSendCode
} from "../services/userService";

const mock = new axiosMockAdapter(axios);

describe("User API functions", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should log in a user successfully", async () => {
        const userEmail = "nhan@gmail.com";
        const userPassword = "123456";

        mock.onPost("/api/login").reply(200, { errCode: 0, message: "ok" });

        const response = await handleLoginApi(userEmail, userPassword);
        console.log("Kiểm tra: ", response);

        expect(response.errCode).toEqual(0);
        expect(response.message).toEqual("ok");
    });

    it("should log in a user fail", async () => {
        const userEmail = "nhan3@gmail.com";
        const userPassword = "12345666";

        mock.onPost("/api/login").reply(200, { errCode: 1 });

        const response = await handleLoginApi(userEmail, userPassword);
        console.log("Kiểm tra: ", response);

        expect(response.errCode).toEqual(1);
    });

    it("should fetch all users with a given ID", async () => {
        const inputId = 1;

        mock.onGet("/api/get-all-users").reply(200, { users: [], errCode: 0 });

        const response = await getAllUsers(inputId);

        expect(response.errCode).toEqual(0);
        expect(response.users).toEqual([]);
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.get[0].params).toEqual({ id: inputId });
    });

    it("should create a new user successfully", async () => {
        const userData = { name: "John Doe", email: "john@example.com", password: "password123" };

        mock.onPost("/api/create-user").reply(200, { errCode: 0, errMessage: "ok" });

        const response = await createNewUserService(userData);

        expect(response.errCode).toEqual(0);
        expect(response.errMessage).toEqual("ok");
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual(userData);
    });

    it("should delete a user successfully", async () => {
        const userId = 1;

        mock.onDelete("/api/delete-user").reply(200, { errCode: 0, errMessage: "ok" });

        const response = await deleteUserService(userId);

        expect(response.errCode).toEqual(0);
        expect(response.errMessage).toEqual("ok");
        expect(mock.history.delete.length).toBe(1);
        expect(JSON.parse(mock.history.delete[0].data)).toEqual({ id: userId });
    });
});
