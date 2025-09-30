import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getTodo } from '../../utils/api';

export default function TodoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const fetchTodo = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view todo details');
        setLoading(false);
        return;
      }

      const data = await getTodo(id, token);
      setTodo(data);
    } catch (error) {
      setError('Error fetching todo details');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error">{error}</div>
        <button onClick={() => router.push('/login')} className="btn">
          Go to Login
        </button>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        <button onClick={() => router.back()} className="back-btn">
          ← Back
        </button>
        
        <div className="todo-detail">
          <h1>{todo?.title}</h1>
          <p className="description">{todo?.description}</p>
          <div className={`status ${todo?.completed ? 'completed' : 'pending'}`}>
            Status: {todo?.completed ? 'Completed' : 'Pending'}
          </div>
        </div>
      </div>
    </Layout>
  );
}