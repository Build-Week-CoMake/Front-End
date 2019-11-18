import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL: "https://backend-buildweek.herokuapp.com",
        headers: {
            auth: token
        }
    })
};

export default axiosWithAuth;