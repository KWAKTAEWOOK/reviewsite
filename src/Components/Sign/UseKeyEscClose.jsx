import { useEffect } from "react";

export const UseKeyEscClose = (closeThing) => {
  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        closeThing();
        console.log("esc 확인");
      }
    };
    window.addEventListener("keydown", escKeyModalClose);

    return () => window.removeEventListener("keydown", escKeyModalClose);
  });
};

export default UseKeyEscClose;
