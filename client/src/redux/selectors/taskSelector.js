import { createSelector } from 'reselect';

export const selectAllTasks = (state) => state.tasks.items || [];

export const selectTaskProgress = (state) => {
  const total = state.tasks.items?.length || 0;
  const completed = state.tasks.items?.filter(task => task.isDone)?.length || 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, percent };
};

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => task.isDone)
);

export const selectPendingTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => !task.isDone)
);

export const makeFilteredTasksSelector = ({
  searchTerm = '',
  filterTagId = '',
  fromDate = '',
  toDate = '',
  sortBy = 'none',
  showCompleted = false
}) =>
  createSelector(
    [selectAllTasks, (state) => state.tags.items || []],
    (tasks, allTags) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };

      const filtered = tasks
        .filter((task) => task && typeof task.content === 'string')
        .filter((task) =>
          task.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
          (task) =>
            !filterTagId ||
            (Array.isArray(task.tags) && task.tags.some((tag) => tag.id === filterTagId))
        )
        .filter((task) => {
          const taskDate = new Date(task.deadline);
          if (fromDate && taskDate < new Date(fromDate)) return false;
          if (toDate && taskDate > new Date(toDate)) return false;
          return true;
        })
        .filter((task) => (showCompleted ? true : !task.isDone));

      return filtered.sort((a, b) => {
        // Ưu tiên task được pin lên đầu
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        
        // Nếu cả hai đều được pin hoặc không được pin, sắp xếp theo tiêu chí khác
        if (sortBy === 'priority') {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        if (sortBy === 'deadline') {
          return new Date(a.deadline || 0) - new Date(b.deadline || 0);
        }
        return 0;
      });
    }
  );