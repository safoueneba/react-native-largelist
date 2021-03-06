/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/2
 *
 */

import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

interface IndexPath {
  section: number,
  row: number
}

class LargeListSection extends React.Component {
  static propTypes = {
    numberOfSections: PropTypes.number,
    renderSection: PropTypes.func,
    section: PropTypes.number
  };

  rootView: View;
  top: number;
  height: number;

  section: IndexPath;
  waitForRender: boolean;

  forceUpdate() {
    if (this.waitForRender)
      this.rootView.setNativeProps({
        style: { top: this.top, height: this.height }
      });
    this.waitForRender = false;

    this.setState({});
  }

  updateToSection(
    section: number,
    top: number,
    height: number,
    force: boolean
  ) {
    this.section = section;
    this.top = top;
    this.height = height;

    if (!force) {
      this.waitForRender = true;
      this.rootView.setNativeProps({
        style: {
          top: top,
          height: height
        }
      });
      return;
    }
    this.forceUpdate();
  }

  constructor(props) {
    super(props);
    this.top = props.style.top;
    this.height = props.style.height;
    this.section = props.section;
  }

  render() {
    let show = this.section>=0 && this.section<this.props.numberOfSections && this.top !== -10000;
    return (
      <View
        ref={ref => (this.rootView = ref)}
        style={[this.props.style, { top: this.top, height: this.height }]}
      >
        {show && this.props.renderSection(this.section)}
      </View>
    );
  }
}

export { LargeListSection };
