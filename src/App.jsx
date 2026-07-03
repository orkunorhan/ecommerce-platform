import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import Footer from "./layout/Footer";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        <PageContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
