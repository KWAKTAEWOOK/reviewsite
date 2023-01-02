import React, { useState } from "react";

const MarkName = ({ markname }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(markname?.bookmarkName);

  return (
    <>
      {edit ? (
        <div className="list_column">
          <div className="place_list">
            <form action="">
              <input
                className="edit_name_input"
                type="text"
                value={name}
                spellCheck={false}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="place_edit_btn place_edit_btn2">수정</button>
            </form>
          </div>
          <button
            className="place_edit_btn cancel_btn"
            onClick={() => {
              setEdit(false);
            }}
          >
            취소
          </button>
        </div>
      ) : (
        <div className="list_column">
          <div className="place_list">- {name}</div>
          <button
            className="place_edit_btn"
            onClick={() => {
              setEdit(true);
            }}
          >
            이름수정
          </button>
          <button className="place_edit_btn place_del_btn">삭제</button>
        </div>
      )}
    </>
  );
};

export default MarkName;
