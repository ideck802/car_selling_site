import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar';

import { makesList, modelsList } from './makes_models';
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

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // exclude column list from filter
      excludeColumns: ['id', 'models'],
      makesSearch: makesList,
      modelsSearch: [],
      searchText: '',
      isOpen: '',
      isClosing: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.filterData = this.filterData.bind(this);
  }

  // handle change event of search input
  handleChange(event) {
    this.setState({
      searchText: event.target.value
    });
    this.filterData(event.target.value);
  };

  // filter records by search text
  filterData(value) {
    const lowercasedValue = value.toLowerCase().trim().replace('chevy', 'chevrolet').replace('vw', 'volkswagen');
    if (lowercasedValue === '') {
      this.setState({
        makesSearch: makesList,
        modelsSearch: []
      });
    } else {
      const filteredMakes = makesList.filter(item => {
        return Object.keys(item).some(key =>
          this.state.excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });

      const filteredModels = modelsList.filter(item =>
        item.toString().toLowerCase().includes(lowercasedValue)
      );
      this.setState({
        makesSearch: filteredMakes,
        modelsSearch: filteredModels
      });
    }
  }

  componentWillUnmount() {
    if (this.slidingTimeout) {
      clearTimeout(this.slidingTimeout);
    }
  }

  openMake(make) {
    if (make === '') {
      this.setState({
        isClosing: true
      });
      this.slidingTimeout = setTimeout(() => {
        this.setState({
          isOpen: make,
          isClosing: false
        });
        this.slidingTimeout = null;
      }, 500);
    } else {
      this.setState({
        isOpen: make,
        isClosing: false
      });
    }
  }

  setModelsTrue(event, make) {
    make.models.map((model, j) =>
      this.props.handleBoxChange(make.id, j, this.props.history, make.name, model)
    );
  }

  render() {
    return (
      <div className='search-container'>
        <div className='searchbox'>
          <input
            type='text'
            placeholder='Type to search...'
            value={this.state.searchText}
            onChange={this.handleChange}
          />
        </div>

        <div className='box-container'>
          <ul>
            {this.state.makesSearch.map((make, i) => {
              return <li key={i}>
                <button onClick={this.openMake.bind(this, i)}>
                  {make.name}
                </button>
                {this.state.isOpen === i && <div className={this.state.isClosing === true ? 'models-bar is-closing'
                  : 'models-bar'}>
                  <button className='left-spacer' onClick={this.openMake.bind(this, '')}></button>
                  <div className='container'>
                    <p>
                      <button onClick={this.openMake.bind(this, '')}>
                        <i className='fas fa-arrow-left'></i>
                        Back to Makes
                      </button>
                    </p>
                    <h3>
                      {make.name}
                      <button onClick={(e) => (this.setModelsTrue(e, make))}>Select All</button>
                    </h3>
                    <ul data-simplebar>
                      {make.models.map((model, j) =>
                        <li key={j}>
                          <label htmlFor={'modelBox' + j}>
                            <p>{model}</p>
                            {this.props.value[make.id + 'ModelBoxes'][j] === true ?
                              <i className='checkmark fas fa-check'></i> : ''}
                          </label>
                          <input
                            type='checkbox'
                            name={make.id}
                            id={'modelBox' + j}
                            checked={this.props.value[make.id + 'ModelBoxes'][j] || ''}
                            onChange={(e) =>
                              this.props.handleBoxChange(make.id, j, this.props.history, make.name, model
                            )} />
                        </li>
                      )}
                    </ul>
                  </div>
                </div>}
              </li>;
            })}
          </ul>
          {this.state.makesSearch.length === 0 && <span>No matching models to display</span>}
          {this.state.modelsSearch.length > 0 && <p>Models</p>}
          <ul>
            {this.state.modelsSearch.map((model, i) => {
              return <li key={i}>
                <label htmlFor={'modelBox2' + i}>
                  <p>{model}</p>
                  {this.props.value[
                    makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
                  ][getModelsIndex(model, makesList, 'models')] ? <i className='checkmark fas fa-check'></i> : ''}
                </label>
                <input
                  type='checkbox'
                  name={model}
                  id={'modelBox2' + i}
                  checked={this.props.value[
                    makesList[getIndex(model, makesList, 'name')].id + 'ModelBoxes'
                  ][getModelsIndex(model, makesList, 'models')] || ''}
                  onChange={(e) => this.props.handleBoxChange(
                    makesList[getIndex(model, makesList, 'name')].id, getModelsIndex(model, makesList, 'models')
                    , this.props.history, makesList[getIndex(model, makesList, 'name')].name, model)} />
              </li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
