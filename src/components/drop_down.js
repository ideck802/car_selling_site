import React from "react";

class DropDown extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.changeVisible = this.changeVisible.bind(this);
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

  render() {
    return (
      <div className="drop_down">
        <button onClick={this.changeVisible}>{this.props.btnText}<i class="fas fa-caret-down"></i></button>
        {(this.state.open===true ? (<div className="dd_content">
          {this.props.children}
        </div>):(""))}
      </div>
    );
  }
}

export default DropDown;
