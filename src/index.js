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
import { Range, getTrackBackground } from 'react-range';


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
      priceBoxes: [0, 100],
      values: [0, 100],
      downFinanceSlider: [5],
      downFinanceBox: [5],
      monthlyFinanceSlider: [5],
      monthlyFinanceBox: [5],
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

  labelCreator(forInput, fileName, value) {
    if(this.state[forInput] === false) {
      return <label htmlFor={forInput}><i className="checkmark fas fa-check"></i><p>{value}</p><img src={fileName} draggable="false" alt={fileName}/></label>
    } else {
      return <label htmlFor={forInput} className="selected"><i className="checkmark fas fa-check"></i><p>{value}</p><img src={fileName} draggable="false" alt={fileName}/></label>
    }
  }

  onNumberChange(boxVarName, sliderVarName, index, e) {

    const self = this;

    var tempVar = self.state[boxVarName].slice();

    tempVar[index] = e.target.value;

    this.setState({
      [boxVarName]: tempVar
    });

    if (self.state.typingTimeout) {
       clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      typing: false,
      typingTimeout: setTimeout(function () {
        var finalTempVar = self.state[sliderVarName].slice();

        if (parseInt(e.target.value) < e.target.min) {
          e.target.value = e.target.min;
        };
        if (parseInt(e.target.value) > e.target.max) {
          e.target.value = e.target.max;
        };

        finalTempVar[index] = e.target.value;

        self.setState({
          [sliderVarName]: finalTempVar
        });
      }, 1000)
    });
  }

  enterPressed(sliderVarName, index, e) {
    var code = e.key || e.which;
    if(code === 13 || code === "Enter") { //13 is the enter keycode
      var finalTempVar = this.state[sliderVarName].slice();

      if (parseInt(e.target.value) < e.target.min) {
        e.target.value = e.target.min;
      };
      if (parseInt(e.target.value) > e.target.max) {
        e.target.value = e.target.max;
      };

      finalTempVar[index] = e.target.value;

      this.setState({
        [sliderVarName]: finalTempVar
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
              <label>Price Range</label>
              <div className="inputs">
                <label>Price Range</label>
                <span className="inputNumber">$
                  <input
                    name="minPrice"
                    type="number"
                    id="minPrice"
                    min="0"
                    max={this.state.values[1]}
                    value={this.state.priceBoxes[0]}
                    onChange={this.onNumberChange.bind(this, "priceBoxes", "values", 0)}
                    onKeyDown={this.enterPressed.bind(this, "values", 0)} />
                </span>
                <p>-</p>
                <span className="inputNumber">$
                  <input
                    name="maxPrice"
                    type="number"
                    id="maxPrice"
                    min={this.state.values[0]}
                    max="100"
                    value={this.state.priceBoxes[1]}
                    onChange={this.onNumberChange.bind(this, "priceBoxes", "values", 1)}
                    onKeyDown={this.enterPressed.bind(this, "values", 1)} />
                </span>
              </div>
              <div className="slider_container">
                <Range
                  step={10}
                  min={0}
                  max={100}
                  values={this.state.values}
                  onChange={(values) => this.setState({ values: values, priceBoxes: values })}
                  renderTrack={({ props, children }) => (
                    <div {...props} style={{...props.style, background:
                      getTrackBackground({
                        values: this.state.values,
                        colors: ['#133d7f', '#3a85ff', '#133d7f'],
                        min: 0,
                        max: 100
                      })
                    }} >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div {...props} style={{ ...props.style}} />
                  )}
                />
              </div>
            </div>
          </div>
          <div label="FINANCE" className="tab">
            <div className="slider_container">
              <div className="inputs">
                <label htmlFor="downFinanceBox">Cash Down</label>
                <span className="inputNumber">$
                  <input
                    name="downFinanceBox"
                    type="number"
                    id="price1"
                    min="0"
                    max="100"
                    value={this.state.downFinanceBox}
                    onChange={this.onNumberChange.bind(this, "downFinanceBox", "downFinanceSlider", 0)}
                    onKeyDown={this.enterPressed.bind(this, "downFinanceSlider", 0)} />
                </span>
              </div>
              <div className="slider">
                <Range
                  step={10}
                  min={0}
                  max={100}
                  values={this.state.downFinanceSlider}
                  onChange={(values) => this.setState({ downFinanceSlider: values, downFinanceBox: values })}
                  renderTrack={({ props, children }) => (
                    <div {...props} style={{...props.style, background:
                      getTrackBackground({
                        values: this.state.downFinanceSlider,
                        colors: ['#3a85ff', '#133d7f'],
                        min: 0,
                        max: 100
                      })
                    }} >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div {...props} style={{ ...props.style}} />
                  )}
                />
              </div>
            </div>
            <div className="slider_container">
              <div className="inputs">
                <label htmlFor="monthlyFinanceBox">Monthly Payment</label>
                <span className="inputNumber">$
                <input
                  name="monthlyFinanceBox"
                  type="number"
                  id="price2"
                  min="0"
                  max="100"
                  value={this.state.monthlyFinanceBox}
                  onChange={this.onNumberChange.bind(this, "monthlyFinanceBox", "monthlyFinanceSlider", 0)}
                  onKeyDown={this.enterPressed.bind(this, "monthlyFinanceSlider", 0)} />
                </span>
              </div>
              <div className="slider">
                <Range
                  step={10}
                  min={0}
                  max={100}
                  values={this.state.monthlyFinanceSlider}
                  onChange={(values) => this.setState({ monthlyFinanceSlider: values, monthlyFinanceBox: values })}
                  renderTrack={({ props, children }) => (
                    <div {...props} style={{...props.style, background:
                      getTrackBackground({
                        values: this.state.monthlyFinanceSlider,
                        colors: ['#3a85ff', '#133d7f'],
                        min: 0,
                        max: 100
                      })
                    }} >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div {...props} style={{ ...props.style}} />
                  )}
                />
              </div>
            </div>
          </div>
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
