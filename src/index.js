import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import Tabs from './components/tabs';
import reportWebVitals from './reportWebVitals';


class HomeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      check1: true,
      check2: false,
      check3: false,
      minPrice: 5,
      maxPrice: 5,
      downFinance: 5,
      monthlyFinance: 5
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sliderBundle = this.sliderBundle.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.slider);
    event.preventDefault();
  }

  sliderBundle(label, slider1, slider2, label1, label2) {
    return <div label={label} className="tab">
      <div className="leftSlider">
        <div>
          <label htmlFor="price1">{label1}</label>
          <input
            name={slider1}
            type="number"
            id="price1"
            value={this.state[slider1]}
            onChange={this.handleInputChange} />
        </div>
        <input
          name={slider1}
          type="range"
          value={this.state[slider1]}
          onChange={this.handleInputChange}
          min="0" max="100" />
      </div>
      <div className="rightSlider">
        <div>
          <label htmlFor="price2">{label2}</label>
          <input
            name={slider2}
            type="number"
            id="price2"
            value={this.state[slider2]}
            onChange={this.handleInputChange} />
        </div>
        <input
          name={slider2}
          type="range"
          value={this.state[slider2]}
          onChange={this.handleInputChange}
          min="0" max="100" />
      </div>
    </div>
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="vehicles">
          <p>Pick a Type <span>(select all that apply)</span></p>
          <div className="checkboxes">
            <input
              name="check1"
              type="checkbox"
              checked={this.state.check1}
              onChange={this.handleInputChange} />
            <input
              name="check2"
              type="checkbox"
              checked={this.state.check2}
              onChange={this.handleInputChange} />
            <input
              name="check3"
              type="checkbox"
              checked={this.state.check3}
              onChange={this.handleInputChange} />
            <input
              name="check3"
              type="checkbox"
              checked={this.state.check3}
              onChange={this.handleInputChange} />
            <input
              name="check3"
              type="checkbox"
              checked={this.state.check3}
              onChange={this.handleInputChange} />
            <input
              name="check3"
              type="checkbox"
              checked={this.state.check3}
              onChange={this.handleInputChange} />
          </div>
        </div>
        <Tabs>
          {this.sliderBundle("Tab 1", "minPrice", "maxPrice", "Min price", "Max Price")}
          {this.sliderBundle("Tab 2", "downFinance", "monthlyFinance", "Cash Down", "Monthly Payment")}
        </Tabs>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<HomeForm />, document.getElementById('react_form'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
