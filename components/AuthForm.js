import { useState } from 'react';

export default function AuthForm({ isLogin, onSubmit }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      onSubmit({ email: formData.email, password: formData.password });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      )}
      
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength="6"
      />
      
      <button type="submit" className="submit-btn">
        {isLogin ? 'Login' : 'Register'}
      </button>
      
      <style jsx>{`
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }
        
        .submit-btn {
          background: #0070f3;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        
        .submit-btn:hover {
          background: #0051a8;
        }
      `}</style>
    </form>
  );
}