import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import "./App.css";
import Layout from "./components/layouts/Layout";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
