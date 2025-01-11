import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let description = null,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              description = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return {
            questionId: key,
            answers,
            description,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };
  const handleNext = () => {
    if (index < dataQuiz.length - 1) {
      setIndex(index + 1);
    }
  };
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.questionId;
        let userAnswerId = [];
        item.answers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswerId.push(answer.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId,
        });
      });
      payload.answers = answers;
      let res = await postSubmitQuiz(payload);
      if (res && res.EC === 0) {
        setDataModalResult({
          totalCorrect: res.DT.countCorrect,
          totalQuestion: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setShowModalResult(true);
      } else {
      }
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    setDataQuiz((prevDataQuiz) => {
      let dataQuizCopy = _.cloneDeep(prevDataQuiz);
      let question = dataQuizCopy.find(
        (item) => +item.questionId === +questionId
      );
      if (question && question.answers) {
        question.answers = question.answers.map((item) => {
          if (+item.id === +answerId) {
            item.isSelected = !item.isSelected;
          }
          return item;
        });
      }
      let index = dataQuizCopy.findIndex(
        (item) => +item.questionId === +questionId
      );
      if (index !== -1) {
        dataQuizCopy[index] = question;
      }
      return dataQuizCopy;
    });
  };

  return (
    <div className="detailQuiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId} : {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="question-body"></div>
        <div className="question-content">
          <Question
            index={index}
            handleCheckBox={handleCheckBox}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary ml-3" onClick={handlePrev}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
          <button className="btn btn-warning" onClick={handleFinish}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">hehehe</div>
      <ModalResult
        show={isShowModalResult}
        setShow={setShowModalResult}
        dataModalResult={dataModalResult}
      />
    </div>
  );
};

export default DetailQuiz;
