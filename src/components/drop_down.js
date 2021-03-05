import React from 'react';
import PropTypes from 'prop-types';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
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
      <div
        className={
          (this.state.open === true ? ('drop-down dd-open ' + this.props.className) :
            ('drop-down ' + this.props.className))} ref={this.wrapperRef}>
        <button onClick={this.changeVisible}>{this.props.btnText}<i className='fas fa-caret-down'></i></button>
        {(this.state.open === true ? (<div className='dd-content'>
          {this.props.children}
        </div>) : (''))}
      </div>
    );
  }
}

DropDown.propTypes = {
    children: PropTypes.element.isRequired,
  };
export default DropDown;
