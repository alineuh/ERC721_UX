import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChainInfo from './ChainInfo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chain-info" element={<ChainInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
