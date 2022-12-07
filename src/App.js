import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Reviews } from "./components/Reviews";
import { Routes, Route } from "react-router-dom";
import { HomeButton } from "./components/HomeButton";
import { SingleRev } from "./components/SingleRev";
import { UserContext } from "./contexts/UserContext";
import { LoggedUser } from "./components/LoggedUser";
import { CatFilters } from "./components/CatFilters";
import { Categories } from "./components/Categories";

function App() {
  const [revList, setRevList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewId, setReviewId] = useState("");
  const [username, setUsername] = useState("grumpy19");
  const [innerUrl, setInnerUrl] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div>
        <Header />
        <LoggedUser />
        <HomeButton />
        <Categories
          loading={loading}
          setLoading={setLoading}
          innerUrl={innerUrl}
          setInnerUrl={setInnerUrl}
        />
        <Routes>
          <Route
            path={`/categories/${innerUrl}`}
            element={
              <CatFilters
                revList={revList}
                innerUrl={innerUrl}
                setInnerUrl={setInnerUrl}
              />
            }
          />
          <Route
            path="/"
            element={
              <Reviews
                reviewId={reviewId}
                setReviewId={setReviewId}
                revList={revList}
                setRevList={setRevList}
              />
            }
          />
          <Route
            path="/reviews/:reviewId"
            element={<SingleRev loading={loading} setLoading={setLoading} />}
          />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
