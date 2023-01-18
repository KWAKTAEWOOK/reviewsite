import { useState, useEffect } from "react";
import useGeolocation from "react-hook-geolocation";
import { useParams } from "react-router-dom";
import { LOCAL_URL } from "../../utils";

const { kakao } = window;

export default function KakaoSearchDB(search2) {
  const [detailData, setDetailData] = useState([]);
  const [imgAddress, setImgAddress] = useState("");
  const place2 = search2;
  const geolocation = useGeolocation();
  const lat = geolocation.latitude;
  const lng = geolocation.longitude;
  const { id } = useParams();
  const [selectID, setSelectID] = useState("");

  const onClickselect = (place) => {
    setSelectID(place.id);
  };

  useEffect(() => {
    var mapContainer = document.getElementById("map");

    var mapOption = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 2,
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(place2, placesSearchCB, { useMapBounds: true });

    var geocoder = new kakao.maps.services.Geocoder();

    var imageSrc = imgAddress,
      imageSize = new kakao.maps.Size(60, 60),
      imageOption = { offset: new kakao.maps.Point(28, 50) };

    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    var marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
    searchAddrFromCoords(map.getCenter());

    function searchAddrFromCoords(coords, callback) {
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          if (data[i].id === id) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

            map.setBounds(bounds);
            setDetailData(data[i]);
            sessionStorage.setItem("data", data);
          }
        }
      }
    }

    function displayMarker(place2) {
      if (place2.category_group_code === "FD6") {
        setImgAddress("https://i.imgur.com/x0m2Wcs.png");
      } else if (place2.category_group_code === "CE7") {
        setImgAddress("https://i.imgur.com/lGxngA8.png");
      } else if (place2.category_group_code === "CS2") {
        setImgAddress("https://i.imgur.com/4M49ZCN.png");
      } else {
        setImgAddress("https://i.imgur.com/zSNDtIv.png");
      }
      let marker = new kakao.maps.Marker({
        map: map,
        image: markerImage,
        position: new kakao.maps.LatLng(place2.y, place2.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          `<div class="customoverlay" onClick=${onClickselect(place2)}>` +
            ' <div class="customoverlayBack">' +
            `   <a href="${LOCAL_URL}/Detail/${place2.place_name}/${place2.id}" class="customoverlayPlaceName">` +
            place2.place_name +
            '<span class="customLink">' +
            ">" +
            "</a>" +
            "   </span>" +
            '   <span class="customoverlayCategory">' +
            place2.category_name +
            "   </span>" +
            '   <span class="customoverlayAddress">' +
            place2.road_address_name +
            "   </span>" +
            " </div>" +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place2, lat, lng, imgAddress, id]);
  return [detailData];
}
