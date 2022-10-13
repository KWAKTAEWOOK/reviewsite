import React, { useState } from "react";
import GalleryList from "./GalleryList";
import GalleryView from "./GalleryView";
import data from "./Image";
import "../../Style/Detail/img.css";

const Detail = () => {
  const [datas, setData] = useState(data);
  const [currItem, setCurrItem] = useState(datas[0]);

  const onView = (id) => {
    //고유번호인 id를 받아서 해당 고양이 사진을 찾아라
    setCurrItem(datas.find((item) => item.id === id)); //배열함수중 해당값만 찾아주는 find함수를 쓴다
  };

  return (
    <div className="wrap">
      <GalleryList datas={datas} onView={onView} currItem={currItem} />
    </div>
  );
};

export default Detail;
