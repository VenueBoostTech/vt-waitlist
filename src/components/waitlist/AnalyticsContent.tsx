import React from "react";
import { Lock } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data for the line charts
const timelineData = [
  { date: "2024-01", value: 10 },
  { date: "2024-02", value: 25 },
  { date: "2024-03", value: 45 },
  { date: "2024-04", value: 35 },
  { date: "2024-05", value: 60 },
];

// Mock data for bar charts
const referrerData = [
  { name: "Google", visits: 1200 },
  { name: "Direct", visits: 800 },
  { name: "Twitter", visits: 600 },
  { name: "LinkedIn", visits: 400 },
  { name: "Other", visits: 200 },
];

const utmSourceData = [
  { name: "newsletter", visits: 900 },
  { name: "social", visits: 700 },
  { name: "ads", visits: 500 },
  { name: "partner", visits: 300 },
  { name: "other", visits: 100 },
];

const ChartOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/60">
    <div className="text-center">
      <Lock className="h-6 w-6 text-[#a47764] mx-auto mb-2" />
      <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
        Upgrade
      </span>
    </div>
  </div>
);

// @ts-ignore
const MetricCard = ({ title, value }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-semibold mt-1">{value}</p>
  </div>
);

// @ts-ignore
const ChartCard = ({ title, children, rightLabel }) => (
  <div className="bg-white rounded-lg border border-gray-200 relative">
    <div className="p-6">
      <h3 className="text-base font-medium text-gray-900 mb-4 flex justify-between items-center">
        <span>{title}</span>
        {rightLabel && (
          <span className="text-sm text-[#a47764] bg-[#a47764]/10 px-2 py-1 rounded">
            {rightLabel}
          </span>
        )}
      </h3>
      <div className="h-64 relative">
        {children}
        <ChartOverlay />
      </div>
    </div>
  </div>
);

const AnalyticsContent = () => {
  return (
    <div className="space-y-8">
      {/* Metrics Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <MetricCard title="Total Signups" value="0" />
          <MetricCard title="Additional Unverified Signups" value="N/A" />
          <MetricCard title="Total Referrals" value="0" />
          <MetricCard title="Total Organic Signups" value="0" />
          <MetricCard title="Total Signups Offboarded" value="0" />
          <MetricCard title="Last Successful Signup" value="N/A" />
          <MetricCard title="Last Successful Referral" value="N/A" />
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Charts</h2>
        <div className="space-y-6">
          {/* @ts-ignore */}
          <ChartCard title="Waitlist Signups over Time">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#a47764"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* @ts-ignore */}
          <ChartCard title="Waitlist Views over Time">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#a47764"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* UTM Analytics Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          UTM Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard title="Referrer Sources" rightLabel="Visits">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referrerData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="visits" fill="#FFE5D1" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="UTM Sources" rightLabel="Visits">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utmSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="visits" fill="#E8F5E9" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="UTM Mediums" rightLabel="Visits">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utmSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="visits" fill="#E3F2FD" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="UTM Terms" rightLabel="Visits">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utmSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="visits" fill="#FFF3E0" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="UTM Contents" rightLabel="Visits">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utmSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="visits" fill="#EDE7F6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="UTM Campaigns" rightLabel="Visits">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utmSourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="visits" fill="#F3E5F5" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsContent;