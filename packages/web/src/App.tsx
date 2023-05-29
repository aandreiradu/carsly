import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/home.page';
import SignUp from './pages/SignUp/signup.page';
import SignIn from './pages/SignIn/signin.page';
import Persist from './components/Persist/persist.component';

function App() {
  return (
    <Routes>
      {/* SignUp & SignIn */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route element={<Persist />}>
        <Route index path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
