import React from "react";
import "../../Style/Home/Home.scss";

const Home = ({
  place,
  setPlace,
  inputText,
  setInputText,
  onChange,
  setKeywords,
  keywords,
  setHomekeyword,
}) => {
  const homeSearchSubmit = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/main";
  };

  return (
    <>
      <div className="home_body">
        <div className="background">
          <div className="home">
            <div className="home_logo">
              <img src="/images/placeholder.png" alt="logo" />
              <a href="/main">넌 어때?</a>
              <form onSubmit={homeSearchSubmit}>
                <input
                  className="HomeInput"
                  type="text"
                  placeholder="니가 알고싶은 리뷰, 여기 다 있어!"
                  // value={inputText}
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
