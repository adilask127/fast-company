import React from "react";
import PropTypes from "prop-types";
import TableHeaderCaret from "./tableHeaderCaret";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
        // setSortBy({ path: item, order: "asc" });
    };
    // const getCaretIcon = (item) => {
    //     let className = "";
    //     if (selectedSort.path === item && selectedSort.order === "asc") {
    //         className = "bi bi-caret-up-fill";
    //     } else if (
    //         selectedSort.path === item &&
    //         selectedSort.order === "desc"
    //     ) {
    //         className = "bi bi-caret-down-fill";
    //     }
    //     return className;
    // };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {/* <i className={getCaretIcon(columns[column].path)}></i> */}
                        <TableHeaderCaret
                            item={columns[column].path}
                            selectedSort={selectedSort}
                        />
                    </th>
                ))}
                {/* <th onClick={() => handleSort("name")} scope="col">
                    Имя
                </th>
                <th scope="col">Качества</th>
                <th onClick={() => handleSort("profession.name")} scope="col">
                    Профессия
                </th>
                <th onClick={() => handleSort("completedMeetings")} scope="col">
                    Встретился, раз
                </th>
                <th onClick={() => handleSort("rate")} scope="col">
                    Оценка
                </th>
                <th onClick={() => handleSort("bookmark")} scope="col">
                    Избранное
                </th>
                <th /> */}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
