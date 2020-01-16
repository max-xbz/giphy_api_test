import React from 'react';
import './App.css';
import axios from 'axios';
const API_KEY = 'YOUR_API_KEY';
const API_URL = 'http://api.giphy.com/v1/gifs/search';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '', results: [] };
  }
  getInfo = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&q=${this.state.input}&limit=5`)
      .then(res => {
        console.log(res.data.data);
        this.setState({ results: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleChange = (e) => {
    this.setState({ 
      input: e.target.value 
    });
  }
  handleClick = () => {
    if(this.state.input && this.state.input.length > 1) {
      this.getInfo();
    }
  }
  handleMouseEnter = (e) => {
    this.state.results.forEach((item)=>{
      if(item.id == e.currentTarget.id) {
        e.currentTarget.src = item.images.fixed_height.url;
      }
    });
  }
  handleMouseLeave = (e) => {
    this.state.results.forEach((item)=>{
      if(item.id == e.currentTarget.id) {
        e.currentTarget.src = item.images.fixed_height_still.url;
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="container-search">
          <input type="text" value={this.state.input} onChange={this.handleChange}/>
          <button type="button" onClick={this.handleClick}>search</button>
        </div>
        <div className="container-display">
          {this.state.results.map((item, index) => {
            return (
              <li key={index} >
                <img id={item.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} src={item.images.fixed_height_still.url} alt="animated"/>
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
