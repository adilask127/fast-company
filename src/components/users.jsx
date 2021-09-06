import React from "react";
import User from "./user";

const Users = (props) => {
  debugger;
  return (
    <div>
      <table
        className="table"
        style={{ visibility: props.users.length ? "visible" : "hidden" }}
      >
        <thead>
          <tr>
            <th>Имя</th>
            <th>Качества</th>
            <th>Профессия</th>
            <th>Встретился, раз</th>
            <th>Оценка</th>
            <th>Избранное</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user, index) => (
            <User
              key={user._id}
              onDelete={props.onDelete}
              onBookMarkToggle={props.onBookMarkToggle}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
