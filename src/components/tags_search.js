import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar';

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
        ['SUVs', 'check_suv'], ['Trucks', 'check_truck'], ['Sedans', 'check_sedan'], ['Crossovers', 'check_crossover'],
        ['Coupes', 'check_coupe'], ['Convertibles', 'check_convertible'], ['Vans', 'check_van'],
        ['Wagons', 'check_wagon'],
      ],
      searchText: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.filterData = this.filterData.bind(this);
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
    const lowercasedValue = value.toLowerCase().trim().replace('chevy', 'chevrolet').replace('vw', 'volkswagen');

    const filteredModels = modelsList.filter(item =>
      item.toString().toLowerCase().includes(lowercasedValue)
    );
    const filteredTags = this.state.tagsList.filter(item =>
      item[0].toString().toLowerCase().includes(lowercasedValue)
    );

    this.setState({
      modelsSearch: filteredModels,
      tagsSearch: filteredTags
    });
  }

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
            onChange={(e) => this.props.handleBoxChange(
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
      <div className='search-container'>
        <div className='searchbox'>
          <input
            type='text'
            placeholder='Type to search...'
            value={this.state.searchText}
            onChange={this.handleChange}
          />
        {
          (!modelsToRender.every((item) => {return item === undefined;}) ||
          !tagsToRender.every((item) => {return item === undefined;})) &&
          <DropDown btnText='Change Tags' isChanging={false} className='tags-dd'>
            <ul>
              {modelsToRender}
              {tagsToRender}
            </ul>
          </DropDown>
        }
        </div>

        {this.state.modelsSearch.length > 0 && this.state.searchText != '' && <div className='box-container'>
          <p>Models</p>
          <ul>
            {this.state.modelsSearch.map((model, i) => {
              return <li key={i}>
                <label htmlFor={'modelBox2' + i}>
                  <p>{model}</p>
                  {this.props.modlBoxes[
                    makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
                  ][getModelsIndex(model, makesList, 'models')] ? <i className='checkmark fas fa-check'></i> : ''}
                </label>
                <input
                  type='checkbox'
                  name={model}
                  id={'modelBox2' + i}
                  checked={this.props.modlBoxes[
                    makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
                  ][getModelsIndex(model, makesList, 'models')] || ''}
                  onChange={(e) => this.props.handleBoxChange(
                    makesList[getIndex(model, makesList, 'name')].id, getModelsIndex(model, makesList, 'models')
                    , this.props.history, makesList[getIndex(model, makesList, 'name')].name, model)} />
              </li>;
            })}
            {this.state.tagsSearch.map((tag, i) => {
              return <li key={i}>
                <label htmlFor={'tag' + i}>
                  <p>{tag[0]}</p>
                  {this.state.thst.state[tag[1]] ? <i className='checkmark fas fa-check'></i> : ''}
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

export default AddTags;
