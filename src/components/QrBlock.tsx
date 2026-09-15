import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { radius, scale } from '../theme';

interface QrBlockProps {
  value: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  quietZone?: number;
  dark?: string;
  light?: string;
  grid?: number;
}

function hash(input: string): number {
  let value = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 0x01000193) >>> 0;
  }
  return value >>> 0;
}

function buildMatrix(value: string, grid: number): boolean[][] {
  const seedBase = hash(value || 'shorelines-snooker');
  const matrix: boolean[][] = Array.from({ length: grid }, () => Array(grid).fill(false));

  let state = seedBase || 1;
  const nextBit = () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >> 17;
    state ^= state << 5;
    state >>>= 0;
    return (state & 1) === 1;
  };

  for (let row = 0; row < grid; row += 1) {
    for (let column = 0; column < grid; column += 1) {
      matrix[row][column] = nextBit();
    }
  }

  const finder = (originRow: number, originColumn: number) => {
    for (let row = 0; row < 3; row += 1) {
      for (let column = 0; column < 3; column += 1) {
        const targetRow = originRow + row;
        const targetColumn = originColumn + column;
        if (targetRow >= grid || targetColumn >= grid) {
          continue;
        }
        const edge = row === 0 || row === 2 || column === 0 || column === 2;
        const centre = row === 1 && column === 1;
        matrix[targetRow][targetColumn] = edge || centre;
      }
    }
  };

  finder(0, 0);
  finder(0, grid - 3);
  finder(grid - 3, 0);

  return matrix;
}

export function QrBlock({
  value,
  size = 120,
  style,
  quietZone = 8,
  dark = '#05070D',
  light = '#FFFFFF',
  grid = 9,
}: QrBlockProps): React.JSX.Element {
  const matrix = useMemo(() => buildMatrix(value, grid), [value, grid]);
  const box = scale(size);
  const pad = scale(quietZone);
  const inner = box - pad * 2;
  const cell = inner / grid;

  return (
    <View
      style={[
        styles.root,
        { width: box, height: box, padding: pad, backgroundColor: light },
        style,
      ]}>
      <Svg width={inner} height={inner}>
        {matrix.map((row, rowIndex) =>
          row.map((filled, columnIndex) =>
            filled ? (
              <Rect
                key={`${rowIndex}-${columnIndex}`}
                x={columnIndex * cell}
                y={rowIndex * cell}
                width={cell}
                height={cell}
                fill={dark}
              />
            ) : null,
          ),
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
