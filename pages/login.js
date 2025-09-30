import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';
import { login, register } from '../utils/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      const response = isLogin 
        ? await login(formData)
        : await register(formData);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      router.push('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        
        <AuthForm 
          isLogin={isLogin} 
          onSubmit={handleSubmit}
        />
        
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="toggle-btn"
        >
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </Layout>
  );
}