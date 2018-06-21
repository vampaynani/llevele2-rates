import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Nationals extends Component{
  constructor(props){
    super(props);
    this.state = {
      amount: '',
      profit: 0.2,
      totalMXN: 0
    }
  }
  updateAmount(e){
    const amount = e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value):0;
    const totalMXN = amount * (1 + this.state.profit);
    this.setState({amount, totalMXN});
  }
  updateProfit(e){
    const profit = parseFloat(e.currentTarget.value);
    const totalMXN = this.state.amount * (1 + profit);
    this.setState({profit, totalMXN});
  }
  render(){
    return (
      <section id="nationals">
        <form>
          <p>
            <label>Costo</label>
            <input type="text" placeholder="$MXN" name="amount" value ={this.state.amount} onChange={e => this.updateAmount(e)} />
          </p>
          <p>
            <label>Ganancia</label>
            <select value={this.state.profit} onChange={e => this.updateProfit(e)}>
              <option value="0.05">5%</option>
              <option value="0.1">10%</option>
              <option value="0.15">15%</option>
              <option value="0.2">20%</option>
              <option value="0.25">25%</option>
            </select>
          </p>
        </form>
        <p>Total $MXN {this.state.totalMXN}</p>
        <p>Ganancia $MXN {(this.state.amount * this.state.profit).toFixed(2)}</p>
      </section>
    );
  }
}