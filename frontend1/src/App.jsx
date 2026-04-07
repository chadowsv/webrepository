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
        <Videos
          user={user}
          onChangeUser={() => setView("select")}
        />
      )}
    </>
  );
} export default App;