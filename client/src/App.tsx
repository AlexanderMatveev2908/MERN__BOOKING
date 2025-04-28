import { Route, Routes } from "react-router-dom";
import MainRouteLayout from "./layouts/MainRouteLayout";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AddHotel from "./pages/AddHotel/AddHotel";
import MyHotels from "./pages/MyHotels/MyHotels";
import EditHotel from "./pages/EditHotel/EditHotel";
import EmailNotice from "./pages/EmailNotice/VerifyEmailNotice";
import SendEmailVerifyAccount from "./pages/SendEmailVerifyAccount/SendEmailVerifyAccount";
import VerifyEmailAccount from "./pages/VerifyEmailAccount/VerifyEmailAccount";
import SendEmailChangePwd from "./pages/SendEmailChangePwd/SendEmailChangePwd";
import SearchHotels from "./pages/SearchHotels/SearchHotels";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import HotelPage from "./pages/HotelPage/HotelPage";
import UserRouteLayout from "./layouts/UserRouteLayout/UserRouteLayout";
import NotFoundLayoutUI from "./layouts/NotFoundLayoutUI/NotFoundLayoutUI";
import VerifyEmailChangePwd from "./pages/VerifyEmailChangePwd/VerifyEmailChangePwd";
import ChangePwd from "./pages/ChangePwd/ChangePwd";
import HotelBookingLayoutRoute from "./layouts/HotelBookingLayoutRoute/HotelBookingLayoutRoute";
import HotelBooking from "./pages/HotelBooking/HotelBooking";
import MyHotelsLayoutRoute from "./layouts/MyHotelsLayoutRoute/MyHotelsLayoutRoute";
import MyBookingsLayoutRoute from "./layouts/MyBookingsLayoutRoute/MyBookingsLayoutRoute";
import MyBookings from "./pages/MyBookings/MyBookings";
import ManageBookings from "./pages/ManageBookings/ManageBookings";
// import VerifyBooking from "./pages/VerifyBooking/VerifyBooking";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainRouteLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchHotels />} />

        <Route path="user" element={<UserRouteLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route
            path="send-email-verify-account"
            element={<SendEmailVerifyAccount />}
          />
          <Route
            path="send-email-change-pwd"
            element={<SendEmailChangePwd />}
          />

          <Route path="verify-email-notice" element={<EmailNotice />} />

          <Route path="verify-email" element={<VerifyEmailAccount />} />
          <Route
            path="verify-email-change-pwd"
            element={<VerifyEmailChangePwd />}
          />

          <Route path="change-pwd" element={<ChangePwd />} />
        </Route>

        <Route path="admin" element={<MyHotelsLayoutRoute />}>
          <Route path="my-hotels" element={<MyHotels />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
          <Route path="add-hotel" element={<AddHotel />} />
          <Route path="edit-hotel/:hotelId" element={<EditHotel />} />
        </Route>

        <Route path="hotel-details/:hotelId" element={<HotelPage />} />

        <Route
          path="hotel-booking/:hotelId"
          element={<HotelBookingLayoutRoute />}
        >
          <Route index element={<HotelBooking />} />
        </Route>

        <Route path="guest" element={<MyBookingsLayoutRoute />}>
          {/* <Route path="verify-booking" element={<VerifyBooking />} /> */}
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <NotFoundLayoutUI>
            <NotFound />
          </NotFoundLayoutUI>
        }
      />
    </Routes>
  );
};
export default App;

// 9 26 12
