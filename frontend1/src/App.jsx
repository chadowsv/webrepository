import { useState } from "react";
import SelectUser from "./components/SelectUser";
import Users from "./components/Users";
import Category from "./components/Category";
import "./styles.css";
function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("select");

  return (
    <>
      {view === "select" && (
        <SelectUser
          onSelect={(u) => {
            setUser(u);
            setView("videos");
          }}
          onCreate={() => setView("create")}
        />
      )}

      {view === "create" && (
        <Users
          onUserCreated={(u) => {
            setUser(u);
            setView("videos");
          }}
        />
      )}

      {view === "videos" && (
        <Category
          user={user}
          onChangeUser={() => setView("select")}
        />
      )}
    </>
  );
}

export default App;