import * as React from 'react';
import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
import Colors from '../styles/Colors';

export interface TabSetAddressIconProp {
  focus?: boolean;
}

function SvgComponent(props: SvgProps & TabSetAddressIconProp) {
  const {focus} = props;

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.1174 17.9866H2.8833"
        stroke={focus ? Colors.white : Colors.blue}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.1179 17.9866C21.1179 19.5772 19.8285 20.8666 18.2379 20.8666C16.6473 20.8666 15.3579 19.5772 15.3579 17.9866C15.3579 16.3948 16.6473 15.1066 18.2379 15.1066C19.8285 15.1066 21.1179 16.3948 21.1179 17.9866Z"
        stroke={focus ? Colors.white : Colors.blue}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.8828 6.26206H21.1181"
        stroke={focus ? Colors.white : Colors.blue}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.88281 6.26208C2.88281 7.85384 4.17222 9.14208 5.76281 9.14208C7.3534 9.14208 8.64281 7.85384 8.64281 6.26208C8.64281 4.67149 7.3534 3.38208 5.76281 3.38208C4.17222 3.38208 2.88281 4.67149 2.88281 6.26208Z"
        stroke={focus ? Colors.white : Colors.blue}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

const TabSetAddressIcon = React.memo(SvgComponent);
export default TabSetAddressIcon;
