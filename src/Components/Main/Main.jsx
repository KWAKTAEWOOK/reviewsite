/* global kakao */
import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import "../../Style/Main/Main.scss";

const { kakao } = window;

const Main = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [Places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  const offset = (page - 1) * limit;

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: new kakao.maps.LatLng(36.349348279760655, 127.3766854960456), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
        console.log(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px; color:black">' +
            place.category_name +
            "<br/>" +
            place.place_name +
            "<br/>" +
            place.phone +
            "<br/>" +
            `<a href="https://place.map.kakao.com/${place.id}#comment">/>` +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place]);
  return (
    <>
      {/* <Topbar /> */}
      <div className="main">
        <div className="mainList">
          <div className="searchMenu">
            <div className="searchBtn">
              <form className="searchBtn_in" onSubmit={searchSubmit}>
                <select name="category" className="category">
                  <option value="All">전체</option>
                  <option value="food">식당</option>
                  <option value="cafe">카페</option>
                </select>
                <input
                  className="searchInput"
                  type="text"
                  placeholder="서구 둔산동"
                  value={inputText}
                  onChange={onChange}
                />
                <button className="searchButton" type="submit">
                  검색
                </button>
              </form>
            </div>
            <div className="search_List">
              <div className="search_List_fixed">
                {Places.slice(offset, offset + limit).map((item, i) => (
                  <ul className="menulist" key={i}>
                    <li>
                      <a href="#!">
                        {i + 1}. {item.place_name}
                      </a>
                      <img
                        src="https://ldb-phinf.pstatic.net/20211228_153/1640684993923s9vPb_JPEG/KakaoTalk_20211228_093917446_03.jpg"
                        alt="0"
                      />
                      <li>{item.category_name}</li>

                      <div className="menuSublist">
                        {item.road_address_name ? (
                          <div>
                            <span>{item.road_address_name}</span>
                            <span>{item.address_name}</span>
                          </div>
                        ) : (
                          <span>{item.address_name}</span>
                        )}
                        <li>{item.phone}</li>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
              <div id="pagination" className="searchPagination"></div>
            </div>
          </div>
          <div className="rode_api" id="map"></div>
        </div>
      </div>
    </>
  );
};

export default Main;
