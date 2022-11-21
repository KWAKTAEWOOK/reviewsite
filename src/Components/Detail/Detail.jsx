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

const { kakao } = window;

const Detail = () => {
  const [datas, setData] = useState(data);
  const [getids, setGetid] = useState();
  const [currItem, setCurrItem] = useState(datas[0]);

  const onView = (id) => {
    //고유번호인 id를 받아서 사진을 찾아라
    setCurrItem(datas.find((item) => item.id === id)); //배열함수중 해당값만 찾아주는 find함수를 쓴다
  };
  //--------------------------------------------

  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function setting() {
    setNickname(user.nickname);
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
  //----------------------------------------------
  //link로 데이터전달 useLocation hook
  const outputdata = sessionStorage.getItem("detail");
  const dataildata = JSON.parse(outputdata);
  const { place_name } = useParams();
  const { id } = useParams();
  const detailsearch = place_name;
  const [detailData] = KakaoSearchDB(detailsearch);
  //-----------------------------------------------
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
  //-----------------------------------------------------------
  // 추천 찜 항목
  const [heart, setheart] = useState(false);
  const [like, setlike] = useState(false);

  const HeartImg = "/images/heart.png";
  const EmptyHeartImg = "/images/heart1.png";

  const likeImg = "/images/like1.png";
  const EmptylinkeImg = "/images/like2.png";

  const heartClick = () => {
    setheart((heart) => !heart);
    console.log("하트눌림");
  };

  const likeClick = () => {
    setlike((like) => !like);
    console.log("좋아요눌림");
  };
  //--------------------------------------------------------
  //지도 로직
  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: new kakao.maps.LatLng(36.349348279760655, 127.3766854960456), // 지도의 중심좌표
      level: 2, // 지도의 확대 레벨
    };

    var map = new window.kakao.maps.Map(mapContainer, mapOption);
  }, []);
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

  //----------------------------------------------------------
  // useEffect(() => {
  //   (async () => {
  //     const getid = await axios({
  //       url: `${BACKEND_URL}/detail/post`,
  //       method: "POST",
  //       data: {
  //         detail_id,
  //       },
  //     });
  //     setGetid(id);
  //   })();
  // }, []);

  //------------------------------------------------------------------
  const [user, setUser] = useRecoilState(userState);

  const detail_id = id;
  const [getdata, setGetdata] = useState([]);
  const [rating, setRating] = useState(0);
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
        alert("값 입력 실패");
      }
    };
    get();
  }, []);
  //-----------------------------------------------

  //----------------------------------------------------
  //리뷰 컨텐트 map 펑션으로 뿌려준로직
  function Reviewlist({ reviewlist }) {
    //-- 리뷰 삭제 로직-----------------------------------
    const onSubmoit = (e) => {
      e.preventDefault(); //동작때마다 새로고침 중지
      if (window.confirm("삭제하시겠습니까?") == true) {
        deletecontent();
        console.log("삭제가 완료되었습니다.");
      } else {
        // false는 취소버튼을 눌렀을 때, 취소됨
        console.log("취소되었습니다");
      }
    };
    const deletecontent = async (e) => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}/delete/${reviewlist.id}`,
          method: "DELETE",
          params: {
            id: reviewlist.id,
          },
        });

        window.location.reload();
      } catch (e) {
        alert("값 입력 실패");
      }
    };

    return (
      <div ref={reviewRef} className="userdiv">
        <div className="starcreatedate">
          {/* 별점 ---------------------------------- */}
          <div className="star-rating">
            평점 :　
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= reviewlist.star ? "on" : "off"}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>
          {/* 별점끝------------------------------------ */}
          {/* 날짜 -------------------------------------- */}
          <div className="createDate">
            {reviewlist.createDate.substring(0, 10)}
            &nbsp;
            {reviewlist.createDate.substring(11, 16)}
            {nickname == reviewlist.nickname && (
              <>
                <button className="textbut">
                  <span>수정</span>
                </button>

                <button className="textbut" onClick={onSubmoit}>
                  <span>삭제</span>
                </button>
              </>
            )}
          </div>
          {/* 리뷰 content--------------------------------- */}
        </div>
        <div className="사용자">
          <div className="usercon">
            <img className="userimg" src="/images/6.jpg" alt="" />
            <div>{reviewlist.nickname}</div>
          </div>
          <div className="contant">
            <div> {reviewlist.content}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopbarV2 />
      <div>
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

                <div>주차</div>
                <div>영업시간</div>
              </div>

              <div className="group right">
                <div>
                  <StarRate />
                </div>
                <div>{detailData.road_address_name}</div>

                <div>가능</div>
                <div>11:00~21:00</div>
              </div>
              <UserLike />
            </div>

            <div className="maptext">위치정보</div>
            <div className="rode_api1" id="map" ref={mappgRef}></div>
            {user && <StarRating />}

            <br />
            <div>
              {reversedgetdata.map((reviewlist, index) => (
                <Reviewlist reviewlist={reviewlist} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
