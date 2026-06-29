import { useEffect, useMemo, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Tasks({ authAxios }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await authAxios.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Could not load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (filter === 'Completed') return tasks.filter((task) => task.completed);
    if (filter === 'Pending') return tasks.filter((task) => !task.completed);
    return tasks;
  }, [tasks, filter]);

  const handleCreate = async (taskData) => {
    try {
      const { data } = await authAxios.post('/tasks', taskData);
      setTasks((prev) => [data, ...prev]);
    } catch {
      setError('Unable to add task');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const { data } = await authAxios.put(`/tasks/${id}`, updates);
      setTasks((prev) => prev.map((task) => (task._id === id ? data : task)));
      setEditing(null);
    } catch {
      setError('Unable to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await authAxios.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch {
      setError('Unable to delete task');
    }
  };

  const handleToggle = async (task) => {
    await handleUpdate(task._id, { completed: !task.completed });
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="tasks-page">
      <div className="hero-card">
        <div>
          <h1>My Task Manager</h1>
          <p>Organize your work, track completion, and stay focused.</p>
        </div>
        <div className="progress-bar">
          <span>Completed {progress}%</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <TaskForm onSubmit={editing ? (updates) => handleUpdate(editing._id, updates) : handleCreate} editing={editing} onCancel={() => setEditing(null)} />

      <div className="task-toolbar">
        <div className="filters">
          {['All', 'Completed', 'Pending'].map((option) => (
            <button key={option} className={filter === option ? 'active' : ''} onClick={() => setFilter(option)}>
              {option}
            </button>
          ))}
        </div>
        <div className="task-count">{filteredTasks.length} tasks</div>
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading tasks...</p> : <TaskList tasks={filteredTasks} onEdit={setEditing} onDelete={handleDelete} onToggle={handleToggle} />}
    </div>
  );
}

export default Tasks;
