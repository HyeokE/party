import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import JoinPartyForm from "./components/JoinPartyForm";
import AccountInfoPage from "./components/AccountInfoPage";
import SuccessPage from "./components/SuccessPage";
import InterestForm from "./components/InterestForm";
import { UserDataProvider } from "./context/UserDataContext";

function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <div className="min-h-screen bg-[#0F1419] relative overflow-hidden">
          {/* Animated background elements */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-full opacity-20 blur-3xl animate-float" />
            <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-[#4ECDC4] to-[#45B7D1] rounded-full opacity-20 blur-3xl animate-float-delayed" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#FFE66D] rounded-full opacity-10 blur-2xl animate-pulse" />
          </div>

          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/join" element={<JoinPartyForm />} />
              <Route path="/account" element={<AccountInfoPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/interest" element={<InterestForm />} />
              <Route
                path="/interest-success"
                element={<SuccessPage isInterest />}
              />
            </Routes>
          </div>
        </div>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
