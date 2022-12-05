import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Headline from "../../../../components/Headline";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Accordion from "react-native-collapsible/Accordion";
import color from "../../../../assets/themes/Color";
import HeaderBack from "../../../../components/header/Header";
const BACON_IPSUM =
  "Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket.";

export default class ClassRoom extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={300}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={styles.header_style}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View>
          {section.content === "" ? (
            <>
              <Text
                style={{
                  fontFamily: "Montserrat-Medium",
                  fontSize: 14,
                  color: "red",
                }}
              >
                No Data Found
              </Text>
            </>
          ) : (
            <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 14 }}>
              {section.content}
            </Text>
          )}
        </View>
      </Animatable.View>
    );
  }

  render() {
    const { activeSections } = this.state;
    const { route } = this.props;
    const description = this.props.route.params.description;
    const instituteDetails = this.props.route.params.instituteDetails;
    const syllabus = this.props.route.params.syllabus;
    const subject = this.props.route.params.subject;
    const educator = this.props.route.params.educator;
    const assignments = this.props.route.params.assignments;
    const dueDates = this.props.route.params.dueDates;
    const jobSheets = this.props.route.params.jobSheets;
    const Announcements = this.props.route.params.Announcements;
    const presentation = this.props.route.params.presentation;
    const CONTENT = [
      {
        title: "Description",
        content: description,
      },
      {
        title: "Institute Detail",
        content: instituteDetails,
      },
      {
        title: "Syllabus",
        content: syllabus,
      },
      {
        title: "Topics/Subject",
        content: subject,
      },
      {
        title: "Educator Profile",
        content: educator,
      },
      {
        title: "Assignments",
        content: assignments,
      },
      {
        title: "Due Dates",
        content: dueDates,
      },
      {
        title: "Job Sheets",
        content: jobSheets,
      },
      {
        title: "Annoucements",
        content: Announcements,
      },
      {
        title: "Presentations",
        content: presentation,
      },
    ];
    return (
      <View style={styles.container}>
        <HeaderBack
          onPress={() => this.props.navigation.goBack()}
          // onPress={() => this.props.navigation.navigate("CourseDetail")}
        />
        <ScrollView
          contentContainerStyle={{ paddingTop: 30, paddingHorizontal: 10 }}
        >
          <Headline title={"Welcome to your class room."} />
          <Text style={styles.course_title}>
            <Text>Course: </Text>
            <Text style={{ fontFamily: "Montserrat-SemiBold" }}>
              Electrical
            </Text>
          </Text>
          <Accordion
            align="bottom"
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: color.white,
  },
  content: {
    padding: 20,
    backgroundColor: color.gray_white,
  },
  course_title: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: color.purple,
    marginBottom: 10,
  },

  header_style: {
    backgroundColor: color.purple,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: color.white,
  },
});
