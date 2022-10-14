import React, { useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { BiCurrentLocation } from "react-icons/bi";
import "../../Style/Main/Topbar.scss";
import useGeolocation from "react-hook-geolocation";

const { kakao } = window;

const Topbar = () => {
  const geolocation = useGeolocation();
  const lat = geolocation.latitude;
  const lng = geolocation.longitude;

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    var markers = [];
    var mapContainer = document.getElementById("map");

    var mapOption = {
      center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
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
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
  }, [lat, lng]);

  return (
    <>
      <div className="backbar">
        <div className="menuBar">
          <div className="siteLogo">
            <a href="/main">넌 어때?</a>
          </div>
          <div className="menuList">
            <div className="menu1">
              <ul>
                <li>
                  <TiThMenu className="TiThMenu" />
                  <h3>&nbsp;&nbsp;메뉴</h3>
                </li>
                <ul>
                  <li>
                    <a href="/main">내 주변 찾기</a>
                  </li>
                  <li>
                    <a href="/main">카테고리별 찾기</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="/main">내가 찜한 가게</a>
                  </li>
                  <li>
                    <a href="/main">내가 작성한 리뷰</a>
                  </li>
                </ul>
              </ul>
            </div>
            <div className="menu1 sign_btn">
              <div className="loginBtn">
                <a href="#!">
                  <h3>로그인</h3>
                </a>
              </div>
              <div className="signUpBtn">
                <a href="/SignUp">
                  <h3>회원가입</h3>
                </a>
              </div>
              <div className="now_location">
                <BiCurrentLocation className="BiCurrentLocation" />
                <p>
                  <span id="centerAddr"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
