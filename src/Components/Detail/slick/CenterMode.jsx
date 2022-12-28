import React, {
  Component,
  useRef,
  useCallback,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { BACKEND_URL } from "../../../utils";
import Slider from "react-slick";
import "../../../Style/Detail/slick/slick.css";
import "../../../Style/Detail/slick/slick-theme.css";

const CenterMode = () => {
  const [images, setimages] = useState([]);
  const slickRef = useRef(null);
  // useEffect(() => {
  //   const getimg = async (e) => {
  //     try {
  //       const data = await axios({
  //         url: `${BACKEND_URL}/answer/image?detailId=493795939`,
  //         method: "GET",
  //       });
  //       setimages(data.data);
  //     } catch (e) {
  //       console.log(e);
  //       alert("값 입력 실패");
  //     }
  //   };
  //   getimg();
  // }, []);

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    // 2. custom pagination을 만듭니다.
    // i(index)를 통해 샘플이미지에서 동일한 이미지를 가져옵니다.
    customPaging: function (i) {
      const imgSrc = images[i].src;
      return (
        <a className="PagingAnchor">
          <span className="Paging" src={imgSrc} />
        </a>
      );
    },
  };
  // 5. custom arrows 동작 함수를 만듭니다.
  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);
  console.log(images);
  return (
    <div>
      <h2>Custom Paging</h2>
      <Slider ref={slickRef} {...settings}>
        {images.map((v, i) => {
          return (
            <div className="SlickItems" key={`${v.title}_${i}`}>
              <img src={v.src} />
            </div>
          );
        })}
      </Slider>
      <>
        <button className="PrevButton" onClick={previous}>
          <span className="hidden">이전</span>
        </button>

        <button className="NextButton" onClick={next}>
          <span className="hidden">다음</span>
        </button>
      </>
    </div>
  );
};

export default CenterMode;
