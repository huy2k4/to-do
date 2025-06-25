import { Routes, Route, Navigate } from 'react-router-dom';
import TodoPage from '../pages/TodoPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import StatsPage from '../pages/StatsPage';
import TeamPage from '../pages/TeamPage';
import TaskInfoTable from '../components/TaskInfoTable/TaskInfoTable';
import TaskByTagChart from '../components/Charts/TaskByTagChart';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/stats" element={<StatsPage />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<TaskInfoTable />} />
        <Route path="statistics" element={<TaskByTagChart/>} />
      </Route>
    </Routes>
  );
}
