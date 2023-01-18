import React, { useRef, useCallback, useState } from "react";
import Slider from "react-slick";
import "../../../Style/Detail/slick/slick.css";
import "../../../Style/Detail/slick/slick-theme.css";
import Modal from "../Modal";

const CenterMode = ({ images, modal, setModal }) => {
  //------------------------------------------------------------------------------------
  //이미지값 배열 뒤집는 로직
  const getimg = images.map((getimages) => getimages).reverse();
  //-----------------------------------------------------------------------------------

  const img = getimg.slice(0, 5);

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    CenterMode: true,
    centerPadding: "-350px",

    // 2. custom pagination을 만듭니다.
    // i(index)를 통해 샘플이미지에서 동일한 이미지를 가져옵니다.
    customPaging: function (i) {
      const Click = () => {
        if (i === 4) {
          setModal(!modal);
        }
      };
      return (
        <a className="PagingAnchor">
          <img className="Paging" src={img[i].imgUrl} onClick={Click} />
        </a>
      );
    },
  };
  // 5. custom arrows 동작 함수를 만듭니다.
  const slickRef = useRef(null);
  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);
  return (
    <div className="test">
      <Slider ref={slickRef} {...settings}>
        {img.map((v, i) => {
          return (
            <div className="SlickItems">
              <img src={v.imgUrl} />
            </div>
          );
        })}
      </Slider>
      <>
        {/* <button className="PrevButton" onClick={previous}></button>
        <button className="NextButton" onClick={next}></button> */}
      </>
    </div>
  );
};

export default CenterMode;
