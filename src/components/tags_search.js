import React from 'react';
import PropTypes from 'prop-types';

import { makesList, modelsList } from './makes_models';
import DropDown from './drop_down';
import 'simplebar/dist/simplebar.min.css';

function getIndex(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    if (value.toLowerCase().includes(arr[i][prop].toLowerCase())) {
      return i;
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

function getModelsIndex(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i][prop].length; j++) {
      if (arr[i].name + ' ' + arr[i][prop][j] === value) {
        return j;
      }
    }
  }
  return -1; //to handle the case where the value doesn't exist
}

class AddTags extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      thst: props.th,
      modelsSearch: [],
      tagsSearch: [],
      tagsList: [
        ['SUVs', 'check_suv'], ['Trucks', 'checkTruck'], ['Sedans', 'checkSedan'], ['Crossovers', 'checkCrossover'],
        ['Coupes', 'checkCoupe'], ['Convertibles', 'checkConvertible'], ['Vans', 'checkVan'],
        ['Wagons', 'checkWagon'],
      ],
      searchText: '',
      displayResults: true,
      renderNumOptns: false,
      renderYearOptns: false,
      inputNum: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.filterData = this.filterData.bind(this);
    this.changeNumbers = this.changeNumbers.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);

    this.wrapperRef = React.createRef();
    this.textBoxRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  // handle change event of search text input
  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
    this.filterData(event.target.value);
  };

  // filter records by search text
  filterData(value) {
    const lowercasedValue = value.toLowerCase().trim().replace('chevy', 'chevrolet').replace('vw', 'volkswagen')
      .replace('caddy', 'cadillac').replace('cadd', 'cadillac').replace('lr', 'land rover')
      .replace('mbz', 'mercedes-benz');

    const filteredModels = modelsList.filter(item =>
      item.toString().toLowerCase().includes(lowercasedValue)
    );
    const filteredTags = this.state.tagsList.filter(item =>
      item[0].toString().toLowerCase().includes(lowercasedValue)
    );

    if (!isNaN(lowercasedValue)) {
      this.setState({
        renderNumOptns: true,
        inputNum: lowercasedValue
      });
      if (lowercasedValue.length === 4) {
        this.setState({
          renderYearOptns: true
        });
      } else {
        this.setState({
          renderYearOptns: false
        });
      }
    } else {
      this.setState({
        renderNumOptns: false,
        renderYearOptns: false,
        inputNum: 0
      });
    }

    this.setState({
      modelsSearch: filteredModels,
      tagsSearch: filteredTags
    });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        displayResults: false
      });
    }
    if (this.textBoxRef && this.textBoxRef.current.contains(event.target)) {
      this.setState({
        displayResults: true
      });
    }
  }

  changeNumbers(isYear = false, down = false, monthly = false, miles = false) {
    if (isYear) {
      if (this.state.thst.state.yearSlider.every(e => e === this.state.thst.state.yearSlider[0])) {
        this.state.thst.setState({
          yearSlider: [1800, 2090],
          yearBoxes: [1800, 2090]
        }, () => (
          this.state.thst.updateURL(this.props.history)
        ));
      } else if (this.state.inputNum >= 1800 && this.state.inputNum <= 2090) {
        this.state.thst.setState({
          yearSlider: [this.state.inputNum, this.state.inputNum],
          yearBoxes: [this.state.inputNum, this.state.inputNum]
        }, () => (
          this.state.thst.updateURL(this.props.history)
        ));
      }
    } else if (down && this.state.inputNum >= 100 && this.state.inputNum <= 99990) {
      this.state.thst.setState({
        downFinanceSlider: [this.state.inputNum],
        downFinanceBoxes: [this.state.inputNum]
      }, () => (
        this.state.thst.updateURL(this.props.history)
      ));
    } else if (monthly && this.state.inputNum >= 100 && this.state.inputNum <= 99990) {
      this.state.thst.setState({
        monthlyFinanceSlider: [this.state.inputNum],
        monthlyFinanceBoxes: [this.state.inputNum]
      }, () => (
        this.state.thst.updateURL(this.props.history)
      ));
    } else if (miles && this.state.inputNum <= 200000) {
      this.state.thst.setState({
        mileageSlider: [0, this.state.inputNum],
        mileageBoxes: [0, this.state.inputNum]
      }, () => (
        this.state.thst.updateURL(this.props.history)
      ));
    } else {
      if (this.state.inputNum <= 999990) {
        this.state.thst.setState({
          values: [100, this.state.inputNum],
          priceBoxes: [100, this.state.inputNum]
        }, () => (
          this.state.thst.updateURL(this.props.history)
        ));
      }
    }
  }

  onKeyDownHandler = e => {
    if (e.keyCode === 13 && this.state.renderNumOptns) {
      if (this.state.inputNum.length === 4) {
        this.changeNumbers(true);
      } else {
        this.changeNumbers();
      }
    }
  };

  render() {
    const modelsToRender = modelsList.map((model, i) => {
      if (this.props.modlBoxes[
        makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
      ][getModelsIndex(model, makesList, 'models')]) {
        return <li key={i}>
          <label htmlFor={'modelBox2' + i}>
            <p>{model}</p>
            <i className='fas fa-times'></i>
          </label>
          <input
            type='checkbox'
            name={model}
            id={'modelBox2' + i}
            checked={this.props.modlBoxes[
              makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
            ][getModelsIndex(model, makesList, 'models')] || ''}
            onChange={() => this.props.handleBoxChange(
              makesList[getIndex(model, makesList, 'name')].id, getModelsIndex(model, makesList, 'models')
              , this.props.history, makesList[getIndex(model, makesList, 'name')].name, model)} />
        </li>;
      }
    });

    const tagsToRender = this.state.tagsList.map((tag, i) => {
      if (this.state.thst.state[tag[1]]) {
        return <li key={i}>
          <label htmlFor={'tag' + i}>
            <p>{tag[0]}</p>
            <i className='fas fa-times'></i>
          </label>
          <input
            type='checkbox'
            name={tag[1]}
            id={'tag' + i}
            checked={this.state.thst.state[tag[1]] || ''}
            onChange={(e) => this.props.handleInputChange(e, this.props.history)} />
        </li>;
      }
    });

    return (
      <div className='search-container' ref={this.wrapperRef}>
        <div className='searchbox'>
          <input
            type='text'
            placeholder='Type to search...'
            value={this.state.searchText}
            onKeyDown={this.onKeyDownHandler}
            onChange={this.handleChange}
            ref={this.textBoxRef}
          />
          {
            (!modelsToRender.every((item) => {return item === undefined;}) ||
          !tagsToRender.every((item) => {return item === undefined;}) ||
          this.state.thst.state.yearSlider.every(e => e === this.state.thst.state.yearSlider[0])) &&
          <DropDown btnText='Change Tags' isChanging={false} className='tags-dd'>
            <ul>
              {this.state.thst.state.yearSlider.every(e => e === this.state.thst.state.yearSlider[0]) && <li>
                <label htmlFor='year'>
                  <p>{this.state.thst.state.yearSlider[0]}</p>
                  <i className='fas fa-times'></i>
                </label>
                <input
                  type='checkbox'
                  name={this.state.thst.state.yearSlider[0]}
                  id='year'
                  checked={this.state.thst.state.yearSlider.every(e => e === this.state.thst.state.yearSlider[0]) || ''}
                  onChange={this.changeNumbers} />
              </li>}
              {modelsToRender}
              {tagsToRender}
            </ul>
          </DropDown>
          }
        </div>

        {(this.state.modelsSearch.length > 0 || this.state.tagsSearch.length > 0 || this.state.renderNumOptns) &&
          this.state.searchText != '' && this.state.displayResults && <div className='box-container'>
          <ul>
            {this.state.renderNumOptns && <li>
              <button onClick={() => this.changeNumbers()}>
                <p>Vehicles less than ${this.state.inputNum}</p>
              </button>
            </li>}
            {this.state.renderNumOptns && <li>
              <button onClick={() => this.changeNumbers(false, true)}>
                <p>Cash down at ${this.state.inputNum}</p>
              </button>
            </li>}
            {this.state.renderNumOptns && <li>
              <button onClick={() => this.changeNumbers(false, false, true)}>
                <p>Monthly payment at ${this.state.inputNum}</p>
              </button>
            </li>}
            {this.state.renderNumOptns && <li>
              <button onClick={() => this.changeNumbers(false, false, false, true)}>
                <p>Vehicles with less than {this.state.inputNum} miles</p>
              </button>
            </li>}
            {this.state.renderYearOptns && <li>
              <label htmlFor='setYear'>
                {this.state.thst.state.yearSlider.every(e => e === this.state.inputNum) ?
                  <i className='checkmark fas fa-check'></i> : ''}
                <p>Vehicles with year {this.state.inputNum}</p>
              </label>
              <input
                type='checkbox'
                name={this.state.inputNum}
                id='setYear'
                checked={this.state.thst.state.yearSlider.every(e => e === this.state.inputNum) || ''}
                onChange={() => this.changeNumbers(true)} />
            </li>}
            {this.state.modelsSearch.map((model, i) => {
              return <li key={i}>
                <label htmlFor={'modelBox2' + i}>
                  {this.props.modlBoxes[
                    makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
                  ][getModelsIndex(model, makesList, 'models')] ? <i className='checkmark fas fa-check'></i> : ''}
                  <p>{model}</p>
                </label>
                <input
                  type='checkbox'
                  name={model}
                  id={'modelBox2' + i}
                  checked={this.props.modlBoxes[
                    makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
                  ][getModelsIndex(model, makesList, 'models')] || ''}
                  onChange={() => this.props.handleBoxChange(
                    makesList[getIndex(model, makesList, 'name')].id, getModelsIndex(model, makesList, 'models')
                    , this.props.history, makesList[getIndex(model, makesList, 'name')].name, model)} />
              </li>;
            })}
            {this.state.tagsSearch.map((tag, i) => {
              return <li key={i}>
                <label htmlFor={'tag' + i}>
                  {this.state.thst.state[tag[1]] ? <i className='checkmark fas fa-check'></i> : ''}
                  <p>{tag[0]}</p>
                </label>
                <input
                  type='checkbox'
                  name={tag[1]}
                  id={'tag' + i}
                  checked={this.state.thst.state[tag[1]] || ''}
                  onChange={(e) => this.props.handleInputChange(e, this.props.history)} />
              </li>;
            })}
          </ul>
        </div>}
      </div>
    );
  }
}

AddTags.propTypes = {
  th: PropTypes.any,
  history: PropTypes.any,
  modlBoxes: PropTypes.any,
  handleBoxChange: PropTypes.func,
  handleInputChange: PropTypes.func
};

export default AddTags;
