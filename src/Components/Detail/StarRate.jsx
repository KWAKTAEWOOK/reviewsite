import styled from "styled-components";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../utils";
import axios from "axios";
import { useParams } from "react-router-dom";

function StarRate() {
  //
  useEffect(() => {}, []);
  const { id } = useParams();
  const detail_id = id;
  const [getdata, setGetdata] = useState([]);
  const AVR_RATE = getdata.star;
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * 70) / 5;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };

  useEffect(() => {
    const get = async (e) => {
      try {
        const data = await axios({
          url: `${BACKEND_URL}/staravg`,
          method: "GET",
          params: {
            detailId: detail_id,
          },
        });
        setGetdata(data.data);
        setRatesResArr(calcStarRates);
      } catch (e) {
        alert("값 입력 실패");
      }
    };
    get();
  }, [getdata.star]);
  return (
    <StarRateWrap>
      {STAR_IDX_ARR.map((item, idx) => {
        return (
          <span className="star_icon" key={`${item}_${idx}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="39"
              viewBox="0 0 14 13"
              fill="#cacaca"
            >
              <clipPath id={`${item}StarClip`}>
                <rect width={`${ratesResArr[idx]}`} height="39" />
              </clipPath>
              <path
                id={`${item}Star`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use
                clipPath={`url(#${item}StarClip)`}
                href={`#${item}Star`}
                fill="#966fd6"
              />
            </svg>
          </span>
        );
      })}
      <span>({getdata.count})</span>
    </StarRateWrap>
  );
}

export default StarRate;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 100px 0 0 15px;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
  }
`;
