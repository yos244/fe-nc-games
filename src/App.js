import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Reviews } from "./components/Reviews";
import { Routes, Route } from "react-router-dom";
import { HomeButton } from "./components/HomeButton";
import { SingleRev } from "./components/SingleRev";
import { UserContext } from "./contexts/UserContext";
import { LoggedUser } from "./components/LoggedUser";


function App() {
  const [loading, setLoading] = useState(true);
  const [reviewId, setReviewId] = useState("");
  const [username, setUsername] = useState("grumpy19")

  return (
    <UserContext.Provider value={{username, setUsername}}>
    <div>
      <Header />
      <LoggedUser />
      <HomeButton />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews
              reviewId={reviewId}
              setReviewId={setReviewId}
            />
          }
        />
        <Route
          path="/reviews/:reviewId"
          element={<SingleRev loading={loading} setLoading={setLoading}/>}
        />
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
