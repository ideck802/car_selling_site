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
      zipCode: '',
      distance: 0,
      financeOrPrice: false,
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

      exterior_black: false, exterior_silver: false, exterior_white: false, exterior_gray: false, exterior_red: false,
      exterior_blue: false, exterior_gold: false, exterior_orange: false, exterior_green: false, exterior_brown: false,
      exterior_other: false,

      interior_black: false, interior_silver: false, interior_white: false, interior_gray: false, interior_red: false,
      interior_blue: false, interior_gold: false, interior_orange: false, interior_green: false, interior_brown: false,
      interior_other: false,

      mpgSlider: [5],
      mpgBox: [5],

      fuelGas: false, fuelHybrid: false, fuelElectric: false, fuelOther: false,
      frontWheel: false, allWheel: false, rearWheel: false,
      autoTrans: false, manualTrans: false,
      fourCylinder: false, sixCylinder: false, eightCylinder: false, otherCylinder: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModelBoxChange = this.handleModelBoxChange.bind(this);
    this.labelCreator = this.labelCreator.bind(this);
    this.featureCreator = this.featureCreator.bind(this);
    this.colorCreator = this.colorCreator.bind(this);
    this.changeTabValue = this.changeTabValue.bind(this);
    this.changeDistance = this.changeDistance.bind(this);
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
  //<i className='checkmark fas fa-check'></i>
  featureCreator(displayText, value) {
    return <label htmlFor={value} className={(this.state[value] === true ? ('checked') : (''))}>

      {displayText}
      <input
        name={value}
        type='checkbox'
        id={value}
        checked={this.state[value]}
        onChange={this.handleInputChange}
        />
    </label>;
  }

  colorCreator(name, color, value, classname) {
    return <label htmlFor={value} className={(this.state[value] === true ?
        ('color checked ' + classname) : ('color ' + classname))}>
      <div className='color-circle' style={{background: color}}>
        <i className='checkmark fas fa-check'></i>
      </div>
      {name}
      <input
        name={value}
        type='checkbox'
        id={value}
        checked={this.state[value]}
        onChange={this.handleInputChange}
        />
    </label>;
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

  changeDistance(value) {
    this.setState({
      distance: value
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
              name='zipCode'
              placeholder='Zip code'
              maxLength='5'
              value={this.state.zipCode}
              onChange={this.handleInputChange} />
            <DropDown btnText='Distance' changing={true}>
              <div className='placeholder' display='Distance'></div>
              <div display='25 Miles' changeDis={this.changeDistance}></div>
              <div display='50 Miles' changeDis={this.changeDistance}></div>
              <div display='75 Miles' changeDis={this.changeDistance}></div>
              <div display='100 Miles' changeDis={this.changeDistance}></div>
              <div display='250 Miles' changeDis={this.changeDistance}></div>
              <div display='500 Miles' changeDis={this.changeDistance}></div>
              <div display='Unlimited' changeDis={this.changeDistance}></div>
            </DropDown>
            <button>
              <i className='fas fa-search'></i>
            </button>
          </div>
          <div className='drop-downs'>
            <DropDown btnText='Price' className='price'>
              <Tabs changeTabValue={this.changeTabValue}>
                <div label='Price' className='tab price-tab'>
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
                <div label='Finance' className='tab finance-tab'>
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
                    {this.featureCreator('Cooled Seats', 'cooled_seats')}
                    {this.featureCreator('Heated Seats', 'heated_seats')}
                    {this.featureCreator('Heated Steering Wheel', 'heated_steering')}
                    {this.featureCreator('Leather Seats', 'leather_seats')}
                    {this.featureCreator('Multi-zone Climate Control', 'climate_control')}
                    {this.featureCreator('Sun/Moon Roof', 'sun_roof')}
                  </Accordion>
                  <Accordion btnText='Entertainment'>
                    {this.featureCreator('DVD Player', 'dvd_player')}
                    {this.featureCreator('Premium Sound', 'prem_sound')}
                    {this.featureCreator('Rear Entertainment System', 'rear_system')}
                    {this.featureCreator('Satillite Radio', 'satillite_radio')}
                  </Accordion>
                  <Accordion btnText='Safety'>
                    {this.featureCreator('Automatic Braking', 'auto_brake')}
                    {this.featureCreator('Backup Camera', 'back_cam')}
                    {this.featureCreator('Blind Spot Sensors', 'blind_sensor')}
                    {this.featureCreator('Lane Departure Warning', 'lane_depart')}
                    {this.featureCreator('Parking Sensors', 'park_sense')}
                    {this.featureCreator('Security Alarm', 'secure_alarm')}
                  </Accordion>
                </div>
                <div>
                  <Accordion btnText='Tech'>
                    {this.featureCreator('Adaptive Cruise Control', 'adapt_cruise')}
                    {this.featureCreator('Android Auto', 'android_auto')}
                    {this.featureCreator('Apple CarPlay', 'apple_carplay')}
                    {this.featureCreator('AUX Audio Port', 'aux_port')}
                    {this.featureCreator('Bluetooth', 'bluetooth')}
                    {this.featureCreator('GPS Navigation', 'gps_nav')}
                    {this.featureCreator('Heads Up Display', 'hud')}
                    {this.featureCreator('Keyless Ignition/Remote Start', 'keyless_start')}
                    {this.featureCreator('Mobile Internet', 'mobile_net')}
                    {this.featureCreator('Power Seat(s)', 'power_seats')}
                    {this.featureCreator('Trip Computer', 'trip_pc')}
                    {this.featureCreator('Turn Signal Mirrors', 'turn_mirrors')}
                  </Accordion>
                  <Accordion btnText='Utility'>
                    {this.featureCreator('Adjustable Steering Wheel', 'adjust_steering')}
                    {this.featureCreator('Automatic Parking', 'auto_park')}
                    {this.featureCreator('Disability Equipped', 'disability')}
                    {this.featureCreator('Heated Mirrors', 'heat_mirror')}
                    {this.featureCreator('Power Sliding Doors', 'power_doors')}
                    {this.featureCreator('Power Trunk/Liftgate', 'power_trunk')}
                    {this.featureCreator('Rain Sensing Wipers', 'rain_sense')}
                    {this.featureCreator('Roof Rack', 'roof_rack')}
                    {this.featureCreator('Stability Control', 'stability')}
                    {this.featureCreator('Third Row Seats', 'third_row')}
                    {this.featureCreator('Tire Pressure Sensors', 'tire_sense')}
                    {this.featureCreator('Tow Hitch', 'tow_hitch')}
                  </Accordion>
                </div>
              </div>
            </DropDown>
            <DropDown btnText='More Filters' className='more-features'>
              <div>
                <div className='block1'>
                  <div className='slider-content'>
                    <div className='inputs'>
                      <label htmlFor='mpgBox'>Monthly Payment</label>
                      <span className='input-number'>$
                        <input
                          name='mpgBox'
                          type='number'
                          id='mpg'
                          min='0'
                          max='100'
                          value={this.state.mpgBox}
                          onChange={this.onNumberChange.bind(this, 'mpgBox', 'mpgSlider', 0)}
                          onKeyDown={this.enterPressed.bind(this, 'mpgSlider', 0)} />
                        </span>
                    </div>
                    <div className='slider-container'>
                      <Range
                        step={10}
                        min={0}
                        max={100}
                        values={this.state.mpgSlider}
                        onChange={(values) => this.setState({mpgSlider: values, mpgBox: values})}
                        renderTrack={({props, children}) => (
                          <div {...props} style={{...props.style, background:
                            getTrackBackground({
                              values: this.state.mpgSlider,
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
                  <div className='fuel-types'>
                    <p>Fuel Type</p>
                    <div>
                      {this.featureCreator('Gas', 'fuelGas')}
                      {this.featureCreator('Hybrid', 'fuelHybrid')}
                      {this.featureCreator('Electric', 'fuelElectric')}
                      {this.featureCreator('Other', 'fuelOther')}
                    </div>
                  </div>
                </div>
                <div className='block2'>
                  <div>
                    <p>Drive Type</p>
                    <div>
                      {this.featureCreator('Front', 'frontWheel')}
                      {this.featureCreator('All', 'allWheel')}
                      {this.featureCreator('Rear', 'rearWheel')}
                    </div>
                  </div>
                  <div>
                    <p>Transmission</p>
                    <div>
                      {this.featureCreator('Automatic', 'autoTrans')}
                      {this.featureCreator('Manual', 'manualTrans')}
                    </div>
                  </div>
                  <div>
                    <p>Cylinders</p>
                    <div>
                      {this.featureCreator('4', 'fourCylinder')}
                      {this.featureCreator('6', 'sixCylinder')}
                      {this.featureCreator('8', 'eightCylinder')}
                      {this.featureCreator('Other', 'otherCylinder')}
                    </div>
                  </div>
                </div>
                <div className='color-block'>
                  <p>Exterior Color</p>
                  <div className='colors'>
                    {this.colorCreator('Black', '#000', 'exterior_black', 'black')}
                    {this.colorCreator('Silver', '#e0e0e0', 'exterior_silver')}
                    {this.colorCreator('White', '#fff', 'exterior_white')}
                    {this.colorCreator('Gray', '#989898', 'exterior_gray')}
                    {this.colorCreator('Red', '#dc4444', 'exterior_red')}
                    {this.colorCreator('Blue', '#3f72b0', 'exterior_blue')}
                    {this.colorCreator('Gold', '#c29050', 'exterior_gold')}
                    {this.colorCreator('Orange', '#da7938', 'exterior_orange')}
                    {this.colorCreator('Green', '#748959', 'exterior_green')}
                    {this.colorCreator('Brown', '#76523c', 'exterior_brown')}
                    {this.colorCreator('Other', `linear-gradient(
                      90deg,
                      rgba(255, 0, 0, 1) 0%,
                      rgba(255, 154, 0, 1) 10%,
                      rgba(208, 222, 33, 1) 20%,
                      rgba(79, 220, 74, 1) 30%,
                      rgba(63, 218, 216, 1) 40%,
                      rgba(47, 201, 226, 1) 50%,
                      rgba(28, 127, 238, 1) 60%,
                      rgba(95, 21, 242, 1) 70%,
                      rgba(186, 12, 248, 1) 80%,
                      rgba(251, 7, 217, 1) 90%,
                      rgba(255, 0, 0, 1) 100%`, 'exterior_other')}
                  </div>
                </div>
                <div className='color-block'>
                  <p>Interior Color</p>
                  <div className='colors'>
                    {this.colorCreator('Black', '#000', 'interior_black', 'black')}
                    {this.colorCreator('Silver', '#e0e0e0', 'interior_silver')}
                    {this.colorCreator('White', '#fff', 'interior_white')}
                    {this.colorCreator('Gray', '#989898', 'interior_gray')}
                    {this.colorCreator('Red', '#dc4444', 'interior_red')}
                    {this.colorCreator('Blue', '#3f72b0', 'interior_blue')}
                    {this.colorCreator('Gold', '#c29050', 'interior_gold')}
                    {this.colorCreator('Orange', '#da7938', 'interior_orange')}
                    {this.colorCreator('Green', '#748959', 'interior_green')}
                    {this.colorCreator('Brown', '#76523c', 'interior_brown')}
                    {this.colorCreator('Other', `linear-gradient(
                      90deg,
                      rgba(255, 0, 0, 1) 0%,
                      rgba(255, 154, 0, 1) 10%,
                      rgba(208, 222, 33, 1) 20%,
                      rgba(79, 220, 74, 1) 30%,
                      rgba(63, 218, 216, 1) 40%,
                      rgba(47, 201, 226, 1) 50%,
                      rgba(28, 127, 238, 1) 60%,
                      rgba(95, 21, 242, 1) 70%,
                      rgba(186, 12, 248, 1) 80%,
                      rgba(251, 7, 217, 1) 90%,
                      rgba(255, 0, 0, 1) 100%`, 'interior_other')}
                  </div>
                </div>
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
