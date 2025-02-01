import axios from "axios";

const API_BASE_URL = "https://typical-deeply-aftershave.glitch.me";

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    username,
    password,
  });
  return response.data;
};

export const fetchQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/questions`);
  return response.data;
};

export const submitQuiz = async (userId, answers) => {
  const response = await axios.post(`${API_BASE_URL}/api/submit`, {
    userId,
    answers,
  });
  return response.data;
};

export const fetchUserResult = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/api/result/${userId}`);
  return response.data;
};