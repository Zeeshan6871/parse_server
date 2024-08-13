import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { TicketBookingPage } from "./pages/TicketBookingPage";

function App() {
  return (
    <>
      {/* <Homepage /> */}
      {/* <TicketBookingPage /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ticketbooking/:id" element={<TicketBookingPage />} />
      </Routes>
    </>
  );
}

export default App;
