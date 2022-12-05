import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import term_condition from '../documents/term_condition';
import terms from '../documents/terms';
import color from '../assets/themes/Color';
const {height} = Dimensions.get('window');

const Condition = () => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [1, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };

  return (
    <View style={styles.condition_box}>
    <View style={[styles.arrow_box,{borderTopRightRadius:14}]}>
      <Image style={styles.arrow_image} source={require('../assets/images/up.png')}/>
    </View>
      <View style={styles.scrollContainer}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{paddingHorizontal: 14}}
          onContentSizeChange={onContentSizeChange}
          onLayout={onLayout}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollIndicator}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewContainer}>
          {/* Your ScrollView content here */}
          <Text style={styles.term_text}>{terms}</Text>
          
        </ScrollView>
        <View style={styles.customScrollBarBackground}>
          <Animated.View
            style={[
              styles.customScrollBar,
              {
                height: scrollIndicatorSize,
                transform: [{translateY: scrollIndicatorPosition}],
              },
            ]}
          />
        </View>
      </View>
      <View style={[styles.arrow_box,{borderBottomRightRadius:14}]}>
      <Image style={styles.arrow_image} source={require('../assets/images/down.png')}/>
      </View>

    </View>
  );
};
export default Condition;
const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'flex-end',
  },
  scrollViewContainer: {
    width: '100%',
    height: height / 4,
  },
  customScrollBar: {
    backgroundColor: color.purple,
    width: 14,
    borderRadius: 1,
    alignSelf: 'center',
  },
  customScrollBarBackground: {
    backgroundColor: color.gray,
    height: '100%',
    width: 20,
  },
  condition_box: {
    borderWidth: 1,
    borderColor: color.gray,
    // height:height/3.3,
    justifyContent: 'center',
    borderRadius: 15,

  },
  term_text: {
    fontSize: 16,
    color: color.black,
    textAlign: 'justify',
    fontFamily:'Montserrat-Medium',
  },
  arrow_box: {
    height: 20,
    backgroundColor: color.gray,
    width: 21,
    alignSelf:'flex-end',
    marginRight:-1.2,
  },
  arrow_image:{
    height:7,
    position:'absolute',
    width:12,
    marginTop:5,
    marginLeft:3.5

  }
});
