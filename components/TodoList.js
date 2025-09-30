import Link from 'next/link';

export default function TodoList({ todos, onToggleComplete }) {
  if (!todos || todos.length === 0) {
    return <div className="no-todos">No todos found</div>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo._id} className="todo-item">
          <div 
            className={`todo-content ${todo.completed ? 'completed' : ''}`}
            onClick={() => onToggleComplete(todo._id, todo.completed)}
          >
            <span className="todo-title">{todo.title}</span>
            <span className="todo-status">
              {todo.completed ? '✓' : '○'}
            </span>
          </div>
          <Link href={`/todo/${todo._id}`} className="view-details">
            View Details
          </Link>
        </div>
      ))}
      
      <style jsx>{`
        .todo-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .todo-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 15px;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .todo-content {
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          flex: 1;
        }
        
        .todo-content.completed .todo-title {
          text-decoration: line-through;
          color: #666;
        }
        
        .todo-title {
          font-size: 16px;
        }
        
        .todo-status {
          font-size: 20px;
        }
        
        .view-details {
          color: #0070f3;
          text-decoration: none;
          padding: 5px 10px;
          border: 1px solid #0070f3;
          border-radius: 3px;
        }
        
        .no-todos {
          text-align: center;
          padding: 40px;
          color: #666;
        }
      `}</style>
    </div>
  );
}