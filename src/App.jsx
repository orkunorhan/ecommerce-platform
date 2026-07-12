import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { verifyToken } from "./store/actions/clientActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken()).catch(() => {
      // Invalid token is already cleared inside the thunk.
    });
  }, [dispatch]);

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <PageContent />
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
      />
    </Router>
  );
}

export default App;
