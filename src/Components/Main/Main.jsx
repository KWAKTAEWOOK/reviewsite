import React, { useEffect, useState } from "react";
import RightArrow from "../../Style/image/right-arrow.png";
import LeftArrow from "../../Style/image/left-arrow.png";
import Topbar from "./Topbar";
import "../../Style/Main/Main.scss";
import useGeolocation from "react-hook-geolocation";
import { Link } from "react-router-dom";

const { kakao } = window;

const Main = ({
  place,
  setPlace,
  inputText,
  setIntpuText,
  onChange,
  searchSubmit,
}) => {
  const [Places, setPlaces] = useState([]);
  const [backupAll, setBackupAll] = useState([]);
  const [backupFD6, setBackupFD6] = useState([]);
  const [backupCE7, setBackupCE7] = useState([]);
  const [backupCS2, setBackupCS2] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(true);
  const [arrow, setArrow] = useState(true);
  const [searchNull, setSearchNull] = useState("");

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

    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          var content =
            '<div class="bAddr">' +
            '<span class="title">[주소정보]</span>' +
            detailAddr +
            "</div>";

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

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
            `<a href="http://localhost:3000/Detail" style="display:block; margin-top:-2px; font-size:16px; font-weight:bold">` +
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
                  src={arrow ? LeftArrow : RightArrow}
                  alt="slidebt"
                />
              </button>
              <div className="searchMenu">
                <div className="searchBtn">
                  <form className="searchBtn_in" onSubmit={searchSubmit}>
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
                    />
                    <button className="searchButton" type="submit" />
                  </form>
                </div>
                <div className="search_List">
                  <div className="search_List_fixed">
                    <span className="searchNull">{searchNull}</span>
                    {Places.slice(offset, offset + limit).map((item, i) => (
                      <Link
                        to={{
                          pathname: "/Detail",
                          state: {
                            place_name: item.place_name,
                            CategoryName: item.category_name,
                            Address: item.road_address_name,
                            posX: item.x,
                            posY: item.y,
                          },
                        }}
                      >
                        <ul className="menulist" key={i}>
                          <li className="searchInfoList">
                            <a href={item.place_url} className="searchInfoName">
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
                      </Link>
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
