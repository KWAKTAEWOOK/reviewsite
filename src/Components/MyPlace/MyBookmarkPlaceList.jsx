import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../../utils";
import BookmarkOption from "./BookmarkOption";

const MyBookmarkPlaceList = ({
  index,
  bookmarkName,
  bookmarks,
  bookmark,
  user,
  userUrl,
}) => {
  const { kakao } = window;
  const [mapName, setMapName] = useState();
  const postId = bookmark?.postId;
  const bookmarkId = bookmark.id;
  const bookmarkNameId = bookmark.bookmarkName?.id;
  // 클릭이벤트
  const clickLocation = () => {
    var mapContainer = document.getElementById("map");

    var mapOption = {
      center: new kakao.maps.LatLng(bookmark.locationY, bookmark.locationX),
      level: 5,
    };

    var map = new window.kakao.maps.Map(mapContainer, mapOption);

    for (let l = 0; l < bookmarks.length; l++) {
      const id = bookmarks[l].postId;
      const name = bookmarks[l].postName;

      var positions = [
        {
          title: bookmarks[l].postName,
          phone: bookmarks[l].phone,
          address: bookmarks[l].address,
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

        marker.setMap(map);

        var iwContent = `<div style="min-width:250px; min-height:120px; padding:17px;">
        <div style="font-weight:bold; font-size:20px;">
        <a href="/detail/${name}/${id}"
        style="text-decoration:underline"
        >${positions[i].title}</a>
        </div>
        <div style="margin:20px; margin-bottom:0px; min-width:250px">
        주소 : ${positions[i].address}
        </div>
        <div style="margin-top:15px; min-width:250px">📞 ${positions[i].phone}</div>
        </div>`,
          iwRemoveable = true;

        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        kakao.maps.event.addListener(
          marker,
          "click",
          makeClickListener(map, marker, infowindow)
        );

        function makeClickListener(map, marker, infowindow) {
          return function () {
            infowindow.open(map, marker);
          };
        }
      }
    }
  };

  const onChangeHandler = async (e) => {
    const data = await axios({
      url: `${BACKEND_URL}/bookmark/name/set/${bookmarkId}?nameId=${e.target.value}`,
      method: "PATCH",
    });
    setMapName(e.target.value);
  };

  // 북마크 삭제만
  const deleteBookmark = async (e) => {
    if (window.confirm("삭제하시겠습니까?")) {
      await axios({
        url: `${BACKEND_URL}/bookmark/delete/${postId}`,
        method: "DELETE",
      });
      window.location.reload();
    } else {
      console.log(e);
    }
  };

  return (
    <div className="place_bmlist">
      <div className="place_bmlist_title">
        <span className="place_bmlist_index">{index + 1 + " "}</span>
        <span className="clickLocation" onClick={clickLocation}>
          {bookmark.postName}
        </span>
      </div>
      {user?.id === userUrl ? (
        <>
          <select
            className="selectMark"
            onChange={onChangeHandler}
            defaultValue={
              bookmark.bookmarkName.id ? bookmark.bookmarkName.id : mapName
            }
          >
            {bookmarkName.map((names, index) => (
              <BookmarkOption names={names} key={index} />
            ))}
          </select>
          <button className="place_bmlist_delete" onClick={deleteBookmark}>
            삭제
          </button>
        </>
      ) : (
        <select
          className="selectMark selectMark2"
          defaultValue={bookmark?.bookmarkName?.id}
        >
          <option value={bookmark?.bookmarkName?.id}>
            {bookmark?.bookmarkName?.bookmarkName}
          </option>
        </select>
      )}
    </div>
  );
};

export default MyBookmarkPlaceList;
