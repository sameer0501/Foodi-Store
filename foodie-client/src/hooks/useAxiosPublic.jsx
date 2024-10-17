import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://foodi-website-sever.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
