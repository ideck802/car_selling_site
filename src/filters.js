import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, useHistory, useLocation } from 'react-router-dom';
import './css/search.css';
import images from './images';
import DropDown from './components/drop_down';
import Tabs from './components/tabs';
import Accordion from './components/accordion';
import Search from './components/search';
import vehicles from './vehicleCardList';
import { Range, getTrackBackground } from 'react-range';
import reportWebVitals from './reportWebVitals';

const Filters = (props) => {

    const th = props.th;

    const history = useHistory();

    return (
      <div className='filters'>
        <div className='search-box'>
          <input
            type='text'
            name='search_tag'
            placeholder='Search by make, model, or tags'
            onKeyDown={th.updateURL.bind(th, history, true)}
            value={th.state.modelParam}
            onChange={th.updateInputValue} />
          <div className='second-row'>
            <p>Near: </p>
            <input
              type='text'
              name='zipCode'
              placeholder='Zip code'
              maxLength='5'
              onKeyDown={th.updateURL.bind(th, history, true)}
              value={th.state.zipCode}
              onChange={th.handleInputChange} />
            <DropDown btnText='Distance' isChanging={true}>
              <div className='placeholder' display='Distance'></div>
              <div display='25 Miles' changeDis={th.changeDistance}></div>
              <div display='50 Miles' changeDis={th.changeDistance}></div>
              <div display='75 Miles' changeDis={th.changeDistance}></div>
              <div display='100 Miles' changeDis={th.changeDistance}></div>
              <div display='250 Miles' changeDis={th.changeDistance}></div>
              <div display='500 Miles' changeDis={th.changeDistance}></div>
              <div display='Unlimited' changeDis={th.changeDistance}></div>
            </DropDown>
            <button onClick={th.updateURL.bind(th, history)}>
              <i className='fas fa-search'></i>
            </button>
          </div>
        </div>
        <div className='drop-downs'>
          <DropDown btnText='Price' className='price' extraModalBtns={1}>
            <Tabs changeTabValue={th.changeTabValue} startTab={th.state.financeOrPrice ? 0 : 1}>
              <div label='Price' className='tab price-tab'>
                <div className='slider-content'>
                  <div className='inputs'>
                    <label>Price Range</label>
                    <span className='input-number'>$
                      <input
                        name='minPrice'
                        type='number'
                        id='minPrice'
                        min='100'
                        max={th.state.values[1]}
                        value={th.state.priceBoxes[0]}
                        onChange={th.onNumberChange.bind(th, 'priceBoxes', 'values', 0)}
                        onKeyDown={th.enterPressed.bind(th, 'values', 0)} />
                    </span>
                    <p>-</p>
                    <span className='input-number'>$
                      <input
                        name='maxPrice'
                        type='number'
                        id='maxPrice'
                        min={th.state.values[0]}
                        max='999990'
                        value={th.state.priceBoxes[1]}
                        onChange={th.onNumberChange.bind(th, 'priceBoxes', 'values', 1)}
                        onKeyDown={th.enterPressed.bind(th, 'values', 1)} />
                    </span>
                  </div>
                  <div className='slider-container'>
                    <Range
                      step={10}
                      min={100}
                      max={999990}
                      values={th.state.values}
                      onChange={(values) => th.setState({values: values, priceBoxes: values})}
                      renderTrack={({props, children}) => (
                        <div {...props} style={{...props.style, background:
                          getTrackBackground({
                            values: th.state.values,
                            colors: ['#133d7f', '#3a85ff', '#133d7f'],
                            min: 100,
                            max: 999990
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
                        min='100'
                        max='99990'
                        value={th.state.downFinanceBox}
                        onChange={th.onNumberChange.bind(th, 'downFinanceBox', 'downFinanceSlider', 0)}
                        onKeyDown={th.enterPressed.bind(th, 'downFinanceSlider', 0)} />
                    </span>
                  </div>
                  <div className='slider'>
                    <Range
                      step={10}
                      min={100}
                      max={99990}
                      values={th.state.downFinanceSlider}
                      onChange={(values) => th.setState({downFinanceSlider: values, downFinanceBox: values})}
                      renderTrack={({props, children}) => (
                        <div {...props} style={{...props.style, background:
                          getTrackBackground({
                            values: th.state.downFinanceSlider,
                            colors: ['#3a85ff', '#133d7f'],
                            min: 100,
                            max: 99990
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
                        min='100'
                        max='99990'
                        value={th.state.monthlyFinanceBox}
                        onChange={
                          th.onNumberChange.bind(th, 'monthlyFinanceBox', 'monthlyFinanceSlider', 0)
                        }
                        onKeyDown={th.enterPressed.bind(th, 'monthlyFinanceSlider', 0)} />
                    </span>
                  </div>
                  <div className='slider'>
                    <Range
                      step={10}
                      min={100}
                      max={99990}
                      values={th.state.monthlyFinanceSlider}
                      onChange={
                        (values) => th.setState({monthlyFinanceSlider: values, monthlyFinanceBox: values})
                      }
                      renderTrack={({props, children}) => (
                        <div {...props} style={{...props.style, background:
                          getTrackBackground({
                            values: th.state.monthlyFinanceSlider,
                            colors: ['#3a85ff', '#133d7f'],
                            min: 100,
                            max: 99990
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
          <DropDown btnText='Make & Model' className='makemodel' extraModalBtns={1}>
            <Search value={th.state.modelBoxes} handleBoxChange={th.handleModelBoxChange} th={th} history={history}/>
          </DropDown>
          <DropDown btnText='Body Type' className='body-types' extraModalBtns={1}>
            <div className='container'>
              <div className='body'>
                {th.labelCreator('check_suv', images.suv, 'SUVs')}
                <input
                  name='check_suv'
                  type='checkbox'
                  id='check_suv'
                  checked={th.state.check_suv}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
              <div className='body'>
                {th.labelCreator('check_truck', images.pickup, 'Trucks')}
                <input
                  name='check_truck'
                  type='checkbox'
                  id='check_truck'
                  checked={th.state.check_truck}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
              <div className='body'>
                {th.labelCreator('check_sedan', images.sedan, 'Sedans')}
                <input
                  name='check_sedan'
                  type='checkbox'
                  id='check_sedan'
                  checked={th.state.check_sedan}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
              <div className='body'>
                {th.labelCreator('check_crossover', images.crossover, 'Crossovers')}
                <input
                  name='check_crossover'
                  type='checkbox'
                  id='check_crossover'
                  checked={th.state.check_crossover}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
              <div className='body'>
                {th.labelCreator('check_coupe', images.coupe, 'Coupes')}
                <input
                  name='check_coupe'
                  type='checkbox'
                  id='check_coupe'
                  checked={th.state.check_coupe}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
              <div className='body'>
                {th.labelCreator('check_convertible', images.convertible, 'Convertibles')}
                <input
                  name='check_convertible'
                  type='checkbox'
                  id='check_convertible'
                  checked={th.state.check_convertible}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
              <div className='body'>
                {th.labelCreator('check_van', images.van, 'Vans')}
                <input
                  name='check_van'
                  type='checkbox'
                  id='check_van'
                  checked={th.state.check_van}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
              <div className='body'>
                {th.labelCreator('check_wagon', images.wagon, 'Wagons')}
                <input
                  name='check_wagon'
                  type='checkbox'
                  id='check_wagon'
                  checked={th.state.check_wagon}
                  onChange={(e) => th.handleInputChange(e, history)} />
              </div>
            </div>
          </DropDown>
          <DropDown btnText='Year & Mileage' className='year-mile' extraModalBtns={1}>
            <div className='container'>
              <div className='slider-content'>
                <div className='inputs'>
                  <label>Year</label>
                  <span className='input-number'>$
                    <input
                      name='minYear'
                      type='number'
                      id='minYear'
                      min='1800'
                      max={th.state.yearSlider[1]}
                      value={th.state.yearBoxes[0]}
                      onChange={th.onNumberChange.bind(th, 'yearBoxes', 'yearSlider', 0)}
                      onKeyDown={th.enterPressed.bind(th, 'yearSlider', 0)} />
                  </span>
                  <p>-</p>
                  <span className='input-number'>$
                    <input
                      name='maxYear'
                      type='number'
                      id='maxYear'
                      min={th.state.yearSlider[0]}
                      max='2090'
                      value={th.state.yearBoxes[1]}
                      onChange={th.onNumberChange.bind(th, 'yearBoxes', 'yearSlider', 1)}
                      onKeyDown={th.enterPressed.bind(th, 'yearSlider', 1)} />
                  </span>
                </div>
                <div className='slider-container'>
                  <Range
                    step={10}
                    min={1800}
                    max={2090}
                    values={th.state.yearSlider}
                    onChange={(values) => th.setState({yearSlider: values, yearBoxes: values})}
                    renderTrack={({props, children}) => (
                      <div {...props} style={{...props.style, background:
                        getTrackBackground({
                          values: th.state.yearSlider,
                          colors: ['#133d7f', '#3a85ff', '#133d7f'],
                          min: 1800,
                          max: 2090
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
                      max={th.state.mileageSlider[1]}
                      value={th.state.mileageBoxes[0]}
                      onChange={th.onNumberChange.bind(th, 'mileageBoxes', 'mileageSlider', 0)}
                      onKeyDown={th.enterPressed.bind(th, 'mileageSlider', 0)} />
                  </span>
                  <p>-</p>
                  <span className='input-number'>$
                    <input
                      name='maxMileage'
                      type='number'
                      id='maxMileage'
                      min={th.state.mileageSlider[0]}
                      max='200000'
                      value={th.state.mileageBoxes[1]}
                      onChange={th.onNumberChange.bind(th, 'mileageBoxes', 'mileageSlider', 1)}
                      onKeyDown={th.enterPressed.bind(th, 'mileageSlider', 1)} />
                  </span>
                </div>
                <div className='slider-container'>
                  <Range
                    step={10}
                    min={0}
                    max={200000}
                    values={th.state.mileageSlider}
                    onChange={(values) => th.setState({mileageSlider: values, mileageBoxes: values})}
                    renderTrack={({props, children}) => (
                      <div {...props} style={{...props.style, background:
                        getTrackBackground({
                          values: th.state.mileageSlider,
                          colors: ['#133d7f', '#3a85ff', '#133d7f'],
                          min: 0,
                          max: 200000
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
          <DropDown btnText='Features' className='features' extraModalBtns={1}>
            <div className='container'>
              <div>
                <Accordion btnText='Comfort'>
                  {th.featureCreator('Cooled Seats', 'cooled_seats', history)}
                  {th.featureCreator('Heated Seats', 'heated_seats', history)}
                  {th.featureCreator('Heated Steering Wheel', 'heated_steering', history)}
                  {th.featureCreator('Leather Seats', 'leather_seats', history)}
                  {th.featureCreator('Multi-zone Climate Control', 'climate_control', history)}
                  {th.featureCreator('Sun/Moon Roof', 'sun_roof', history)}
                </Accordion>
                <Accordion btnText='Entertainment'>
                  {th.featureCreator('DVD Player', 'dvd_player', history)}
                  {th.featureCreator('Premium Sound', 'prem_sound', history)}
                  {th.featureCreator('Rear Entertainment System', 'rear_system', history)}
                  {th.featureCreator('Satillite Radio', 'satillite_radio', history)}
                </Accordion>
                <Accordion btnText='Safety'>
                  {th.featureCreator('Automatic Braking', 'auto_brake', history)}
                  {th.featureCreator('Backup Camera', 'back_cam', history)}
                  {th.featureCreator('Blind Spot Sensors', 'blind_sensor', history)}
                  {th.featureCreator('Lane Departure Warning', 'lane_depart', history)}
                  {th.featureCreator('Parking Sensors', 'park_sense', history)}
                  {th.featureCreator('Security Alarm', 'secure_alarm', history)}
                </Accordion>
              </div>
              <div>
                <Accordion btnText='Tech'>
                  {th.featureCreator('Adaptive Cruise Control', 'adapt_cruise', history)}
                  {th.featureCreator('Android Auto', 'android_auto', history)}
                  {th.featureCreator('Apple CarPlay', 'apple_carplay', history)}
                  {th.featureCreator('AUX Audio Port', 'aux_port', history)}
                  {th.featureCreator('Bluetooth', 'bluetooth', history)}
                  {th.featureCreator('GPS Navigation', 'gps_nav', history)}
                  {th.featureCreator('Heads Up Display', 'hud', history)}
                  {th.featureCreator('Keyless Ignition/Remote Start', 'keyless_start', history)}
                  {th.featureCreator('Mobile Internet', 'mobile_net', history)}
                  {th.featureCreator('Power Seat(s)', 'power_seats', history)}
                  {th.featureCreator('Trip Computer', 'trip_pc', history)}
                  {th.featureCreator('Turn Signal Mirrors', 'turn_mirrors', history)}
                </Accordion>
                <Accordion btnText='Utility'>
                  {th.featureCreator('Adjustable Steering Wheel', 'adjust_steering', history)}
                  {th.featureCreator('Automatic Parking', 'auto_park', history)}
                  {th.featureCreator('Disability Equipped', 'disability', history)}
                  {th.featureCreator('Heated Mirrors', 'heat_mirror', history)}
                  {th.featureCreator('Power Sliding Doors', 'power_doors', history)}
                  {th.featureCreator('Power Trunk/Liftgate', 'power_trunk', history)}
                  {th.featureCreator('Rain Sensing Wipers', 'rain_sense', history)}
                  {th.featureCreator('Roof Rack', 'roof_rack', history)}
                  {th.featureCreator('Stability Control', 'stability', history)}
                  {th.featureCreator('Third Row Seats', 'third_row', history)}
                  {th.featureCreator('Tire Pressure Sensors', 'tire_sense', history)}
                  {th.featureCreator('Tow Hitch', 'tow_hitch', history)}
                </Accordion>
              </div>
            </div>
          </DropDown>
          <DropDown btnText='More Filters' className='more-features' extraModalBtns={1}>
            <div className='container'>
              <div className='block1'>
                <div className='slider-content'>
                  <div className='inputs'>
                    <label htmlFor='mpgBox'>MPG</label>
                    <span className='input-number'>$
                      <input
                        name='mpgBox'
                        type='number'
                        id='mpg'
                        min='0'
                        max='100'
                        value={th.state.mpgBox}
                        onChange={th.onNumberChange.bind(th, 'mpgBox', 'mpgSlider', 0)}
                        onKeyDown={th.enterPressed.bind(th, 'mpgSlider', 0)} />
                      </span>
                  </div>
                  <div className='slider-container'>
                    <Range
                      step={10}
                      min={0}
                      max={100}
                      values={th.state.mpgSlider}
                      onChange={(values) => th.setState({mpgSlider: values, mpgBox: values})}
                      renderTrack={({props, children}) => (
                        <div {...props} style={{...props.style, background:
                          getTrackBackground({
                            values: th.state.mpgSlider,
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
                    {th.featureCreator('Gas', 'fuelGas', history)}
                    {th.featureCreator('Hybrid', 'fuelHybrid', history)}
                    {th.featureCreator('Electric', 'fuelElectric', history)}
                    {th.featureCreator('Other', 'fuelOther', history)}
                  </div>
                </div>
              </div>
              <div className='block2'>
                <div>
                  <p>Drive Type</p>
                  <div>
                    {th.featureCreator('Front', 'frontWheel', history)}
                    {th.featureCreator('All', 'allWheel', history)}
                    {th.featureCreator('Rear', 'rearWheel', history)}
                  </div>
                </div>
                <div>
                  <p>Transmission</p>
                  <div>
                    {th.featureCreator('Automatic', 'autoTrans')}
                    {th.featureCreator('Manual', 'manualTrans')}
                  </div>
                </div>
                <div>
                  <p>Cylinders</p>
                  <div>
                    {th.featureCreator('4', 'fourCylinder')}
                    {th.featureCreator('6', 'sixCylinder')}
                    {th.featureCreator('8', 'eightCylinder')}
                    {th.featureCreator('Other', 'otherCylinder')}
                  </div>
                </div>
              </div>
              <div className='color-block'>
                <p>Exterior Color</p>
                <div className='colors'>
                  {th.colorCreator('Black', '#000', 'exterior_black', 'black')}
                  {th.colorCreator('Silver', '#e0e0e0', 'exterior_silver')}
                  {th.colorCreator('White', '#fff', 'exterior_white')}
                  {th.colorCreator('Gray', '#989898', 'exterior_gray')}
                  {th.colorCreator('Red', '#dc4444', 'exterior_red')}
                  {th.colorCreator('Blue', '#3f72b0', 'exterior_blue')}
                  {th.colorCreator('Gold', '#c29050', 'exterior_gold')}
                  {th.colorCreator('Orange', '#da7938', 'exterior_orange')}
                  {th.colorCreator('Green', '#748959', 'exterior_green')}
                  {th.colorCreator('Brown', '#76523c', 'exterior_brown')}
                  {th.colorCreator('Other', `linear-gradient(
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
                  {th.colorCreator('Black', '#000', 'interior_black', 'black')}
                  {th.colorCreator('Silver', '#e0e0e0', 'interior_silver')}
                  {th.colorCreator('White', '#fff', 'interior_white')}
                  {th.colorCreator('Gray', '#989898', 'interior_gray')}
                  {th.colorCreator('Red', '#dc4444', 'interior_red')}
                  {th.colorCreator('Blue', '#3f72b0', 'interior_blue')}
                  {th.colorCreator('Gold', '#c29050', 'interior_gold')}
                  {th.colorCreator('Orange', '#da7938', 'interior_orange')}
                  {th.colorCreator('Green', '#748959', 'interior_green')}
                  {th.colorCreator('Brown', '#76523c', 'interior_brown')}
                  {th.colorCreator('Other', `linear-gradient(
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
    );
  };

export default Filters;
