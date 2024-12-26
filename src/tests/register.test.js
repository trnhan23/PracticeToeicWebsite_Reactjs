import axios from "../axios";
import axiosMockAdapter from "axios-mock-adapter";
import { createNewUserService } from "../services/userService";
import { ROLE } from "../utils";

const mock = new axiosMockAdapter(axios);

describe("Register User API", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should successfully register a new user with status 200", async () => {
        const mockUserData = {
            fullName: "John Doe",
            email: "johndoe@example.com",
            password: "StrongPassword123",
            avatar: "https://i.pravatar.cc/300?img=2",
            roleId: ROLE.User,
        };

        const mockResponse = {
            errCode: 0,
            message: "User registered successfully!",
        };

        mock.onPost("/api/create-user").reply(200, mockResponse);

        const response = await createNewUserService(mockUserData);

        expect(response.errCode).toBe(0);
        expect(response.message).toBe("User registered successfully!");
        expect(mock.history.post.length).toBe(1);
        expect(JSON.parse(mock.history.post[0].data)).toEqual(mockUserData);
    });

    it("should return an error message when email already exists", async () => {
        const mockUserData = {
            fullName: "Jane Doe",
            email: "janesdoe@example.com",
            password: "Password123",
            avatar: "https://i.pravatar.cc/300?img=3",
            roleId: ROLE.User,
        };

        const mockErrorResponse = {
            errCode: 1,
            message: "Email already exists!",
        };

        mock.onPost("/api/create-user").reply(400, mockErrorResponse);

        try {
            await createNewUserService(mockUserData);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("Email already exists!");
        }
    });
});
