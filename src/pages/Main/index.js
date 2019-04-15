import React, { Component } from 'react';

import './styles.css';
import logo from "../../assets/logo.svg";
import api from '../../services/api';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newBox: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });
    this.props.history.push(`box/${response.data._id}`);
  }

  handleInputChange = (e) => {
    const newBox = e.target.value;
    this.setState({ newBox });
  }

  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="logo - rocketseat" />
          <input
            onChange={this.handleInputChange}
            value={this.state.newBox}
            placeholder="Digite o nome do box"
          />
          <button type="submit">Criar Box</button>
        </form>
      </div>
    )
  }
}
