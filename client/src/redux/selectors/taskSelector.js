import { createSelector } from 'reselect';

export const selectAllTasks = (state) => state.tasks.items || [];

export const selectCompletedTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => task.isDone)
);

export const selectPendingTasks = createSelector(
  [selectAllTasks],
  (tasks) => tasks.filter((task) => !task.isDone)
);

// export const makeFilteredTasksSelector = ({
//   searchTerm = '',
//   filterTagId = '',
//   fromDate = '',
//   toDate = '',
//   sortBy = 'none',
// }) =>
//   createSelector(
//     [selectPendingTasks, (state) => state.tags.items || []],
//     (tasks, allTags) => {
//       const priorityOrder = { high: 3, medium: 2, low: 1 };

//       const filtered = tasks
//         .filter((task) => task && typeof task.content === 'string')
//         .filter((task) =>
//           task.content.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .filter(
//           (task) =>
//             !filterTagId ||
//             (Array.isArray(task.tags) && task.tags.some((tag) => tag.id === filterTagId))
//         )
//         .filter((task) => {
//           const taskDate = new Date(task.deadline);
//           if (fromDate && taskDate < new Date(fromDate)) return false;
//           if (toDate && taskDate > new Date(toDate)) return false;
//           return true;
//         });

//       return filtered.sort((a, b) => {
//         if (sortBy === 'priority') {
//           return priorityOrder[b.priority] - priorityOrder[a.priority];
//         }

//         if (sortBy === 'deadline') {
//           return new Date(a.deadline || 0) - new Date(b.deadline || 0);
//         }

//         if (sortBy === 'tag') {
//           const getFirstTagName = (task) => {
//             const tag = task.tags?.[0];
//             return tag?.name?.toLowerCase() || '';
//           };
//           return getFirstTagName(a).localeCompare(getFirstTagName(b));
//         }

//         return 0;
//       });
//     }
//   );
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

