import React, { Component } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import { DeleteSymbolButton } from "./components/DeleteSymbolButton";
import './App.css';
import * as math from 'mathjs';


let history = [];
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: "",
    };
  }



  addToInput = val => {
        this.setState({input: this.state.input + val});
  }

  handleEqual = () => {
    
    this.setState({input: math.evaluate(this.state.input)})
    if (math.evaluate(this.state.input) === undefined) {
       this.setState({input: ""})
    } if (math.evaluate(this.state.input) === Infinity){
      alert("Деление на ноль невозможно")
      this.setState({input: ""})
    }     
    history.push(this.state.input + "=" + math.evaluate(this.state.input))
    localStorage.setItem('key', history)
  }

  addDot = val => {
    if(this.state.input.slice(-1) !== "." && this.state.input.indexOf(".") === -1 ){
      this.setState({
        input: this.state.input + val,
      });
    }
  };
  
  addOperator = val => {
    if (this.state.input !== "" && !isNaN(this.state.input[this.state.input.length - 1])) {
      this.setState({
        input: this.state.input + val,
      });
    }
  }

  deleteSymbol = () => {
      this.setState({ input: this.state.input.slice(0, -1) })
  }


  render() {
  return (
    <div className="app" >
      <div className="calc-wrapper">
        <Input input={this.state.input}></Input>
        <div className="row"> 
          <Button handleClick={this.addToInput}>8</Button>
          <Button handleClick={this.addToInput}>7</Button>
          <Button handleClick={this.addToInput}>9</Button>
          <Button handleClick={this.addOperator}>/</Button>
        </div>
        <div className="row"> 
          <Button handleClick={this.addToInput}>4</Button>
          <Button handleClick={this.addToInput}>5</Button>
          <Button handleClick={this.addToInput}>6</Button>
          <Button handleClick={this.addOperator}>*</Button>
        </div>
        <div className="row"> 
          <Button handleClick={this.addToInput}>1</Button>
          <Button handleClick={this.addToInput}>2</Button>
          <Button handleClick={this.addToInput}>3</Button>
          <Button handleClick={this.addOperator}>+</Button>
        </div>
        <div className="row"> 
          <Button handleClick={this.addDot}>.</Button>
          <Button handleClick={this.addToInput}>0</Button>
          <Button handleClick={() => this.handleEqual()}>=</Button>
          <Button handleClick={this.addOperator}>-</Button>
        </div>
        <div className="row">
          <ClearButton handleClear={() => this.setState({input: ""})}>
            C
          </ClearButton>
          <DeleteSymbolButton handleClick={this.deleteSymbol}>{"<--"}</DeleteSymbolButton>
        </div>
        <div className="History">
          {localStorage.getItem('key')}
          <button handleClear={() => localStorage.removeItem('key')}>Clear History</button>
        </div>
      </div>
    </div>
  );
}
}

export default App;
