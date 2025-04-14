import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import CreateTaskForm from './../components/forms/CreateTaskForm';
import { Alert, StyleSheet } from 'react-native';
import { priorityColors } from '@/constants';

jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');
jest.mock('@/hooks/useNotifications', () => ({
    scheduleNotification: jest.fn(() => 'mock-notification-id'),
}));


describe('CreateTaskForm', () => {
    const mockOnAddTask = jest.fn();
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render all form elements correctly', () => {
        render(<CreateTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

        expect(screen.getByText('Create Task')).toBeTruthy();
        expect(screen.getByText(/Task:/)).toBeTruthy();
        expect(screen.getByTestId('task-input')).toBeTruthy();
        expect(screen.getByText('Priority:')).toBeTruthy();
        expect(screen.getByTestId('priority-picker')).toBeTruthy();
        expect(screen.getByText('Add')).toBeTruthy();
    });

    it('should show validation error when submitting empty task', async () => {
        render(<CreateTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

        fireEvent.press(screen.getByText('Add'));

        await waitFor(() => {
            expect(screen.getByText('Task is required')).toBeTruthy();
            expect(mockOnAddTask).not.toHaveBeenCalled();
        });
    });

    it('should submit form successfully with valid data', async () => {
        const futureDate = new Date();
        futureDate.setMinutes(futureDate.getMinutes() + 30);

        render(<CreateTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

        fireEvent.changeText(screen.getByTestId('task-input'), 'New Task');
        fireEvent(screen.getByTestId('date-picker'), 'onChange', {}, futureDate);
        fireEvent(screen.getByTestId('time-picker'), 'onChange', {}, futureDate);
        fireEvent.press(screen.getByText('Add'));

        await waitFor(() => {
            expect(mockOnAddTask).toHaveBeenCalledWith(
                expect.objectContaining({
                    todo: 'New Task',
                    priority: 'medium',
                    completed: false,
                })
            );
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    it('should show error for past deadline', async () => {
        jest.spyOn(Alert, 'alert');
        const pastDate = new Date();
        pastDate.setMinutes(pastDate.getMinutes() - 10);

        render(<CreateTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

        fireEvent.changeText(screen.getByTestId('task-input'), 'New Task');
        fireEvent(screen.getByTestId('date-picker'), 'onChange', {}, pastDate);
        fireEvent(screen.getByTestId('time-picker'), 'onChange', {}, pastDate);
        fireEvent.press(screen.getByText('Add'));

        await waitFor(() => {
            expect(Alert.alert).toHaveBeenCalledWith(
                'Error',
                'Deadline must be in the future and greater than 0 min'
            );
            expect(mockOnAddTask).not.toHaveBeenCalled();
        });
    });

    it('should close form when close button is pressed', async () => {
        render(<CreateTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

        fireEvent.press(screen.getByTestId('close-button'));

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    it('should update priority color when priority changes', () => {
        render(<CreateTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

        const initialDot = screen.getByTestId('priority-dot');
        const initialStyle = StyleSheet.flatten(initialDot.props.style);

        expect(initialStyle.backgroundColor).toBe(priorityColors.medium);

        fireEvent(screen.getByTestId('priority-picker'), 'onValueChange', 'high');

        const updatedDot = screen.getByTestId('priority-dot');
        const updatedStyle = StyleSheet.flatten(updatedDot.props.style);

        expect(updatedStyle.backgroundColor).toBe(priorityColors.high);
    });

    it('should handle notification scheduling', () => {
        const { scheduleNotification } = require('@/hooks/useNotifications');

        render(<CreateTaskForm onAddTask={mockOnAddTask} onClose={mockOnClose} />);

        fireEvent.changeText(screen.getByTestId('task-input'), 'New Task');
        fireEvent.press(screen.getByText('Add'));

        waitFor(() => {
            expect(scheduleNotification).toHaveBeenCalled();
            expect(mockOnAddTask).toHaveBeenCalledWith(
                expect.objectContaining({
                    notificationId: 'mock-notification-id'
                })
            );
        });
    });
});