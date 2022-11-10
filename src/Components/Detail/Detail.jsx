/*global kakao*/
import React, { useState, useEffect, useRef } from "react";
import GalleryList from "./GalleryList";
import data from "./Image";
import "../../Style/Detail/img.css";
import "../../Style/Main/Main.scss";
import TopbarV2 from "../Main/TopbarV2";
import StarRating from "./StarRating";
import StarRate from "./StarRate";
import { useParams } from "react-router-dom";
import KakaoSearchDB from "../Hook/KakaoSearch";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";

const { kakao } = window;

const Detail = () => {
  const [datas, setData] = useState(data);
  const [currItem, setCurrItem] = useState(datas[0]);
  //-------------------------------------------
  // 스크롤 오브젝트 Ref
  const photosRef = useRef();
  const detailRef = useRef();
  const mappgRef = useRef();
  const reviewRef = useRef();
  //----------------------------------------------
  //link로 데이터전달 useLocation hook
  const outputdata = sessionStorage.getItem("detail");
  const dataildata = JSON.parse(outputdata);
  const { place_name } = useParams();
  const { id } = useParams();
  const detailsearch = place_name;
  const [detailData] = KakaoSearchDB(detailsearch);
  //-----------------------------------------------
  //업종별 카테고리 문자열 원하는것만 출력
  var str = dataildata.category_name;
  var words = str.split(">"); // ">" 구분으로 배열로 변환
  var word1 = str.substring(0, str.indexOf(">"));
  var word2 = str.substring(
    str.indexOf(">") + 1,
    str.indexOf(">", str.indexOf(">") + 1)
  );
  var word3 = str.substring(str.lastIndexOf(">") + 1);
  const count = dataildata.category_name
    .match(/>/g)
    .filter((item) => item !== "").length; // ">"겟수 카운터
  var keystr; // ">"갯수에 따라 출력
  if (count == 2) {
    keystr = word2;
  } else {
    keystr = word3;
  }
  //-----------------------------------------------------------
  const [heart, setheart] = useState(false);
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
  const post = async (e) => {
    e.preventDefault();
    try {
      const data = await axios({
        url: `${BACKEND_URL}/user/star`,
        method: "POST",
        data: {
          // userid,
        },
      });

      alert("로그인 성공!😊");
    } catch (e) {
      alert("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
    }
  };
  //------------------------------------------------------------------
  const [user, setUser] = useRecoilState(userState);
  const userid = user.id;
  const nickname = user.nickname;
  const username = user.username;
  const email = user.email;
  return (
    <>
      <TopbarV2 />
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
            <div className="Box">
              <div className="confont">
                <div className="cafe">{place_name}</div>
                <div className="Foods">{keystr}</div>
              </div>

              <div className="group left" ref={detailRef}>
                <div>평점</div>
                <div>주소</div>

                <div>주차</div>
                <div>영업시간</div>
              </div>

              <div className="group right">
                <div>
                  <StarRate />
                </div>
                <div>{detailData.road_address_name}</div>

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

            <div className="maptext">위치정보</div>
            <div className="rode_api1" id="map" ref={mappgRef}></div>

            <StarRating />

            <br />
            <div className="사용자" ref={reviewRef}>
              <div className="usercon">
                <img className="userimg" src="/images/6.jpg" alt="" />
                <div>멧밭쥐</div>
              </div>
              <div className="contant">고기 촵촵촵 냠냠냠 마이쪙~!!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
