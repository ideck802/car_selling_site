/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './css/search.css';
import images from './images';
import DropDown from './components/drop_down';
import Tabs from './components/tabs';
import Accordion from './components/accordion';
import Search from './components/search';
import AddTags from './components/tags_search.js';
import { Range, getTrackBackground } from 'react-range';

const Filters = (props) => {

  const th = props.th;

  const history = useHistory();

  return (
    <div className='filters'>
      <div className='search-box'>
        <AddTags modlBoxes={th.state.modelBoxes} handleBoxChange={th.handleModelBoxChange}
          handleInputChange={th.handleInputChange} th={th} history={history}/>
        <div className='second-row'>
          <p>Near: </p>
          <input
            type='test'
            name='zipCode'
            placeholder='Zip code'
            maxLength='5'
            pattern='\d*'
            value={th.state.zipCode}
            onChange={(e) => th.handleInputChange(e, history)}
            onKeyDown={th.enterPressed.bind(th, 'zipCode', 0, history)} />
          <DropDown btnText='Distance' isChanging={true} startValue={th.state.distance} his={history}>
            <div className='placeholder' display='Distance'></div>
            <div display='25 Miles' changeDis={th.changeDistance}></div>
            <div display='50 Miles' changeDis={th.changeDistance}></div>
            <div display='75 Miles' changeDis={th.changeDistance}></div>
            <div display='100 Miles' changeDis={th.changeDistance}></div>
            <div display='250 Miles' changeDis={th.changeDistance}></div>
            <div display='500 Miles' changeDis={th.changeDistance}></div>
            <div display='Unlimited' changeDis={th.changeDistance}></div>
          </DropDown>
          <button onClick={() => th.updateDistance(history)}>
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
                      max={th.state.priceSlider[1]}
                      value={th.state.priceBoxes[0]}
                      onChange={th.onNumberChange.bind(th, 'priceBoxes', 'priceSlider', 0, history)}
                      onKeyDown={th.enterPressed.bind(th, 'priceSlider', 0, history)} />
                  </span>
                  <p>-</p>
                  <span className='input-number'>$
                    <input
                      name='maxPrice'
                      type='number'
                      id='maxPrice'
                      min={th.state.priceSlider[0]}
                      max='999990'
                      value={th.state.priceBoxes[1]}
                      onChange={th.onNumberChange.bind(th, 'priceBoxes', 'priceSlider', 1, history)}
                      onKeyDown={th.enterPressed.bind(th, 'priceSlider', 1, history)} />
                  </span>
                </div>
                <div className='slider-container'>
                  <Range
                    step={10}
                    min={100}
                    max={999990}
                    values={th.state.priceSlider}
                    onChange={(values) => th.setState({priceSlider: values, priceBoxes: values},
                      th.updateUrlFromTimeout(history))}
                    renderTrack={({props, children}) => (
                      <div {...props} style={{...props.style, background:
                          getTrackBackground({
                            values: th.state.priceSlider,
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
                  <label htmlFor='downFinanceBoxes'>Cash Down</label>
                  <span className='input-number'>$
                    <input
                      name='downFinanceBoxes'
                      type='number'
                      id='price1'
                      min='100'
                      max='99990'
                      value={th.state.downFinanceBoxes}
                      onChange={th.onNumberChange.bind(th, 'downFinanceBoxes', 'downFinanceSlider', 0, history)}
                      onKeyDown={th.enterPressed.bind(th, 'downFinanceSlider', 0, history)} />
                  </span>
                </div>
                <div className='slider'>
                  <Range
                    step={10}
                    min={100}
                    max={99990}
                    values={th.state.downFinanceSlider}
                    onChange={(values) => th.setState({downFinanceSlider: values, downFinanceBoxes: values},
                      th.updateUrlFromTimeout(history))}
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
                  <label htmlFor='monthlyFinanceBoxes'>Monthly Payment</label>
                  <span className='input-number'>$
                    <input
                      name='monthlyFinanceBoxes'
                      type='number'
                      id='price2'
                      min='100'
                      max='99990'
                      value={th.state.monthlyFinanceBoxes}
                      onChange={
                        th.onNumberChange.bind(th, 'monthlyFinanceBoxes', 'monthlyFinanceSlider', 0, history)
                      }
                      onKeyDown={th.enterPressed.bind(th, 'monthlyFinanceSlider', 0, history)} />
                  </span>
                </div>
                <div className='slider'>
                  <Range
                    step={10}
                    min={100}
                    max={99990}
                    values={th.state.monthlyFinanceSlider}
                    onChange={
                      (values) => th.setState({monthlyFinanceSlider: values, monthlyFinanceBoxes: values},
                        th.updateUrlFromTimeout(history))
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
              {th.labelCreator('checkSuv', images.suv, 'SUVs')}
              <input
                name='checkSuv'
                type='checkbox'
                id='checkSuv'
                checked={th.state.checkSuv}
                onChange={(e) => th.handleInputChange(e, history)} />
            </div>
            <div className='body'>
              {th.labelCreator('checkTruck', images.pickup, 'Trucks')}
              <input
                name='checkTruck'
                type='checkbox'
                id='checkTruck'
                checked={th.state.checkTruck}
                onChange={(e) => th.handleInputChange(e, history)} />
            </div>
            <div className='body'>
              {th.labelCreator('checkSedan', images.sedan, 'Sedans')}
              <input
                name='checkSedan'
                type='checkbox'
                id='checkSedan'
                checked={th.state.checkSedan}
                onChange={(e) => th.handleInputChange(e, history)} />
            </div>
            <div className='body'>
              {th.labelCreator('checkCrossover', images.crossover, 'Crossovers')}
              <input
                name='checkCrossover'
                type='checkbox'
                id='checkCrossover'
                checked={th.state.checkCrossover}
                onChange={(e) => th.handleInputChange(e, history)} />
            </div>
            <div className='body'>
              {th.labelCreator('checkCoupe', images.coupe, 'Coupes')}
              <input
                name='checkCoupe'
                type='checkbox'
                id='checkCoupe'
                checked={th.state.checkCoupe}
                onChange={(e) => th.handleInputChange(e, history)} />
            </div>
            <div className='body'>
              {th.labelCreator('checkConvertible', images.convertible, 'Convertibles')}
              <input
                name='checkConvertible'
                type='checkbox'
                id='checkConvertible'
                checked={th.state.checkConvertible}
                onChange={(e) => th.handleInputChange(e, history)} />
            </div>
            <div className='body'>
              {th.labelCreator('checkVan', images.van, 'Vans')}
              <input
                name='checkVan'
                type='checkbox'
                id='checkVan'
                checked={th.state.checkVan}
                onChange={(e) => th.handleInputChange(e, history)} />
            </div>
            <div className='body'>
              {th.labelCreator('checkWagon', images.wagon, 'Wagons')}
              <input
                name='checkWagon'
                type='checkbox'
                id='checkWagon'
                checked={th.state.checkWagon}
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
                    onChange={th.onNumberChange.bind(th, 'yearBoxes', 'yearSlider', 0, history)}
                    onKeyDown={th.enterPressed.bind(th, 'yearSlider', 0, history)} />
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
                    onChange={th.onNumberChange.bind(th, 'yearBoxes', 'yearSlider', 1, history)}
                    onKeyDown={th.enterPressed.bind(th, 'yearSlider', 1, history)} />
                </span>
              </div>
              <div className='slider-container'>
                <Range
                  step={10}
                  min={1800}
                  max={2090}
                  values={th.state.yearSlider}
                  onChange={(values) => th.setState({yearSlider: values, yearBoxes: values},
                    th.updateUrlFromTimeout(history))}
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
                    onChange={th.onNumberChange.bind(th, 'mileageBoxes', 'mileageSlider', 0, history)}
                    onKeyDown={th.enterPressed.bind(th, 'mileageSlider', 0, history)} />
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
                    onChange={th.onNumberChange.bind(th, 'mileageBoxes', 'mileageSlider', 1, history)}
                    onKeyDown={th.enterPressed.bind(th, 'mileageSlider', 1, history)} />
                </span>
              </div>
              <div className='slider-container'>
                <Range
                  step={10}
                  min={0}
                  max={200000}
                  values={th.state.mileageSlider}
                  onChange={(values) => th.setState({mileageSlider: values, mileageBoxes: values},
                    th.updateUrlFromTimeout(history))}
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
                {th.featureCreator('Cooled Seats', 'cooledSeats', history)}
                {th.featureCreator('Heated Seats', 'heatedSeats', history)}
                {th.featureCreator('Heated Steering Wheel', 'heatedSteering', history)}
                {th.featureCreator('Leather Seats', 'leatherSeats', history)}
                {th.featureCreator('Multi-zone Climate Control', 'climateControl', history)}
                {th.featureCreator('Sun/Moon Roof', 'sunRoof', history)}
              </Accordion>
              <Accordion btnText='Entertainment'>
                {th.featureCreator('DVD Player', 'dvdPlayer', history)}
                {th.featureCreator('Premium Sound', 'premSound', history)}
                {th.featureCreator('Rear Entertainment System', 'rearSystem', history)}
                {th.featureCreator('Satillite Radio', 'satilliteRadio', history)}
              </Accordion>
              <Accordion btnText='Safety'>
                {th.featureCreator('Automatic Braking', 'autoBrake', history)}
                {th.featureCreator('Backup Camera', 'backCam', history)}
                {th.featureCreator('Blind Spot Sensors', 'blindSensor', history)}
                {th.featureCreator('Lane Departure Warning', 'laneDepart', history)}
                {th.featureCreator('Parking Sensors', 'parkSense', history)}
                {th.featureCreator('Security Alarm', 'secureAlarm', history)}
              </Accordion>
            </div>
            <div>
              <Accordion btnText='Tech'>
                {th.featureCreator('Adaptive Cruise Control', 'adaptCruise', history)}
                {th.featureCreator('Android Auto', 'androidAuto', history)}
                {th.featureCreator('Apple CarPlay', 'appleCarplay', history)}
                {th.featureCreator('AUX Audio Port', 'auxPort', history)}
                {th.featureCreator('Bluetooth', 'bluetooth', history)}
                {th.featureCreator('GPS Navigation', 'gpsNav', history)}
                {th.featureCreator('Heads Up Display', 'hud', history)}
                {th.featureCreator('Keyless Ignition/Remote Start', 'keylessStart', history)}
                {th.featureCreator('Mobile Internet', 'mobileNet', history)}
                {th.featureCreator('Power Seat(s)', 'powerSeats', history)}
                {th.featureCreator('Trip Computer', 'tripPc', history)}
                {th.featureCreator('Turn Signal Mirrors', 'turnMirrors', history)}
              </Accordion>
              <Accordion btnText='Utility'>
                {th.featureCreator('Adjustable Steering Wheel', 'adjustSteering', history)}
                {th.featureCreator('Automatic Parking', 'autoPark', history)}
                {th.featureCreator('Disability Equipped', 'disability', history)}
                {th.featureCreator('Heated Mirrors', 'heatMirror', history)}
                {th.featureCreator('Power Sliding Doors', 'powerDoors', history)}
                {th.featureCreator('Power Trunk/Liftgate', 'powerTrunk', history)}
                {th.featureCreator('Rain Sensing Wipers', 'rainSense', history)}
                {th.featureCreator('Roof Rack', 'roofRack', history)}
                {th.featureCreator('Stability Control', 'stability', history)}
                {th.featureCreator('Third Row Seats', 'thirdRow', history)}
                {th.featureCreator('Tire Pressure Sensors', 'tireSense', history)}
                {th.featureCreator('Tow Hitch', 'towHitch', history)}
              </Accordion>
            </div>
          </div>
        </DropDown>
        <DropDown btnText='More Filters' className='more-features' extraModalBtns={1}>
          <div className='container'>
            <div className='block1'>
              <div className='slider-content'>
                <div className='inputs'>
                  <label htmlFor='mpgBoxes'>MPG</label>
                  <span className='input-number'>$
                    <input
                      name='mpgBoxes'
                      type='number'
                      id='mpg'
                      min='0'
                      max='100'
                      value={th.state.mpgBoxes}
                      onChange={th.onNumberChange.bind(th, 'mpgBoxes', 'mpgSlider', 0, history)}
                      onKeyDown={th.enterPressed.bind(th, 'mpgSlider', 0, history)} />
                  </span>
                </div>
                <div className='slider-container'>
                  <Range
                    step={10}
                    min={0}
                    max={100}
                    values={th.state.mpgSlider}
                    onChange={(values) => th.setState({mpgSlider: values, mpgBoxes: values},
                      th.updateUrlFromTimeout(history))}
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
                  {th.featureCreator('Automatic', 'autoTrans', history)}
                  {th.featureCreator('Manual', 'manualTrans', history)}
                </div>
              </div>
              <div>
                <p>Cylinders</p>
                <div>
                  {th.featureCreator('4', 'fourCylinder', history)}
                  {th.featureCreator('6', 'sixCylinder', history)}
                  {th.featureCreator('8', 'eightCylinder', history)}
                  {th.featureCreator('Other', 'otherCylinder', history)}
                </div>
              </div>
            </div>
            <div className='color-block'>
              <p>Exterior Color</p>
              <div className='colors'>
                {th.colorCreator('Black', '#000', 'exteriorBlack', history, 'black')}
                {th.colorCreator('Silver', '#e0e0e0', 'exteriorSilver', history)}
                {th.colorCreator('White', '#fff', 'exteriorWhite', history)}
                {th.colorCreator('Gray', '#989898', 'exteriorGray', history)}
                {th.colorCreator('Red', '#dc4444', 'exteriorRed', history)}
                {th.colorCreator('Blue', '#3f72b0', 'exteriorBlue', history)}
                {th.colorCreator('Gold', '#c29050', 'exteriorGold', history)}
                {th.colorCreator('Orange', '#da7938', 'exteriorOrange', history)}
                {th.colorCreator('Green', '#748959', 'exteriorGreen', history)}
                {th.colorCreator('Tan', '#f5deb3', 'exteriorTan', history)}
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
                    rgba(255, 0, 0, 1) 100%`, 'exteriorOther', history)}
              </div>
            </div>
            <div className='color-block'>
              <p>Interior Color</p>
              <div className='colors'>
                {th.colorCreator('Black', '#000', 'interiorBlack', history, 'black')}
                {th.colorCreator('Silver', '#e0e0e0', 'interiorSilver', history)}
                {th.colorCreator('White', '#fff', 'interiorWhite', history)}
                {th.colorCreator('Gray', '#989898', 'interiorGray', history)}
                {th.colorCreator('Red', '#dc4444', 'interiorRed', history)}
                {th.colorCreator('Blue', '#3f72b0', 'interiorBlue', history)}
                {th.colorCreator('Gold', '#c29050', 'interiorGold', history)}
                {th.colorCreator('Orange', '#da7938', 'interiorOrange', history)}
                {th.colorCreator('Green', '#748959', 'interiorGreen', history)}
                {th.colorCreator('Tan', '#f5deb3', 'interiorTan', history)}
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
                    rgba(255, 0, 0, 1) 100%`, 'interiorOther', history)}
              </div>
            </div>
          </div>
        </DropDown>
      </div>
    </div>
  );
};

export default Filters;
