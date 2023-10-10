import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import LoggedArea from "./LoggedArea"

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/Logged" element={<LoggedArea />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App