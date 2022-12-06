import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Reviews } from "./components/Reviews";
import { Routes, Route } from "react-router-dom";
import { HomeButton } from "./components/HomeButton";
import { SingleRev } from "./components/SingleRev";

function App() {
  const [loading, setLoading] = useState(true);
  const [reviewId, setReviewId] = useState("");

  return (
    <div>
      <Header />
      <HomeButton />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews
              loading={loading}
              setLoading={setLoading}
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
  );
}

export default App;
