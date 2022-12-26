/*global kakao*/
import React, { useState, useEffect, useRef } from "react";
import GalleryList from "./GalleryList";
import data from "./Image";
import "../../Style/Detail/img.css";
import "../../Style/Main/Main.scss";
import TopbarV2 from "../Main/TopbarV2";
import StarRating from "./StarRating";
import StarRate from "./StarRate";
import { useParams } from "react-router-dom";
import KakaoSearchDB from "../Hook/KakaoSearch";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user";
import UserLike from "./UserLike";
import Comment from "./Comment";
import Detailmap from "./Detailmap";
import Modal from "./Modal";
const Detail = () => {
  const [modal, setModal] = useState(false);
  const outSection = useRef();

  //
  const [datas, setData] = useState(data);
  const [getids, setGetid] = useState();
  const [currItem, setCurrItem] = useState(datas[0]);

  //-------------------------------------------------------------------
  //지도 map에 필요한 변수들
  const { place_name } = useParams();
  const outputdata = sessionStorage.getItem("detail");
  const detailsearch = place_name;
  const { id } = useParams();
  const dataildata = JSON.parse(outputdata);
  const [detailData] = KakaoSearchDB(detailsearch);

  //-----------------------------------
  //사진 클릭네이션
  const onView = (id) => {
    //고유번호인 id를 받아서 사진을 찾아라
    setCurrItem(datas.find((item) => item.id === id)); //배열함수중 해당값만 찾아주는 find함수를 쓴다
    if (id === 5) {
      setModal(true);
    }
  };
  //--------------------
  //업종별 카테고리 문자열 원하는것만 출력
  var str = dataildata.category_name;
  var words = str.split(">"); // ">" 구분으로 배열로 변환
  var word1 = str.substring(0, str.indexOf(">"));
  var word2 = str.substring(
    str.indexOf(">") + 1,
    str.indexOf(">", str.indexOf(">") + 1)
  );
  var word3 = str.substring(str.lastIndexOf(">") + 1);
  const count = dataildata.category_name
    .match(/>/g)
    .filter((item) => item !== "").length; // ">"겟수 카운터
  var keystr; // ">"갯수에 따라 출력
  if (count == 2) {
    keystr = word2;
  } else {
    keystr = word3;
  }

  //--------------------------------------------

  const [nickname, setNickname] = useState("");

  function setting() {
    setNickname(user && user.nickname);
  }

  useEffect(() => {
    setting();
  }, []);

  //-------------------------------------------
  // 스크롤 오브젝트 Ref
  const photosRef = useRef();
  const detailRef = useRef();
  const mappgRef = useRef();
  const reviewRef = useRef();
  const photos = () =>
    photosRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const detail = () =>
    detailRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  const mappg = () =>
    mappgRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  const review = () =>
    reviewRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  //------------------------------------------------------------------
  const [user, setUser] = useRecoilState(userState);

  const detail_id = id;
  const [getdata, setGetdata] = useState([]);
  const reversedgetdata = getdata.map((getdatas) => getdatas).reverse();

  useEffect(() => {
    const get = async (e) => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}/get`,
          method: "GET",
          params: {
            detailId: detail_id,
          },
        });
        setGetdata(data.data);
      } catch (e) {
        console.log(e);
        alert("값 입력 실패");
      }
    };
    get();
  }, []);
  //------------------------------------------------------------------
  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        modal &&
        outSection.current &&
        !outSection.current.contains(e.target)
      ) {
        setModal(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modal]);

  //----------------------------------------------------
  //----------------------------------------------------

  return (
    <>
      <TopbarV2 />
      {modal ? (
        <div
          onClick={(e) => {
            if (outSection.current == e.target) {
              setModal(false);
            }
          }}
        >
          <Modal outSection={outSection} />
        </div>
      ) : null}
      <div className="detail_back">
        <div className="wrap" ref={photosRef}>
          <GalleryList datas={datas} onView={onView} currItem={currItem} />
        </div>
        <nav className="styled__TopNav-sc-1tkfz70-1 eUocsG">
          <div>
            <div className="NavGroup">
              <button onClick={photos}>사진</button>
              <button onClick={detail}>상세정보</button>
              <button onClick={mappg}>지도/위치</button>
              <button onClick={review}>리뷰</button>
            </div>
          </div>
        </nav>
        <div className="body1">
          <div className="magin-side">
            <div className="Box">
              <div className="confont">
                <div className="cafe">{place_name}</div>
                <div className="Foods">{keystr}</div>
              </div>
              <div className="group left" ref={detailRef}>
                <div>평점</div>
                <div>주소</div>
                <div>연락처</div>
                <div>영업시간</div>
              </div>
              <div className="group right">
                <div>
                  <StarRate />
                </div>
                <div>{detailData.road_address_name}</div>
                <div>{detailData.phone}</div>
                <div>11:00~21:00</div>
              </div>
              <UserLike detailData={detailData} />
            </div>
            <Detailmap place_name={place_name} mappgRef={mappgRef} />
            {user && <StarRating />}
            <br />
            <div className="detail_comment">
              <p>🦾 댓글달기</p>
              {reversedgetdata.map((reviewlist, index) => (
                <Comment
                  reviewlist={reviewlist}
                  key={index}
                  nickname={nickname}
                  reviewRef={reviewRef}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
