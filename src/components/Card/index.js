import React, { Component, PropTypes } from 'react';

/* Styles */
import styles from './styles/'

const DISPLAY_NAME = '<Card>';
const propTypes = {
  name: PropTypes.string.isRequired,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  isDragging: PropTypes.bool.isRequired,
  flipped: PropTypes.bool.isRequired,
  handleBeginDragDrop: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func, // For overriding a <Cards> MouseDown handler
  onTouchStart: PropTypes.func, // For overriding a <Cards> TouchStart handler
  onDoubleClick: PropTypes.func
}

class Card extends Component {
  constructor(props) {
    super(props);
    let ownFuncs = [ "handleMouseDown", "isFlipped", "handleTouchStart",
                     "handleDoubleClick" ]
    ownFuncs.forEach((elem) => {
      if (!this[elem]) {
        console.error(`Attempt to self-bind \'${elem}\' to ${DISPLAY_NAME} failed`);
        return;
      }
      this[elem] = this[elem].bind(this);
    })

    //this.state = { toggleFlip: false }
  }
  handleDoubleClick(e) {
    console.log('Card DoubleClicked');
  }
  handleMouseDown(e) {
    let { isDragging } = this.props;
    if (!isDragging) {
      let dragging = [this];
      this.props.handleBeginDragDrop(e, dragging);
    }
  }
  handleTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();
    let touchObj = e.changedTouches[0];
    //console.log('Card Touche: ', e);
    if (touchObj) {
      this.handleMouseDown(touchObj);
    }
  }
  isFlipped() {
    return (this.props.flipped);
  }

  render() {
    let { name, flipped, offsetX, offsetY } = this.props;
    return (
      <div id={name} className={(flipped) ? styles : ""}
                     style={ {
                       zIndex: 10,
                       position: 'absolute',
                       top: (offsetY || 0) + 'px',
                       left: (offsetX || 0) + 'px'} }
                     onMouseDown={this.props.onMouseDown || this.handleMouseDown}
                     onTouchStart={this.props.onTouchStart || this.handleTouchStart}
                     onDoubleClick={this.props.onDoubleClick} >
      </div>
    )
  }
}

Card.propTypes = propTypes;

export default Card;
