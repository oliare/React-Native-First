import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ToDoList from '@/app/(tabs)/todoList';
import * as Notifications from 'expo-notifications';
import * as tasksService from '@/services/tasksService';
import { Provider } from 'react-redux';
import { store } from "@/redux/store";

jest.mock('expo-sqlite', () => {
  const mockDB = {
      exec: jest.fn(),
      close: jest.fn(),
  };
  return {
      openDatabaseSync: jest.fn(() => mockDB),
  };
}); 
jest.mock('expo-notifications');
jest.mock('@/services/tasksService');


const mockTasks = [
  {
    id: 1,
    todo: 'Test Task',
    date: new Date().toISOString(),
    status: 'in progress',
    notificationId: '1',
    priority: 'low',
  },
];

describe('ToDoList', () => {
  beforeEach(() => {
    (tasksService.getTasks as jest.Mock).mockResolvedValue(mockTasks);
    (Notifications.cancelScheduledNotificationAsync as jest.Mock).mockResolvedValue(undefined);
  });

  it('delete and cancel notification', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <ToDoList />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText('Test Task')).toBeTruthy();
    });

    const deleteBtn = getByText('Image' ); 
    fireEvent.press(deleteBtn);

    await waitFor(() => {
      expect(Notifications.cancelScheduledNotificationAsync).toHaveBeenCalledWith('notif-123');
    });
  });
});
