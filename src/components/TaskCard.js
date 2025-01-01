import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './styles.css';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../redux/tasksSlice';

const TaskCard = ({ task, index }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleEdit = () => {
    dispatch(editTask({ id: task.id, title: editedTitle, description: editedDescription }));
    setIsEditing(false);
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
          {isEditing ? (
            <div className="edit-task">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Task Title"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Task Description"
              />
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <>
              <div className="task-content">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
              <div className="task-actions">
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
