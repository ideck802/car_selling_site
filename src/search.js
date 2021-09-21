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
    const searchParam = new URLSearchParams(window.location.search);
    const distancesArray = ['0', '25', '50', '75', '100', '250', '500', 'unlimited'];
    var bt = searchParam.get('btype').toLowerCase();
    var ftr = searchParam.get('ftr').toLowerCase();
    var fuel = searchParam.get('fuel').toLowerCase();
    var drive = searchParam.get('drive').toLowerCase();
    var trans = searchParam.get('trans').toLowerCase();
    var cyl = searchParam.get('cyl').toLowerCase();
    var extor = searchParam.get('extor').toLowerCase();
    var intor = searchParam.get('intor').toLowerCase();

    super(props);
    this.state = {
      search_tag: '',
      zipCode: searchParam.getAll('zip')[0],
      distance: distancesArray.indexOf(searchParam.getAll('distance').toString() || '0'),
      distances: distancesArray,
      financeOrPrice: searchParam.getAll('price'),
      priceBoxes: searchParam.getAll('pr'),
      priceSlider: searchParam.getAll('pr'),
      yearBoxes: searchParam.getAll('year'),
      yearSlider: searchParam.getAll('year'),
      mileageBoxes: searchParam.getAll('miles'),
      mileageSlider: searchParam.getAll('miles'),
      downFinanceSlider: searchParam.getAll('down'),
      downFinanceBoxes: searchParam.getAll('down'),
      monthlyFinanceSlider: searchParam.getAll('pay'),
      monthlyFinanceBoxes: searchParam.getAll('pay'),
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

      exterior: extor,
      exterior_black: extor.includes('black'), exterior_silver: extor.includes('silver'),
      exterior_white: extor.includes('white'), exterior_gray: extor.includes('gray'),
      exterior_red: extor.includes('red'), exterior_blue: extor.includes('blue'), exterior_gold: extor.includes('gold'),
      exterior_orange: extor.includes('orange'), exterior_green: extor.includes('green'),
      exterior_tan: extor.includes('tan'), exterior_other: extor.includes('other'),

      interior: intor,
      interior_black: intor.includes('black'), interior_silver: intor.includes('silver'),
      interior_white: intor.includes('white'), interior_gray: intor.includes('gray'),
      interior_red: intor.includes('red'), interior_blue: intor.includes('blue'), interior_gold: intor.includes('gold'),
      interior_orange: intor.includes('orange'), interior_green: intor.includes('green'),
      interior_tan: intor.includes('tan'), interior_other: intor.includes('other'),

      mpgSlider: searchParam.getAll('mpg'),
      mpgBoxes: searchParam.getAll('mpg'),

      fuelType: fuel,
      fuelGas: fuel.includes('fuelgas'), fuelHybrid: fuel.includes('fuelhybrid'),
      fuelElectric: fuel.includes('fuelelectric'), fuelOther: fuel.includes('fuelother'),

      driveType: drive,
      frontWheel: drive.includes('frontwheel'), allWheel: drive.includes('allwheel'),
      rearWheel: drive.includes('rearwheel'),

      tranny: trans,
      autoTrans: trans.includes('autotrans'), manualTrans: trans.includes('manualtrans'),

      cylCount: cyl,
      fourCylinder: cyl.includes('fourcylinder'), sixCylinder: cyl.includes('sixcylinder'),
      eightCylinder: cyl.includes('eightcylinder'), otherCylinder: cyl.includes('othercylinder'),

      makeParam: searchParam.get('make'),
      modelParam: searchParam.get('model'),

      isFetching: false,
      zips: 'all',

      updateUrlTimeout: 0
    };

    this.init = this.init.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleModelBoxChange = this.handleModelBoxChange.bind(this);
    this.labelCreator = this.labelCreator.bind(this);
    this.featureCreator = this.featureCreator.bind(this);
    this.colorCreator = this.colorCreator.bind(this);
    this.changeTabValue = this.changeTabValue.bind(this);
    this.changeDistance = this.changeDistance.bind(this);
    this.vehicleCardCreator = this.vehicleCardCreator.bind(this);
    this.getParams = this.getParams.bind(this);
    this.updateDistance = this.updateDistance.bind(this);

    this.init();
  }

  init() {
    makesList.map((make, i) => {
      make.models.map((model, j) => (
        ('|' + this.state.modelParam.toLowerCase()).includes('|' + model.toLowerCase() + '|') ?
          this.handleModelBoxChange(make.id, j, this.props.history, make, model, true) : ''
      ));
    });
  };

  btypeGlobal = new URLSearchParams(window.location.search).get('btype');
  ftrGlobal = new URLSearchParams(window.location.search).get('ftr');
  fuelGlobal = new URLSearchParams(window.location.search).get('fuel');
  driveGlobal = new URLSearchParams(window.location.search).get('drive');
  transGlobal = new URLSearchParams(window.location.search).get('trans');
  cylGlobal = new URLSearchParams(window.location.search).get('cyl');
  extorGlobal = new URLSearchParams(window.location.search).get('extor');
  intorGlobal = new URLSearchParams(window.location.search).get('intor');

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
    } else if (name.includes('feature_') && !name.includes('fuel') && !name.includes('Wheel') &&
      !name.includes('Trans') && !name.includes('Cylinder') && !name.includes('exterior_') &&
      !name.includes('interior_')
    ) {
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
    } else if (name.includes('feature_') && name.includes('Trans')) {
      var tempTransParam = this.transGlobal;
      var varName = name.replace('feature_', '');

      if (value === true) {
        tempTransParam = tempTransParam + (varName + '|');
      } else {
        tempTransParam = tempTransParam.replace(varName + '|', '');
      }

      this.transGlobal = tempTransParam;
      this.setState({
        [varName]: value,
        tranny: tempTransParam
      }, () => {
        this.updateURL(history);
      });
    } else if (name.includes('feature_') && name.includes('Cylinder')) {
      var tempCylParam = this.cylGlobal;
      var varName = name.replace('feature_', '');

      if (value === true) {
        tempCylParam = tempCylParam + (varName + '|');
      } else {
        tempCylParam = tempCylParam.replace(varName + '|', '');
      }

      this.cylGlobal = tempCylParam;
      this.setState({
        [varName]: value,
        cylCount: tempCylParam
      }, () => {
        this.updateURL(history);
      });
    } else if (name.includes('exterior_')) {
      var tempExtorParam = this.extorGlobal;
      var varName = name.replace('exterior_', '');

      if (value === true) {
        tempExtorParam = tempExtorParam + (varName + '|');
      } else {
        tempExtorParam = tempExtorParam.replace(varName + '|', '');
      }

      this.extorGlobal = tempExtorParam;
      this.setState({
        ['exterior_' + varName]: value,
        exterior: tempExtorParam
      }, () => {
        this.updateURL(history);
      });
    } else if (name.includes('interior_')) {
      var tempIntorParam = this.intorGlobal;
      var varName = name.replace('interior_', '');

      if (value === true) {
        tempIntorParam = tempIntorParam + (varName + '|');
      } else {
        tempIntorParam = tempIntorParam.replace(varName + '|', '');
      }

      this.intorGlobal = tempIntorParam;
      this.setState({
        ['interior_' + varName]: value,
        interior: tempIntorParam
      }, () => {
        this.updateURL(history);
      });
    } else if (name === 'zipCode') {
      if (this.state.updateUrlTimeout !== 0) {
        clearTimeout(this.state.updateUrlTimeout);
      }
      this.setState({
        updateUrlTimeout: setTimeout(() => {
          this.updateDistance(history);
        }, 1000)
      });

      this.setState({
        [name]: value
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  onNumberChange(boxVarName, sliderVarName, index, history, e) {

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
          [sliderVarName]: finalTempVar,
          [sliderVarName.replace('Slider', 'Boxes')]: finalTempVar
        });

        self.updateURL(history);
      }, 1000)
    });
  }

  enterPressed(sliderVarName, index, history, e) {
    var code = e.key || e.which;
    if (code === 13 || code === 'Enter') { //13 is the enter keycode
      if (e.target.name === 'zipCode') {
        this.setState({
          [sliderVarName]: e.target.value
        }, () => (
          this.updateDistance(history)
        ));
        e.preventDefault();
      } else {
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
        }, () => (
          this.updateURL(history)
        ));
        e.preventDefault();
      }
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

  colorCreator(name, color, value, history, classname) {
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
        onChange={(e) => this.handleInputChange(e, history)}
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

  changeDistance(value, history) {
    if (this.state.zipCode.length === 5 && value !== 7) {
      //this.fetchZips(this.state.zipCode, this.state.distances[value], history);
    } else {
      this.setState({
        zips: 'all'
      }, () => (
        this.updateURL(history)
      ));
    }
    this.setState({
      distance: value
    });
  }

  updateDistance(history) {
    if (this.state.zipCode.length === 5 && this.state.distance !== 7) {
      //this.fetchZips(this.state.zipCode, this.state.distances[this.state.distance], history);
    } else {
      this.setState({
        zips: 'all'
      }, () => (
        this.updateURL(history)
      ));
    }
  }

  vehicleCardCreator() {
    return vehicles.map((vehicle) => {
      if (
        vehicle.make.toLowerCase().includes(this.state.makeParam.toLowerCase()) &&
        (('|' + this.state.modelParam.toLowerCase()).includes('|' + vehicle.model.toLowerCase() + '|') ||
        this.state.modelParam === '') &&
        new RegExp(this.state.bodyType.toLowerCase().slice(0, -1)).test(vehicle.bodyType.toLowerCase()) &&
        vehicle.year >= this.state.yearSlider[0] && vehicle.year <= this.state.yearSlider[1] &&
        vehicle.miles >= this.state.mileageSlider[0] && vehicle.miles <= this.state.mileageSlider[1] &&
        this.state.features.slice(0, -1).split('|').every(
          item => vehicle.features.includes(item) || this.state.features === ''
        ) &&
        vehicle.mpg <= this.state.mpgSlider &&
        (this.state.fuelType.toLowerCase().includes(vehicle.fuel.toLowerCase()) || this.state.fuelType === '') &&
        (this.state.driveType.toLowerCase().includes(vehicle.driveType.toLowerCase()) || this.state.driveType === '') &&
        (this.state.tranny.toLowerCase().includes(vehicle.tranny.toLowerCase()) || this.state.tranny === '') &&
        (this.state.cylCount.toLowerCase().includes(vehicle.cylinders.toLowerCase()) || this.state.cylCount === '') &&
        (this.state.exterior.toLowerCase().includes(vehicle.extColor.toLowerCase()) || this.state.exterior === '') &&
        (this.state.interior.toLowerCase().includes(vehicle.intColor.toLowerCase()) || this.state.interior === '') &&
        (this.state.zips.includes(vehicle.location) || this.state.zips === 'all')
      ) {
        if (
          (this.state.financeOrPrice &&
          (vehicle.price >= this.state.priceSlider[0]) && (vehicle.price <= this.state.priceSlider[1])) ||
          (!this.state.financeOrPrice &&
          vehicle.cashDown <= this.state.downFinanceSlider &&
          vehicle.monthPay <= this.state.monthlyFinanceSlider)
        ) {
          return <div className='card'>
            <div className='image'>
              <img src={'./images/vehicles/cards/' + vehicle.idNum + '/001.jpg'} draggable='false' alt='akt'/>
            </div>
            <div className='name-stuff'>
              <p>{vehicle.year} {vehicle.make} {vehicle.model}</p>
              <div className='prices'>
                ${vehicle.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                <span><hr/>or<hr/></span>
                ${vehicle.monthPay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/mo
              </div>
            </div>
            <div className='more-info'>
              <span>
                <p>{vehicle.miles.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} miles</p>
                <p>{vehicle.mpg} mpg combined</p>
              </span>
              <span>
                <p>{vehicle.intColor.charAt(0).toUpperCase() + vehicle.intColor.slice(1)} interior</p>
                <p>{vehicle.owners >= 2 ?
                    vehicle.owners + ' owners' : vehicle.owners === 1 ?
                    vehicle.owners + ' owner' : ' New'}</p>
              </span>
            </div>
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
    fuel='', drive='', trans='', cyl='', extor='', intor='', zip='', distance='',
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
    searchParams.set('trans', trans);
    searchParams.set('cyl', cyl);
    searchParams.set('extor', extor);
    searchParams.set('intor', intor);
    searchParams.set('zip', zip);
    searchParams.set('distance', distance);
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
      pr: this.state.priceSlider,
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
      drive: this.state.driveType,
      trans: this.state.tranny,
      cyl: this.state.cylCount,
      extor: this.state.exterior,
      intor: this.state.interior,
      zip: this.state.zipCode,
      distance: this.state.distances[this.state.distance]
    });
    //do not forget the "?" !
    history.push(`?${url}`);
  };

  // red api key is only for localhost. must change for builds
  // red Q6a4aY87oakQI2BA7YMUIwrqHux0j0BtEV6VAk2egIh5gbzooIdBEcLjoOBpLqsY
  fetchZips = (centerZip, distance, history) => {
      this.setState({isFetching: true});
      fetch('https://www.zipcodeapi.com/rest/' +
        'js-PM7I8cxEjfxbX05xYqOa46UXb93zWmxX4amPH8agb5IDqnv3LhwcijDk5Tag3nnc/radius.json/' +
        centerZip + '/' + distance + '/mile?minimal')
      .then(response => response.json())
      .then(result => {
        this.setState({
          zips: Object.values(result.zip_codes),
          isFetching: false
        }, () => (
          this.updateURL(history)
        ));
      })
      .catch(exception => {
        console.log(exception);
        this.setState({isFetching: false});
      });
    };

  updateUrlFromTimeout(history) {
    if (this.state.updateUrlTimeout !== 0) {
      clearTimeout(this.state.updateUrlTimeout);
    }
    this.setState({
      updateUrlTimeout: setTimeout(() => {
        this.updateURL(history);
      }, 1000)
    });
  }

  render() {

    return (
      <div>
        <Router>
          <Route path='/'
          render={(props) => (
            <Filters {...props} th={this} />
          )}/>
        </Router>
        {this.state.isFetching ? <div className='loading-ani'><i className='fas fa-car-side'></i></div> : ''}
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
