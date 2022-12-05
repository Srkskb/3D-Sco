import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const COLORS = {primary: '#fff', black: '#000'};

const newLocal = '../assets/images/onboarding/graduation.png';
const newLocal1 = '../assets/images/onboarding/hat.png';
const newLocal2 = '../assets/images/onboarding/customer.png';
const slides = [
  {
    id: '1',
    title: 'EDUCATION',
    image: require(newLocal),
    subtitle:
      'Education is a process of learning through which we acquire knowledge. It enlightens, empowers, and creates a positive development.',
  },
  {
    id: '2',
    title: 'E-LEARNING',
    image: require(newLocal1),
    subtitle:
      'Education is a process of learning through which we acquire knowledge. It enlightens, empowers, and creates a positive development.',
  },
  {
    id: '3',
    title: '24/7 SUPPORT',
    image: require(newLocal2),
    subtitle:
      'Education is a process of learning through which we acquire knowledge. It enlightens, empowers, and creates a positive development.',
  },
];
const Splash = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const Slide = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Image
            source={item?.image}
            style={{height: hp(16), width: hp(16), alignSelf: 'center'}}
          />

          <View style={{position: 'absolute', top: 2 * 60, left: 15}}>
            <View
              style={{
                flexDirection: 'column-reverse',
              }}>
              {/* Render indicator */}
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    currentSlideIndex == index && {
                      backgroundColor: '#960150',
                      borderWidth: 1,
                      borderColor: '#B90006',
                      width: 9,
                      height: 9,
                    },
                  ]}
                />
              ))}
            </View>

            {/* Render buttons */}
          </View>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height/2.4}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.primary,
    fontSize: hp(2),
    width: width,
    height: height / 7,
    textAlign: 'center',
    lineHeight: 23,
    paddingHorizontal: 20,
    fontFamily:'Montserrat-Medium'
  },
  title: {
    color: COLORS.primary,
    fontSize: hp(3),
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20,
    fontFamily:'Montserrat-ExtraBold'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 9,
    width: 9,
    backgroundColor: COLORS.primary,
    marginVertical: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#B90006',
  },
  btn: {
    flex: 1,
    height: 50,
    color: '#fff',
    borderRadius: 25,
    backgroundColor: '#fe5501',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Splash;
