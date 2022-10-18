import React from "react";
import "../../Style/Home/Home.scss";

const Home = () => {
  return (
    <body>
      <div className="home_body">
        <div className="background">
          <div className="home">
            <div className="home_logo">
              <img src="/images/placeholder.png" />
              <a href="/main">넌 어때?</a>
              <input
                type="text"
                placeholder="니가 알고싶은 리뷰, 여기 다 있어!"
              />
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Home;
