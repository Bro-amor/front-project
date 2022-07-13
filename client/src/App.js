import './App.css';
import { Link } from "react-router-dom";
import * as mnode from "./components/nodelibrary";


// const nodeTest = () => {
//   fetch('http://192.168.0.189:5000/nodetest')
//   .then((response) => response.json())
//   .then((data) => {console.log(data)});
// }

// const nodeTest2 = () => {
//   let path = `/root/Projects/Front/server`;
//   mnode.getFileFolderList(path);
// }

const nodeTest3 = () => {
  mnode.getFileFolderList(mnode.PATH, "xml");
  return;
}

function App() {
  return (
    <div className="App">
      <h1>router test</h1>

      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/dataset">Dataset</Link> |{" "}
        <Link to="/netconfig">Netconfig</Link> |{" "} 
        <Link to="/netconfig_copy">Netconfig_copy</Link> |{" "} 
        <Link to="/labeling">Labeling</Link> |{" "} 
        <Link to="/labeling_copy">Labeling_copy</Link>
      </nav>

      <button onClick={nodeTest3}>서버 연결</button>
    </div>
  );
}

export default App;
