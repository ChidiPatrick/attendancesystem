import React from "react";

import { Routes, Route, useNavigate } from "react-router";

// import Header from "./Components/LandingPageComponents/Header/header";
import LandingPage from "./Components/AppComponents/Pages/landingPage";
import SignUp from "./Components/AppComponents/SignUpComp/signUpComp";
import Signin from "./Components/AppComponents/LoginComp/login";
import UserProfile from "./Components/AppComponents/Pages/userProfile";
import History from "./Components/AppComponents/Pages/history";
import Home from "./Components/AppComponents/Pages/home";
import Permission from "./Components/AppComponents/Pages/permission";
import Announcement from "./Components/AppComponents/Pages/announcement";
import WebCam from "./Components/AppComponents/Pages/webCamera";
import ClockLaunchCamera from "./Components/AppComponents/Pages/clockin.launch.camera";
import AttendanceFeedback from "./Components/AppComponents/Pages/attendance.feedback";
import MarkUser from "./Components/AppComponents/Pages/mark.attendance";
import ClockOut from "./Components/AppComponents/Pages/clockOut";
import ResetEmailAndPassword from "./Components/AppComponents/Pages/reset.email.password";
import UploadProfilePicture from "./Components/AppComponents/Pages/upload.profile.pic";
import ImagePreview from "./Components/AppComponents/Pages/image.preview";
import EditProfile from "./Components/AppComponents/Pages/edit.profile";
import SignUpAsAdmin from "./Components/AppComponents/SignUpComp/signup.as.admin";
import SigninAsAdmin from "./Components/AppComponents/LoginComp/login.admin";
import { ProtectedRoute } from "./Components/General app handlers/general.handlers";
import { useSelector } from "react-redux";
import DashboardComponent from "./Components/AppComponents/Admin Dashboard/admin dashboard components/dashboard.comp";
import StudentsBio from "./Components/AppComponents/Admin Dashboard/admin dashboard components/students.bio";
import AdminAnnouncement from "./Components/AppComponents/Admin Dashboard/admin dashboard components/announcement";
import AdminDashboardLayout from "./Components/AppComponents/Admin Dashboard/admin dashboard components/adminDashboardLayout";
import ClassSetup from "./Components/AppComponents/Admin Dashboard/admin dashboard components/class.setup";
import AttendanceReport from "./Components/AppComponents/Admin Dashboard/admin dashboard components/attendance.report";
import AdminStudentProfile from "./Components/AppComponents/Admin Dashboard/admin dashboard components/admin.student.profile";
//// Root component ///
function App() {
  window.addEventListener("offline", () => console.log("Offline"));
  window.addEventListener("online", () => console.log("online"));

  const user = useSelector((state) => state.loginSlice.user);

  const navigate = useNavigate();

  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupAsAdmin" element={<SignUpAsAdmin />} />
        <Route path="/adminLogin" element={<SigninAsAdmin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/history" element={<History />} />
        <Route path="/home" element={<ProtectedRoute component={<Home />} />} />
        <Route path="/permission" element={<Permission />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="clockIn/webcam" element={<WebCam />} />
        <Route path="/clockIn" element={<ClockLaunchCamera />} />
        <Route path="/attendanceSuccessful" element={<AttendanceFeedback />} />
        <Route path="/markAttendance" element={<MarkUser />} />
        <Route path="/clockOut" element={<ClockOut />} />
        <Route path="/resetpassword" element={<ResetEmailAndPassword />} />
        <Route path="/previewImage" element={<ImagePreview />} />
        <Route
          path="/uploadProfilePicture"
          element={<UploadProfilePicture />}
        />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/adminDashboard" element={<AdminDashboardLayout />}>
          <Route index element={<DashboardComponent />} />
          <Route
            path="/adminDashboard/adminStudentsBio"
            element={<StudentsBio />}
          />
          <Route
            path="/adminDashboard/adminDashboard"
            element={<DashboardComponent />}
          />
          <Route
            path="/adminDashboard/adminAnnouncements"
            element={<AdminAnnouncement />}
          />
          <Route
            path="/adminDashboard/attendanceDispalyUI"
            element={<AttendanceReport />}
          />
          <Route path="/adminDashboard/classSetup" element={<ClassSetup />} />
        </Route>
        <Route path="/adminStudentProfile" element={<AdminStudentProfile />} />
      </Routes>
    </div>
  );
}

export default App;
