import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { TicketBookingPage } from "./pages/TicketBookingPage";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import PrivateRoute from "./routes/authRoute";

function App() {
  return (
    <>
      {/* <Homepage /> */}
      {/* <TicketBookingPage /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/ticketbooking/:id"
          element={
            <PrivateRoute>
              <TicketBookingPage />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />} />
      </Routes>
    </>
  );
}

export default App;
