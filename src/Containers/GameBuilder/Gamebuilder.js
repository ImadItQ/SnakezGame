import React, { Component } from "react";
import Snake from "../../Components/Snake/Snake";
import Food from "../../Components/Food/Food";
import classes from "./Gamebuilder.css";
import HighScore from "../../Components/HighScore/HighScore";
import HighScores from "../../Components/HighScore/HighScores/HighScores";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import Axios from "axios";
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
const initialState = {
  food: getRandomCoordinates(),
  speed: 90,
  direction: "RIGHT",
  snakesbody: [[0, 0], [2, 0]],
  score: 0,
  moves: []
};

class Gamebuilder extends Component {
  state = initialState;
  componentDidMount() {
    document.onkeydown = this.onkeydown;
    this.props.onfetchHighscores(this.props.token, this.props.userId);
  }
  componentDidUpdate() {
    this.checkIfHitBorder();
    this.checkIfHitSelf();
    this.checkIFEatFood();
  }

  onkeydown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 37:
        this.setState({ direction: "LEFT" });
        this.state.moves.push("LEFT");
        break;

      case 39:
        this.setState({ direction: "RIGHT" });
        this.state.moves.push("RIGHT");
        break;

      case 38:
        this.setState({ direction: "UP" });
        this.state.moves.push("UP");
        break;

      case 40:
        this.setState({ direction: "DOWN" });
        this.state.moves.push("DOWN");
        break;

      case 32:
        setInterval(this.moveSnake, this.state.speed);
        break;
      default:
        this.setState({ direction: null });
    }
  };
  moveSnake = () => {
    let parts = [...this.state.snakesbody];
    let head = parts[parts.length - 1];
    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      default:
        head = null;
    }
    parts.push(head);
    parts.shift();
    this.setState({
      snakesbody: parts
    });
  };
  checkIfHitSelf() {
    let snake = [...this.state.snakesbody];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(part => {
      if (head[0] === part[0] && head[1] === part[1]) {
        this.onSnakeDead();
      }
    });
  }
  checkIfHitBorder() {
    let head = this.state.snakesbody[this.state.snakesbody.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onSnakeDead();
    }
  }
  checkIFEatFood() {
    let head = this.state.snakesbody[this.state.snakesbody.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      });
      this.makeSnakeBig();
      this.inscreaseScore();
      this.inscreaseSpeed();
    }
  }
  makeSnakeBig() {
    let newSnake = [...this.state.snakesbody];
    newSnake.unshift([]);
    this.setState({
      snakesbody: newSnake
    });
  }
  inscreaseScore() {
    let highScore = this.state.score + 100;
    this.setState({ score: highScore });
  }
  inscreaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 1
      });
    }
  }
  async sendMail() {
    const data = {
      scoreMade: this.state.score,
      movesMade: this.state.moves,
      emailAdd: this.props.email
    };
    const send = await Axios.post("/api/send", data);
  }
  onSnakeDead() {
    const highscore = {
      HighScores: this.state.score,
      userId: this.props.userId
    };
    this.props.onsetHighscores(highscore, this.props.token);
    this.sendMail();
    this.setState(initialState);
    this.componentDidMount();
  }
  isLoggedoutUser() {
    if (this.props.isLoggedout) {
      this.props.history.replace("/SignIn");
    }
  }
  LogoutHandler = event => {
    event.preventDefault();
    this.props.onLogout();
    this.isLoggedoutUser();
  };
  render() {
    return (
      <div className={classes.GameBack}>
        <button className={classes.GameButton} onClick={this.LogoutHandler}>
          SIGN OUT {this.props.email}
        </button>
        <HighScore HighScore={this.state.score} />
        <HighScores HighScoresList={this.props.highScore} />
        <div className={classes.GameCanvas}>
          <Snake snakesbody={this.state.snakesbody} />
          <Food part={this.state.food} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    highScore: state.fetch.highscores,
    isLoggedout: state.auth.token === null,
    email: state.auth.email
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onsetHighscores: (HighScores, token) =>
      dispatch(actions.setHighscores(HighScores, token)),
    onfetchHighscores: (token, userId) =>
      dispatch(actions.fetchHighscores(token, userId)),
    onLogout: () => dispatch(actions.authLogout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gamebuilder);
