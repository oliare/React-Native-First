import IToDoItem from '@/interfaces/ToDoList';
import { deleteItem } from '@/redux/slices/todoSlice';
import { deleteTask } from '@/services/tasksService';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

Notifications.setNotificationCategoryAsync('tasks-actions', [
    {
        identifier: 'show',
        buttonTitle: 'Show',
        options: { isDestructive: false, opensAppToForeground: true },
    },
    {
        identifier: 'delete',
        buttonTitle: 'Delete',
        options: { isDestructive: true, opensAppToForeground: true },
    },
]);

export const scheduleNotification = async (task: IToDoItem) => {
    const { deadline } = task;

    if (deadline) {
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Deadline approaching!",
                body: `Your task "${task.todo}" is due soon`,
                data: { taskId: task.id },
                categoryIdentifier: 'tasks-actions'
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: new Date(task.deadline),
            },
        });
        return notificationId;
    }
};

export const cancelNotification = async (notificationId: string) => {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();

    const toCancel = notifications.find((n) => n.identifier === notificationId);

    if (toCancel) {
        console.log("Cancelling notification:", notificationId);
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } else console.log(`No matching notification found for id: ${notificationId}`);
};

export const useNotifications = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const notify = Notifications.addNotificationResponseReceivedListener(
            async (response) => {
                const { actionIdentifier } = response;
                const taskId = response.notification.request.content.data?.taskId;

                if (!taskId) return;

                if (actionIdentifier === 'show') {
                    router.push(`/todoList`);
                }

                if (actionIdentifier === 'delete') {
                    console.log("Deleting task with id:", taskId);
                    await deleteTask(Number(taskId));
                    dispatch(deleteItem(Number(taskId)));
                }
            }
        );

        return () => {
            notify.remove();
        };
    }, [router, dispatch]);
};