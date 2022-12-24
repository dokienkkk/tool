import * as React from 'react';
import type {SvgProps} from 'react-native-svg';
import Svg, {Path} from 'react-native-svg';
import Colors from '../styles/Colors';

export interface SettingIconProps {
  focus?: boolean;
}

function SvgComponent(props: SvgProps & SettingIconProps) {
  const {focus} = props;

  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.94182 6.87447C8.11856 7.33075 7.10873 7.3242 6.29176 6.85727L6.25578 6.82213C5.88818 6.59899 5.77542 6.12709 6.00393 5.76812C6.23244 5.40914 6.71569 5.29903 7.08329 5.52218C7.24738 5.61568 7.43305 5.66705 7.62297 5.6715C7.91407 5.68339 8.19806 5.58174 8.41235 5.38897C8.62663 5.19619 8.75361 4.92811 8.76529 4.64383C8.75976 3.21545 9.92066 2.04284 11.3827 2H12.615C14.1053 2 15.3134 3.17975 15.3134 4.63505C15.311 4.82028 15.3608 5.0026 15.4573 5.16206C15.6006 5.40892 15.839 5.5896 16.1194 5.66384C16.3999 5.73808 16.6991 5.69972 16.9504 5.55731C18.2167 4.88418 19.8011 5.30193 20.5483 6.50593C20.7548 6.87335 20.6278 7.33444 20.2605 7.55116C19.8872 7.75928 19.412 7.6384 19.1901 7.27888C18.8853 6.77187 18.219 6.59942 17.697 6.8924C16.871 7.33407 15.869 7.32329 15.0532 6.86395C14.2373 6.40461 13.7258 5.56317 13.7034 4.64383C13.7131 4.35592 13.6028 4.07648 13.3976 3.8695C13.1924 3.66252 12.91 3.54574 12.615 3.54589H11.3827C11.087 3.54581 10.8037 3.66232 10.5971 3.86901C10.3905 4.07571 10.2781 4.35509 10.2854 4.64383C10.2771 5.56818 9.76507 6.41819 8.94182 6.87447ZM10.2854 19.3913C10.2903 19.9797 10.7802 20.4541 11.3827 20.4541L11.3737 20.4717C11.6533 20.4717 11.9117 20.6173 12.0514 20.8538C12.1912 21.0902 12.1912 21.3815 12.0514 21.6179C11.9117 21.8544 11.6533 22 11.3737 22C9.88346 22 8.67535 20.8202 8.67535 19.365C8.67777 19.1797 8.62799 18.9974 8.53143 18.8379C8.22964 18.3278 7.56266 18.1512 7.03832 18.4427C5.77209 19.1158 4.18767 18.6981 3.44046 17.4941L2.82882 16.4488C2.1395 15.2123 2.5673 13.6651 3.80024 12.9354C3.96366 12.8416 4.09987 12.7085 4.19601 12.549C4.3764 12.3034 4.44123 11.9945 4.37428 11.6995C4.30733 11.4045 4.11494 11.1512 3.84522 11.0031C2.61227 10.2734 2.18448 8.72618 2.87379 7.48968C2.98913 7.32036 3.16883 7.20292 3.3731 7.16335C3.57736 7.12379 3.78936 7.16536 3.96215 7.27888C4.30347 7.50552 4.40243 7.95394 4.18701 8.29776C3.88931 8.80716 4.07045 9.45576 4.59177 9.74704C4.98345 9.98141 5.30585 10.3114 5.52722 10.7044C6.21653 11.9409 5.78874 13.4882 4.55579 14.2178C4.03447 14.5091 3.85333 15.1577 4.15103 15.6671L4.77167 16.7123C4.91288 16.9614 5.15203 17.1435 5.43385 17.2164C5.71567 17.2894 6.01576 17.2469 6.26478 17.0988C6.66629 16.8714 7.12284 16.7531 7.58699 16.7563C9.07728 16.7563 10.2854 17.936 10.2854 19.3913ZM20.1885 12.9267C19.9372 12.7853 19.7541 12.5518 19.6798 12.2781C19.6055 12.0043 19.6462 11.713 19.7927 11.4686C19.8889 11.309 20.0251 11.176 20.1885 11.0821C20.5576 10.8656 20.6782 10.3985 20.4584 10.0369C20.2398 9.67998 19.7734 9.55261 19.397 9.74704C18.164 10.4767 17.7362 12.0239 18.4256 13.2604C18.6445 13.6924 18.9845 14.0549 19.406 14.3057C19.6566 14.4453 19.8396 14.6772 19.914 14.9496C19.9883 15.2219 19.9479 15.5119 19.8017 15.7549L19.1901 16.8002C19.0428 17.0448 18.8043 17.2242 18.5245 17.3008C18.2442 17.3738 17.9456 17.3326 17.697 17.1866C16.8696 16.7443 15.8658 16.756 15.0494 17.2174C14.233 17.6789 13.7227 18.5231 13.7034 19.444C13.7464 19.8368 14.0859 20.1347 14.4904 20.1347C14.8949 20.1347 15.2344 19.8368 15.2774 19.444C15.27 19.0603 15.4768 18.7029 15.8172 18.5111C16.1577 18.3193 16.578 18.3234 16.9145 18.5217C18.1807 19.1949 19.7651 18.7771 20.5123 17.5731L21.124 16.5279C21.8792 15.2805 21.4613 13.6717 20.1885 12.9267ZM11.9944 8.70179C10.6257 8.70179 9.39191 9.5074 8.86897 10.7426C8.34604 11.9777 8.63704 13.3989 9.60615 14.3428C10.5753 15.2866 12.0314 15.567 13.2949 15.053C14.5583 14.5391 15.38 13.3322 15.3764 11.9956C15.3764 11.1205 15.0198 10.2814 14.3853 9.66341C13.7508 9.04545 12.8905 8.69946 11.9944 8.70179ZM11.9944 13.7611C11.0009 13.7611 10.1954 12.9746 10.1954 12.0044C10.1954 11.0342 11.0009 10.2477 11.9944 10.2477C12.9879 10.2477 13.7933 11.0342 13.7933 12.0044C13.7933 12.9746 12.9879 13.7611 11.9944 13.7611Z"
        fill={focus ? Colors.blue : Colors.gray}
      />
    </Svg>
  );
}

const SettingIcon = React.memo(SvgComponent);
export default SettingIcon;
