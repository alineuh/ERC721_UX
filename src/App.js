// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import './App.css';
import ChainInfo from './chain-info'; 
import Error from './error';
import FakeBayc from './FakeBayc';
import FakeBaycToken from './FakeBaycToken';
import FakeNefturians from './FakeNefturians';
//import ErrorPage from './ErrorPage'; 
//import FakeBayc from './FakeBayc'; // Import de la nouvelle page


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chain-info">Chain Info</Link>
            </li>
            <li>
              <Link to="/FakeBayc">User Info</Link>
            </li>
            <li>
              <Link to="/fakeNefturians">Fake Nefturians</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<h1>Welcome to the Home Page!</h1>} />
          <Route path="/chain-info" element={<ChainInfo />} />
          <Route path="/error" element={<Error />} />
          <Route path="/FakeBayc" element={<FakeBayc />} />
          <Route path="/fakeBayc/:tokenId" element={<FakeBaycToken />} />
          <Route path="/fakeNefturians" element={<FakeNefturians />} /> 
        </Routes>
      </header>
    </div>
  );
}

export default App;