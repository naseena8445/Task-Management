import { useEffect, useState } from 'react';

const defaultTask = { title: '', description: '', dueDate: '', priority: 'Medium' };

function TaskForm({ onSubmit, editing, onCancel }) {
  const [task, setTask] = useState(defaultTask);

  useEffect(() => {
    if (editing) {
      setTask({
        title: editing.title || '',
        description: editing.description || '',
        dueDate: editing.dueDate ? editing.dueDate.slice(0, 10) : '',
        priority: editing.priority || 'Medium',
      });
    }
  }, [editing]);

  const handleChange = (field) => (e) => {
    setTask((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onSubmit({ ...task, dueDate: task.dueDate || null });
    setTask(defaultTask);
  };

  return (
    <div className="card task-form-card">
      <h2>{editing ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Title</label>
          <input value={task.title} onChange={handleChange('title')} required />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea value={task.description} onChange={handleChange('description')} rows={3} />
        </div>
        <div className="form-grid">
          <div className="form-row">
            <label>Due Date</label>
            <input type="date" value={task.dueDate} onChange={handleChange('dueDate')} />
          </div>
          <div className="form-row">
            <label>Priority</label>
            <select value={task.priority} onChange={handleChange('priority')}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">{editing ? 'Save Changes' : 'Add Task'}</button>
          {editing && (
            <button type="button" className="secondary" onClick={() => { setTask(defaultTask); onCancel(); }}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
