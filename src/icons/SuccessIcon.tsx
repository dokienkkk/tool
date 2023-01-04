import * as React from 'react';
import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
import Colors from '../styles/Colors';

export interface SuccessIconProps {
  color?: string;
}

function SvgComponent(props: SvgProps & SuccessIconProps) {
  const {color} = props;

  return (
    <Svg width={62} height={62} viewBox="0 0 62 62" fill="none">
      <Path
        d="M21.9583 54.2501C21.4494 54.2501 20.9457 54.1493 20.4755 53.9556C20.0053 53.7618 19.5765 53.4751 19.2174 53.116L0.979084 34.8751L6.45833 29.3958L21.9583 44.8958L55.5417 11.3125L61.0209 16.7917L24.6993 53.116C24.3402 53.4751 23.9113 53.7618 23.4412 53.9556C22.971 54.1493 22.4673 54.2501 21.9583 54.2501Z"
        fill={color ? color : Colors.blue}
      />
    </Svg>
  );
}

const SuccessIcon = React.memo(SvgComponent);
export default SuccessIcon;
