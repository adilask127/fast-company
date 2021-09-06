import React from "react";
const BookMark = (props) => {
  debugger;
  const getBookMarkIcon = () => {
    debugger;
    let className = "";
    const isBookMark = props.BookMark;
    if (!isBookMark) className = "bi bi-bookmark";
    else className = "bi bi-bookmark-fill";
    return className;
  };
  return (
    <button type="button" onClick={() => props.onBookMarkToggle(props._id)}>
      <i className={getBookMarkIcon()}></i>
    </button>
  );
};

export default BookMark;
