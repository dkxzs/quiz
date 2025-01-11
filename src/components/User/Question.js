import _ from "lodash";

const Question = (props) => {
  const { data, index, handleCheckBox } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleChange = (e, aId, qId) => {
    handleCheckBox(aId, qId);
  };

  return (
    <>
      <div className="q-image">
        {data.image && (
          <img
            src={`data:image/jpeg;base64, ${data.image}`}
            className="card-img-top"
            alt="..."
          />
        )}
      </div>

      <div className="question">
        Question {index + 1} : {data.description}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((item, index) => {
            return (
              <div key={`${index}`} className="child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    // name={`question-${data.id}`}
                    checked={item.isSelected}
                    onChange={(e) => handleChange(e, item.id, data.questionId)}
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
