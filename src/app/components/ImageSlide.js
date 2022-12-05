import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import color from "../assets/themes/Color";

import Slideshow from "react-native-image-slider-show";

export default class ImageSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          url: "http://placeimg.com/640/480/people",
        },
        {
          url: "http://placeimg.com/640/480/architecture",
        },
        {
          url: "http://placeimg.com/640/480/tech",
        },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 4000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <Slideshow
        dataSource={this.state.dataSource}
        position={this.state.position}
        onPositionChanged={(position) => this.setState({ position })}
        arrowSize={0}
        indicatorSelectedColor={color.purple}
        indicatorColor={color.white}
        containerStyle={styles.image_container}
        overlay={true}
      />
    );
  }
}
const styles = StyleSheet.create({

});
