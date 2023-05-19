import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home.page';
import SignUp from './pages/SignUp/signup.page';
import SignIn from './pages/SignIn/signin.page';

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />

      {/* SignUp & SignIn */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;
