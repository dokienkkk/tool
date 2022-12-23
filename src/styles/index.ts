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
});

export default shareStyles;
