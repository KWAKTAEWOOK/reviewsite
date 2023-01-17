import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "../../Style/Detail/slick/slick.css";
import "../../Style/Detail/slick/slick-theme.css";

const Modal = ({ outSection, images }) => {
  const getimg = images.map((getimages) => getimages).reverse();

  const [mainSlick, setMainSlick] = useState(null);
  const [pagingSlick, setPagingSlick] = useState(null);
  const mainSlickRef = useRef(null);
  const pagingSlickRef = useRef(null);
  useEffect(() => {
    setMainSlick(mainSlickRef.current);
    setPagingSlick(pagingSlickRef.current);
    //모달 실행중에 스크롤 금지
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);

  const mainSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const pagingSettings = {
    dots: false,
    arrows: false,
    centerMode: true,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
  };
  const onClickPrev = useCallback((ref) => () => ref.current.slickPrev(), []);
  const onClickNext = useCallback((ref) => () => ref.current.slickNext(), []);
  return (
    <div className="modalcontainer" ref={outSection}>
      <div className="modal">
        <article className="modalbox">
          <div>
            <Slider ref={mainSlickRef} asNavFor={pagingSlick} {...mainSettings}>
              {getimg.map((v) => {
                return (
                  <div className="SlickItems">
                    <img src={v.imgUrl} />
                  </div>
                );
              })}
            </Slider>

            <Slider
              ref={pagingSlickRef}
              asNavFor={mainSlick}
              {...pagingSettings}
              slidesToShow={getimg.length < 7 ? 5 : 7}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              {getimg.map((v) => {
                return (
                  <div className="PagingAnchor">
                    <img src={v.imgUrl} />
                  </div>
                );
              })}
            </Slider>
          </div>
        </article>
        <Slider
          ref={pagingSlickRef}
          // asNavFor={mainSlick}
          arrows={false}
          slidesToShow={1}
          swipeToSlide={false}
        >
          {getimg.map((v) => {
            return (
              <div className="vbox">
                <div>닉네임 : {v.nickname}</div>
                <span> 리뷰 내용 :{v.content}</span>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Modal;
