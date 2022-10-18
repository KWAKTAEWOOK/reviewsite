import React, { useEffect, useState } from "react";
import RightArrow from "../../Style/image/right-arrow.png";
import LeftArrow from "../../Style/image/left-arrow.png";
import Topbar from "./Topbar";
import "../../Style/Main/Main.scss";
import useGeolocation from "react-hook-geolocation";

const { kakao } = window;

const Main = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  const [Places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(true);
  const [arrow, setArrow] = useState(true);
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const CategorySelect = (e) => {};

  const toggleSearchList = () => {
    setOpen((open) => !open);
    setArrow((arrow) => !arrow);
  };

  const geolocation = useGeolocation();

  const lat = geolocation.latitude;
  const lng = geolocation.longitude;

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
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
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
        displayPagination(pagination);
        setPlaces(data);
        console.log(data);
      }
    }

    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

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
          '<div style="padding:13px;font-size:12px; color:black; width:300px; height:240px; overflow:hidden">' +
            `<a href="https://place.map.kakao.com/${place.id}#comment" style="display:block; margin-top:-2px; font-size:16px; font-weight:bold">` +
            place.place_name +
            "</a>" +
            '<img src="https://ldb-phinf.pstatic.net/20211228_153/1640684993923s9vPb_JPEG/KakaoTalk_20211228_093917446_03.jpg" alt="0" style="width:300px; height:150px; margin-top:7px; display:block"/>' +
            '<div style="opacity:0.5; margin-top:5px; display:block">' +
            place.category_name +
            "</div>" +
            '<div style="margin-top:5px; display:block; padding-bottom:10px">' +
            place.road_address_name +
            "</div>" +
            '<div style="margin-top:-5px; display:block; padding-bottom:10px">' +
            place.phone +
            "</div>" +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place, lat, lng]);
  return (
    <>
      <Topbar />
      <section>
        <div className="main">
          <div className="mainList">
            <nav className={open ? "show" : "hide"}>
              <button
                className="ShowAndHide"
                onClick={() => toggleSearchList()}
              >
                <img
                  className="ShowAndHideBt"
                  src={arrow ? RightArrow : LeftArrow}
                  alt="slidebt"
                />
              </button>
              <div className="searchMenu">
                <div className="searchBtn">
                  <form className="searchBtn_in" onSubmit={searchSubmit}>
                    <select name="" className="category" id="">
                      <option value="">전체</option>
                      <option value="">음식점</option>
                      <option value="">카페</option>
                    </select>
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="장소, 주소 검색"
                      value={inputText}
                      onChange={onChange}
                    />
                    <button className="searchButton" type="submit" />
                  </form>
                </div>
                <div className="search_List">
                  <div className="search_List_fixed">
                    {Places.slice(offset, offset + limit).map((item, i) => (
                      <ul className="menulist" key={i}>
                        <li className="searchInfoList">
                          <a href={item.place_url} className="searchInfoName">
                            {item.place_name}
                          </a>
                          <li className="searchInfoCategory">
                            {item.category_name}
                          </li>
                          <div className="searchInfoImg">
                            <img
                              src="https://ldb-phinf.pstatic.net/20211228_153/1640684993923s9vPb_JPEG/KakaoTalk_20211228_093917446_03.jpg"
                              alt="0"
                            />
                          </div>

                          <div className="menuSublist">
                            {item.road_address_name ? (
                              <div className="searchInfoAddress">
                                <span>{item.road_address_name}</span>
                              </div>
                            ) : (
                              <span className="searchInfoAddress">
                                {item.address_name}
                              </span>
                            )}
                            <li className="searchInfoPhone">{item.phone}</li>
                          </div>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
                <div id="pagination" className="searchPagination"></div>
              </div>
            </nav>
            <div className="rode_api" id="map"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
