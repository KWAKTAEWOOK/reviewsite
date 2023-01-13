/*global kakao*/
import React, { useState, useEffect, useRef } from "react";

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
import CenterMode from "./slick/CenterMode";
const Detail = () => {
  //-------------------------------------------------------------------
  //지도 map에 필요한 변수들
  const { place_name } = useParams();
  const outputdata = sessionStorage.getItem("detail");
  const detailsearch = place_name;
  const { id } = useParams();
  const dataildata = JSON.parse(outputdata);
  const [detailData] = KakaoSearchDB(detailsearch);

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
    getimg();
    get();
  }, []);
  //-------------------------------------------------
  const [images, setimages] = useState(() => []);

  const getimg = async (e) => {
    try {
      const data = await axios({
        url: `${BACKEND_URL}/answer/image?detailId=${id}`,
        method: "GET",
      });
      setimages(data.data);
    } catch (e) {
      console.log(e);
      alert("이미지 불러오기 실패");
    }
  };

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
      block: "end",
    });

  //------------------------------------------------------------------
  const [user, setUser] = useRecoilState(userState);
  const detail_id = id;
  const [getdata, setGetdata] = useState([]);
  const reversedgetdata = getdata.map((getdatas) => getdatas).reverse();

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
      alert("리뷰 불러오기 실패");
    }
  };
  //------------------------------------------------------------------
  const [modal, setModal] = useState(false);
  const outSection = useRef();
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

  return (
    <>
      <TopbarV2 />
      {modal === true ? (
        <div
          onClick={(e) => {
            if (outSection.current == e.target) {
              setModal(false);
            }
          }}
        >
          <Modal outSection={outSection} images={images} />
        </div>
      ) : null}
      <div className="detail_back">
        <div className="wrap" ref={photosRef}>
          {images.length === 0 ? null : (
            <CenterMode images={images} setModal={setModal} modal={modal} />
          )}
          {images.length === 0 ? (
            <div className="noimg">
              <img src="/images/noimg_fac.gif" alt="" />
            </div>
          ) : null}
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
                {detailData.road_address_name != "" ? <div>주소</div> : null}
                {detailData.phone != "" ? <div>연락처</div> : null}
              </div>
              <div className="group right">
                <div>
                  <StarRate />
                </div>
                <div>{detailData.road_address_name}</div>
                <div>{detailData.phone}</div>
              </div>
              <UserLike detailData={detailData} />
            </div>
            <Detailmap place_name={place_name} mappgRef={mappgRef} />
            {user && <StarRating getdata={getdata} reviewRef={reviewRef} />}
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
