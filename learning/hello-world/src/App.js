import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

class Game extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      numberOfStars: this.generateNumberOfStars(),
      selectedNumbers: [], correct: null,
      usedNumbers: [],
      numberOfTries: 5,
      doneStatus: "Game Over!"
    };
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redrawStars = this.redrawStars.bind(this);
  }
  generateNumberOfStars() {
    return (Math.floor(Math.random() * 9) + 1);
  }
  redrawStars() {
    if (this.state.numberOfTries > 0) {
      var reducedTries = (this.state.numberOfTries - 1);
      this.setState({
        numberOfStars: this.generateNumberOfStars(),
        numberOfTries: reducedTries,
        correct: null,
        selectedNumbers: []
      });
    }
  }
  selectNumber(clickedNumber) {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0)
      this.setState({
        selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
        correct: null
      });
  }
  unselectNumber(clickedNumber) {
    var selectedNumbers = this.state.selectedNumbers;
    var indexOfNumber = selectedNumbers.indexOf(clickedNumber);
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({ selectedNumbers: selectedNumbers, correct: null })
  }
  checkAnswer() {
    var correct = (this.state.numberOfStars === this.sumOfSelectedValues());

    this.setState({
      correct: correct
    })
  }
  acceptAnswer() {
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      numberOfStars: this.generateNumberOfStars(),
      usedNumbers: usedNumbers,
      selectedNumbers: [],
      correct: null
    })
  }
  sumOfSelectedValues() {
    var result = this.state.selectedNumbers.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue;
    }, 0);
    return result;
  }
  render() {
    var selectedNumbers = this.state.selectedNumbers,
      numberOfStars = this.state.numberOfStars,
      currect = this.state.correct,
      usedNumbers = this.state.usedNumbers;
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonsFrame selectedNumbers={selectedNumbers}
            correct={currect}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redrawStars={this.redrawStars}
            numberOfTries={this.state.numberOfTries}
          />
          <AnswerFrame selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber} />

        </div>
        <NumbersFrame selectedNumbers={selectedNumbers}
          clickNumber={this.selectNumber}
          usedNumbers={usedNumbers}
        />
        <DoneGame doneStatus={this.state.doneStatus}/>
      </div>
    );
  }
}

class DoneGame extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="well text-center">
        <h2>{this.props.doneStatus}</h2>
      </div>
    );
  }
}

class StarsFrame extends Component {
  constructor(props, context) {
    super(props, context);

  }
  render() {
    var stars = [];
    for (var i = 0; i < this.props.numberOfStars; i++) {
      stars.push(<span key={i} className="glyphicon glyphicon-star"></span>);
    }
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
}

class ButtonsFrame extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    var disabled = (this.props.selectedNumbers.length == 0), button, correct = this.props.correct;
    switch (correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        )
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        )
        break;
      default:
        button = (
          <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>
        )
        break;
    }
    return (
      <div id="button-frame">
        {button}
        <br />
        <button className="btn btn-warning btn-xs"
          onClick={this.props.redrawStars}
          disabled={this.props.numberOfTries <= 0}
          >
          <span className="glyphicon glyphicon-refresh">{this.props.numberOfTries}</span>
        </button>
      </div>
    );
  }
}

class AnswerFrame extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    var selectedNumbers = this.props.selectedNumbers;
    var htmlRepresentation = [];
    var props = this.props;
    selectedNumbers.forEach(function (element) {
      htmlRepresentation.push(<span key={element} onClick={props.unselectNumber.bind(null, element)}>{element}</span>)
    }, this);
    return (
      <div id="answer-frame">
        <div className="well">
          {htmlRepresentation}
        </div>
      </div>
    );
  }
}

class NumbersFrame extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    var maxNumber = 9;
    var numbers = [], className, selectedNumbers = this.props.selectedNumbers;
    var clickNumber = this.props.clickNumber;
    for (var i = 1; i <= maxNumber; i++) {
      className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      className += " used-" + (this.props.usedNumbers.indexOf(i) >= 0);
      numbers.push(
        <div key={i} className={className} onClick={clickNumber.bind(null, i)}>{i}</div>
      )
    }
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
}






class App extends Component {
  constructor(props, context) {
    super(props, context);
  };
  render() {
    return (
      <Game />
    );
  }
}

export default App;
