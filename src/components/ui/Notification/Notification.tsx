import React, { useState, useCallback, useRef, useEffect, ReactNode } from 'react';
import Icon from '../Icon';
import Button from '../Button';
import Container, { Pipe, MessageContainer, NotificationType, TextStyled } from './NotificationStyles';

interface INotificationProps {
  children: ReactNode;
  timeout?: number;
}

export interface INotification {
  type: NotificationType;
  message: string;
}

export interface INotificationContext {
  notifications: INotification[];
  notify: (type: NotificationType, message: string, timeout?: number) => INotification;
  remove: (notification: INotification, timeout?: number) => void;
  replaceNotificationMessage: (notification: INotification, message: string) => INotification;
  hasNotification: (notification: INotification) => boolean;
}

const initialData: INotificationContext = {
  notifications: [],
  notify: () => ({ type: NotificationType.SUCCESS, message: 'Success Message' }),
  remove: () => {},
  replaceNotificationMessage: () => ({ type: NotificationType.SUCCESS, message: 'Success Message' }),
  hasNotification: () => false,
};

const ICONS = {
  [NotificationType.SUCCESS]: 'check',
  [NotificationType.INFO]: 'info',
  [NotificationType.ERROR]: 'error',
};

const TITLES = {
  [NotificationType.SUCCESS]: 'Success',
  [NotificationType.INFO]: 'Info',
  [NotificationType.ERROR]: 'Error',
};

const DEFAULT_TIMEOUT = 10000;

function removeNotification(prevNotifications: INotification[], notification: INotification) {
  const newNotifications = [...prevNotifications];
  const index = newNotifications.indexOf(notification);
  newNotifications.splice(index, 1);

  return newNotifications;
}

export { NotificationType } from './NotificationStyles';
export const NotificationContext = React.createContext<INotificationContext>({ ...initialData });

export function NotificationProvider({ children, timeout = DEFAULT_TIMEOUT }: INotificationProps): JSX.Element {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const timeoutsRef = useRef<{ notification: INotification; timeout: NodeJS.Timeout }[]>([]);

  useEffect(() => {
    const { current: timeouts } = timeoutsRef;
    return () => {
      timeouts.forEach(({ timeout: currentTimeout }) => {
        clearTimeout(currentTimeout);
      });
    };
  }, []);

  const remove = useCallback(
    (notification: INotification, timeoutValue = timeout) => {
      if (timeoutValue > 0) {
        const timeoutIndex = setTimeout(() => {
          setNotifications((prevNotifications) => removeNotification(prevNotifications, notification));
        }, timeoutValue);
        timeoutsRef.current.push({
          timeout: timeoutIndex,
          notification,
        });

        return;
      }

      const { current: timeouts } = timeoutsRef;
      const pendingNotification = timeouts.find(
        ({ notification: currentNotification }) => currentNotification === notification,
      );
      if (pendingNotification) {
        clearTimeout(pendingNotification.timeout);
      }
      setNotifications((prevNotifications) => removeNotification(prevNotifications, notification));
    },
    [timeout],
  );

  const notify = useCallback(
    (type: NotificationType, message: string, timeoutValue = timeout): INotification => {
      const notification = { type, message };
      const newNotifications = [...notifications, notification];
      setNotifications([...newNotifications]);

      if (timeoutValue > 0) {
        remove(notification, timeoutValue);
      }

      return notification;
    },
    [notifications, remove, timeout],
  );

  const handleRemove = useCallback(
    (notification: INotification) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      remove(notification, 0);
    },
    [remove],
  );

  const replaceNotificationMessage = useCallback(
    (notification: INotification, message: string) => {
      const notificationIndex = notifications.indexOf(notification);
      if (notificationIndex < 0) {
        return notification;
      }

      const newNotification = { ...notifications[notificationIndex], message };
      const newNotifications = [...notifications];
      newNotifications.splice(notificationIndex, 1, newNotification);

      setNotifications(newNotifications);

      return newNotification;
    },
    [notifications],
  );

  const hasNotification = useCallback(
    (notification: INotification) => {
      return notifications.includes(notification);
    },
    [notifications],
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        remove,
        replaceNotificationMessage,
        hasNotification,
      }}
    >
      {children}
      {!!notifications.length && (
        <Container id="notification-container">
          {notifications.map((notification, i) => {
            const { type, message } = notification;
            return (
              <MessageContainer key={`${type}${message}${String(i)}`} type={type}>
                <Icon name={ICONS[type]} size="m" />
                <TextStyled type={type} typography="h6" bold>
                  {TITLES[type]}
                </TextStyled>
                <Pipe type={type} />
                <TextStyled type={type} typography="p1">
                  {message}
                </TextStyled>
                <Button icon="x" variant="fitted" iconSize="m" onClick={handleRemove(notification)} />
              </MessageContainer>
            );
          })}
        </Container>
      )}
    </NotificationContext.Provider>
  );
}
