import React, { useState } from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Myplace/MyPlace.scss";
import { userState } from "../../recoil/user";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { BACKEND_URL } from "../../utils";
import axios from "axios";
import MarkName from "./MarkName";
import MyBookmarkPlace from "./MyBookmarkPlace";

const SelectMyPlace = () => {
  const [user, setUser] = useRecoilState(userState);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkX, setBookmarkX] = useState([]);
  const [bookmarkY, setBookmarkY] = useState([]);
  const [bookmarkName, setBookmarkName] = useState([]);
  const [bookmarkByFolder, setBookmarkByFolder] = useState([]);
  const [name, setName] = useState("");

  const para = document.location.href.split("myplace/");

  // 북마크 이름 생성
  const createBookmark = async (e) => {
    if (name.length === 0) {
      alert("이름을 입력해주세요.");
      e.preventDefault();
    }
    if (name.length > 9) {
      alert("10자 이내로 작성해주세요.");
      e.preventDefault();
    } else {
      const data = await axios({
        url: `${BACKEND_URL}/bookmarkname?userId=${user?.id}`,
        method: "POST",
        data: {
          bookmarkName: name,
        },
      });
    }
  };

  // 생성한 북마크 폴더 가져오기
  useEffect(() => {
    const getData = async (e) => {
      const data = await axios({
        url: `${BACKEND_URL}/bookmarkname?userId=${user?.id}`,
        method: "GET",
      });
      setBookmarkName(data.data);
    };
    getData();
  }, []);

  // 유저의 북마크 가져오기
  useEffect(() => {
    const getData = async (e) => {
      const data = await axios({
        url: `${BACKEND_URL}/bookmarkname/${parseInt(para[1])}`,
        method: "GET",
      });
      setBookmarks(data.data.bookmark);
      setBookmarkX(data.data.bookmark[0]?.locationX);
      setBookmarkY(data.data.bookmark[0]?.locationY);
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
            <p className="myList_list">
              📚 나의 북마크
              <button
                className="all_list"
                onClick={() => {
                  window.location.href = "/myplace";
                }}
              >
                전체보기
              </button>
            </p>
            <div className="showMyList">
              {bookmarkName.map((markname, index) => (
                <MarkName
                  key={index}
                  markname={markname}
                  bookmarkName={bookmarkName}
                  bookmarks={bookmarks}
                  bookmarkX={bookmarkX}
                  bookmarkY={bookmarkY}
                />
              ))}
              <div className="myList_add">
                <p className="add_list">➕ 추가하기 </p>
                <form onSubmit={createBookmark}>
                  <input
                    className="myList_listname_input"
                    type="text"
                    placeholder="10자 이내로 작성해주세요."
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <button className="myList_addBtn"> + </button>
                </form>
              </div>
            </div>
          </div>
          <div className="right_fixed_menu">
            <div className="marked_map">
              <MyBookmarkPlace
                bookmarkName={bookmarkName}
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

export default SelectMyPlace;
