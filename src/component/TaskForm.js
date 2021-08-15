import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as action from "../actions/taskAction";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

const TaskForm = () => {

    const current = new Date().toISOString().split("T")[0];
    const list = useSelector(state => state.list)
    const currentIndex = useSelector(state => state.currentIndex)
    const dispatch = useDispatch();
    let history = useHistory()
    const [formData, SetFormData] = useState({
        ...returnTaskObject()
    })

    function returnTaskObject() {
        if (currentIndex === -1) {
            return {
                taskName: '',
                description: '',
                startTime: current,
                endTime: current
            }
        }
        else {
            return list[currentIndex]
        }
    }

    useEffect(() => {
        SetFormData({ ...returnTaskObject() })
    }, [currentIndex])

    const handleInputChange = (e) => {
        SetFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let TaskName = document.getElementById('task_name').value;
        let Task_Description = document.getElementById('task_description').value;

        if ((TaskName.length === 0 && Task_Description.length === 0) || (TaskName.length > 0 && Task_Description.length === 0) || (TaskName.length === 0 && Task_Description.length > 0)) {

        }
        else {

            if (currentIndex === -1) {
                dispatch(action.insertTask(formData))
            }
            else {
                dispatch(action.updateTask(formData))
            }
            history.push("/viewTasks")
        }
    }

    const { taskName, description, startTime, endTime } = formData;
    return (<>
        <div className="container">
            <div className="w-75 p-5 mx-auto shadow">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2 className="text-center mb-4 ">Task Details</h2>
                    </div >
                    <div className="form-group mb-2">
                        <input id='task_name' name='taskName' placeholder='Enter Task Name' className="form-control form-control-lg" value={taskName} onChange={handleInputChange} />
                        {(taskName.length <= 0) ? <span style={{ color: 'red' }}>* Please Enter Task Name</span> : null}
                    </div>
                    <div className="form-group mb-2">
                        <input id="task_description" name='description' placeholder='Enter Description' className="form-control form-control-lg" value={description} onChange={handleInputChange} />
                        {(description.length <= 0) ? <span style={{ color: 'red' }}>* Please Enter Task Description</span> : null}
                    </div>
                    <div className="form-group mb-2">
                        <input type="date" name="startTime" min={current} className="form-control form-control-lg" value={startTime} onChange={handleInputChange} />
                    </div>
                    <div className="form-group mb-2">
                        <input type="date" name='endTime' min={startTime} className="form-control form-control-lg" value={endTime} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                </form>
            </div>
        </div>
    </>
    )
}
export default TaskForm;
