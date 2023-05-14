import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home.page';
import AuthLayout from './components/Layouts/Auth/auth.layout';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<AuthLayout />} />
    </Routes>
  );
}

export default App;
