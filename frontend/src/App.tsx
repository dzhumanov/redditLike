import { Container, CssBaseline } from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import { Route, Routes } from "react-router-dom";
import Posts from "./features/posts/Posts";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import CreatePost from "./features/posts/CreatePost";
import FullPost from "./features/posts/Components/FullPost";

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/addNew" element={<CreatePost />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
