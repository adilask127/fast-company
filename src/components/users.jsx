import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../API";
import GroupList from "./groupList";
import SearchStatus from "./SearchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const pageSize = 8;
    useEffect(() => {
        api.professions.fetchAll().then(
            (data) => setProfessions(data)
            // setProfessions(
            //     Object.assign(data, {
            //         allProfession: { name: "Все профессии" }
            //     })
            // )
        );
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        console.log("page:", pageIndex);
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
        // if (sortBy.iter === item) {
        //     setSortBy((prevState) => ({
        //         ...prevState,
        //         order: prevState.order === "asc" ? "desc" : "asc"
        //     }));
        // } else {
        //     setSortBy({ iter: item, order: "asc" });
        // }
        // setSortBy({ iter: item, order: "asc" });
    };
    // selectedProf && selectedProf._id
    const filteredUsers = selectedProf
        ? allUsers.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : allUsers;
    const count = filteredUsers ? filteredUsers.length : 0;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    // const sortedUsers = _.orderBy(filteredUsers, ["name"], ["desc"]);
    const users = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus totalItems={count} />
                {count > 0 && (
                    <UserTable
                        users={users}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        {...rest}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
