import axios from "axios";
import React, { useState } from "react";
import { BiChevronDownCircle } from "react-icons/bi";
import { BACKEND_URL } from "../../utils";

const MarkName = ({ markname, userUrl, user }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(markname?.bookmarkName);
  const [editName, setEditName] = useState(markname?.bookmarkName);
  const nameId = markname?.id;

  // 북마크 폴더 이름 수정
  const updateName = (e) => {
    if (name.length > 10) {
      e.preventDefault();
      alert("10자 이내로 작성해주세요.");
      return;
    }
    try {
      axios({
        url: `${BACKEND_URL}/bookmarkname/${nameId}`,
        method: "PATCH",
        data: { bookmarkName: editName },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFolder = async (e) => {
    if (
      window.confirm(
        "폴더를 삭제하시면 저장된 북마크가 사라집니다. 진행하시겠습니까?"
      )
    ) {
      try {
        await axios({
          url: `${BACKEND_URL}/bookmarkname/delete/${nameId}`,
          method: "DELETE",
        });
        alert("삭제되었습니다.");
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className="list_column">
        {edit ? (
          <>
            <div className="place_list">
              <form onSubmit={updateName}>
                <input
                  className="edit_name_input"
                  type="text"
                  value={edit ? editName : name}
                  spellCheck={false}
                  onChange={(e) => {
                    edit
                      ? setEditName(e.target.value)
                      : setName(e.target.value);
                  }}
                />
                <button className="place_edit_btn place_edit_btn2">수정</button>
              </form>
            </div>
            <button
              className="place_edit_btn cancel_btn"
              onClick={() => {
                setEdit(false);
                setEditName(name);
              }}
            >
              취소
            </button>
          </>
        ) : (
          <>
            <div
              className="place_list"
              onClick={() => {
                window.location.href = `/myplace/choice/${userUrl}/${nameId}`;
              }}
            >
              - {name}
            </div>
            {user?.id === userUrl ? (
              <>
                <button
                  className="place_edit_btn"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  이름수정
                </button>
                <button
                  className="place_edit_btn place_del_btn"
                  onClick={deleteFolder}
                >
                  삭제
                </button>
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
};

export default MarkName;
