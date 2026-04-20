import React from "react";


const Header = ({ title = "TaskMaster" }) => {
  return (
    <header className="header">
      <div className="header__container">
        {/* Логотип или иконка (по желанию) */}
        <div className="header__logo">
          <img src="/logo.png" alt="Logo" className="header__logo-img" />
          <h1 className="header__title">{title}</h1>
        </div>

        {/* Навигация или просто слоган */}
        <nav className="header__nav">
          <p className="header__subtitle">Твой личный менеджер задач</p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
