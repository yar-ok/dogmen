import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Animated,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get("window");
const available_width = width - 40 - 12;

export default class ProgressView extends Component {
    constructor(props) {
        super(props);
        this.progress = props.progressAnim;
        this.state = {
            progress: props.progress
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            progress: nextProps.progress
        })
    }

    getProgressStyles() {
        var animated_width = this.progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, available_width / 2, available_width]
        });
        //red -> orange -> green
        const color_animation = this.progress.interpolate({
            inputRange: [0, 50, 100],
            outputRange: ['rgb(199, 45, 50)', 'rgb(224, 150, 39)', 'rgb(101, 203, 25)']
        });
        
        return {
            width: animated_width,
            height: 5,
            backgroundColor: color_animation
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.progress_container}>
                    <Animated.View
                    style={[this.getProgressStyles.call(this)]}
                    > 
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center"
  },
  progress_container: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white"
  }
});