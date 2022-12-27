import React, { useEffect } from "react";
import MyPlaceList from "./MyPlaceList";

const SavePlaceMap = ({ bookmarks, bookmarkX, bookmarkY }) => {
  const { kakao } = window;

  const showMap = () => {
    var mapContainer = document.getElementById("map");

    var mapOption = {
      center: new kakao.maps.LatLng(bookmarkY, bookmarkX),
      level: 3,
    };

    var map = new window.kakao.maps.Map(mapContainer, mapOption);

    for (let l = 0; l < bookmarks.length; l++) {
      var positions = [
        {
          title: bookmarks[l].postName,
          latlng: new kakao.maps.LatLng(
            bookmarks[l].locationY,
            bookmarks[l].locationX
          ),
        },
      ];
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
          clickable: true, // 마커의 클릭이벤트
        });

        kakao.maps.event.addListener(marker, "click", function () {
          console.log(bookmarks[l]);
        });
      }
    }
  };

  // 저장된 북마크가 없을 때
  const noBookmarkMap = () => {
    var mapContainer = document.getElementById("map");

    var mapOption = {
      center: new kakao.maps.LatLng(33.450879, 126.56994),
      level: 3,
    };

    var map = new window.kakao.maps.Map(mapContainer, mapOption);
  };

  useEffect(() => {
    bookmarks.length != 0 ? showMap() : noBookmarkMap();
  });

  return (
    <>
      <div className="place_map" id="map"></div>
      <div className="map_list">
        {bookmarks.map((bookmark, index) => (
          <MyPlaceList key={index} bookmark={bookmark} />
        ))}
      </div>
    </>
  );
};

export default SavePlaceMap;
