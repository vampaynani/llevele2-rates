import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Nationals from './Nationals';
import Internationals from './Internationals';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      selected: 0
    }
  }
  render(){
    return (
      <section id="main">
        <h1>Cotizador Llévele llévele</h1>
        <ul>
          <li><a className={this.state.selected === 0 ? 'is-selected':''} onClick={ e => this.setState({ selected: 0 }) }>Compras Nacionales</a></li>
          <li><a className={this.state.selected === 1 ? 'is-selected':''} onClick={ e => this.setState({ selected: 1 }) }>Compras Internacionales</a></li>
        </ul>
        { this.state.selected === 0 && <Nationals /> }
        { this.state.selected === 1 && <Internationals /> }
      </section>
    );
  }
}

