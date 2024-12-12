
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './styles.css';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/tasksSlice';

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task-card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
