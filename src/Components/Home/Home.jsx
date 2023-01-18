import React from "react";
import "../../Style/Home/Home.scss";

const Home = ({ onChange, inputText, setKeywords }) => {
  const homeSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/main";
  };

  const searchIcon = "/images/search.png";
  const mainPicture = "/images/Food Logo.svg";
  const logo = "/images/Group 2.svg";
  return (
    <>
      <div className="home_body">
        <div className="home">
          <img className="home_logo" src={logo} />
          <form onSubmit={homeSearchSubmit}>
            <input
              className="HomeInput"
              type="text"
              value={inputText}
              placeholder="음식점 이름 또는 주소를 입력해주세요."
              onChange={onChange}
            />
            <button className="HomeSearchbt" type="submit">
              <img className="HomeSearchbt" src={searchIcon} alt="bt" />
            </button>
          </form>
          <img className="main_image" src={mainPicture} alt="main" />
        </div>
      </div>
    </>
  );
};

export default Home;
