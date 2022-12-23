import * as React from 'react';
import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
import Colors from '../styles/Colors';

export interface LanguageIconProp {
  color?: string;
}

function SvgComponent(props: SvgProps & LanguageIconProp) {
  const {color} = props;

  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17 17.47C15.29 17.47 13.69 16.73 12.41 15.36C10.96 16.67 9.07 17.47 7 17.47C6.59 17.47 6.25 17.13 6.25 16.72C6.25 16.31 6.59 15.97 7 15.97C10.47 15.97 13.34 13.22 13.71 9.7H12H7.01C6.6 9.7 6.26 9.36 6.26 8.95C6.26 8.54 6.6 8.21 7.01 8.21H11.25V7.28C11.25 6.87 11.59 6.53 12 6.53C12.41 6.53 12.75 6.87 12.75 7.28V8.21H14.44C14.46 8.21 14.48 8.2 14.5 8.2C14.52 8.2 14.54 8.21 14.56 8.21H16.99C17.4 8.21 17.74 8.55 17.74 8.96C17.74 9.37 17.4 9.71 16.99 9.71H15.21C15.06 11.42 14.42 12.99 13.44 14.27C14.44 15.38 15.69 15.98 17 15.98C17.41 15.98 17.75 16.32 17.75 16.73C17.75 17.14 17.41 17.47 17 17.47Z"
        fill={color ? color : Colors.white}
      />
    </Svg>
  );
}

const LanguageIcon = React.memo(SvgComponent);
export default LanguageIcon;
