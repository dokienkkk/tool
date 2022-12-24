import * as React from 'react';
import {ClipPath} from 'react-native-svg';
import {Defs, Rect} from 'react-native-svg';
import Svg, {Path, G} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width="42" height="29" viewBox="0 0 42 29" fill="none">
      <G clip-path="url(#clip0_3_2204)">
        <Path
          d="M16.1307 0.956627H0V28.956H42V0.956627H16.1307Z"
          fill="#D80027"
        />
        <Path
          d="M21 6.85812L22.8591 12.5796H28.875L24.0079 16.1156L25.8671 21.8372L21 18.3011L16.1329 21.8372L17.9921 16.1156L13.125 12.5796H19.1409L21 6.85812Z"
          fill="#FFDA44"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3_2204">
          <Rect
            width="42"
            height="28"
            fill="white"
            transform="translate(0 0.956299)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const Vietnamese = React.memo(SvgComponent);
export default Vietnamese;
