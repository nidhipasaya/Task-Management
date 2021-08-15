import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as action from "../actions/taskAction";
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {

    const list = useSelector(state => state.list)
    const [q, setQ] = useState("");
    const dispatch = useDispatch();
    const current = new Date().toISOString().split("T")[0];

    const handleEdit = index => {
        dispatch(action.updateIndex(index))
    }

    const handleDelete = index => {
        dispatch(action.deleteTask(index))
    }

    const search = rows => {
        return rows.filter(
            (row) =>
                row.taskName.toLowerCase().indexOf(q.toLowerCase()) > -1
        )
    }

    const getStatus = (startDate, endDate) => {
        let end_Date = Date.parse(endDate);
        let start_Date = Date.parse(startDate);
        let current_Date = Date.parse(current);
        if (current_Date < start_Date) {
            return "scheduled"
        }
        else if (current_Date > end_Date) {
            return "expired"
        }
        else if (current_Date => start_Date && current_Date < end_Date) {
            return "running"
        }
    }

    const userDetails = JSON.parse(localStorage.getItem('login'));

    return (<>
        <div className="container">
            <div className="py-4">
                <label style={{ justifyContent: "center", display: "flex" }}><h2><b>Welcome Back, Dear {userDetails[0].username}...</b></h2></label>
                <input className="form-control" style={{ width: '250px' }} type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by Task Name..." />
                <br />
                <table className="table border shadow">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list && search(list).map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.taskName}</td>
                                <td>{item.description}</td>
                                <td>{getStatus(item.startTime, item.endTime)}</td>
                                <td>
                                    <Link class="btn btn-outline-primary m-1" to='/editTask' onClick={() => handleEdit(index)}>Edit</Link>
                                    <Link class="btn btn-danger m-1" onClick={() => handleDelete(index)}>Delete</Link>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
    )
}
export default TaskList;
