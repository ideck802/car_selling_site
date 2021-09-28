import React from 'react';
import PropTypes from 'prop-types';

class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      aniClose: false,
      aniOpen: false,
      selectedNum: this.props.startValue
    };
    this.changeVisible = this.changeVisible.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.changeSelectedNum = this.changeSelectedNum.bind(this);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);

    if (this.props.isChanging) {
      //this.changeSelectedNum(this.props.startValue);
      this.props.children[1].props.changeDis(this.props.startValue, this.props.his);
    }
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
    if (this.state.aniOpen) {
      this.setState({
        open: false,
        aniOpen: false,
        aniClose: true
      });
    }
    if (this.state.open === false) {
      this.setState({
        open: true,
        aniClose: false,
        aniOpen: true
      });
    } else {
      this.setState({
        aniClose: true,
        aniOpen: false
      });
      setTimeout(() => {
        this.setState({
          open: false
        });
      }, 500);
    }
  }

  closeDropDown() {
    if (this.state.aniOpen) {
      this.setState({
        open: false,
        aniOpen: false,
        aniClose: true
      });
    }
    this.setState({
      aniClose: true,
      aniOpen: false
    });
    setTimeout(() => {
      this.setState({
        open: false
      });
    }, 500);
  }

  changeSelectedNum(index) {
    this.setState({
      selectedNum: index
    });
  }

  render() {
    if (this.props.isChanging === true) {
      return (
        <div
          className={
            (this.state.open === true ? ('drop-down dd-open ' + this.props.className) :
              ('drop-down ' + this.props.className))} ref={this.wrapperRef}>
          <button onClick={this.changeVisible}>
            {this.props.children[this.state.selectedNum].props.display}
            <i className='fas fa-caret-down'></i>
          </button>
          {(this.state.open === true ? (<div className={this.state.aniOpen ? 'dd-content opening' :
            this.state.aniClose ? 'dd-content closing' : 'dd-content'}
          onAnimationEnd={() => {
            if (this.state.aniOpen) {this.setState({aniOpen: false});}
          }}>
            {this.props.children.map((child, index) =>
              <div
                key={child.props.className + index}
                className={child.props.className}
                onClick={() => {
                  this.changeSelectedNum(index);
                  this.changeVisible();
                  child.props.changeDis(index, this.props.his);
                }}>
                {child.props.display}
              </div>
            )}
          </div>) : (''))}
        </div>
      );
    } else {
      return (
        <div
          className={
            (this.state.open === true ? ('drop-down dd-open ' + this.props.className) :
              ('drop-down ' + this.props.className))} ref={this.wrapperRef}>
          <button onClick={this.changeVisible}>{this.props.btnText}<i className='fas fa-caret-down'></i></button>
          {(this.state.open === true ? (<div className={this.state.aniOpen ? 'dd-content opening' :
            this.state.aniClose ? 'dd-content closing' : 'dd-content'}
          onAnimationEnd={() => {
            if (this.state.aniOpen) {this.setState({aniOpen: false});}
          }}>
            {Array.from(Array(this.props.extraModalBtns), (e, i) => {
              return <div className={'extra-modal-bar' + (i + 1)}>
                <button onClick={this.changeVisible}></button>
              </div>;
            })}
            {this.props.children}
          </div>) : (''))}
        </div>
      );
    }
  }
}

DropDown.propTypes = {
  children: PropTypes.element.isRequired,
  startValue: PropTypes.any,
  isChanging: PropTypes.any,
  his: PropTypes.any,
  className: PropTypes.string,
  btnText: PropTypes.string,
  extraModalBtns: PropTypes.any
};

export default DropDown;
