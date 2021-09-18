import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/SearchStatus";
import api from "./API";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const hasBookMarkProperty = users.length
        ? Object.prototype.hasOwnProperty.call(users[0], "BookMark")
        : true;
    if (!hasBookMarkProperty) users.map((m) => (m.BookMark = false));

    const handleDelete = (userId) => {
        const newUsers = users.filter((f) => f._id !== userId);
        setUsers(newUsers);
    };

    const handleBookMarkToggle = (userId) => {
        const newUsers = [...users];
        const elementIndex = users.findIndex((f) => f._id === userId);
        newUsers[elementIndex].BookMark =
            newUsers[elementIndex].BookMark ===
            !newUsers[elementIndex].BookMark;
        setUsers(newUsers);
    };

    return (
        <div className="col-lg-8 mx-auto p-3 py-md-5">
            <main>
                <SearchStatus totalItems={users.length} />
                <Users
                    users={users}
                    onBookMarkToggle={handleBookMarkToggle}
                    onDelete={handleDelete}
                />
            </main>
        </div>
    );
};

export default App;
