import logo from "./logo.svg";
import "./App.css";
import Header from "./Header/Header";

function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <section className="weather" id="weather">
          <div className="weather__info">75F</div>
          <img className="weather__image" src="/images/day/sunny.svg" />
        </section>
        <section id="card-section">Card Section</section>
      </main>
    </div>
  );
}

export default App;
