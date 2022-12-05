import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import color from "../assets/themes/Color";

export default class Calender_Strip extends Component {
  constructor(props) {
    super(props);
    let startDate = moment(); // today
    // Create a week's worth of custom date styles and marked dates.
    let customDatesStyles = [];
    let markedDates = [];
    for (let i = 0; i < 7; i++) {
      let date = startDate.clone().add(i, "days");
      customDatesStyles.push({
        startDate: date, // Single date since no endDate provided
        dateNameStyle: { color: color.white },
        dateNumberStyle: { color: color.white },
        highlightDateNameStyle: { color: color.white },
        highlightDateNumberStyle: { color: color.white },
      });
      let dots = [];
      let lines = [];

      // if (i % 2) {
      //   lines.push({
      //     color: "cyan",
      //     selectedColor: "orange",
      //   });
      // } else {
      //   dots.push({
      //     color: "white",
      //     selectedColor: "yellow",
      //   });
      // }
      markedDates.push({
        date,
        dots,
        lines,
      });
    }

    this.state = {
      selectedDate: startDate,
      customDatesStyles,
      markedDates,
      startDate,
    };
  }

  datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 6; // disable Saturdays
  };

  onDateSelected = (selectedDate) => {
    let request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open("GET", `https://3dsco.com/3discoapi/3dicowebservce.php?datewise_event=1&user_id=2&event_date=${selectedDate}`, true);

    request.onload = function () {
      // Begin accessing JSON data here
      let data = JSON.parse(this.response);

      data.forEach((employee) => {
        // Log each movie's title
        console.log(selectedDate);
      });
    };
    console.log(selectedDate);
    this.setState({ selectedDate });
    this.setState({ formattedDate: selectedDate.format("YYYY-MM-DD") });
  };

  setSelectedDateNextWeek = (date) => {
    const selectedDate = moment(this.state.selectedDate).add(1, "week");
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    this.setState({ selectedDate, formattedDate });
  };

  setSelectedDatePrevWeek = (date) => {
    const selectedDate = moment(this.state.selectedDate).subtract(1, "week");
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    this.setState({ selectedDate, formattedDate });
  };

  render() {
    return (
      <View style={{ zIndex: 0 }}>
        <CalendarStrip
          scrollable
          calendarAnimation={{ type: "parallel", duration: 30 }}
          daySelectionAnimation={{ duration: 300, highlightColor: color.white }}
          style={{ height: 180 }}
          calendarHeaderStyle={{
            color: "white",
            fontSize: 15,
            marginBottom: -50,
            marginTop: 30,
          }}
          calendarColor={color.black}
          dateNumberStyle={{ color: "white", fontSize: 14 }}
          dateNameStyle={{ color: "white", fontSize: 12 }}
          iconContainer={{ flex: 0.1 }}
          //   customDatesStyles={{height:150}}
          highlightDateNameStyle={{ color: "white", fontSize: 14 }}
          highlightDateNumberStyle={{
            color: color.white,
            fontSize: 14,
            backgroundColor: color.purple,
            borderRadius: 15,
            height: 25,
            width: 25,
            padding: 1.5,
          }}
          markedDates={this.state.markedDates}
          //    datesBlacklist={this.datesBlacklistFunc}
          selectedDate={this.state.selectedDate}
          onDateSelected={this.onDateSelected}
          useIsoWeekday={false}
          iconStyle={{ backgroundColor: "white" }}
          dateContainerStyle={{ flex: 1 }}
        />
      </View>
    );
  }
}
