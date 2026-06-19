import React, { useState } from 'react';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/NotificationBox';
import {
  FaUsers,
  FaUserCheck,
  FaBuilding,
  FaBullhorn,
  FaUserGraduate,
  FaPercent,
  FaTrophy,
  FaChartBar,
  FaArrowUp,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
  FaBuilding as FaCompany,
  FaArrowDown,
  FaGraduationCap
} from 'react-icons/fa';

function Home() {
  document.title = 'CPMS | Management Dashboard';

  const [chartTab, setChartTab] = useState('distribution'); // 'distribution' or 'conversion' or 'trends'

  // 1. Top KPI Cards Data
  const kpis = [
    { label: 'Total Students', value: '1,240', icon: FaUsers, color: 'from-sky-500 to-blue-600', desc: 'Final year cohort size' },
    { label: 'Registered Students', value: '1,185', icon: FaUserGraduate, color: 'from-indigo-500 to-violet-600', desc: 'Registered on CPMS portal' },
    { label: 'Companies Visited', value: '42', icon: FaBuilding, color: 'from-amber-400 to-orange-600', desc: 'Campus recruiters in 2026' },
    { label: 'Active Drives', value: '8', icon: FaBullhorn, color: 'from-rose-500 to-pink-600', desc: 'Recruitment runs in progress' },
    { label: 'Students Placed', value: '187', icon: FaUserCheck, color: 'from-teal-400 to-emerald-600', desc: 'Confirmed unique offers' },
    { label: 'Placement Percentage', value: '78.0%', icon: FaPercent, color: 'from-emerald-500 to-teal-700', desc: 'Placed out of eligible pool' },
    { label: 'Highest Package', value: '18.0 LPA', icon: FaTrophy, color: 'from-yellow-400 to-amber-600', desc: 'Highest CTC package package' },
    { label: 'Average Package', value: '5.2 LPA', icon: FaChartBar, color: 'from-violet-400 to-purple-600', desc: 'Average CTC package package' }
  ];

  // 2. Department Performance Table Data
  const departmentData = [
    { name: 'Computer Science', total: 320, eligible: 280, applied: 275, placed: 235, rate: 84, color: 'text-emerald-600 bg-emerald-50' },
    { name: 'CSDS (Data Science)', total: 180, eligible: 160, applied: 155, placed: 126, rate: 79, color: 'text-teal-600 bg-teal-50' },
    { name: 'Information Technology', total: 140, eligible: 130, applied: 125, placed: 95, rate: 76, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'ECS (Electronics/Comp)', total: 110, eligible: 100, applied: 95, placed: 65, rate: 68, color: 'text-amber-600 bg-amber-50' },
    { name: 'Civil Engineering', total: 90, eligible: 80, applied: 75, placed: 40, rate: 55, color: 'text-rose-600 bg-rose-50' }
  ];

  // 3. Top Recruiting Companies Section
  const topRecruiters = [
    { name: 'Accenture', package: '4.5 LPA', hired: 42, status: 'Active (Drives Scheduled)', statusColor: 'bg-indigo-100 text-indigo-800' },
    { name: 'Capgemini', package: '4.25 LPA', hired: 35, status: 'Interview Round', statusColor: 'bg-amber-100 text-amber-800' },
    { name: 'Infosys', package: '3.6 LPA', hired: 28, status: 'Shortlist Declared', statusColor: 'bg-emerald-100 text-emerald-800' },
    { name: 'Coforge', package: '4.5 LPA', hired: 15, status: 'Drives Completed', statusColor: 'bg-slate-100 text-slate-800' },
    { name: 'TCS', package: '3.5 LPA', hired: 32, status: 'Applications Open', statusColor: 'bg-blue-100 text-blue-800' },
    { name: 'Wipro', package: '4.0 LPA', hired: 20, status: 'Drives Completed', statusColor: 'bg-slate-100 text-slate-800' },
    { name: 'HCLTech', package: '3.8 LPA', hired: 10, status: 'Applications Open', statusColor: 'bg-sky-100 text-sky-800' },
    { name: 'Tech Mahindra', package: '3.25 LPA', hired: 5, status: 'Applications Open', statusColor: 'bg-orange-100 text-orange-800' }
  ];

  // 4. Recent Placement Activities Feed
  const recentActivities = [
    { text: '12 students shortlisted by Accenture for Technical Interviews.', time: '30 mins ago', badge: 'Shortlist' },
    { text: 'Capgemini interview results published to students.', time: '2 hrs ago', badge: 'Results' },
    { text: 'Infosys Online Assessment completed for 340 registered students.', time: '5 hrs ago', badge: 'Assessment' },
    { text: 'Coforge drive scheduled for 26th June.', time: '1 day ago', badge: 'Schedule' }
  ];

  // 5. Management Insights Data
  const insights = [
    { label: 'Best Performing Dept', value: 'Computer Science (84% Placed)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { label: 'Lowest Placement Dept', value: 'Civil Engineering (55% Placed)', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    { label: 'Placement YoY Growth', value: '+12.4% Compared to Last Year', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { label: 'Internship Conversion Rate', value: '64.5% Pre-Placement Offers', color: 'text-violet-700 bg-violet-50 border-violet-200' }
  ];

  return (
    <div className="space-y-6 p-2 md:p-4 bg-slate-50 min-h-screen text-slate-800">
      
      {/* Executive Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-indigo-500/15 blur-3xl"></div>
        <div className="absolute left-1/3 bottom-0 -mb-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 border border-indigo-500/30">
            Executive Dashboard
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Placement Performance & Analytics
          </h1>
          <p className="text-slate-300 max-w-xl text-sm md:text-base">
            Strategic view of placement indicators, branch comparisons, monthly hiring statistics, and conversion insights.
          </p>
        </div>
      </div>

      {/* 1. Statistics KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    {kpi.label}
                  </span>
                  <span className="text-2xl font-bold text-slate-800 tracking-tight block">
                    {kpi.value}
                  </span>
                </div>
                <div className={`rounded-lg bg-gradient-to-br ${kpi.color} p-2.5 text-white shadow-sm transition-transform duration-300 group-hover:rotate-12`}>
                  <Icon className="text-lg" />
                </div>
              </div>
              <div className="mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {kpi.desc}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <FaArrowUp className="text-[8px]" /> Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Management Insights Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Management Insights</h3>
          <p className="text-xs text-slate-400">Key metrics and highlights extracted for placement leadership</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className={`p-3.5 rounded-lg border flex flex-col justify-between space-y-2 ${insight.color}`}>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{insight.label}</span>
              <span className="text-sm font-black tracking-tight">{insight.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column 1 & 2: Main Chart view with tabs */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Placement Metrics Analysis</h3>
              <p className="text-xs text-slate-400">Visual indicators showing student status and monthly trends</p>
            </div>
            <div className="flex rounded-lg bg-slate-100 p-0.5">
              <button
                onClick={() => setChartTab('distribution')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  chartTab === 'distribution' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Distribution
              </button>
              <button
                onClick={() => setChartTab('conversion')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  chartTab === 'conversion' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Conversion
              </button>
              <button
                onClick={() => setChartTab('trends')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  chartTab === 'trends' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Trends
              </button>
            </div>
          </div>

          {chartTab === 'distribution' ? (
            /* Funnel progress for placement distribution status */
            <div className="space-y-4 py-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Registered for Placement (Applied)</span>
                  <span className="font-bold text-slate-800">1,185 Students (100%)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Shortlisted Candidates</span>
                  <span className="font-bold text-slate-800">620 Students (52.3%)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '52.3%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Interviewed Candidates</span>
                  <span className="font-bold text-slate-800">340 Students (28.7%)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '28.7%' }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Selected (Placed Offers)</span>
                  <span className="font-bold text-emerald-600">187 Students (15.7%)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '15.7%' }}></div>
                </div>
              </div>
            </div>
          ) : chartTab === 'conversion' ? (
            /* Conversion Rate Comparison (Donut circle visual in SVG) */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 items-center">
              <div className="flex justify-center items-center relative">
                <svg width="150" height="150" viewBox="0 0 36 36" className="transform -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                  {/* Internship Conversion (64.5%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3.5"
                    strokeDasharray="64.5 35.5"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Placement Conversion (18.7%) */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.7"
                    strokeDasharray="18.7 81.3"
                    strokeDashoffset="-64.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-800">64.5%</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Intern-to-PPO</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-700">Conversion Rate Metrics</h4>
                <p className="text-xs text-slate-500">Compare student selection ratios in internship drives vs conversion to full-time placement offers (PPO).</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-violet-500 block"></span>
                    <span>Student Internship rate: <strong>65%</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 block"></span>
                    <span>PPO Conversion Rate: <strong>64.5%</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Monthly Placement Curve Chart */
            <div className="relative pt-4 pb-2">
              <svg viewBox="0 0 500 200" className="w-full h-52 overflow-visible">
                <defs>
                  <linearGradient id="trendsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="180" x2="480" y2="180" stroke="#cbd5e1" strokeWidth="1" />

                <text x="15" y="24" fill="#94a3b8" className="text-[10px]">200</text>
                <text x="15" y="64" fill="#94a3b8" className="text-[10px]">150</text>
                <text x="15" y="104" fill="#94a3b8" className="text-[10px]">100</text>
                <text x="15" y="144" fill="#94a3b8" className="text-[10px]">50</text>

                <path
                  d="M40 180 L40 168 Q 120 158, 128 158 Q 200 144, 216 144 Q 280 112, 304 112 Q 380 64, 392 64 Q 460 30, 480 30 L 480 180 Z"
                  fill="url(#trendsGrad)"
                />
                <path
                  d="M40 168 Q 120 158, 128 158 Q 200 144, 216 144 Q 280 112, 304 112 Q 380 64, 392 64 Q 460 30, 480 30"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                <circle cx="40" cy="168" r="4" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
                <circle cx="128" cy="158" r="4" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
                <circle cx="216" cy="144" r="4" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
                <circle cx="304" cy="112" r="4" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
                <circle cx="392" cy="64" r="4" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />
                <circle cx="480" cy="30" r="4" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />

                <text x="35" y="195" fill="#94a3b8" className="text-[9px]">Jan (15)</text>
                <text x="118" y="195" fill="#94a3b8" className="text-[9px]">Feb (28)</text>
                <text x="206" y="195" fill="#94a3b8" className="text-[9px]">Mar (45)</text>
                <text x="294" y="195" fill="#94a3b8" className="text-[9px]">Apr (85)</text>
                <text x="382" y="195" fill="#94a3b8" className="text-[9px]">May (145)</text>
                <text x="465" y="195" fill="#94a3b8" className="text-[9px]">Jun (187)</text>
              </svg>
            </div>
          )}
        </div>

        {/* Chart Column 3: Branch-wise Placement Distribution */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between col-span-1">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Branch Distribution</h3>
            <p className="text-xs text-slate-400">Current placement performance by department</p>
          </div>
          <div className="space-y-4 py-2 my-auto">
            {departmentData.map((dept, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>{dept.name}</span>
                  <span className="font-bold text-slate-800">{dept.rate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      dept.rate >= 80 ? 'bg-emerald-500' : dept.rate >= 70 ? 'bg-indigo-500' : dept.rate >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${dept.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Tables and Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Performance Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm col-span-1 lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Department Performance</h3>
            <p className="text-xs text-slate-400">Detailed matric breakdowns per engineering stream</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold text-xs">
                <tr>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Total Students</th>
                  <th className="py-2.5 px-3">Eligible</th>
                  <th className="py-2.5 px-3">Applied</th>
                  <th className="py-2.5 px-3">Placed</th>
                  <th className="py-2.5 px-3 text-right">Placement %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {departmentData.map((dept, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-800">{dept.name}</td>
                    <td className="py-3 px-3">{dept.total}</td>
                    <td className="py-3 px-3 text-slate-500">{dept.eligible}</td>
                    <td className="py-3 px-3 text-slate-500">{dept.applied}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{dept.placed}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-block rounded-md px-2 py-0.5 font-black text-xs ${dept.color}`}>
                        {dept.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Recruiting Companies */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 col-span-1">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Top Recruiting Companies</h3>
            <p className="text-xs text-slate-400">Hiring statistics of major recruitment drives</p>
          </div>
          <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
            {topRecruiters.map((comp, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <span className="font-bold text-slate-800 text-xs block">{comp.name}</span>
                  <span className="text-[10px] text-slate-400 block">CTC: {comp.package}</span>
                </div>
                <div className="text-right space-y-1 flex flex-col items-end">
                  <span className="font-extrabold text-indigo-600 text-xs">{comp.hired} Hired</span>
                  <span className={`inline-block rounded px-1.5 py-0.5 text-[8px] font-bold ${comp.statusColor}`}>
                    {comp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Activities & Notifications Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placement Activity Feed */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 col-span-1 lg:col-span-2">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Recent Placement Activities</h3>
            <p className="text-xs text-slate-400">Latest updates on campus hiring events and shortlists</p>
          </div>
          <div className="relative border-l-2 border-slate-100 pl-4 space-y-5">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="relative text-xs">
                <span className="absolute -left-[22px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-indigo-500 shadow-sm flex items-center justify-center text-[7px] text-white">
                  <FaCheckCircle className="text-[8px]" />
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-700 leading-snug font-medium mb-0">{act.text}</p>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[9px] uppercase font-bold tracking-wider">
                      {act.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <FaClock className="text-[8px]" /> {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Notice & Notification Box placeholders */}
        <div className="space-y-4 col-span-1">
          <NotificationBox />
          <NoticeBox />
        </div>
      </div>

    </div>
  );
}

export default Home;
