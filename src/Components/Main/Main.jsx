/* eslint-disable */
import React, { useEffect, useState } from "react";
import RightArrow from "../../Style/image/right-arrow.png";
import LeftArrow from "../../Style/image/left-arrow.png";
import Topbar from "./Topbar";
import "../../Style/Main/Main.scss";
import useGeolocation from "react-hook-geolocation";
import { BACKEND_URL } from "../../utils";
import axios from "axios";

const { kakao } = window;

const Main = ({
  place,
  setPlace,
  inputText,
  setInputText,
  onChange,
  searchSubmit,
  searchVisible,
  setSearchVisible,
  setKeywords,
  keywords,
  onAddKeyWord,
}) => {
  const [Places, setPlaces] = useState([]);
  const [backupAll, setBackupAll] = useState([]);
  const [backupFD6, setBackupFD6] = useState([]);
  const [backupCE7, setBackupCE7] = useState([]);
  const [backupCS2, setBackupCS2] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [open, setOpen] = useState(true);
  const [arrow, setArrow] = useState(true);
  const [searchNull, setSearchNull] = useState("");
  const [imgAddress, setImgAddress] = useState("");
  const [detail_id, setDetail_id] = useState("");
  const [detail_name, setDetail_name] = useState("");

  const onClickSearchData = (text) => {
    setInputText(text);
    sessionStorage.setItem("search", text);
  };

  const onClickSearchVisible = () => {
    setSearchVisible((searchVisible) => !searchVisible);
  };

  const onClickSearchClose = () => {
    setSearchVisible(true);
  };

  //장소 클릭 시 db에 id, 이름 저장
  const onClickDetailDB = (placeDB) => {
    window.location.href = `http://localhost:3000/Detail/${placeDB.place_name}/${placeDB.id}`;
    sessionStorage.setItem("detail", JSON.stringify(placeDB));
  };

  // const onClickDetailDB = async (placeDB) => {
  //   try {
  //     const data = await axios({
  //       url: `${BACKEND_URL}/getDetail`,
  //       method: "POST",
  //       data: {
  //         detail_id: placeDB.id,
  //         detail_name: placeDB.place_name,
  //       },
  //     });
  //     sessionStorage.setItem("detail", JSON.stringify(placeDB));
  //     window.location.href = `http://localhost:3000/Detail/${placeDB.place_name}/${placeDB.id}`;
  //   } catch (e) {
  //     window.location.href = `http://localhost:3000/Detail/${placeDB.place_name}/${placeDB.id}`;
  //     // console.log(e);
  //   }
  // };

  const onClickSearch = () => {
    if (inputText) {
      onAddKeyWord(inputText);
      setInputText("");
    }
  };

  useEffect(() => {
    sessionStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  const onRemoveKeyword = (id) => {
    setKeywords(
      keywords.filter((keyword) => {
        return keyword.id !== id;
      })
    );
    setSearchVisible(false);
  };

  const onRemoveAllKeyword = () => {
    setKeywords([]);
  };

  const onChangeCategory = (e) => {
    setSearchNull("");
    if (e.target.value === "FD6") {
      var filterFD6 = backupFD6.filter(
        (value) => value.category_group_code === "FD6"
      );
      setPlaces(filterFD6);
      if (filterFD6.length === 0) {
        setSearchNull("음식점 검색결과 없음");
      }
    } else if (e.target.value === "all") {
      setPlaces(backupAll);
      if (backupAll.length === 0) {
        setSearchNull("검색 결과 없음");
      }
    } else if (e.target.value === "CE7") {
      var filterCE7 = backupCE7.filter(
        (value) => value.category_group_code === "CE7"
      );
      setPlaces(filterCE7);
      if (filterCE7.length === 0) {
        setSearchNull("카페 검색결과 없음");
      }
    } else if (e.target.value === "CS2") {
      var filterCS2 = backupCS2.filter(
        (value) => value.category_group_code === "CS2"
      );
      setPlaces(filterCS2);
      if (filterCS2.length === 0) {
        setSearchNull("편의점 검색결과 없음");
      }
    }
  };

  const toggleSearchList = () => {
    setOpen((open) => !open);
    setArrow((arrow) => !arrow);
  };

  const geolocation = useGeolocation();

  const lat = geolocation.latitude;
  const lng = geolocation.longitude;

  const offset = (page - 1) * limit;

  useEffect(() => {
    var mapContainer = document.getElementById("map");

    var mapOption = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 2,
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(place, placesSearchCB, { useMapBounds: true });

    var imageSrc = imgAddress,
      imageSize = new kakao.maps.Size(60, 60),
      imageOption = { offset: new kakao.maps.Point(28, 50) };

    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }

    function placesSearchCB(data, status, pagination) {
      if (data.length === 0) {
        setSearchNull("검색 결과 없음");
        setPlaces([]);
        setBackupAll([]);
        setBackupCE7([]);
        setBackupCS2([]);
        setBackupFD6([]);
      }
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        displayPagination(pagination);
        setSearchNull("");
        setPlaces(data);
        setBackupAll(data);
        setBackupCE7(data);
        setBackupCS2(data);
        setBackupFD6(data);
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
      if (place.category_group_code === "FD6") {
        setImgAddress("https://i.imgur.com/J4YtIyK.png");
      } else if (place.category_group_code === "CE7") {
        setImgAddress("https://i.imgur.com/jkiEdF1.png");
      } else if (place.category_group_code === "CS2") {
        setImgAddress("https://i.imgur.com/RPJ6WIA.png");
      } else {
        setImgAddress("https://i.imgur.com/ICPDozz.png");
      }
      let marker = new kakao.maps.Marker({
        map: map,
        image: markerImage,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div class="customoverlay">' +
            '<div class="customoverlayBack">' +
            `<div class="customoverlayPlaceName">` +
            '<span clss="customoverlayEtc">' +
            "[ " +
            "</span>" +
            place.place_name +
            '<span clss="customoverlayEtc">' +
            " ]" +
            "</span>" +
            `<a href="#!" >` +
            "  →" +
            "</a>" +
            "</div>" +
            '<img src="https://ldb-phinf.pstatic.net/20211228_153/1640684993923s9vPb_JPEG/KakaoTalk_20211228_093917446_03.jpg" alt="0" class="customoverlayImg"/>' +
            '<div class="customoverlayCategory">' +
            place.category_name +
            "</div>" +
            '<div class="customoverlayAddress">' +
            place.road_address_name +
            "</div>" +
            '<div clss="customoverlayPhone">' +
            '<span class="customoverlayEtc">' +
            "☎ " +
            "</span>" +
            place.phone +
            "</div>" +
            "</div>" +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place, lat, lng, imgAddress]);
  return (
    <>
      <Topbar />
      <section>
        <div className="main">
          <div className="mainList">
            <span id="centerAddr" className="TestCenter"></span>
            <nav className={open ? "show" : "hide"}>
              <button
                className="ShowAndHide"
                onClick={() => toggleSearchList()}
              >
                <img
                  className="ShowAndHideBt"
                  src={arrow ? LeftArrow : RightArrow}
                  alt="slidebt"
                />
              </button>

              <div className="searchMenu">
                <div className="searchBtn">
                  <form className="searchBtn_in">
                    <select
                      name="category"
                      className="category"
                      defaultValue="all"
                      onChange={onChangeCategory}
                    >
                      <option value="all">전체</option>
                      <option value="FD6">음식점</option>
                      <option value="CE7">카페</option>
                      <option value="CS2">편의점</option>
                    </select>
                    <input
                      className="searchInput"
                      type="text"
                      placeholder="장소, 주소 검색"
                      value={inputText}
                      defaultValue={sessionStorage.getItem("search")}
                      onChange={onChange}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) onClickSearch();
                      }}
                      onClick={() => onClickSearchVisible()}
                    />
                    <button
                      className="searchButton"
                      type="submit"
                      onSubmit={searchSubmit}
                    />
                  </form>
                  <div
                    className={
                      searchVisible
                        ? "TopSearchDataListNone"
                        : "TopSearchDataList"
                    }
                  >
                    <div className="TopSearchHeader">
                      <div className="TopSearchHeader01">최근 검색어</div>
                      <div
                        className="TopSearchHeader02"
                        onClick={() => onRemoveAllKeyword()}
                      >
                        전체 삭제
                      </div>
                      <div className="TopSearchLine" />
                    </div>
                    <div>
                      {keywords.map(({ id, text, date }) => (
                        <section className="TopSearchData">
                          <div
                            className="SearchDataText"
                            onClick={() => {
                              onClickSearchData(text);
                            }}
                          >
                            {text}
                          </div>
                          <div className="SearchDataDate">{date}</div>
                          <button
                            className="SearchDataDelete"
                            onClick={() => onRemoveKeyword(id)}
                          >
                            삭제
                          </button>
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="search_List">
                  <div
                    className="search_List_fixed"
                    onClick={() => onClickSearchClose()}
                  >
                    <span className="searchNull">{searchNull}</span>
                    {Places.slice(offset, offset + limit).map((item, i) => (
                      <ul
                        className="menulist"
                        key={i}
                        onClick={() => {
                          onClickDetailDB(item);
                        }}
                      >
                        <li className="searchInfoList">
                          <a href="#!" className="searchInfoName">
                            {item.place_name}
                          </a>
                          <li className="searchInfoCategory">
                            {item.category_name}
                          </li>
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
                <div className="paginationPos">
                  <div id="pagination" className="searchPagination"></div>
                </div>
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
