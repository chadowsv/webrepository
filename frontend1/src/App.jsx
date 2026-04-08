import { useState } from "react";
import SelectUser from "./components/SelectUser";
import Users from "./components/Users";
import Categories from "./components/Categories";
import "./styles.css";

function App() {
  const [view, setView] = useState("select");
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      {view === "select" && (
        <SelectUser
          onSelect={(user) => {
            setSelectedUser(user);
            setView("categories");
          }}
          onCreate={() => setView("create")}
        />
      )}

      {view === "create" && (
        <Users
          onUserCreated={(user) => {
            setSelectedUser(user);
            setView("categories");
          }}
          onBack={() => setView("select")}
        />
      )}

      {view === "categories" && (
        <Categories
          user={selectedUser}
          onChangeUser={() => {
            setSelectedUser(null);
            setView("select");
          }}
        />
      )}
    </>
  );
}

export default App;