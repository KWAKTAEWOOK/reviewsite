/*global kakao*/
import React, { useState, useEffect, useRef } from "react";
import GalleryList from "./GalleryList";
import data from "./Image";
import "../../Style/Detail/img.css";
import Topbar from "../Main/Topbar";
import useMoveScrool from "./useMoveScroll";
import "../../Style/Main/Main.scss";
import { Link } from "react-router-dom";
const { kakao } = window;

const Detail = ({}) => {
  const [datas, setData] = useState(data);
  const [currItem, setCurrItem] = useState(datas[0]);
  const [heart, setheart] = useState(false);
  const [modal, setModal] = useState(false);
  const { element, onMoveToElement } = useMoveScrool();
  const [like, setlike] = useState(false);

  const HeartImg = "/images/heart.png";
  const EmptyHeartImg = "/images/heart1.png";

  const likeImg = "/images/like1.png";
  const EmptylinkeImg = "/images/like2.png";

  const onView = (id) => {
    //고유번호인 id를 받아서 해당 고양이 사진을 찾아라
    setCurrItem(datas.find((item) => item.id === id)); //배열함수중 해당값만 찾아주는 find함수를 쓴다
  };

  const heartClick = () => {
    setheart((heart) => !heart);
    console.log("하트눌림");
  };

  const likeClick = () => {
    setlike((like) => !like);
    console.log("좋아요눌림");
  };
  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: new kakao.maps.LatLng(36.349348279760655, 127.3766854960456), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    var map = new window.kakao.maps.Map(mapContainer, mapOption);
  }, []);
  const goodsTabs = {
    0: useMoveScrool("사진"),
    1: useMoveScrool("상세정보"),
    2: useMoveScrool("지도/위치"),
    3: useMoveScrool("리뷰"),
  };
  return (
    <>
      <Topbar />
      <div>
        <div className="wrap">
          <GalleryList datas={datas} onView={onView} currItem={currItem} />
        </div>
        <hr width="1000px" />
        <nav class="styled__TopNav-sc-1tkfz70-1 eUocsG">
          <div>
            <div class="NavGroup">
              {Array.from(goodsTabs).map((tab, index) => {
                <div onClick={tab.onMoveToElement}>{tab.name}</div>;
              })}
              <button>사진</button>
              <button>상세정보</button>
              <button>지도/위치</button>
              <button>리뷰</button>
            </div>
          </div>
        </nav>
        <div className="body1">
          <div className="magin-side">
            <div className="Box">
              <div className="confont">
                <div className="cafe">고깃리 88번지</div>
                <div className="Foods">돼지고기구이</div>
              </div>

              <div className="group left">
                <div>평점</div>
                <div>주소</div>

                <div>주차</div>
                <div>영업시간</div>
              </div>

              <div className="group right">
                <div>★★★★★</div>
                <div>대전 서구 신갈마로 264-16</div>

                <div>가능</div>
                <div>11:00~21:00</div>
              </div>

              <div className="icon">
                <div>
                  <button onClick={likeClick} className="iconbut">
                    <img
                      className={like ? "likeImg" : "EmptylinkeImg"}
                      src={like ? EmptylinkeImg : likeImg}
                    />
                  </button>

                  <button onClick={heartClick} className="iconbut">
                    <img
                      className={heart ? "HeartImg" : "EmptyHeartImg"}
                      src={heart ? EmptyHeartImg : HeartImg}
                    />
                  </button>
                </div>
                <div className="liketext">
                  <div>좋아요</div>
                  <div>찜콩!!</div>
                </div>
              </div>
            </div>
            <hr width="1000px" />
            <div className="maptext">위치정보</div>
            <div className="rode_api1" id="map"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
