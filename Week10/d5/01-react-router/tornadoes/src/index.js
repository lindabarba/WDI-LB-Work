import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';

const PlayerAPI = {
  players: [
    {number: 1, name: "Rudolph", position: "Forward"},
    {number: 2, name: "Lionel", position: "Forward"},
    {number: 3, name: "Seymour", position: "Defender"},
    {number: 4, name: "Carlos", position: "Midfielder"}
  ],
  all: function() { return this.players },
  get: function(id) {
    var isPlayer = p => p.number === id;
    return this.players.find(isPlayer);
  }
}

const FullRoster = () => (
    <div>
      <ul>
        {
          PlayerAPI.all().map(player => (
            <li key={player.number}>
              <Link to={`/roster/${player.number}`}>{player.name}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )

const Player = (props) => {
  var player = PlayerAPI.get(parseInt(props.match.params.number, 10));

  if (!player) {
    return <div>Sorry player does not exist</div>
  }

  return (
    <div>
      <h2>{player.name} - {player.number}</h2>
      <h4>{player.position}</h4>
      <Link to="/roster">Back to Roster</Link>
    </div>
  )
}

const Roster = () => (
  <Switch>
    <Route exact path="/roster" component={FullRoster} />
    <Route path="/roster/:number" component={Player} />
  </Switch>
)

const Schedule = () => (
  <div>
    <ul>
      <li>5/24 @ Justy Bears</li>
      <li>5/27 @ Sammy Bears</li>
      <li>5/30 @ Jonny Bears</li>
    </ul>
  </div>
)

const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes.</h1>
  </div>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/roster" component={Roster} />
      <Route exact path="/schedule" component={Schedule} />
    </Switch>
  </main>
)

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/roster">Roster</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
      </ul>
    </nav>
  </header>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
