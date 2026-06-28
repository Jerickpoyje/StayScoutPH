import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout.jsx';
import Home from './pages/Home.jsx';
import Discover from './pages/Discover.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="discover" element={<Discover />} />
      </Route>
    </Routes>
  );
}

export default App;
