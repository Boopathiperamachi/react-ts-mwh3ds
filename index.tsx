import axios from 'axios';
import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
  data: any;
  error: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      data: [],
      error: '',
    };
  }

  onCnangeInput = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  getUserData = () => {
    axios
      .get(`https://api.github.com/users/${this.state.name}/repos`)
      .then((res) => {
        console.log(JSON.stringify(res));
      })
      .catch(() => {
        this.setState({
          error: `There is no such Github Username ${this.state.name}`,
        });
      });
  };
  renderData = () => {
    return this.state.data.map((i) => {
      return (
        <tr>
          <td>i.repo_name</td>
          <td>i.language</td>
          <td>i.description</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <p>Enter github useranme</p>
        <input onChange={this.onCnangeInput} />
        <br />
        <button onClick={this.getUserData}>Submit</button>
        <span>{this.state.error}</span>
        <table>
          <thead>
            <th>Repo Name</th>
            <th>Language</th>
            <th>Description</th>
          </thead>
          <tbody>{this.renderData()}</tbody>
        </table>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
