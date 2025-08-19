import Header from './components/Header';
import UserProfile from './components/UserProfile';

function App() {
  const user = {
    name: "Youssif Said",
    role: "Frontend Developer",
    location: "Cairo, Egypt"
  };

  return (
    <div className="App">
      <Header title="Fundamentals of React" />
      <UserProfile 
        name={user.name} 
        role={user.role} 
        location={user.location} 
      />
    </div>
  );
}

export default App;
