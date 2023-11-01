import { createRoot } from "react-dom/client";

// project imports
import App from "./components/App";

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
