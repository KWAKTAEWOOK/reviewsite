import React from "react";
import Topbar from "./Topbar";
import { FaSearchLocation } from "react-icons/fa";
import "../../Style/Main/Main.scss";

const Main = () => {
  return (
    <>
      <Topbar />
      <div className="main">
        <div className="mainList">
          <div className="searchMenu">
            <div className="searchBtn">
              <form className="searchBtn_in" action="">
                <select name="category" className="category">
                  <option value="food">식당</option>
                  <option value="cafe">카페</option>
                </select>
                <input type="text" placeholder="서구 둔산동" />
              </form>
            </div>
            <div className="search_List">리스트</div>
          </div>
          <div className="rode_api">지도</div>
        </div>
      </div>
    </>
  );
};

export default Main;
