import React, { Component } from "react";
import { Text, View } from "react-native";

import { Button } from "react-native-elements";
import Activitys from "../../models/Activity";
import { Actions } from "react-native-router-flux";
import { observer } from "mobx-react/native";

import LS from "../../models/LocalStorage";

@observer
class Activity extends Component {
  constructor() {
    super();
    this.updateisStarted = this.updateisStarted.bind(this);
  }
  updateisStarted() {
    const selectedActivity = LS.read(
      "Activity",
      `name="${Activitys.selectedActivity.name}"`
    );
    if (selectedActivity["0"].isStarted == false) {
      LS.update(
        res => {
          res["0"].isStarted = true;
          res["0"].records.push({ startTime: new Date(), endTime: new Date() });
        },
        [selectedActivity]
      );
    } else {
      LS.update(
        res => {
          res["0"].isStarted = false;
          let lastItem = res["0"].records[res["0"].records.length - 1];
          lastItem.endTime = new Date();
        },
        [selectedActivity]
      );
    }
    Actions.refresh();
  }

  render() {
    const selectedActivity = LS.read(
      "Activity",
      `name="${Activitys.selectedActivity.name}"`
    );

    const isStarted = selectedActivity["0"].isStarted;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button
          buttonStyle={{
            height: 150,
            width: 150,
            borderRadius: 75,
            backgroundColor: isStarted ? "red" : "#00303f"
          }}
          title={isStarted ? "Stop Activity" : "Start Activity"}
          onPress={this.updateisStarted}
        />
      </View>
    );
  }
}

export default Activity;
