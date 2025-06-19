import React from 'react';
import { useSelector } from 'react-redux';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell
} from 'recharts';
import '../../assets/css/taskbytagchart.css'; // ⬅ thêm dòng này

export default function TaskByTagChart() {
  const tasks = useSelector(state => state.tasks.items || []);

  const tagCountMap = {};
  tasks.forEach(task => {
    if (Array.isArray(task.tags)) {
      task.tags.forEach(tag => {
        if (!tag || !tag.id) return;
        const key = tag.id;
        if (!tagCountMap[key]) {
          tagCountMap[key] = { name: tag.name, color: tag.color, count: 0 };
        }
        tagCountMap[key].count += 1;
      });
    }
  });

  const tagCounts = Object.values(tagCountMap);

  return (
    <div className="task-chart-wrapper">
      <h3 className="task-chart-title">Số lượng công việc theo thẻ</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={tagCounts} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Số công việc">
            {tagCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
