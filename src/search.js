import React from 'react';
import ReactDOM from 'react-dom';
import './css/search.css';
import DropDown from './components/drop_down';
import reportWebVitals from './reportWebVitals';


class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search_tag: '',
      zip_code: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
    return (
      <div>
        <div className="filters">
          <div className="search_box">
            <input type="text" name="search_tag" placeholder="Search by make, model, or tags" value={this.state.search_tag} onChange={this.handleInputChange} />
            <p>Near: </p><input type="text" name="zip_code" placeholder="Zip code" maxlength="5" value={this.state.zip_code} onChange={this.handleInputChange} />
            <DropDown btnText="Distance">
              <a href="#">25 Miles</a>
              <a href="#">50 Miles</a>
              <a href="#">75 Miles</a>
              <a href="#">100 Miles</a>
              <a href="#">250 Miles</a>
              <a href="#">500 Miles</a>
              <a href="#">Nearest Store</a>
              <a href="#">Nearest City</a>
            </DropDown>
            <button>
              <i class="fas fa-search"></i>
            </button>
          </div>
          <div className="drop_downs">
            <DropDown btnText="Price">
              <a>25 Miles</a>
              <a>50 Miles</a>
              <a>75 Miles</a>
            </DropDown>
            <DropDown btnText="Make & Model">
              <a>250 Miles</a>
              <a>500 Miles</a>
              <a>Nearest Store</a>
              <a>Nearest City</a>
            </DropDown>
            <DropDown btnText="Body Type">
              <a>250 Miles</a>
              <a>500 Miles</a>
              <a>Nearest Store</a>
              <a>Nearest City</a>
            </DropDown>
            <DropDown btnText="Year & Mileage">
              <a>250 Miles</a>
              <a>500 Miles</a>
              <a>Nearest Store</a>
              <a>Nearest City</a>
            </DropDown>
            <DropDown btnText="Features">
              <a>250 Miles</a>
              <a>500 Miles</a>
              <a>Nearest Store</a>
              <a>Nearest City</a>
            </DropDown>
            <DropDown btnText="More Filters">
              <a>250 Miles</a>
              <a>500 Miles</a>
              <a>Nearest Store</a>
              <a>Nearest City</a>
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
