import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { TicketBookingPage } from "./pages/TicketBookingPage";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import PrivateRoute from "./routes/authRoute";
import About from "./pages/About";
import Tickets from "./pages/MyTickets";
import MainProfile from "./pages/profile/main";
import Checkout from "./pages/checkOut";

function App() {
  return (
    <>
      {/* <Homepage /> */}
      {/* <TicketBookingPage /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ticketbooking/:id" element={<TicketBookingPage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/mytickets"
          element={
            <PrivateRoute>
              <Tickets />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MainProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
