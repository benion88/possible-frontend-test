import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="A simple todo application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        {children}
      </main>
      
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #f5f5f5;
          color: #333;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        
        .login-btn {
          background: #0070f3;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
        }
        
        .back-btn {
          background: #666;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        
        .todo-detail {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .description {
          margin: 20px 0;
          line-height: 1.6;
        }
        
        .status {
          padding: 5px 10px;
          border-radius: 5px;
          display: inline-block;
        }
        
        .status.completed {
          background: #d4edda;
          color: #155724;
        }
        
        .status.pending {
          background: #fff3cd;
          color: #856404;
        }
        
        .auth-container {
          max-width: 400px;
          margin: 50px auto;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .toggle-btn {
          background: none;
          border: none;
          color: #0070f3;
          cursor: pointer;
          margin-top: 20px;
        }
        
        .loading, .error {
          text-align: center;
          padding: 50px;
          font-size: 18px;
        }
        
        .error {
          color: #dc3545;
        }
      `}</style>
    </>
  );
}