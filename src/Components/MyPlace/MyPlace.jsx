import React, { useState } from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Myplace/MyPlace.scss";
import SavePlaceMap from "./SavePlaceMap";
import { userState } from "../../recoil/user";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { BACKEND_URL } from "../../utils";
import axios from "axios";

const MyPlace = () => {
  const [user, setUser] = useRecoilState(userState);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkX, setBookmarkX] = useState([]);
  const [bookmarkY, setBookmarkY] = useState([]);

  useEffect(() => {
    const getData = async (e) => {
      const data = await axios({
        url: `${BACKEND_URL}/bookmark/user?userId=${user?.id}`,
        method: "GET",
      });
      setBookmarks(data.data);
      setBookmarkX(data.data[0]?.locationX);
      setBookmarkY(data.data[0]?.locationY);
    };
    getData();
  }, []);

  return (
    <>
      <TopbarV2 />
      <div className="likebackground">
        <div className="liketemplate">
          <div className="my_list_back">
            <p className="show_list_p">
              👀 넌 어때 회원님들의 맛집 정보를 구경하고, 나의 리스트도
              자랑해보세요!
            </p>
            <p className="myList_list">🌈 나의 북마크</p>
            <div className="showMyList">
              <div className="list_column">
                <div className="place_list">· 목록1</div>
                <button className="place_edit_btn">이름수정</button>
              </div>
              {/* <div className="list_column">
                <div className="place_list">· 목록2</div>
                <button className="place_edit_btn">수정</button>
              </div>
              <div className="list_column">
                <div className="place_list">· 목록3</div>
                <button className="place_edit_btn">수정</button>
              </div>
              <div className="list_column">
                <div className="place_list">· 목록4</div>
                <button className="place_edit_btn">수정</button>
              </div>
              <div className="list_column">
                <div className="place_list">· 목록5</div>
                <button className="place_edit_btn">수정</button>
              </div> */}
              {/* <div className="myList_add">
                <p className="add_list">➕ 추가하기 </p>
                <input
                  className="myList_listname_input"
                  type="text"
                  placeholder="10자 이내로 작성해주세요."
                />
                <button className="myList_addBtn"> + </button>
              </div> */}
            </div>
          </div>
          <div className="right_fixed_menu">
            <div className="marked_map">
              <SavePlaceMap
                bookmarks={bookmarks}
                bookmarkX={bookmarkX}
                bookmarkY={bookmarkY}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPlace;
