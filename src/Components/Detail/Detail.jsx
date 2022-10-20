/*global kakao*/
import React, { useState, useEffect, useRef } from "react";
import GalleryList from "./GalleryList";
import data from "./Image";
import "../../Style/Detail/img.css";
import Topbar from "../Main/Topbar";
import "../../Style/Main/Main.scss";

const { kakao } = window;

const Detail = () => {
  const [datas, setData] = useState(data);
  const [currItem, setCurrItem] = useState(datas[0]);
  const [heart, setheart] = useState(false);
  const [like, setlike] = useState(false);
  const photosRef = useRef();
  const detailRef = useRef();
  const mappgRef = useRef();
  const reviewRef = useRef();

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
  const photos = () =>
    photosRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const detail = () =>
    detailRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  const mappg = () =>
    mappgRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  const review = () =>
    reviewRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  return (
    <>
      <Topbar />
      <div>
        <div className="wrap" ref={photosRef}>
          <GalleryList datas={datas} onView={onView} currItem={currItem} />
        </div>

        <nav className="styled__TopNav-sc-1tkfz70-1 eUocsG">
          <div>
            <div className="NavGroup">
              <button onClick={photos}>사진</button>
              <button onClick={detail}>상세정보</button>
              <button onClick={mappg}>지도/위치</button>
              <button onClick={review}>리뷰</button>
            </div>
          </div>
        </nav>
        <div className="body1">
          <div className="magin-side">
            <hr width="1000px" />
            <div className="Box">
              <div className="confont">
                <div className="cafe">고깃리 88번지</div>
                <div className="Foods">돼지고기구이</div>
              </div>

              <div className="group left" ref={detailRef}>
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
            <div className="rode_api1" id="map" ref={mappgRef}></div>
            <hr width="1000px" />
            <hr width="1000px" />
            <hr width="1000px" />
            <div className="사용자" ref={reviewRef}>
              <div className="usercon">
                <img className="userimg" src="/images/3.jpg" alt="" />
                <div>비둘기</div>
              </div>
              <textarea id="" cols="100" rows="10"></textarea>
              <br />
              <br />
              <div className="usercon">
                <img className="userimg" src="/images/6.jpg" alt="" />
                <div>멧밭쥐</div>
              </div>
              <textarea id="" cols="100" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
