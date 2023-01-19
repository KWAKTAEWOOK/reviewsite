import React, { useState } from "react";
import TopbarV2 from "../Main/TopbarV2";
import "../../Style/Myplace/MyPlace.scss";
import { userState } from "../../recoil/user";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { BACKEND_URL } from "../../utils";
import axios from "axios";
import MarkName from "./MarkName";
import SavePlaceMap from "./SavePlaceMap";

const MyPlace = () => {
  const [user, setUser] = useRecoilState(userState);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkX, setBookmarkX] = useState([]);
  const [bookmarkY, setBookmarkY] = useState([]);
  const [bookmarkName, setBookmarkName] = useState([]);
  const [name, setName] = useState("");
  const [userUrl, setUserUrl] = useState(0);

  const para = document.location.href.split("myplace/");

  // 유저의 북마크 가져오기
  useEffect(() => {
    const getData = async (e) => {
      const data = await axios({
        url: `${BACKEND_URL}/bookmark/user?userId=${parseInt(para[1])}`,
        method: "GET",
      });
      setUserUrl(parseInt(para[1]));
      setBookmarks(data.data);
      setBookmarkX(data.data[0]?.locationX);
      setBookmarkY(data.data[0]?.locationY);
    };
    getData();
  }, []);

  // 북마크 이름 생성
  const createBookmark = async (e) => {
    if (name.length === 0) {
      alert("폴더 이름을 작성해주세요.");
      e.preventDefault();
      return;
    }
    if (name.length > 9) {
      alert("10자 이내로 작성해주세요.");
      e.preventDefault();
      return;
    } else {
      const data = await axios({
        url: `${BACKEND_URL}/bookmarkname?userId=${parseInt(para[1])}`,
        method: "POST",
        data: {
          bookmarkName: name,
        },
      });
    }
  };

  // 생성한 북마크 폴더 가져오기
  useEffect(() => {
    const getData = async () => {
      const data = await axios({
        url: `${BACKEND_URL}/bookmarkname?userId=${parseInt(para[1])}`,
        method: "GET",
      });
      setBookmarkName(data.data);
    };
    getData();
  }, []);

  return (
    <>
      <TopbarV2 />
      <div className="likebackground">
        <div className="liketemplate">
          <div className="left_fixed_menu">
            <p className="show_list_p">👀 맛집 정보를 저장하고 관리해보세요!</p>
            <div className="marked_map">
              <SavePlaceMap
                bookmarkName={bookmarkName}
                bookmarks={bookmarks}
                bookmarkX={bookmarkX}
                bookmarkY={bookmarkY}
                userUrl={userUrl}
                user={user}
              />
            </div>
          </div>
          <div className="my_list_back">
            <p className="myList_list">
              {/* {user?.id === parseInt(para[1]) ? ( */}
              <span>📚 북마크</span>
              {/* ) : (
                <span>📚 {bookmarks[0]?.user?.nickname} 님의 북마크</span>
              )} */}
              <button
                className="all_list"
                onClick={() => {
                  window.location.href = `/myplace/${parseInt(para[1])}`;
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
                  userUrl={userUrl}
                  user={user}
                />
              ))}
              {user?.id === userUrl && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPlace;
