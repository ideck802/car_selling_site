import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/home_form.css';
import Tabs from './components/tabs';
import images from './images'
import './vehicle_list';
import reportWebVitals from './reportWebVitals';

import Carousel from 'react-elastic-carousel'
import 'car-makes-icons/dist/style.css';
import { Range } from 'react-range';


class HomeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      check_suv: false,
      check_truck: false,
      check_sedan: false,
      check_crossover: false,
      check_coupe: false,
      check_convertible: false,
      check_sport: false,
      check_van: false,
      check_wagon: false,
      minPrice: 5,
      maxPrice: 5,
      priceBoxes: [10, 20],
      values: [10, 20],
      downFinance: 5,
      monthlyFinance: 5,
      typing: false,
      typingTimeout: 0,
      breakpoints: [
        { width: 1, itemsToShow: 1.5, itemsToScroll: 1 },
        { width: 300, itemsToShow: 2, itemsToScroll: 1 },
        { width: 350, itemsToShow: 3, itemsToScroll: 2 },
        { width: 500, itemsToShow: 4, itemsToScroll: 2 },
        { width: 600, itemsToShow: 5, itemsToScroll: 3 },
        { width: 700, itemsToShow: 6, itemsToScroll: 3 },
        { width: 800, itemsToShow: 7, itemsToScroll: 4 },
        { width: 900, itemsToShow: 8, itemsToScroll: 4 },
        { width: 1000, itemsToShow: 9, itemsToScroll: 4 }
      ]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sliderBundle = this.sliderBundle.bind(this);
    this.labelCreator = this.labelCreator.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    alert('Your favorite flavor is: ' + this.state.slider);
    e.preventDefault();
  }

  sliderBundle(label, slider1, slider2, label1, label2) {
    return <div label={label} className="tab">
      <div className="leftSlider">
        <div>
          <label htmlFor="price1">{label1}</label>
          <span className="inputNumber">$
          <input
            name={slider1}
            type="number"
            id="price1"
            value={this.state[slider1]}
            onChange={this.handleInputChange} />
          </span>
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
          <span className="inputNumber">$
          <input
            name={slider2}
            type="number"
            id="price2"
            value={this.state[slider2]}
            onChange={this.handleInputChange} />
          </span>
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

  labelCreator(forInput, fileName, value) {
    if(this.state[forInput] === false) {
      return <label htmlFor={forInput}><i className="checkmark fas fa-check"></i><p>{value}</p><img src={fileName} draggable="false" alt={fileName}/></label>
    } else {
      return <label htmlFor={forInput} className="selected"><i className="checkmark fas fa-check"></i><p>{value}</p><img src={fileName} draggable="false" alt={fileName}/></label>
    }
  }

  onNumberChange(index, e) {

    const self = this;

    var priceBox = self.state.priceBoxes.slice();

    priceBox[index] = e.target.value;

    this.setState({
      priceBoxes: priceBox
    });

    if (self.state.typingTimeout) {
       clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      typing: false,
      typingTimeout: setTimeout(function () {
        var prices = self.state.values.slice();

        if (parseInt(e.target.value) < e.target.min) {
          e.target.value = e.target.min;
        };
        if (parseInt(e.target.value) > e.target.max) {
          e.target.value = e.target.max;
        };

        prices[index] = e.target.value;

        self.setState({
          values: prices
        });
      }, 1000)
    });
  }

  enterPressed(index, e) {
    var code = e.key || e.which;
    if(code === 13 || code === "Enter") { //13 is the enter keycode
      var prices = this.state.values.slice();

      if (parseInt(e.target.value) < e.target.min) {
        e.target.value = e.target.min;
      };
      if (parseInt(e.target.value) > e.target.max) {
        e.target.value = e.target.max;
      };

      prices[index] = e.target.value;

      this.setState({
        values: prices
      });
      e.preventDefault();
    }
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="vehicles">
          <p>Pick a Type <span>(select all that apply)</span></p>
          <Carousel itemsToShow={3} itemsToScroll={1} breakPoints={this.state.breakpoints} pagination={false} className="checkboxes">
            <div className="slide">
              {this.labelCreator("check_suv", images.suv, "SUVs")}
              <input
                name="check_suv"
                type="checkbox"
                id="check_suv"
                checked={this.state.check_suv}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_truck", images.pickup, "Pickup Trucks")}
              <input
                name="check_truck"
                type="checkbox"
                id="check_truck"
                checked={this.state.check_truck}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_sedan", images.sedan, "Sedans")}
              <input
                name="check_sedan"
                type="checkbox"
                id="check_sedan"
                checked={this.state.check_sedan}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_crossover", images.crossover, "Crossovers")}
              <input
                name="check_crossover"
                type="checkbox"
                id="check_crossover"
                checked={this.state.check_crossover}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_coupe", images.coupe, "Coupes")}
              <input
                name="check_coupe"
                type="checkbox"
                id="check_coupe"
                checked={this.state.check_coupe}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_convertible", images.convertible, "Convertibles")}
              <input
                name="check_convertible"
                type="checkbox"
                id="check_convertible"
                checked={this.state.check_convertible}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_sport", images.sports, "Sports Cars")}
              <input
                name="check_sport"
                type="checkbox"
                id="check_sport"
                checked={this.state.check_sport}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_van", images.van, "Vans")}
              <input
                name="check_van"
                type="checkbox"
                id="check_van"
                checked={this.state.check_van}
                onChange={this.handleInputChange} />
            </div>
            <div className="slide">
              {this.labelCreator("check_wagon", images.wagon, "Wagons")}
              <input
                name="check_wagon"
                type="checkbox"
                id="check_wagon"
                checked={this.state.check_wagon}
                onChange={this.handleInputChange} />
            </div>
          </Carousel>
        </div>
        <Tabs>
        <div label="PRICE" className="tab">
          <div className="sliderContent">
            <div>
              <label>Price Range</label>
              <span className="inputNumber">$
              <input
                name="minPrice"
                type="number"
                id="minPrice"
                min="0"
                max={this.state.values[1]}
                value={this.state.priceBoxes[0]}
                onChange={this.onNumberChange.bind(this, 0)}
                onKeyDown={this.enterPressed.bind(this, 0)} />
              </span>
              -
              <span className="inputNumber">$
              <input
                name="maxPrice"
                type="number"
                id="maxPrice"
                min={this.state.values[0]}
                max="100"
                value={this.state.priceBoxes[1]}
                onChange={this.onNumberChange.bind(this, 1)}
                onKeyDown={this.enterPressed.bind(this, 1)} />
              </span>
            </div>
            <Range
              min={0}
              max={100}
              values={this.state.values}
              onChange={(values) => this.setState({ values: values, priceBoxes: values })}
              renderTrack={({ props, children }) => (
                <div {...props} style={{...props.style, height: '6px', width: '100%', backgroundColor: '#ccc'}} >
                  {children}
                  </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} style={{ ...props.style, height: '42px', width: '42px', backgroundColor: '#999'}} />
              )}
            />
          </div>
        </div>
          {this.sliderBundle("FINANCE", "downFinance", "monthlyFinance", "Cash Down", "Monthly Payment")}
        </Tabs>
        <input type="submit" value="SEE WHAT'S AVAILABLE" className="submitBtn" />
      </form>
    );
  }
}

ReactDOM.render(<HomeForm />, document.getElementById('react_form'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
