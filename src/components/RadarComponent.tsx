import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export function RadarComponent({ data }: { data: { subject: string; A: number }[] }) {
  return (
    <div className="w-full h-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "#6B7280" }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: "#9CA3AF" }} />
          <Radar
            name="Skor"
            dataKey="A"
            stroke="#8B5CF6"
            fill="#C4B5FD"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}