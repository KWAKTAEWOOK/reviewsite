import React from "react";

const MyReviewList = ({ index, comment }) => {
  const date = comment.createDate.split("T")[0];
  const name = comment.detail_name;
  const id = comment.detail_id;

  return (
    <>
      <tbody>
        <tr>
          <td>{index + 1}</td>
          <th
            className="review_place_name"
            onClick={() => {
              window.location.href = `http://localhost:3000/Detail/${name}/${id}`;
            }}
          >
            <p>{name}</p>
          </th>
          <th>{comment.content}</th>
          <td>{date}</td>
          <td>{comment.star}</td>
        </tr>
      </tbody>
    </>
  );
};

export default MyReviewList;
