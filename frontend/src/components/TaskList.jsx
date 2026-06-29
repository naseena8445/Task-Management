function TaskList({ tasks, onEdit, onDelete, onToggle }) {
  if (!tasks.length) {
    return <div className="empty-state">No tasks found. Add one to get started.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
          <div className="task-main">
            <label className="task-checkbox">
              <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
              <span />
            </label>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-meta">
                <span>{task.priority} priority</span>
                {task.dueDate && <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>}
              </div>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => onEdit(task)}>Edit</button>
            <button className="secondary" onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
