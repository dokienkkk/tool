import * as React from 'react';
import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
import Colors from '../styles/Colors';

export interface BluetoothIconProp {
  color?: string;
}

function SvgComponent(props: SvgProps & BluetoothIconProp) {
  const {color} = props;

  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.6 18.1102C12.38 18.1102 12.21 18.0502 12.11 18.0102C11.89 17.9102 11.3901 17.5802 11.3901 16.6702V14.0002L9.09004 16.1102C8.79004 16.3902 8.31004 16.3702 8.03004 16.0602C7.75004 15.7502 7.77003 15.2802 8.08003 15.0002L11.36 11.9902L8.08003 8.98019C7.77003 8.70019 7.75004 8.23019 8.03004 7.92019C8.31004 7.62019 8.79004 7.59017 9.09004 7.87017L11.3901 9.98019V7.32018C11.3901 6.42018 11.89 6.09019 12.11 5.98019C12.32 5.88019 12.9 5.71017 13.6 6.28017L15.66 8.00018C15.96 8.25018 16.14 8.62018 16.15 9.00018C16.16 9.38018 16 9.76016 15.71 10.0202L13.58 11.9702L15.71 13.9202C16 14.1902 16.16 14.5602 16.15 14.9402C16.14 15.3202 15.96 15.6902 15.66 15.9402L13.6 17.6602C13.22 18.0202 12.87 18.1102 12.6 18.1102ZM12.9 13.4102V16.3302L14.5701 14.9402L12.9 13.4102ZM12.9 7.67019V10.5902L14.5701 9.06017L12.9 7.67019Z"
        fill={color ? color : Colors.white}
      />
      <Path
        d="M15 22.75H9C5.56 22.75 3.25 20.44 3.25 17V7C3.25 3.56 5.56 1.25 9 1.25H15C18.44 1.25 20.75 3.56 20.75 7V17C20.75 20.44 18.44 22.75 15 22.75ZM9 2.75C6.42 2.75 4.75 4.42 4.75 7V17C4.75 19.58 6.42 21.25 9 21.25H15C17.58 21.25 19.25 19.58 19.25 17V7C19.25 4.42 17.58 2.75 15 2.75H9Z"
        fill={color ? color : Colors.white}
      />
    </Svg>
  );
}

const BluetoothIcon = React.memo(SvgComponent);
export default BluetoothIcon;
