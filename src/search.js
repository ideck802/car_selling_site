import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, useHistory, useLocation } from 'react-router-dom';
import './css/search.css';
import images from './images';
import DropDown from './components/drop_down';
import Tabs from './components/tabs';
import Accordion from './components/accordion';
import Search from './components/search';
import { makesList } from './components/makes_models';
import vehicles from './vehicleCardList';
import Filters from './filters';
import { Range, getTrackBackground } from 'react-range';
import reportWebVitals from './reportWebVitals';

class SearchForm extends React.Component {

  constructor(props) {
    var bt = new URLSearchParams(window.location.search).get('btype').toLowerCase();
    var ftr = new URLSearchParams(window.location.search).get('ftr').toLowerCase();
    var fuel = new URLSearchParams(window.location.search).get('fuel').toLowerCase();
    var drive = new URLSearchParams(window.location.search).get('drive').toLowerCase();

    super(props);
    this.state = {
      search_tag: '',
      zipCode: '',
      distance: 0,
      financeOrPrice: new URLSearchParams(window.location.search).getAll('price'),
      priceBoxes: new URLSearchParams(window.location.search).getAll('pr'),
      values: new URLSearchParams(window.location.search).getAll('pr'),
      yearBoxes: new URLSearchParams(window.location.search).getAll('year'),
      yearSlider: new URLSearchParams(window.location.search).getAll('year'),
      mileageBoxes: new URLSearchParams(window.location.search).getAll('miles'),
      mileageSlider: new URLSearchParams(window.location.search).getAll('miles'),
      downFinanceSlider: new URLSearchParams(window.location.search).getAll('down'),
      downFinanceBox: new URLSearchParams(window.location.search).getAll('down'),
      monthlyFinanceSlider: new URLSearchParams(window.location.search).getAll('pay'),
      monthlyFinanceBox: new URLSearchParams(window.location.search).getAll('pay'),
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
      bodyType: bt,
      check_suv: bt.includes('suv'), check_truck: bt.includes('truck'), check_sedan: bt.includes('sedan'),
      check_crossover: bt.includes('crossover'), check_coupe: bt.includes('coupe'),
      check_convertible: bt.includes('convertible'), check_sport: bt.includes('sport'), check_van: bt.includes('van'),
      check_wagon: bt.includes('wagon'),

      features: ftr,
      cooled_seats: ftr.includes('cooled_seats'),heated_seats: ftr.includes('heated_seats'),
      heated_steering: ftr.includes('heated_steering'),leather_seats: ftr.includes('leather_seats'),
      climate_control: ftr.includes('climate_control'),sun_roof: ftr.includes('sun_roof'),
      dvd_player: ftr.includes('dvd_player'),prem_sound: ftr.includes('prem_sound'),
      rear_system: ftr.includes('rear_system'),satillite_radio: ftr.includes('satillite_radio'),
      auto_brake: ftr.includes('auto_brake'),back_cam: ftr.includes('back_cam'),
      blind_sensor: ftr.includes('blind_sensor'),lane_depart: ftr.includes('lane_depart'),
      park_sense: ftr.includes('park_sense'),secure_alarm: ftr.includes('secure_alarm'),
      adapt_cruise: ftr.includes('adapt_cruise'),android_auto: ftr.includes('android_auto'),
      apple_carplay: ftr.includes('apple_carplay'),aux_port: ftr.includes('aux_port'),
      bluetooth: ftr.includes('bluetooth'),gps_nav: ftr.includes('gps_nav'),hud: ftr.includes('hud'),
      keyless_start: ftr.includes('keyless_start'),mobile_net: ftr.includes('mobile_net'),
      power_seats: ftr.includes('power_seats'),trip_pc: ftr.includes('trip_pc'),
      turn_mirrors: ftr.includes('turn_mirrors'),adjust_steering: ftr.includes('adjust_steering'),
      auto_park: ftr.includes('auto_park'),disability: ftr.includes('disability'),
      heat_mirror: ftr.includes('heat_mirror'),power_doors: ftr.includes('power_doors'),
      power_trunk: ftr.includes('power_trunk'),rain_sense: ftr.includes('rain_sense'),
      roof_rack: ftr.includes('roof_rack'),stability: ftr.includes('stability'),
      third_row: ftr.includes('third_row'),tire_sense: ftr.includes('tire_sense'),tow_hitch: ftr.includes('tow_hitch'),

      exterior_black: false, exterior_silver: false, exterior_white: false, exterior_gray: false, exterior_red: false,
      exterior_blue: false, exterior_gold: false, exterior_orange: false, exterior_green: false, exterior_brown: false,
      exterior_other: false,

      interior_black: false, interior_silver: false, interior_white: false, interior_gray: false, interior_red: false,
      interior_blue: false, interior_gold: false, interior_orange: false, interior_green: false, interior_brown: false,
      interior_other: false,

      mpgSlider: new URLSearchParams(window.location.search).getAll('mpg'),
      mpgBox: new URLSearchParams(window.location.search).getAll('mpg'),

      fuelType: fuel,
      fuelGas: fuel.includes('fuelgas'), fuelHybrid: fuel.includes('fuelhybrid'),
      fuelElectric: fuel.includes('fuelelectric'), fuelOther: fuel.includes('fuelother'),

      driveType: drive,
      frontWheel: drive.includes('frontwheel'), allWheel: drive.includes('allwheel'),
      rearWheel: drive.includes('rearwheel'),

      autoTrans: false, manualTrans: false,
      fourCylinder: false, sixCylinder: false, eightCylinder: false, otherCylinder: false,

      makeParam: new URLSearchParams(window.location.search).get('make'),
      modelParam: new URLSearchParams(window.location.search).get('model'),
    };

    this.init = this.init.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModelBoxChange = this.handleModelBoxChange.bind(this);
    this.labelCreator = this.labelCreator.bind(this);
    this.featureCreator = this.featureCreator.bind(this);
    this.colorCreator = this.colorCreator.bind(this);
    this.changeTabValue = this.changeTabValue.bind(this);
    this.changeDistance = this.changeDistance.bind(this);
    this.vehicleCardCreator = this.vehicleCardCreator.bind(this);
    this.getParams = this.getParams.bind(this);

    this.init();
  }

