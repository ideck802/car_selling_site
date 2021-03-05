import React from 'react';
import ReactDOM from 'react-dom';
import './css/search.css';
import images from './images';
import DropDown from './components/drop_down';
import Tabs from './components/tabs';
import Accordion from './components/accordion';
import Search from './components/search';
import { Range, getTrackBackground } from 'react-range';
import reportWebVitals from './reportWebVitals';

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search_tag: '',
      zip_code: '',
      priceBoxes: [0, 100],
      values: [0, 100],
      yearBoxes: [0, 100],
      yearSlider: [0, 100],
      mileageBoxes: [0, 100],
      mileageSlider: [0, 100],
      downFinanceSlider: [5],
      downFinanceBox: [5],
      monthlyFinanceSlider: [5],
      monthlyFinanceBox: [5],
      typing: false,
      typingTimeout: 0,
      modelBoxes: {
        acuraModelBoxes: [], alfaModelBoxes: [], audiModelBoxes: [], bmwModelBoxes: [], buickModelBoxes: [],
        cadillacModelBoxes: [], chevyModelBoxes: [], chryslerModelBoxes: [], dodgeModelBoxes: [],
        fiatModelBoxes: [], fordModelBoxes: [], genesisModelBoxes: [], gmcModelBoxes: [], hondaModelBoxes: [],
        hyundaiModelBoxes: [], infinitiModelBoxes: [], jaguarModelBoxes: [], jeepModelBoxes: [], kiaModelBoxes: [],
        roverModelBoxes: [], lexusModelBoxes: [], lincolnModelBoxes: [], maseratiModelBoxes: [], mazdaModelBoxes: [],
        benzModelBoxes: [], miniModelBoxes: [], mitsubishiModelBoxes: [], nissanModelBoxes: [], porscheModelBoxes: [],
        ramModelBoxes: [], saabModelBoxes: [], scionModelBoxes: [], smartModelBoxes: [], subaruModelBoxes: [],
        teslaModelBoxes: [], toyotaModelBoxes: [], volksModelBoxes: [], volvoModelBoxes: []
      },
      check_suv: false, check_truck: false, check_sedan: false, check_crossover: false,
      check_coupe: false, check_convertible: false, check_sport: false, check_van: false, check_wagon: false,

      cooled_seats: false, heated_seats: false, heated_steering: false, leather_seats: false, climate_control: false,
      sun_roof: false, dvd_player: false, prem_sound: false, rear_system: false, satillite_radio: false,
      auto_brake: false, back_cam: false, blind_sensor: false, lane_depart: false, park_sense: false,
      secure_alarm: false, adapt_cruise: false, android_auto: false, apple_carplay: false, aux_port: false,
      bluetooth: false, gps_nav: false, hud: false, keyless_start: false, mobile_net: false, power_seats: false,
      trip_pc: false, turn_mirrors: false, adjust_steering: false, auto_park: false, disability: false,
      heat_mirror: false, power_doors: false, power_trunk: false, rain_sense: false, roof_rack: false, stability: false,
      third_row: false, tire_sense: false, tow_hitch: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModelBoxChange = this.handleModelBoxChange.bind(this);
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

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.slider);
    event.preventDefault();
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

  handleModelBoxChange(varName, pos, event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var tempVar = this.state.modelBoxes[varName + 'ModelBoxes'].slice();

    tempVar[pos] = value;

    var tempModelBoxes = this.state.modelBoxes;
    tempModelBoxes[varName + 'ModelBoxes'] = tempVar;

    this.setState({
      modelBoxes: tempModelBoxes
    });
  }

  render() {
    return (
      <div>
        <div className='filters'>
          <div className='search-box'>
            <input
              type='text'
              name='search_tag'
              placeholder='Search by make, model, or tags'
              value={this.state.search_tag}
              onChange={this.handleInputChange} />
            <p>Near: </p>
            <input
              type='text'
              name='zip_code'
              placeholder='Zip code'
              maxLength='5'
              value={this.state.zip_code}
              onChange={this.handleInputChange} />
            <DropDown btnText='Distance'>
              <div>
                <a href='#'>25 Miles</a>
                <a href='#'>50 Miles</a>
                <a href='#'>75 Miles</a>
                <a href='#'>100 Miles</a>
                <a href='#'>250 Miles</a>
                <a href='#'>500 Miles</a>
                <a href='#'>Nearest Store</a>
                <a href='#'>Nearest City</a>
              </div>
            </DropDown>
            <button>
              <i className='fas fa-search'></i>
            </button>
          </div>
          <div className='drop-downs'>
            <DropDown btnText='Price' className='price'>
              <Tabs>
                <div label='PRICE' className='tab price-tab'>
                  <div className='slider-content'>
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
                            })}} >
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
                <div label='FINANCE' className='tab finance-tab'>
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
                            })}} >
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
            </DropDown>
            <DropDown btnText='Make & Model' className='makemodel'>
              <Search value={this.state.modelBoxes} handleBoxChange={this.handleModelBoxChange}/>
            </DropDown>
            <DropDown btnText='Body Type' className='body-types'>
              <div>
                <div className='body'>
                  {this.labelCreator('check_suv', images.suv, 'SUVs')}
                  <input
                    name='check_suv'
                    type='checkbox'
                    id='check_suv'
                    checked={this.state.check_suv}
                    onChange={this.handleInputChange} />
                </div>
                <div className='body'>
                  {this.labelCreator('check_truck', images.pickup, 'Trucks')}
                  <input
                    name='check_truck'
                    type='checkbox'
                    id='check_truck'
                    checked={this.state.check_truck}
                    onChange={this.handleInputChange} />
                </div>
                <div className='body'>
                  {this.labelCreator('check_sedan', images.sedan, 'Sedans')}
                  <input
                    name='check_sedan'
                    type='checkbox'
                    id='check_sedan'
                    checked={this.state.check_sedan}
                    onChange={this.handleInputChange} />
                </div>
                <div className='body'>
                  {this.labelCreator('check_crossover', images.crossover, 'Crossovers')}
                  <input
                    name='check_crossover'
                    type='checkbox'
                    id='check_crossover'
                    checked={this.state.check_crossover}
                    onChange={this.handleInputChange} />
                </div>
                <div className='body'>
                  {this.labelCreator('check_coupe', images.coupe, 'Coupes')}
                  <input
                    name='check_coupe'
                    type='checkbox'
                    id='check_coupe'
                    checked={this.state.check_coupe}
                    onChange={this.handleInputChange} />
                </div>
                <div className='body'>
                  {this.labelCreator('check_convertible', images.convertible, 'Convertibles')}
                  <input
                    name='check_convertible'
                    type='checkbox'
                    id='check_convertible'
                    checked={this.state.check_convertible}
                    onChange={this.handleInputChange} />
                </div>
                <div className='body'>
                  {this.labelCreator('check_van', images.van, 'Vans')}
                  <input
                    name='check_van'
                    type='checkbox'
                    id='check_van'
                    checked={this.state.check_van}
                    onChange={this.handleInputChange} />
                </div>
                <div className='body'>
                  {this.labelCreator('check_wagon', images.wagon, 'Wagons')}
                  <input
                    name='check_wagon'
                    type='checkbox'
                    id='check_wagon'
                    checked={this.state.check_wagon}
                    onChange={this.handleInputChange} />
                </div>
              </div>
            </DropDown>
            <DropDown btnText='Year & Mileage' className='year-mile'>
              <div>
                <div className='slider-content'>
                  <div className='inputs'>
                    <label>Year</label>
                    <span className='input-number'>$
                      <input
                        name='minYear'
                        type='number'
                        id='minYear'
                        min='0'
                        max={this.state.yearSlider[1]}
                        value={this.state.yearBoxes[0]}
                        onChange={this.onNumberChange.bind(this, 'yearBoxes', 'yearSlider', 0)}
                        onKeyDown={this.enterPressed.bind(this, 'yearSlider', 0)} />
                    </span>
                    <p>-</p>
                    <span className='input-number'>$
                      <input
                        name='maxYear'
                        type='number'
                        id='maxYear'
                        min={this.state.yearSlider[0]}
                        max='100'
                        value={this.state.yearBoxes[1]}
                        onChange={this.onNumberChange.bind(this, 'yearBoxes', 'yearSlider', 1)}
                        onKeyDown={this.enterPressed.bind(this, 'yearSlider', 1)} />
                    </span>
                  </div>
                  <div className='slider-container'>
                    <Range
                      step={10}
                      min={0}
                      max={100}
                      values={this.state.yearSlider}
                      onChange={(values) => this.setState({yearSlider: values, yearBoxes: values})}
                      renderTrack={({props, children}) => (
                        <div {...props} style={{...props.style, background:
                          getTrackBackground({
                            values: this.state.yearSlider,
                            colors: ['#133d7f', '#3a85ff', '#133d7f'],
                            min: 0,
                            max: 100
                          })}} >
                          {children}
                        </div>
                      )}
                      renderThumb={({props}) => (
                        <div {...props} style={{...props.style}} />
                      )}
                    />
                  </div>
                </div>
                <div className='slider-content'>
                  <div className='inputs'>
                    <label>Mileage</label>
                    <span className='input-number'>$
                      <input
                        name='minMileage'
                        type='number'
                        id='minMileage'
                        min='0'
                        max={this.state.mileageSlider[1]}
                        value={this.state.mileageBoxes[0]}
                        onChange={this.onNumberChange.bind(this, 'mileageBoxes', 'mileageSlider', 0)}
                        onKeyDown={this.enterPressed.bind(this, 'mileageSlider', 0)} />
                    </span>
                    <p>-</p>
                    <span className='input-number'>$
                      <input
                        name='maxMileage'
                        type='number'
                        id='maxMileage'
                        min={this.state.mileageSlider[0]}
                        max='100'
                        value={this.state.mileageBoxes[1]}
                        onChange={this.onNumberChange.bind(this, 'mileageBoxes', 'mileageSlider', 1)}
                        onKeyDown={this.enterPressed.bind(this, 'mileageSlider', 1)} />
                    </span>
                  </div>
                  <div className='slider-container'>
                    <Range
                      step={10}
                      min={0}
                      max={100}
                      values={this.state.mileageSlider}
                      onChange={(values) => this.setState({mileageSlider: values, mileageBoxes: values})}
                      renderTrack={({props, children}) => (
                        <div {...props} style={{...props.style, background:
                          getTrackBackground({
                            values: this.state.mileageSlider,
                            colors: ['#133d7f', '#3a85ff', '#133d7f'],
                            min: 0,
                            max: 100
                          })}} >
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
            </DropDown>
            <DropDown btnText='Features' className='features'>
              <div>
                <div>
                  <Accordion btnText='Comfort'>
                    <label htmlFor='cooled_seats'>
                      {(this.state.cooled_seats === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Cooled Seats
                    </label>
                    <input
                      name='cooled_seats'
                      type='checkbox'
                      id='cooled_seats'
                      checked={this.state.cooled_seats}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='heated_seats'>
                      {(this.state.heated_seats === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Heated Seats
                    </label>
                    <input
                      name='heated_seats'
                      type='checkbox'
                      id='heated_seats'
                      checked={this.state.heated_seats}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='heated_steering'>
                      {(this.state.heated_steering === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Heated Steering Wheel
                    </label>
                    <input
                      name='heated_steering'
                      type='checkbox'
                      id='heated_steering'
                      checked={this.state.heated_steering}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='leather_seats'>
                      {(this.state.leather_seats === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Leather Seats
                    </label>
                    <input
                      name='leather_seats'
                      type='checkbox'
                      id='leather_seats'
                      checked={this.state.leather_seats}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='climate_control'>
                      {(this.state.climate_control === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Multi-zone Climate Control
                    </label>
                    <input
                      name='climate_control'
                      type='checkbox'
                      id='climate_control'
                      checked={this.state.climate_control}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='sun_roof'>
                      {(this.state.sun_roof === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Sun/Moon Roof
                    </label>
                    <input
                      name='sun_roof'
                      type='checkbox'
                      id='sun_roof'
                      checked={this.state.sun_roof}
                      onChange={this.handleInputChange}
                      />
                  </Accordion>
                  <Accordion btnText='Entertainment'>
                    <label htmlFor='dvd_player'>
                      {(this.state.dvd_player === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      DVD Player
                    </label>
                    <input
                      name='dvd_player'
                      type='checkbox'
                      id='dvd_player'
                      checked={this.state.dvd_player}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='prem_sound'>
                      {(this.state.prem_sound === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Premium Sound
                    </label>
                    <input
                      name='prem_sound'
                      type='checkbox'
                      id='prem_sound'
                      checked={this.state.prem_sound}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='rear_system'>
                      {(this.state.rear_system === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Rear Entertainment System
                    </label>
                    <input
                      name='rear_system'
                      type='checkbox'
                      id='rear_system'
                      checked={this.state.rear_system}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='satillite_radio'>
                      {(this.state.satillite_radio === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Satillite Radio
                    </label>
                    <input
                      name='satillite_radio'
                      type='checkbox'
                      id='satillite_radio'
                      checked={this.state.satillite_radio}
                      onChange={this.handleInputChange}
                      />
                  </Accordion>
                  <Accordion btnText='Safety'>
                    <label htmlFor='auto_brake'>
                      {(this.state.auto_brake === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Automatic Braking
                    </label>
                    <input
                      name='auto_brake'
                      type='checkbox'
                      id='auto_brake'
                      checked={this.state.auto_brake}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='back_cam'>
                      {(this.state.back_cam === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Backup Camera
                    </label>
                    <input
                      name='back_cam'
                      type='checkbox'
                      id='back_cam'
                      checked={this.state.back_cam}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='blind_sensor'>
                      {(this.state.blind_sensor === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Blind Spot Sensors
                    </label>
                    <input
                      name='blind_sensor'
                      type='checkbox'
                      id='blind_sensor'
                      checked={this.state.blind_sensor}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='lane_depart'>
                      {(this.state.lane_depart === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Lane Departure Warning
                    </label>
                    <input
                      name='lane_depart'
                      type='checkbox'
                      id='lane_depart'
                      checked={this.state.lane_depart}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='park_sense'>
                      {(this.state.park_sense === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Parking Sensors
                    </label>
                    <input
                      name='park_sense'
                      type='checkbox'
                      id='park_sense'
                      checked={this.state.park_sense}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='secure_alarm'>
                      {(this.state.secure_alarm === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Security Alarm
                    </label>
                    <input
                      name='secure_alarm'
                      type='checkbox'
                      id='secure_alarm'
                      checked={this.state.secure_alarm}
                      onChange={this.handleInputChange}
                      />
                  </Accordion>
                </div>
                <div>
                  <Accordion btnText='Tech'>
                    <label htmlFor='adapt_cruise'>
                      {(this.state.adapt_cruise === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Adaptive Cruise Control
                    </label>
                    <input
                      name='adapt_cruise'
                      type='checkbox'
                      id='adapt_cruise'
                      checked={this.state.adapt_cruise}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='android_auto'>
                      {(this.state.android_auto === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Android Auto
                    </label>
                    <input
                      name='android_auto'
                      type='checkbox'
                      id='android_auto'
                      checked={this.state.android_auto}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='apple_carplay'>
                      {(this.state.apple_carplay === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Apple CarPlay
                    </label>
                    <input
                      name='apple_carplay'
                      type='checkbox'
                      id='apple_carplay'
                      checked={this.state.apple_carplay}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='aux_port'>
                      {(this.state.aux_port === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      AUX Audio Input
                    </label>
                    <input
                      name='aux_port'
                      type='checkbox'
                      id='aux_port'
                      checked={this.state.aux_port}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='bluetooth'>
                      {(this.state.bluetooth === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Bluetooth
                    </label>
                    <input
                      name='bluetooth'
                      type='checkbox'
                      id='bluetooth'
                      checked={this.state.bluetooth}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='gps_nav'>
                      {(this.state.gps_nav === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      GPS Navigation
                    </label>
                    <input
                      name='gps_nav'
                      type='checkbox'
                      id='gps_nav'
                      checked={this.state.gps_nav}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='hud'>
                      {(this.state.hud === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Heads Up Display
                    </label>
                    <input
                      name='hud'
                      type='checkbox'
                      id='hud'
                      checked={this.state.hud}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='keyless_start'>
                      {(this.state.keyless_start === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Keyless Ignition/Remote Start
                    </label>
                    <input
                      name='keyless_start'
                      type='checkbox'
                      id='keyless_start'
                      checked={this.state.keyless_start}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='mobile_net'>
                      {(this.state.mobile_net === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Mobile Internet
                    </label>
                    <input
                      name='mobile_net'
                      type='checkbox'
                      id='mobile_net'
                      checked={this.state.mobile_net}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='power_seats'>
                      {(this.state.power_seats === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Power Seat(s)
                    </label>
                    <input
                      name='power_seats'
                      type='checkbox'
                      id='power_seats'
                      checked={this.state.power_seats}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='trip_pc'>
                      {(this.state.trip_pc === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Trip Computer
                    </label>
                    <input
                      name='trip_pc'
                      type='checkbox'
                      id='trip_pc'
                      checked={this.state.trip_pc}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='turn_mirrors'>
                      {(this.state.turn_mirrors === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Turn Signal Mirrors
                    </label>
                    <input
                      name='turn_mirrors'
                      type='checkbox'
                      id='turn_mirrors'
                      checked={this.state.turn_mirrors}
                      onChange={this.handleInputChange}
                      />
                  </Accordion>
                  <Accordion btnText='Utility'>
                    <label htmlFor='adjust_steering'>
                      {(this.state.adjust_steering === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Adjustable Steering Wheel
                    </label>
                    <input
                      name='adjust_steering'
                      type='checkbox'
                      id='adjust_steering'
                      checked={this.state.adjust_steering}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='auto_park'>
                      {(this.state.auto_park === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Automatic Parking
                    </label>
                    <input
                      name='auto_park'
                      type='checkbox'
                      id='auto_park'
                      checked={this.state.auto_park}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='disability'>
                      {(this.state.disability === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Disability Equipped
                    </label>
                    <input
                      name='disability'
                      type='checkbox'
                      id='disability'
                      checked={this.state.disability}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='heat_mirror'>
                      {(this.state.heat_mirror === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Heated Mirrors
                    </label>
                    <input
                      name='heat_mirror'
                      type='checkbox'
                      id='heat_mirror'
                      checked={this.state.heat_mirror}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='power_doors'>
                      {(this.state.power_doors === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Power Sliding Doors
                    </label>
                    <input
                      name='power_doors'
                      type='checkbox'
                      id='power_doors'
                      checked={this.state.power_doors}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='power_trunk'>
                      {(this.state.power_trunk === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Power Trunk/Liftgate
                    </label>
                    <input
                      name='power_trunk'
                      type='checkbox'
                      id='power_trunk'
                      checked={this.state.power_trunk}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='rain_sense'>
                      {(this.state.rain_sense === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Rain Sensing Wipers
                    </label>
                    <input
                      name='rain_sense'
                      type='checkbox'
                      id='rain_sense'
                      checked={this.state.rain_sense}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='roof_rack'>
                      {(this.state.roof_rack === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Roof Rack
                    </label>
                    <input
                      name='roof_rack'
                      type='checkbox'
                      id='roof_rack'
                      checked={this.state.roof_rack}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='stability'>
                      {(this.state.stability === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Stability Control
                    </label>
                    <input
                      name='stability'
                      type='checkbox'
                      id='stability'
                      checked={this.state.stability}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='third_row'>
                      {(this.state.third_row === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Third Row Seats
                    </label>
                    <input
                      name='third_row'
                      type='checkbox'
                      id='third_row'
                      checked={this.state.third_row}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='tire_sense'>
                      {(this.state.tire_sense === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Tire Pressure Sensors
                    </label>
                    <input
                      name='tire_sense'
                      type='checkbox'
                      id='tire_sense'
                      checked={this.state.tire_sense}
                      onChange={this.handleInputChange}
                      />
                    <label htmlFor='tow_hitch'>
                      {(this.state.tow_hitch === true ? (<i className='checkmark fas fa-check'></i>) : (''))}
                      Tow Hitch
                    </label>
                    <input
                      name='tow_hitch'
                      type='checkbox'
                      id='tow_hitch'
                      checked={this.state.tow_hitch}
                      onChange={this.handleInputChange}
                      />
                  </Accordion>
                </div>
              </div>
            </DropDown>
            <DropDown btnText='More Filters'>
              <div>
                <a>250 Miles</a>
                <a>500 Miles</a>
                <a>Nearest Store</a>
                <a>Nearest City</a>
              </div>
            </DropDown>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<SearchForm />, document.getElementById('search_form'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
