import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/login";
import VolcanoList from "./pages/volcano_list";
import Volcano from "./pages/volcanoPage/volcanoDetails";
import Register from "./pages/register";
import { AuthProvider } from "./utils/auth/userAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/volcano_list" element={<VolcanoList />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/volcano" element={<Volcano />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
