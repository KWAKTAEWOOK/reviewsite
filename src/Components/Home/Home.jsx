import React from "react";
import "../../Style/Home/Home.scss";

const Home = ({ onChange, inputText, setKeywords }) => {
  const homeSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = "/main";
  };
  const onClickHomeLogo = () => {
    sessionStorage.removeItem("search");
    sessionStorage.removeItem("keywords");
  };
  return (
    <>
      <div className="home_body">
        <div className="background">
          <div className="home">
            <div className="home_logo">
              <img src="/images/placeholder.png" alt="logo" />
              <a href="/main" onClick={onClickHomeLogo}>
                넌 어때?
              </a>
              <form onSubmit={homeSearchSubmit}>
                <input
                  className="HomeInput"
                  type="text"
                  value={inputText}
                  placeholder="니가 알고싶은 리뷰, 여기 다 있어!"
                  onChange={onChange}
                />
                <button className="HomeSearchbt" type="submit"></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