  init() {
    console.log(this.state.modelParam);
    makesList.map((make, i) => {
      make.models.map((model, j) =>
        this.state.modelParam.toLowerCase().includes(model.toLowerCase()) ?
          this.handleModelBoxChange(make.id, j, this.props.history, make, model, true) : ''
      );
    });
  };

  btypeGlobal = new URLSearchParams(window.location.search).get('btype');
  ftrGlobal = new URLSearchParams(window.location.search).get('ftr');
  fuelGlobal = new URLSearchParams(window.location.search).get('fuel');
  driveGlobal = new URLSearchParams(window.location.search).get('drive');

  handleInputChange(event, history) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name.includes('check_')) {
      var tempBtypeParam = this.btypeGlobal;
      var varName = name.replace('check_', '');

      if (value === true) {
        tempBtypeParam = tempBtypeParam + (varName + '|');
      } else {
        tempBtypeParam = tempBtypeParam.replace(varName + '|', '');
      }

      this.btypeGlobal = tempBtypeParam;
      this.setState({
        [name]: value,
        bodyType: tempBtypeParam
      }, () => {
        this.updateURL(history);
      });
    } else if (name.includes('feature_') && !name.includes('fuel') && !name.includes('Wheel')) {
      var tempFtrParam = this.ftrGlobal;
      var varName = name.replace('feature_', '');

      if (value === true) {
        tempFtrParam = tempFtrParam + (varName + '|');
      } else {
        tempFtrParam = tempFtrParam.replace(varName + '|', '');
      }

      this.ftrGlobal = tempFtrParam;
      this.setState({
        [varName]: value,
        features: tempFtrParam
      }, () => {
        this.updateURL(history);
      });
    } else if (name.includes('feature_fuel')) {
      var tempfuelParam = this.fuelGlobal;
      var varName = name.replace('feature_', '');

      if (value === true) {
        tempfuelParam = tempfuelParam + (varName + '|');
      } else {
        tempfuelParam = tempfuelParam.replace(varName + '|', '');
      }

      this.fuelGlobal = tempfuelParam;
      this.setState({
        [varName]: value,
        fuelType: tempfuelParam
      }, () => {
        this.updateURL(history);
      });
    } else if (name.includes('feature_') && name.includes('Wheel')) {
      var tempDriveParam = this.driveGlobal;
      var varName = name.replace('feature_', '');

      if (value === true) {
        tempDriveParam = tempDriveParam + (varName + '|');
      } else {
        tempDriveParam = tempDriveParam.replace(varName + '|', '');
      }

      this.driveGlobal = tempDriveParam;
      this.setState({
        [varName]: value,
        driveType: tempDriveParam
      }, () => {
        this.updateURL(history);
      });
    } else {
      this.setState({
        [name]: value
      });
    }
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

  modelParamGlobal = new URLSearchParams(window.location.search).get('model');

  handleModelBoxChange(varName, pos, history, makeName, modelName, startSync) {
    if (startSync === true) {
      var tempVar = this.state.modelBoxes[varName + 'ModelBoxes'].slice();

      tempVar[pos] = true;

      var tempModelBoxes = this.state.modelBoxes;
      tempModelBoxes[varName + 'ModelBoxes'] = tempVar;

      this.setState({
        modelBoxes: tempModelBoxes
      });
    } else {
      const value = !this.state.modelBoxes[varName + 'ModelBoxes'][pos];

      var tempVar = this.state.modelBoxes[varName + 'ModelBoxes'].slice();

      tempVar[pos] = value;

      var tempModelBoxes = this.state.modelBoxes;
      tempModelBoxes[varName + 'ModelBoxes'] = tempVar;

      var tempModelParam = this.modelParamGlobal;
      if (value === true) {
        tempModelParam = tempModelParam + (modelName.replace(makeName + ' ', '') + '|');
      } else {
        tempModelParam = tempModelParam.replace((modelName.replace(makeName + ' ', '') + '|'), '');
      }

      this.modelParamGlobal = tempModelParam;
      this.setState({
        modelBoxes: tempModelBoxes,
        modelParam: tempModelParam
      }, () => {
        this.updateURL(history);
      });
    }
  }
  //<i className='checkmark fas fa-check'></i>
  featureCreator(displayText, value, history) {
    return <label htmlFor={value} className={(this.state[value] === true ? ('checked') : (''))}>

      {displayText}
      <input
        name={'feature_' + value}
        type='checkbox'
        id={value}
        checked={this.state[value]}
        onChange={(e) => this.handleInputChange(e, history)}
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
        financeOrPrice: true
      });
    } else {
      this.setState({
        financeOrPrice: false
      });
    }
  }

  changeDistance(value) {
    this.setState({
      distance: value
    });
  }

  vehicleCardCreator() {
    return vehicles.map((vehicle) => {
      if (
        vehicle.make.toLowerCase().includes(this.state.makeParam.toLowerCase()) &&
        new RegExp(this.state.modelParam.toLowerCase().slice(0, -1)).test(vehicle.model.toLowerCase()) &&
        new RegExp(this.state.bodyType.toLowerCase().slice(0, -1)).test(vehicle.bodyType.toLowerCase()) &&
        vehicle.year >= this.state.yearSlider[0] && vehicle.year <= this.state.yearSlider[1] &&
        vehicle.miles >= this.state.mileageSlider[0] && vehicle.miles <= this.state.mileageSlider[1] &&
        this.state.features.slice(0, -1).split('|').every(
          item => vehicle.features.includes(item) || this.state.features === ''
        ) &&
        vehicle.mpg <= this.state.mpgSlider &&
        (this.state.fuelType.toLowerCase().includes(vehicle.fuel.toLowerCase()) || this.state.fuelType === '') &&
        (this.state.driveType.toLowerCase().includes(vehicle.driveType.toLowerCase()) || this.state.driveType === '')
      ) {
        if (
          this.state.financeOrPrice &&
          (vehicle.price >= this.state.values[0]) && (vehicle.price <= this.state.values[1])
        ) {
          return <div className='card'>
            <i className='checkmark fas fa-check'></i>
            <p>{vehicle.make}</p>
            <p>{vehicle.model}</p>
            <img src='alt' draggable='false' alt='akt'/>
          </div>;
        } else if (
          !this.state.financeOrPrice &&
          vehicle.cashDown <= this.state.downFinanceSlider &&
          vehicle.monthPay <= this.state.monthlyFinanceSlider
        ) {
          return <div className='card'>
            <i className='checkmark fas fa-check'></i>
            <p>{vehicle.make}</p>
            <p>{vehicle.model}</p>
            <img src='alt' draggable='false' alt='akt'/>
          </div>;
        }
      }
    });
  }

  getParams(location) {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      make: searchParams.get('make') || '',
      model: searchParams.get('model') || '',
    };
  }

  setParams({
    price='', pr=['', ''], down='', pay='', make='', model='', btype='', year=['', ''], miles=['', ''], ftr='', mpg='',
    fuel='', drive=''
  }) {
    const searchParams = new URLSearchParams();
    searchParams.set('price', price);
    searchParams.set('pr', pr[0]);
    searchParams.append('pr', pr[1]);
    searchParams.set('down', down);
    searchParams.set('pay', pay);
    searchParams.set('make', make);
    searchParams.set('model', model);
    searchParams.set('btype', btype);
    searchParams.set('year', year[0]);
    searchParams.append('year', year[1]);
    searchParams.set('miles', miles[0]);
    searchParams.append('miles', miles[1]);
    searchParams.set('ftr', ftr);
    searchParams.set('mpg', mpg);
    searchParams.set('fuel', fuel);
    searchParams.set('drive', drive);
    return searchParams.toString();
  }

  updateInputValue = e => this.setState({modelParam: e.target.value});

  updateURL = (history, isTextbox, event) => {
    //if (isTextbox === true) {
    //  if (event.keyCode === 13) {
    //    const url = this.setParams({make: this.state.makeParam, model: this.state.modelParam});
    //    history.push(`?${url}`);
    //  } else {
    //    return;
    //  }
    //}

    const url = this.setParams({
      price: this.state.financeOrPrice,
      pr: this.state.values,
      down: this.state.downFinanceSlider,
      pay: this.state.monthlyFinanceSlider,
      make: this.state.makeParam,
      model: this.state.modelParam,
      btype: this.state.bodyType,
      year: this.state.yearSlider,
      miles: this.state.mileageSlider,
      ftr: this.state.features,
      mpg: this.state.mpgSlider,
      fuel: this.state.fuelType,
      drive: this.state.driveType
    });
    //do not forget the "?" !
    history.push(`?${url}`);
  };

  render() {

    return (
      <div>
        <Router>
          <Route path='/'
          render={(props) => (
            <Filters {...props} th={this} />
          )}/>
        </Router>
        <div className='vehicle-cards'>
          {this.vehicleCardCreator()}
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
