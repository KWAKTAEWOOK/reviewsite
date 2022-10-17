import React, { useState } from "react";
import GalleryList from "./GalleryList";
import data from "./Image";
import "../../Style/Detail/img.css";
import Topbar from "../Main/Topbar";

const Detail = () => {
  const [datas, setData] = useState(data);
  const [currItem, setCurrItem] = useState(datas[0]);
  const [like, setlike] = useState(false);
  const [heart, setheart] = useState(false);

  const onView = (id) => {
    //고유번호인 id를 받아서 해당 고양이 사진을 찾아라
    setCurrItem(datas.find((item) => item.id === id)); //배열함수중 해당값만 찾아주는 find함수를 쓴다
  };
  const drawStar = (target) => {
    document.querySelector(`.star span`).style.width = `${target.value * 10}%`;
  };
  return (
    <>
      <Topbar />
      <div>
        <div className="wrap">
          <GalleryList datas={datas} onView={onView} currItem={currItem} />
        </div>
        <nav class="styled__TopNav-sc-1tkfz70-1 eUocsG">
          <div>
            <div class="NavGroup">
              <a class="styled__Tab-nkz07n-1 cwZpqV">사진</a>
              <a class="styled__Tab-nkz07n-1 cwZpqV">상세정보</a>
              <a class="styled__Tab-nkz07n-1 cwZpqV">지도/위치</a>
              <a class="styled__Tab-nkz07n-1 cwZpqV">리뷰</a>
            </div>
          </div>
        </nav>
        <div className="body1">
          <div className="Box">
            <div className="confont">
              <div className="cafe">고깃리 88번지</div>
              <div className="Foods">돼지고기구이</div>
            </div>
            <div>
              <div className="STAR">
                <div>평점 : ?</div>
                <div>평점 : ?</div>
              </div>
              <div className="phone number">
                <div>전화번호 : ?</div>
              </div>
              <div className="parking">
                <div>주차 : ?</div>
              </div>
              <div className="Hours">
                <div>영업시간 : ?</div>
              </div>
            </div>
            <div className="icon">
              <div>
                <img className="like" src="/images/like1.png" />
                <img className="heart" src="/images/heart.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
