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

  const searchIcon = "/images/search.png";
  const mainPicture = "/images/The Munchies Family Style.png";
  return (
    <>
      {/* <div className="home_body">
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
      </div> */}
      <div className="home_body">
        {/* <div className="background"> */}
        <div className="home">
          {/* <img src="/images/placeholder.png" alt="logo" />
              <a href="/main" onClick={onClickHomeLogo}>
                넌 어때?
              </a> */}
          <p className="home_main_p">
            니가 알고싶은 <span className="home_main_span">리뷰</span>, 여기 다
            있어!
            <p className="home_logo_p">
              넌 어때 <span className="home_logo_span">?</span>
            </p>
          </p>

          <form onSubmit={homeSearchSubmit}>
            <input
              className="HomeInput"
              type="text"
              value={inputText}
              placeholder="음식점 이름 또는 주소를 입력해주세요."
              onChange={onChange}
            />
            <button className="HomeSearchbt" type="submit">
              <img className="HomeSearchbt" src={searchIcon} />
            </button>
          </form>
          <img className="main_image" src={mainPicture} />
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Home;
