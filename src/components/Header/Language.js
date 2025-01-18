import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (Language) => {
    i18n.changeLanguage(Language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "en" ? "English" : "Việt Nam"}
        id="basic-nav-dropdown"
        className="languages"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
