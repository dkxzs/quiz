import axios from "../utils/axiosCustomize";

const createNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};

const updateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return axios.delete(`api/v1/participant/`, { data: { id: userId } });
};

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const login = (email, password) => {
  return axios.post("api/v1/login", { email, password, delay: 3000 });
};

const register = (email, password, username) => {
  return axios.post("api/v1/register", { email, password, username });
};

const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
}

const getDataQuiz = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, {...data});
}

export {
  createNewUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUserWithPaginate,
  login,
  register,
  getQuizByUser, 
  getDataQuiz, 
  postSubmitQuiz
};
