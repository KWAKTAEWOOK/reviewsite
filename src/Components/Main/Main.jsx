/* global kakao */
import React, { useEffect } from "react";
import Topbar from "./Topbar";
import "../../Style/Main/Main.scss";
import Foot from "./Foot";

const { kakao } = window;

const Main = () => {
  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: new kakao.maps.LatLng(36.349348279760655, 127.3766854960456), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    var map = new window.kakao.maps.Map(mapContainer, mapOption);
  }, []);
  return (
    <>
      <Topbar />
      <div className="main">
        <div className="mainList">
          <div className="searchMenu">
            <div className="searchBtn">
              <form className="searchBtn_in" action="">
                <select name="category" className="category">
                  <option value="All">전체</option>
                  <option value="food">식당</option>
                  <option value="cafe">카페</option>
                </select>
                <input type="text" placeholder="서구 둔산동" />
                <button className="searchButton">검색</button>
              </form>
            </div>
            <div className="search_List">
              <ul className="menulist">
                <li>
                  <img
                    src="https://ldb-phinf.pstatic.net/20211228_153/1640684993923s9vPb_JPEG/KakaoTalk_20211228_093917446_03.jpg"
                    alt=""
                  />
                  <a href="#">오봉집 대전둔산점</a>
                  <li>대전 서구 둔산로31번길 10-35 1층 101호</li>
                  <li>0507-1425-8552</li>
                  <li>
                    주차, 포장, 배달, 예약, 무선 인터넷, 남/녀 화장실 구분
                  </li>
                </li>
                <li>
                  <img
                    src="https://ldb-phinf.pstatic.net/20200317_186/1584406983320pYJTO_JPEG/Qr170iUU7etHOUv0ds9E4rnz.jpg"
                    alt=""
                  />
                  <a href="#">태평소국밥</a>
                  <li>대전 서구 둔산로31번길 52 덕삼빌딩 1층 102호</li>
                  <li>042-525-5810</li>
                  <li>단체석, 주차, 포장, 남/녀 화장실 구분</li>
                </li>
                <li>
                  <img
                    src="https://ldb-phinf.pstatic.net/20181207_5/1544194736300Mn9wx_JPEG/yoqyl6fmxSSFwVfl4Dkh3TGV.jpg"
                    alt=""
                  />
                  <a href="#">도군샤부</a>
                  <li>대전 서구 둔산남로9번길 51 1층 도군샤부</li>
                  <li>0507-1323-4260</li>
                  <li>편의 무선 인터넷, 남/녀 화장실 구분</li>
                </li>
                <li>
                  <img
                    src="https://ldb-phinf.pstatic.net/20220116_42/1642318355578I2NeK_JPEG/IMG_6750.jpg"
                    alt=""
                  />
                  <a href="#">춤추는 왕만두 둔산점</a>
                  <li>대전 서구 대덕대로 179 103 춤추는왕만두</li>
                  <li>주차, 포장, 남/녀 화장실 구분</li>
                </li>
                <li>
                  <img
                    src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjNfMTkz%2FMDAxNjYxMjMwMTg4NTg4.lgzadgPyetPdCnl00c0YtY1WIiGlhZnHzzAfEvkFjWUg.U38oAo-kag9euua4-7-anp7T5Vuzkhw1-MYPkxTeZTcg.JPEG.jinprogo79%2F%25B8%25DE%25B0%25A1%25C4%25BF%25C7%25C7_%25BC%25F6%25B9%25DA%25C1%25D6%25BD%25BA_%25C4%25AE%25B7%25CE%25B8%25AE_%25C8%25BF%25B4%25C9_%25B4%25EB%25C0%25FC_%25B5%25D0%25BB%25EA%25B5%25BF_%25C6%25F7%25C0%25E5_%25C4%25AB%25C6%25E414.jpg"
                    alt=""
                  />
                  <a href="#">메가MGC커피 둔산동점</a>
                  <li>대전 서구 둔산동 1110</li>
                  <li>042-484-1020</li>
                </li>
              </ul>
            </div>
          </div>
          <div className="rode_api" id="map"></div>
        </div>
      </div>
    </>
  );
};

export default Main;
