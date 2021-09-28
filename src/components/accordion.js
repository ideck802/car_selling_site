import React from 'react';
import PropTypes from 'prop-types';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      aniClose: false,
      aniOpen: false
    };
    this.changeVisible = this.changeVisible.bind(this);
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

  render() {
    return (
      <div
        className={
          (this.state.open === true ? ('accordion accordion-open ' + this.props.className) :
            ('accordion ' + this.props.className))}>
        <button onClick={this.changeVisible}>
          {this.props.btnText}
          {(this.state.open === true ? <i className='fas fa-caret-up'></i> : <i className='fas fa-caret-down'></i>)}
        </button>
        {(this.state.open === true ? (<div className={this.state.aniOpen ? 'accordion-content opening' :
          this.state.aniClose ? 'accordion-content closing' : 'accordion-content'}
        onAnimationEnd={() => {
          if (this.state.aniOpen) {this.setState({aniOpen: false});}
        }}>
          {this.props.children}
        </div>) : (''))}
      </div>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.node,
  btnText: PropTypes.string,
  className: PropTypes.string
};

export default Accordion;
