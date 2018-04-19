import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import moment from "moment";

const SentTime = props => (
    <View style={ styles.container }>
        <Text style={ styles.text }>{getValidatedData(props.sent_time)}</Text>
    </View>
);

function getValidatedData(startDate) {
  let endDate = new Date();
  if (true) {
    let different = parseInt(endDate.getTime() - startDate);
    let secondsInMilli = 1000;
    let minutesInMilli = secondsInMilli * 60;
    let hoursInMilli = minutesInMilli * 60;
    let daysInMilli = hoursInMilli * 24;

    let elapsedDays = Math.floor(different / daysInMilli);
    different = different % daysInMilli;

    let elapsedHours = Math.floor(different / hoursInMilli);
    different = different % hoursInMilli;

    let elapsedMinutes = Math.floor(different / minutesInMilli);
    different = different % minutesInMilli;

    let elapsedSeconds = Math.floor(different / secondsInMilli);

    let result = 0;
    if (elapsedDays > 23) {
      let date = new Date(startDate);
      result = moment(date).format("DD MMMM YYYY hh:mm");
    } else if (elapsedDays > 0) {
      result =
        elapsedDays +
        " days " +
        elapsedHours +
        " h " +
        elapsedMinutes +
        " min ago";
    } else if (elapsedHours > 0) {
      result =
        elapsedHours +
        " h " +
        elapsedMinutes +
        " min " +
        elapsedSeconds +
        " sec ago";
    } else if (elapsedMinutes > 0) {
      result = elapsedMinutes + " min " + elapsedSeconds + " sec ago";
    } else if (elapsedSeconds === 0) {
      result = "just now";
    } else {
      result = elapsedSeconds + " sec ago";
    }

    return result;
  }
  return "----";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  text: {
    fontSize: 12,
  }
});

export default SentTime;
