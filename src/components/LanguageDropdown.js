import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ReactComponent as Language } from "../icons/language-icon.svg";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" id="language-dropdown">
        <Language /> {language}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          English
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("pt")}>
          Português
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
