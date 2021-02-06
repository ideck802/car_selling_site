import React from "react";
import PropTypes from 'prop-types';
import { Range } from 'react-range';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      values: [50, 60]
    };
    this.changeVisible = this.changeVisible.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.closeDropDown();
    }
  }

  changeVisible() {
    if (this.state.open === false) {
      this.setState({
        open: true
      });
    } else {
      this.setState({
        open: false
      });
    }
  }

  closeDropDown() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div className="drop_down" ref={this.wrapperRef}>
        <button onClick={this.changeVisible}>{this.props.btnText}<i class="fas fa-caret-down"></i></button>
        {(this.state.open===true ? (<div className="dd_content">
          {this.props.children}
        </div>):(""))}
      </div>
    );
  }
}

DropDown.propTypes = {
    children: PropTypes.element.isRequired,
};
export default DropDown;
