import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import videoHomepage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">{t("homepage.title1")}</div>
        <div className="title-2">
          {t("homepage.title2")}
        </div>
        <div className="title-3">
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              Start quiz now
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Get's started. It's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
