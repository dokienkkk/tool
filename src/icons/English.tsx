import * as React from 'react';
import {ClipPath} from 'react-native-svg';
import {Defs, Rect} from 'react-native-svg';
import Svg, {Path, G} from 'react-native-svg';

function SvgComponent() {
  return (
    <Svg width="42" height="29" viewBox="0 0 42 29" fill="none">
      <G clip-path="url(#clip0_3_2338)">
        <Path d="M0 0.926514H42V28.9268H0V0.926514Z" fill="white" />
        <Path
          d="M23.625 0.926208H18.375V12.3012H0V17.5512H18.375V28.9261H23.625V17.5512H42V12.3012H23.625V0.926208Z"
          fill="#D80027"
        />
        <Path
          d="M32.3027 19.7958L42 25.1833V19.7958H32.3027ZM25.5652 19.7958L42 28.9262V26.3443L30.2127 19.7958H25.5652ZM37.6223 28.9262L25.5652 22.2272V28.9262H37.6223Z"
          fill="#0052B4"
        />
        <Path
          d="M25.5652 19.7958L42 28.9262V26.3443L30.2127 19.7958H25.5652Z"
          fill="white"
        />
        <Path
          d="M25.5652 19.7958L42 28.9262V26.3443L30.2127 19.7958H25.5652Z"
          fill="#D80027"
        />
        <Path
          d="M7.41079 19.7956L0 23.9127V19.7956H7.41079ZM16.4348 20.9567V28.9261H2.09106L16.4348 20.9567Z"
          fill="#0052B4"
        />
        <Path
          d="M11.7873 19.7958L0 26.3443V28.9262L16.4348 19.7958H11.7873Z"
          fill="#D80027"
        />
        <Path
          d="M9.69732 10.0566L0 4.66913V10.0566H9.69732ZM16.4348 10.0566L0 0.926208V3.50806L11.7873 10.0566H16.4348ZM4.37768 0.926208L16.4348 7.62521V0.926208H4.37768Z"
          fill="#0052B4"
        />
        <Path
          d="M16.4348 10.0566L0 0.926208V3.50806L11.7873 10.0566H16.4348Z"
          fill="white"
        />
        <Path
          d="M16.4348 10.0566L0 0.926208V3.50806L11.7873 10.0566H16.4348Z"
          fill="#D80027"
        />
        <Path
          d="M34.5892 10.0568L42 5.93967V10.0568H34.5892ZM25.5652 8.89575V0.926331H39.9089L25.5652 8.89575Z"
          fill="#0052B4"
        />
        <Path
          d="M30.2127 10.0567L42 3.50812V0.92627L25.5652 10.0567H30.2127Z"
          fill="#D80027"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_3_2338">
          <Rect
            width="42"
            height="28"
            fill="white"
            transform="translate(0 0.926514)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

const English = React.memo(SvgComponent);
export default English;
