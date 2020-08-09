import React from 'react';
import { CarouselProvider } from 'pure-react-carousel';
import PropTypes from 'prop-types';

class FullContainerCarouselProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor() {
    super();
    this.nodeRef = React.createRef();
    this.state = {
      wrapperHeight: 0,
      wrapperWidth: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    if (!this.nodeRef) return;
    const node = this.nodeRef.current;
    console.log("node", node);
    const outerNode = node.parentNode;
    if(!outerNode) return;
    this.setState({
      heightProportion: outerNode.clientHeight,
      widthProportion: outerNode.clientWidth
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {

    return (
      <CarouselProvider
        ref={this.nodeRef}
        naturalSlideWidth={this.state.widthProportion}
        naturalSlideHeight={this.state.heightProportion}
        {...this.props}
      >
        {this.props.children}
      </CarouselProvider>
    );
  }
}

export default FullContainerCarouselProvider;