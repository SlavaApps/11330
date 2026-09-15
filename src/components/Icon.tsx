import React from 'react';
import Svg, { Circle, Path, Rect, Line, Polyline } from 'react-native-svg';
import { colors } from '../theme';

export type IconName =
  | 'learn'
  | 'dictionary'
  | 'score'
  | 'events'
  | 'menu'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-down'
  | 'check'
  | 'close'
  | 'plus'
  | 'minus'
  | 'search'
  | 'bookmark'
  | 'bookmark-filled'
  | 'more'
  | 'pause'
  | 'play'
  | 'clock'
  | 'pin'
  | 'calendar'
  | 'undo'
  | 'trash'
  | 'share'
  | 'user'
  | 'trophy'
  | 'qr'
  | 'arrow-right'
  | 'star';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

interface StrokeProps {
  stroke: string;
  strokeWidth: number;
  strokeLinecap: 'round';
  strokeLinejoin: 'round';
  fill: 'none';
}

export function Icon({
  name,
  size = 22,
  color = colors.textSecondary,
  strokeWidth = 1.8,
}: IconProps): React.JSX.Element {
  const common: StrokeProps = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {renderPaths(name, color, common)}
    </Svg>
  );
}

function renderPaths(
  name: IconName,
  color: string,
  common: StrokeProps,
): React.JSX.Element {
  switch (name) {
    case 'learn':
      return (
        <>
          <Rect x={3} y={4} width={7.5} height={16} rx={1.6} {...common} />
          <Rect x={13.5} y={4} width={7.5} height={16} rx={1.6} {...common} />
        </>
      );
    case 'dictionary':
      return (
        <>
          <Circle cx={11} cy={11} r={6.6} {...common} />
          <Line x1={16} y1={16} x2={20.5} y2={20.5} {...common} />
        </>
      );
    case 'score':
      return (
        <>
          <Line x1={5} y1={20} x2={5} y2={12} {...common} />
          <Line x1={12} y1={20} x2={12} y2={5} {...common} />
          <Line x1={19} y1={20} x2={19} y2={9} {...common} />
        </>
      );
    case 'events':
      return (
        <>
          <Rect x={3} y={5} width={18} height={15} rx={2.4} {...common} />
          <Line x1={3} y1={10} x2={21} y2={10} {...common} />
          <Line x1={8} y1={3} x2={8} y2={6.5} {...common} />
          <Line x1={16} y1={3} x2={16} y2={6.5} {...common} />
        </>
      );
    case 'calendar':
      return (
        <>
          <Rect x={3.5} y={5} width={17} height={15} rx={2.4} {...common} />
          <Line x1={3.5} y1={9.5} x2={20.5} y2={9.5} {...common} />
          <Line x1={8} y1={3} x2={8} y2={6.5} {...common} />
          <Line x1={16} y1={3} x2={16} y2={6.5} {...common} />
        </>
      );
    case 'menu':
      return (
        <>
          <Circle cx={12} cy={12} r={8.5} {...common} />
          <Circle cx={12} cy={12} r={3} fill={color} stroke="none" />
        </>
      );
    case 'chevron-left':
      return <Polyline points="15,5 8,12 15,19" {...common} />;
    case 'chevron-right':
      return <Polyline points="9,5 16,12 9,19" {...common} />;
    case 'chevron-down':
      return <Polyline points="5,9 12,16 19,9" {...common} />;
    case 'arrow-right':
      return (
        <>
          <Line x1={4} y1={12} x2={19} y2={12} {...common} />
          <Polyline points="13,6 19,12 13,18" {...common} />
        </>
      );
    case 'check':
      return <Polyline points="4.5,12.5 9.5,17.5 19.5,6.5" {...common} />;
    case 'close':
      return (
        <>
          <Line x1={6} y1={6} x2={18} y2={18} {...common} />
          <Line x1={18} y1={6} x2={6} y2={18} {...common} />
        </>
      );
    case 'plus':
      return (
        <>
          <Line x1={12} y1={5} x2={12} y2={19} {...common} />
          <Line x1={5} y1={12} x2={19} y2={12} {...common} />
        </>
      );
    case 'minus':
      return <Line x1={5} y1={12} x2={19} y2={12} {...common} />;
    case 'search':
      return (
        <>
          <Circle cx={10.5} cy={10.5} r={6.3} {...common} />
          <Line x1={15.2} y1={15.2} x2={20} y2={20} {...common} />
        </>
      );
    case 'bookmark':
      return <Path d="M6 4h12v17l-6-4.4L6 21z" {...common} />;
    case 'bookmark-filled':
      return <Path d="M6 4h12v17l-6-4.4L6 21z" fill={color} stroke={color} strokeWidth={1.4} />;
    case 'more':
      return (
        <>
          <Circle cx={12} cy={5} r={1.7} fill={color} stroke="none" />
          <Circle cx={12} cy={12} r={1.7} fill={color} stroke="none" />
          <Circle cx={12} cy={19} r={1.7} fill={color} stroke="none" />
        </>
      );
    case 'pause':
      return (
        <>
          <Rect x={7.5} y={5.5} width={3.2} height={13} rx={1.4} fill={color} stroke="none" />
          <Rect x={13.3} y={5.5} width={3.2} height={13} rx={1.4} fill={color} stroke="none" />
        </>
      );
    case 'play':
      return <Path d="M8 5.5 18.5 12 8 18.5z" fill={color} stroke="none" />;
    case 'clock':
      return (
        <>
          <Circle cx={12} cy={12} r={8.5} {...common} />
          <Polyline points="12,7.4 12,12 15.6,14" {...common} />
        </>
      );
    case 'pin':
      return (
        <>
          <Path d="M12 21s6.6-6.2 6.6-10.6A6.6 6.6 0 0 0 5.4 10.4C5.4 14.8 12 21 12 21z" {...common} />
          <Circle cx={12} cy={10.2} r={2.4} {...common} />
        </>
      );
    case 'undo':
      return (
        <>
          <Polyline points="8,5 4,9 8,13" {...common} />
          <Path d="M4 9h8.5A6.5 6.5 0 1 1 12.5 22H9" {...common} />
        </>
      );
    case 'trash':
      return (
        <>
          <Polyline points="4.5,7 19.5,7" {...common} />
          <Path d="M6.5 7l1 12.2A1.8 1.8 0 0 0 9.3 21h5.4a1.8 1.8 0 0 0 1.8-1.8L17.5 7" {...common} />
          <Path d="M9.5 7V4.8A1.3 1.3 0 0 1 10.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3V7" {...common} />
        </>
      );
    case 'share':
      return (
        <>
          <Path d="M12 3.5v11" {...common} />
          <Polyline points="8,7.5 12,3.5 16,7.5" {...common} />
          <Path d="M5.5 13v5.5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V13" {...common} />
        </>
      );
    case 'user':
      return (
        <>
          <Circle cx={12} cy={8.6} r={3.9} {...common} />
          <Path d="M4.8 20.2c0-3.6 3.2-5.9 7.2-5.9s7.2 2.3 7.2 5.9" {...common} />
        </>
      );
    case 'trophy':
      return (
        <>
          <Path d="M8 4h8v5.2a4 4 0 0 1-8 0z" {...common} />
          <Path d="M8 5.4H5.4v1.4A3.2 3.2 0 0 0 8.6 10M16 5.4h2.6v1.4A3.2 3.2 0 0 1 15.4 10" {...common} />
          <Line x1={12} y1={13.2} x2={12} y2={17} {...common} />
          <Line x1={8.4} y1={20.2} x2={15.6} y2={20.2} {...common} />
          <Path d="M9.8 20.2c0-1.8 1-3.2 2.2-3.2s2.2 1.4 2.2 3.2" {...common} />
        </>
      );
    case 'qr':
      return (
        <>
          <Rect x={3.5} y={3.5} width={6.5} height={6.5} rx={1.4} {...common} />
          <Rect x={14} y={3.5} width={6.5} height={6.5} rx={1.4} {...common} />
          <Rect x={3.5} y={14} width={6.5} height={6.5} rx={1.4} {...common} />
          <Line x1={14} y1={14} x2={20.5} y2={14} {...common} />
          <Line x1={14} y1={17.2} x2={17.2} y2={17.2} {...common} />
          <Line x1={20.5} y1={17.2} x2={20.5} y2={20.5} {...common} />
          <Line x1={14} y1={20.5} x2={17.2} y2={20.5} {...common} />
        </>
      );
    case 'star':
      return (
        <Path
          d="M12 3.8l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8z"
          {...common}
        />
      );
    default:
      return <Circle cx={12} cy={12} r={8} {...common} />;
  }
}
