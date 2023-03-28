import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { Theme } from '../../../styled';
import Icon from '../Icon';

import {
  IButton as ButtonInterface,
  DEFAULT_VARIANT,
  LINK_VARIANT,
  ButtonStyled,
  LinkStyled,
  ContentStyled,
  SpinnerButton,
} from './ButtonStyled';

interface IButtonAttrs {
  asLink?: boolean;
  href?: string;
  selected?: boolean;
  backgroundColor?: keyof Theme['color'];
  className?: string;
}

export interface IButton extends ButtonInterface, IButtonAttrs {
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  icon?: string;
  isLoading?: boolean;
  iconColor?: keyof Theme['color'];
}

export default function Button({
  variant: buttonVariant,
  value,
  children,
  onClick,
  disabled,
  bold,
  uppercase,
  icon,
  color,
  asLink = false,
  href = '/',
  selected,
  backgroundColor,
  className,
  isLoading,
  underline = false,
  width,
  rotateIcon,
  iconSize: iconSizeProp,
  iconColor: iconColorProp,
  tabIndex,
  title = '',
}: IButton): ReactElement {
  const history = useHistory();
  const defaultVariant = asLink ? LINK_VARIANT : DEFAULT_VARIANT;
  const variant = buttonVariant || defaultVariant;
  const {
    button: { [variant]: buttonTheme },
    size,
  } = useTheme();
  const {
    disabled: { color: colorDisabled },
    iconSize,
  } = buttonTheme;

  const currentWidth = size[width as keyof Theme['size']] || width;
  const iconColor = (disabled ? colorDisabled : iconColorProp || color) as string;

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }

    e.preventDefault();

    if (!disabled) {
      history.push(href);
    }
  };

  if (asLink) {
    return (
      <LinkStyled
        variant={variant}
        href={href}
        onClick={handleLinkClick}
        disabled={disabled || isLoading}
        bold={bold}
        uppercase={uppercase}
        color={color}
        className={className}
        asLink={asLink}
        selected={selected}
        underline={underline}
        width={currentWidth}
        rotateIcon={rotateIcon}
        title={title}
      >
        {icon && <Icon name={icon} color={iconColor} size={iconSizeProp || iconSize} />}
        {children || value}
      </LinkStyled>
    );
  }

  return (
    <ButtonStyled
      variant={variant}
      onClick={onClick}
      disabled={disabled || isLoading}
      bold={bold}
      uppercase={uppercase}
      color={color}
      backgroundColor={backgroundColor}
      className={className}
      selected={selected}
      width={currentWidth}
      rotateIcon={rotateIcon}
      title={title}
      tabIndex={tabIndex}
    >
      <ContentStyled>
        {icon && <Icon name={icon} color={iconColor} size={iconSizeProp || iconSize} />}
        {children || value}
        {isLoading && <SpinnerButton />}
      </ContentStyled>
    </ButtonStyled>
  );
}
