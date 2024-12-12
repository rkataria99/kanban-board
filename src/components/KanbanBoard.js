
import React, { useState } from 'react';
import Column from './Column';
import TaskFormModal from './TaskFormModal';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskStatus } from '../redux/tasksSlice';
import './styles.css';

const KanbanBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm) ||
    task.description.toLowerCase().includes(searchTerm)
  );

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId !== source.droppableId) {
      dispatch(
        updateTaskStatus({
          id: parseInt(draggableId),
          status: destination.droppableId,
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        <h1>Kanban Board</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="kanban-columns">
          <Column title="To Do" status="todo" tasks={filteredTasks.filter(task => task.status === 'todo')} />
          <Column title="In Progress" status="in-progress" tasks={filteredTasks.filter(task => task.status === 'in-progress')} />
          <Column title="Peer Review" status="peer-review" tasks={filteredTasks.filter(task => task.status === 'peer-review')} />
          <Column title="Done" status="done" tasks={filteredTasks.filter(task => task.status === 'done')} />
        </div>
        <button className="floating-button" onClick={handleOpenModal}>+</button>
        <TaskFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
