import React, { useState, useEffect } from "react";
import data from "./Image";

const Modal = ({ outSection }) => {
  //사진 클릭네이션
  const [datas, setData] = useState(data);
  const [getids, setGetid] = useState();
  const [currItem, setCurrItem] = useState(datas[0]);

  const onView = (id) => {
    setCurrItem(datas.find((item) => item.id === id));
  };

  function Gallery({ datas, currItem, onView }) {
    const { image } = currItem;

    return (
      <div className="modalcontainer" ref={outSection}>
        <div className="modal">
          <article className="modalbox">
            <img src={image} />
            <ul>
              {datas.map((item) => (
                <GallerysItem key={item.id} item={item} onView={onView} />
              ))}
            </ul>
          </article>
        </div>
      </div>
    );
  }

  function GallerysItem({ item, onView }) {
    const { image, id } = item;
    return (
      <li onClick={(e) => onView(id)}>
        <img src={image} />
      </li>
    );
  }
  return <Gallery datas={datas} onView={onView} currItem={currItem} />;
};

export default Modal;
