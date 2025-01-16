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
};

const getDataQuiz = (quizId) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

const createNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post(`api/v1/quiz`, data);
};

const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

const updateQuiz = (id, description, name, difficulty, quizImage) => {
  let data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put(`api/v1/quiz`, data);
};

const deleteQuiz = (userId) => {
  return axios.delete(`api/v1/quiz/${userId}`);
};

const createNewQuestionForQuiz = (quiz_id, description, image) => {
  let data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image);
  return axios.post("api/v1/question", data);
};

const createNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};

const assignQuizToUser = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};

const upsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};

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
  postSubmitQuiz,
  createNewQuiz,
  getAllQuizForAdmin,
  updateQuiz,
  deleteQuiz,
  createNewQuestionForQuiz,
  createNewAnswerForQuestion,
  assignQuizToUser,
  getQuizWithQA,
  upsertQA,
};
