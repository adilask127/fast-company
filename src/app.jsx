import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./API";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const hasBookMarkProperty =
        users && users.length
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
        newUsers[elementIndex].BookMark = !newUsers[elementIndex].BookMark;
        setUsers(newUsers);
    };

    return (
        <div className="col-lg-8 mx-auto p-3 py-md-5">
            <main>
                {Users && (
                    <Users
                        users={users}
                        onBookMarkToggle={handleBookMarkToggle}
                        onDelete={handleDelete}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
