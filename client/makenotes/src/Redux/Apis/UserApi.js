import axios from "axios";

export const axioxInstance = axios.create({
    baseURL: "http://localhost:5000",
});

axioxInstance.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
    }
    return req;
});

// signup

const UserSignup = async(SignUpdata) => {
    const response = await axioxInstance.post("/api/auth/signup", SignUpdata);

    return response.data;
};

// login in
const UserLogin = async(LoginData) => {
    const response = await axioxInstance.post(`/api/auth/signin`, LoginData);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const AuthService = { UserLogin, UserSignup };

export default AuthService;