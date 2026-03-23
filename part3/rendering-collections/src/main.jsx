import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// more notes from part2
/* axios.get('http://localhost:3001/notes') does NOT return the data immediately.
It returns a Promise.(means: “I will give you the result later.”)
.then() runs after the data arrives
WE CANNOT Just Put axios in the Component Body: It will run on every render.🔥 Infinite loop.
That’s why we need useEffect.

The second parameter [] means: tells React when to run the effect again.
Run this effect only once (after first render)

Layer	What It Does
React	Displays UI
Axios	Makes HTTP request
json-server	Acts like backend
db.json	Stores data


Modern React pattern:
👉 Each component fetches its own data using useEffect.

The key mental model is:
1.React renders
2.useEffect runs AFTER render
3.Axios fetches asynchronously
4.Promise resolves
5.State updates
6.React re-renders


🧠 Three Possible Cases
1️⃣ useEffect(() => {}) 👉 Runs after every render
2️⃣ useEffect(() => {}, [])   👉 Runs only once
3️⃣ useEffect(() => {}, [someValue]) 👉 Runs After first render AND
Again whenever someValue changes BECAUSE : Any state update causes a re-render.
"Run this effect again if these values changed since last render.

❗ Never put a state variable in the dependency array if the effect directly updates that same state.
 */
