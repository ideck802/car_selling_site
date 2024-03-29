import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/home_form.css';
import Tabs from './components/tabs';
import images from './images';
import './vehicle_list';
import reportWebVitals from './reportWebVitals';

import Carousel from 'react-elastic-carousel';
import 'car-makes-icons/dist/style.css';
import { Range, getTrackBackground } from 'react-range';

class HomeForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkSuv: false, checkTruck: false, checkSedan: false, checkCrossover: false,
      checkCoupe: false, checkConvertible: false, checkSport: false, checkVan: false, checkWagon: false,
      priceBoxes: [0, 100],
      values: [0, 100],
      downFinanceSlider: [5],
      downFinanceBox: [5],
      monthlyFinanceSlider: [5],
      monthlyFinanceBox: [5],
      typing: false,
      typingTimeout: 0,
      breakpoints: [
        {width: 1, itemsToShow: 1.5, itemsToScroll: 1},
        {width: 300, itemsToShow: 2, itemsToScroll: 1},
        {width: 350, itemsToShow: 3, itemsToScroll: 2},
        {width: 500, itemsToShow: 4, itemsToScroll: 2},
        {width: 600, itemsToShow: 5, itemsToScroll: 3},
        {width: 700, itemsToShow: 6, itemsToScroll: 3},
        {width: 800, itemsToShow: 7, itemsToScroll: 4},
        {width: 900, itemsToShow: 8, itemsToScroll: 4},
        {width: 1000, itemsToShow: 9, itemsToScroll: 4}
      ],
      financeOrPrice: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.labelCreator = this.labelCreator.bind(this);
    this.changeTabValue = this.changeTabValue.bind(this);
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
    if (this.state[forInput] === false) {
      return <label htmlFor={forInput}>
        <i className='checkmark fas fa-check'></i>
        <p>{value}</p>
        <img src={fileName} draggable='false' alt={fileName}/>
      </label>;
    } else {
      return <label htmlFor={forInput} className='selected'>
        <i className='checkmark fas fa-check'></i>
        <p>{value}</p>
        <img src={fileName} draggable='false' alt={fileName}/>
      </label>;
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
      typingTimeout: setTimeout(function() {
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
    if (code === 13 || code === 'Enter') { //13 is the enter keycode
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

  changeTabValue(value) {
    if (value === 0) {
      this.setState({
        financeOrPrice: false
      });
    } else {
      this.setState({
        financeOrPrice: true
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='vehicles'>
          <p>Pick a Type <span>(select all that apply)</span></p>
          <Carousel
            itemsToShow={3}
            itemsToScroll={1}
            breakPoints={this.state.breakpoints}
            pagination={false}
            className='checkboxes'>
            <div className='slide'>
              {this.labelCreator('checkSuv', images.suv, 'SUVs')}
              <input
                name='checkSuv'
                type='checkbox'
                id='checkSuv'
                checked={this.state.checkSuv}
                onChange={this.handleInputChange} />
            </div>
            <div className='slide'>
              {this.labelCreator('checkTruck', images.pickup, 'Trucks')}
              <input
                name='checkTruck'
                type='checkbox'
                id='checkTruck'
                checked={this.state.checkTruck}
                onChange={this.handleInputChange} />
            </div>
            <div className='slide'>
              {this.labelCreator('checkSedan', images.sedan, 'Sedans')}
              <input
                name='checkSedan'
                type='checkbox'
                id='checkSedan'
                checked={this.state.checkSedan}
                onChange={this.handleInputChange} />
            </div>
            <div className='slide'>
              {this.labelCreator('checkCrossover', images.crossover, 'Crossovers')}
              <input
                name='checkCrossover'
                type='checkbox'
                id='checkCrossover'
                checked={this.state.checkCrossover}
                onChange={this.handleInputChange} />
            </div>
            <div className='slide'>
              {this.labelCreator('checkCoupe', images.coupe, 'Coupes')}
              <input
                name='checkCoupe'
                type='checkbox'
                id='checkCoupe'
                checked={this.state.checkCoupe}
                onChange={this.handleInputChange} />
            </div>
            <div className='slide'>
              {this.labelCreator('checkConvertible', images.convertible, 'Convertibles')}
              <input
                name='checkConvertible'
                type='checkbox'
                id='checkConvertible'
                checked={this.state.checkConvertible}
                onChange={this.handleInputChange} />
            </div>
            <div className='slide'>
              {this.labelCreator('checkVan', images.van, 'Vans')}
              <input
                name='checkVan'
                type='checkbox'
                id='checkVan'
                checked={this.state.checkVan}
                onChange={this.handleInputChange} />
            </div>
            <div className='slide'>
              {this.labelCreator('checkWagon', images.wagon, 'Wagons')}
              <input
                name='checkWagon'
                type='checkbox'
                id='checkWagon'
                checked={this.state.checkWagon}
                onChange={this.handleInputChange} />
            </div>
          </Carousel>
        </div>
        <Tabs changeTabValue={this.changeTabValue} startTab={0}>
          <div label='PRICE' className='tab'>
            <div className='slider-content'>
              <label>Price Range</label>
              <div className='inputs'>
                <label>Price Range</label>
                <span className='input-number'>$
                  <input
                    name='minPrice'
                    type='number'
                    id='minPrice'
                    min='0'
                    max={this.state.values[1]}
                    value={this.state.priceBoxes[0]}
                    onChange={this.onNumberChange.bind(this, 'priceBoxes', 'values', 0)}
                    onKeyDown={this.enterPressed.bind(this, 'values', 0)} />
                </span>
                <p>-</p>
                <span className='input-number'>$
                  <input
                    name='maxPrice'
                    type='number'
                    id='maxPrice'
                    min={this.state.values[0]}
                    max='100'
                    value={this.state.priceBoxes[1]}
                    onChange={this.onNumberChange.bind(this, 'priceBoxes', 'values', 1)}
                    onKeyDown={this.enterPressed.bind(this, 'values', 1)} />
                </span>
              </div>
              <div className='slider-container'>
                <Range
                  step={10}
                  min={0}
                  max={100}
                  values={this.state.values}
                  onChange={(values) => this.setState({values: values, priceBoxes: values})}
                  renderTrack={({props, children}) => (
                    <div {...props} style={{...props.style, background:
                      getTrackBackground({
                        values: this.state.values,
                        colors: ['#133d7f', '#3a85ff', '#133d7f'],
                        min: 0,
                        max: 100
                      })}}>
                      {children}
                    </div>
                  )}
                  renderThumb={({props}) => (
                    <div {...props} style={{...props.style}} />
                  )}
                />
              </div>
            </div>
          </div>
          <div label='FINANCE' className='tab'>
            <div className='slider-container'>
              <div className='inputs'>
                <label htmlFor='downFinanceBox'>Cash Down</label>
                <span className='input-number'>$
                  <input
                    name='downFinanceBox'
                    type='number'
                    id='price1'
                    min='0'
                    max='100'
                    value={this.state.downFinanceBox}
                    onChange={this.onNumberChange.bind(this, 'downFinanceBox', 'downFinanceSlider', 0)}
                    onKeyDown={this.enterPressed.bind(this, 'downFinanceSlider', 0)} />
                </span>
              </div>
              <div className='slider'>
                <Range
                  step={10}
                  min={0}
                  max={100}
                  values={this.state.downFinanceSlider}
                  onChange={(values) => this.setState({downFinanceSlider: values, downFinanceBox: values})}
                  renderTrack={({props, children}) => (
                    <div {...props} style={{...props.style, background:
                      getTrackBackground({
                        values: this.state.downFinanceSlider,
                        colors: ['#3a85ff', '#133d7f'],
                        min: 0,
                        max: 100
                      })}}>
                      {children}
                    </div>
                  )}
                  renderThumb={({props}) => (
                    <div {...props} style={{...props.style}} />
                  )}
                />
              </div>
            </div>
            <div className='slider-container'>
              <div className='inputs'>
                <label htmlFor='monthlyFinanceBox'>Monthly Payment</label>
                <span className='input-number'>$
                  <input
                    name='monthlyFinanceBox'
                    type='number'
                    id='price2'
                    min='0'
                    max='100'
                    value={this.state.monthlyFinanceBox}
                    onChange={this.onNumberChange.bind(this, 'monthlyFinanceBox', 'monthlyFinanceSlider', 0)}
                    onKeyDown={this.enterPressed.bind(this, 'monthlyFinanceSlider', 0)} />
                </span>
              </div>
              <div className='slider'>
                <Range
                  step={10}
                  min={0}
                  max={100}
                  values={this.state.monthlyFinanceSlider}
                  onChange={(values) => this.setState({monthlyFinanceSlider: values, monthlyFinanceBox: values})}
                  renderTrack={({props, children}) => (
                    <div {...props} style={{...props.style, background:
                      getTrackBackground({
                        values: this.state.monthlyFinanceSlider,
                        colors: ['#3a85ff', '#133d7f'],
                        min: 0,
                        max: 100
                      })}}>
                      {children}
                    </div>
                  )}
                  renderThumb={({props}) => (
                    <div {...props} style={{...props.style}} />
                  )}
                />
              </div>
            </div>
          </div>
        </Tabs>
        <input type='submit' value="SEE WHAT'S AVAILABLE" className='submit-btn' />
      </form>
    );
  }
}

ReactDOM.render(<HomeForm />, document.getElementById('react_form'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
