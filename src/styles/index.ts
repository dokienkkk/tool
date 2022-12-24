import {StyleSheet} from 'react-native';
import Colors from './Colors';

const shareStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  w100: {
    width: '100%',
  },
  w50: {
    width: '50%',
  },
  h100: {
    height: '100%',
  },
  h50: {
    height: '50%',
  },
  textBold: {
    fontFamily: 'Quicksand-Bold',
    fontWeight: '600',
  },
  textRegular: {
    fontFamily: 'Quicksand-Regular',
    fontWeight: '600',
  },
  defaultBackground: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default shareStyles;
