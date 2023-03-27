import { useTheme } from 'styled-components';
import { getStyleValue } from '../../../compositions';
import { AnObject } from '../../../types';
import * as icons from './icons';

interface IIcon {
  name: string;
  color?: string;
  size?: string | number;
  width?: number;
  height?: number;
}

export default function Icon({ name, color: colorProp, size, width, height }: IIcon): JSX.Element {
  const { color: colors, size: sizes } = useTheme();
  const { [name]: iconHref } = icons as AnObject;
  const currentColor = colorProp ? (colors as AnObject)[colorProp] : null;
  const rawSize = size ? (sizes as AnObject<number>)[size] : null;
  const currentSize = rawSize ? getStyleValue(rawSize) : size;

  const currentWidth = getStyleValue(width) || currentSize || undefined;
  const currentHeight = getStyleValue(height) || currentSize || undefined;

  const color = currentColor || colorProp;

  return (
    <svg
      stroke={color}
      fill={color}
      width={currentWidth}
      height={currentHeight}
      style={{ width: currentWidth, height: currentHeight, fill: color, stroke: color }}
    >
      <use href={`${iconHref}#${name}`} />
    </svg>
  );
}
