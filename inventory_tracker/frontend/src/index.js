import { createRoot } from "react-dom/client";
import App from "./components/App";

// render the div for React.js to control
const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
