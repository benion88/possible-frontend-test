import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import TodoList from '../components/TodoList';
import { getTodos, updateTodo, healthCheck } from '../utils/api';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState('checking');

  useEffect(() => {
    checkServerHealth();
    fetchTodos();
  }, []);

  const checkServerHealth = async () => {
    try {
      await healthCheck();
      setServerStatus('online');
    } catch (error) {
      setServerStatus('offline');
      setError('Backend server is not responding. Please make sure the backend is running on port 5000.');
    }
  };

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
      setError('');
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError(`Failed to load todos: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (todoId, completed) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to update todos');
        return;
      }

      await updateTodo(todoId, { completed: !completed });
      
      setTodos(todos.map(todo => 
        todo._id === todoId ? { ...todo, completed: !completed } : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
      alert(`Error updating todo: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div>Checking server status... {serverStatus}</div>
          {serverStatus === 'offline' && (
            <div className="server-error">
              <p>Backend server is offline. Please make sure:</p>
              <ol>
                <li>Backend is running on port 5000</li>
                <li>MongoDB is running</li>
                <li>No other services are using port 5000</li>
              </ol>
            </div>
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <header className="header">
          <div>
            <h1>Todo List</h1>
            <div className={`server-status ${serverStatus}`}>
              Server: {serverStatus}
            </div>
          </div>
          <Link href="/login" className="login-btn">
            Login
          </Link>
        </header>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchTodos} className="retry-btn">
              Retry
            </button>
          </div>
        )}
        
        <TodoList 
          todos={todos} 
          onToggleComplete={handleToggleComplete}
        />
      </div>

      <style jsx>{`
        .server-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          margin-left: 10px;
        }
        
        .server-status.online {
          background: #d4edda;
          color: #155724;
        }
        
        .server-status.offline {
          background: #f8d7da;
          color: #721c24;
        }
        
        .server-status.checking {
          background: #fff3cd;
          color: #856404;
        }
        
        .error-message {
          background: #f8d7da;
          color: #721c24;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .retry-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .server-error {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          padding: 15px;
          border-radius: 5px;
          margin-top: 10px;
        }
        
        .server-error ol {
          margin: 10px 0;
          padding-left: 20px;
        }
      `}</style>
    </Layout>
  );
}