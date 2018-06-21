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
  componentDidMount(){
    this.fetchCurrency();
  }
  /*componentDidUpdate(prevProps, prevState){
    if(prevState.totalUSD !== this.state.totalUSD){
      this.fetchCurrency();
    }
  }*/
  updateAmount(e){
    const amount = e.currentTarget.value !== '' ? parseFloat(e.currentTarget.value):0;
    const taxes = this.getTaxes(amount);
    const delivery = this.getDeliveryCost(this.state.size);
    const totalUSD = (amount + taxes) * (1 + this.state.profit) + delivery;
    const totalMXN = (Math.ceil(totalUSD * this.state.exchange / 10) * 10).toFixed(2);
    this.setState({amount, taxes, delivery, totalUSD, totalMXN});
  }
  updateProfit(e){
    const profit = parseFloat(e.currentTarget.value);
    const totalUSD = (this.state.amount + this.state.taxes) * (1 + profit) + this.state.delivery;
    const totalMXN = (Math.ceil(totalUSD * this.state.exchange / 10) * 10).toFixed(2);
    this.setState({profit, totalUSD, totalMXN});
  }
  updateSize(e){
    const size = parseFloat(e.currentTarget.value);
    const delivery = this.getDeliveryCost(size);
    const totalUSD = (this.state.amount + this.state.taxes) * (1 + this.state.profit) + delivery;
    const totalMXN = (Math.ceil(totalUSD * this.state.exchange / 10) * 10).toFixed(2);
    this.setState({size, delivery, totalUSD, totalMXN});
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
    //fetch('https://api.fixer.io/latest?base=USD&symbols=MXN&access_key=f2bf9edce63c50a5600324891e362839')
    fetch('https://free.currencyconverterapi.com/api/v5/convert?q=USD_MXN&compact=y')
    .then(response => response.json())
    .then(data => data['USD_MXN'])
    .then(rates => {
      this.setState({
        exchange: rates.val
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
              <option value="1.2">15" (37.5cm)</option>
              <option value="1.5">20" (50cm)</option>
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
        <p>Total $USD {this.state.amount > 0 ? this.state.totalUSD.toFixed(2) : 0}</p>
        <p>Subtotal $MXN {this.state.amount > 0 ? ((this.state.amount + this.state.taxes + this.getDeliveryCost(this.state.size)) * this.state.exchange).toFixed(2) : 0}</p>
        <p>Total $MXN {this.state.amount > 0 ? this.state.totalMXN : 0}</p>
        <p>Ganancia $MXN {(this.state.amount * this.state.profit * this.state.exchange).toFixed(2)}</p>
      </section>
    );
  }
}