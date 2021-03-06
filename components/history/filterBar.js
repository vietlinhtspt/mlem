import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Modal,
} from "react-native";

import { Picker } from "native-base";

import moment from "moment";
import DatePicker from "./datePicker";

// const filterTimeOption = ["Tất cả", "Theo ngày", "7 ngày gần đây"];

export default class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterTime: "Tất cả",
      filterStatus: "Trạng thái",
      valueFilterTime: "0",
      valueFilterStatus: "0",
      date: moment(),
    };
  }

  onValueFilterStatusChange = (value) => {
    this.setState({
      valueFilterStatus: value,
    });
    if (value === 0) {
      this.props.renderOrdered(this.state.valueFilterTime, null);
    } else {
      this.props.renderOrdered(this.state.valueFilterTime, value);
    }
  };

  onValueFilterTimeChange = (value) => {
    this.setState({
      valueFilterTime: value,
    });
    if (this.state.valueFilterStatus === 0) {
      this.props.renderOrdered(value, null);
    } else {
      this.props.renderOrdered(value, this.state.valueFilterStatus);
    }
  };

  setDate = (pickedDate) => {
    // //console.log("[INFO] Picked date: ", pickedDate);
    this.props.renderOrdered(
      this.state.valueFilterTime,
      this.state.valueFilterStatus,
      pickedDate
    );
  };

  render() {
    return (
      <View
        style={{
          borderRadius: 6,
          elevation: 3,
          backgroundColor: "#fff",
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          marginVertical: 6,
          //
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 120, paddingLeft: 9, marginLeft: 8 }}
            selectedValue={this.state.valueFilterTime}
            onValueChange={this.onValueFilterTimeChange}
          >
            <Picker.Item label="Tất cả" value="0" />
            <Picker.Item label="7 ngày gần đây" value="1" />
            <Picker.Item label="30 ngày gần đây" value="2" />
            <Picker.Item label="Chọn ngày" value="3" />
          </Picker>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.valueFilterTime === "3" ? (
            <DatePicker setDate={this.setDate} date={this.state.date} />
          ) : null}
        </View>

        <View
          style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}
        >
          <View
          // style={{
          //   alignItems: "center",
          //   flexDirection: "row",
          //   justifyContent: "flex-end",
          // }}
          >
            <Picker
              note
              mode="dropdown"
              style={{ width: 140 }}
              selectedValue={this.state.valueFilterStatus}
              onValueChange={this.onValueFilterStatusChange}
            >
              <Picker.Item label="Trạng thái" value="0" />
              <Picker.Item label="Tạo mới" value="1" />
              <Picker.Item label="Đã gửi" value="2" />
              <Picker.Item label="Đã xác nhận" value="3" />
              <Picker.Item label="Đã từ chối" value="4" />
              <Picker.Item label="Đã thanh toán" value="5" />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}
