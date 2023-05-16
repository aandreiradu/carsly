import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home.page';
import SignUp from './pages/SignUp/signup.page';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<SignUp />} />
    </Routes>
  );
}

export default App;
