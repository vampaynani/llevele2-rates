import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Internationals extends Component{
  constructor(props){
    super(props);
    this.state = {
      amount: '',
      taxes: '',
      size: 0.3,
      delivery: 0,
      profit: 0.2,
      exchange: 0,
      totalUSD: 0,
      totalMXN: 0
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.totalUSD !== this.state.totalUSD){
      this.fetchCurrency();
    }
  }
  updateAmount(e){
    const amount = parseFloat(e.currentTarget.value);
    const taxes = this.getTaxes(amount);
    const delivery = this.getDeliveryCost(this.state.size);
    const totalUSD = (amount + taxes) * (1 + this.state.profit) + delivery;
    this.setState({amount, taxes, delivery, totalUSD});
  }
  updateProfit(e){
    const profit = parseFloat(e.currentTarget.value);
    const totalUSD = (this.state.amount + this.state.taxes) * (1 + profit) + this.state.delivery;
    this.setState({profit, totalUSD});
  }
  updateSize(e){
    const size = parseFloat(e.currentTarget.value);
    const delivery = this.getDeliveryCost(size);
    const totalUSD = (this.state.amount + this.state.taxes) * (1 + this.state.profit) + delivery;
    this.setState({size, delivery, totalUSD});
  }
  getDeliveryCost(size){
    const cost = 9.5;
    let plus = 0;
    if(size > 0.5){
      plus = Math.ceil((size - 0.5)/0.5) * 4;
    }
    return cost + plus;
  }
  getTaxes(amount){
    let taxes = 0;
    if(amount >= 50){
      taxes = amount * 0.16;
    }
    return taxes;
  }
  fetchCurrency(){
    fetch('https://api.fixer.io/latest?base=USD&symbols=MXN')
    .then(response => response.json())
    .then(data => data.rates)
    .then(rates => {
      this.setState({
        exchange: rates['MXN'],
        totalMXN: (Math.ceil(this.state.totalUSD * rates['MXN'] / 10) * 10).toFixed(2)
      })
    })
  }
  render(){
    return (
      <section id="internationals">
        <form>
          <p>
            <label>Costo</label>
            <input type="text" placeholder="$USD" name="amount" value ={this.state.amount} onChange={e => this.updateAmount(e)} />
          </p>
          <p>
            <label>Impuestos</label>
            <input type="text" value={this.state.taxes} readOnly />
          </p>
          <p>
            <label>Tamaño</label>
            <select value={this.state.size} onChange={e => this.updateSize(e)}>
              <option value="0.3">4" (10cm)</option>
              <option value="0.6">6" (15cm)</option>
              <option value="0.9">8" (20cm)</option>
              <option value="1.2">10" (25cm)</option>
            </select>
          </p>
          <p>
            <label>Envio</label>
            <input type="text" value={this.state.delivery} readOnly />
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
        <p>Total $USD {this.state.totalUSD}</p>
        <p>Total $MXN {this.state.totalMXN}</p>
        <p>Ganancia $MXN {(this.state.amount * this.state.profit * this.state.exchange).toFixed(2)}</p>
      </section>
    );
  }
}