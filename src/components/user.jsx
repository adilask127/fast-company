import React from "react";
import Qualities from "./qualitie";
import BookMark from "./bookmark";

const User = ({ user, onDelete, onBookMarkToggle }) => {
  debugger;
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality, ind) => (
          <Qualities key={quality._id} {...quality} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}</td>
      <td>
        <BookMark onBookMarkToggle={onBookMarkToggle} {...user} />
      </td>
      <td>
        <button
          type="button"
          onClick={() => onDelete(user._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
