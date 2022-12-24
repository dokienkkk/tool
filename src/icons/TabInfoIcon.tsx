import * as React from 'react';
import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
import Colors from '../styles/Colors';

export interface TabInfoIconProp {
  focus?: boolean;
}

function SvgComponent(props: SvgProps & TabInfoIconProp) {
  const {focus} = props;

  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        id="Icon color"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.5 5H3.5C3.22386 5 3 5.22386 3 5.5V6.5C3 6.77614 3.22386 7 3.5 7H4.5C4.77614 7 5 6.77614 5 6.5V5.5C5 5.22386 4.77614 5 4.5 5ZM7.5 5H20.5C20.7761 5 21 5.22386 21 5.5V6.5C21 6.77614 20.7761 7 20.5 7H7.5C7.22386 7 7 6.77614 7 6.5V5.5C7 5.22386 7.22386 5 7.5 5ZM3 11.5V12.5C3 12.7761 3.22386 13 3.5 13H4.5C4.77614 13 5 12.7761 5 12.5V11.5C5 11.2239 4.77614 11 4.5 11H3.5C3.22386 11 3 11.2239 3 11.5ZM7.5 11H20.5C20.7761 11 21 11.2239 21 11.5V12.5C21 12.7761 20.7761 13 20.5 13H7.5C7.22386 13 7 12.7761 7 12.5V11.5C7 11.2239 7.22386 11 7.5 11ZM3 17.5V18.5C3 18.7761 3.22386 19 3.5 19H4.5C4.77614 19 5 18.7761 5 18.5V17.5C5 17.2239 4.77614 17 4.5 17H3.5C3.22386 17 3 17.2239 3 17.5ZM7.5 17H20.5C20.7761 17 21 17.2239 21 17.5V18.5C21 18.7761 20.7761 19 20.5 19H7.5C7.22386 19 7 18.7761 7 18.5V17.5C7 17.2239 7.22386 17 7.5 17Z"
        fill={focus ? Colors.white : Colors.blue}
      />
    </Svg>
  );
}

const TabInfoIcon = React.memo(SvgComponent);
export default TabInfoIcon;
