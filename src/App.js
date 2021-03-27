
import './App.css';
import MainPage from './components/mainPage';
import Navigation from './components/navigation';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h2>My CRUD Application</h2>
      </div>

      <Navigation/>

      <MainPage/>
    </div>
  );
}

export default App;
