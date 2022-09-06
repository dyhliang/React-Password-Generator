import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator_header">
            PassGen
          </h2>
          <div className="generator_password">
            <h3>Password</h3>
            <button className="copy_btn">
              <i className='far fa-clipboard'></i>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
