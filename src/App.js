import Routes from "./routes/routes";
import "./App.css";
import axios from "axios";

const App = () => {
  // axios.defaults.baseURL = "http://localhost:4000/";
  axios.defaults.baseURL = "https://server.dhalmart.com/";
  // axios.defaults.baseURL = "http://192.168.0.101:4000/";

  return <Routes />;
};

export default App;
