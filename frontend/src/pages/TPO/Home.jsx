import React, { useState } from 'react';
import NoticeBox from '../../components/NoticeBox';
import NotificationBox from '../../components/NotificationBox';
import {
  FaUsers,
  FaUserCheck,
  FaBuilding,
  FaBullhorn,
  FaBriefcase,
  FaFileSignature,
  FaTrophy,
  FaChartBar,
  FaClock,
  FaCheckCircle,
  FaChevronRight,
  FaArrowUp,
  FaLaptopCode
} from 'react-icons/fa';

function Home() {
  document.title = 'CPMS | TPO Dashboard';

  const [activeTab, setActiveTab] = useState('branch'); // 'branch' or 'trends'

  // 1. Dashboard Statistic Cards Data
  const stats = [
    { label: 'Total Students', value: '1,240', icon: FaUsers, color: 'from-blue-500 to-indigo-600', description: 'Total enrolled final year' },
    { label: 'Eligible Students', value: '980', icon: FaUserCheck, color: 'from-emerald-400 to-teal-600', description: 'Cleared criteria & verified' },
    { label: 'Companies Registered', value: '42', icon: FaBuilding, color: 'from-amber-400 to-orange-600', description: 'Active recruitment partners' },
    { label: 'Active Drives', value: '8', icon: FaBullhorn, color: 'from-pink-500 to-rose-600', description: 'Ongoing campus recruitment' },
    { label: 'Internships Posted', value: '15', icon: FaBriefcase, color: 'from-violet-500 to-purple-600', description: 'Winter/Summer internships' },
    { label: 'Offers Released', value: '187', icon: FaFileSignature, color: 'from-cyan-400 to-blue-600', description: 'Total student job selections' },
    { label: 'Highest Package', value: '18.0 LPA', icon: FaTrophy, color: 'from-yellow-400 to-amber-600', description: 'Placed in Product/R&D' },
    { label: 'Average Package', value: '5.2 LPA', icon: FaChartBar, color: 'from-indigo-400 to-purple-500', description: 'Overall placement package' }
  ];

  // 2. Recent drives table data
  const companyDrives = [
    { name: 'Accenture', role: 'Associate Software Engineer', package: '4.5 LPA', branches: 'All Branches', status: 'Scheduled (25 June)', badgeColor: 'bg-indigo-100 text-indigo-800' },
    { name: 'Capgemini', role: 'Analyst', package: '4.25 LPA', branches: 'CS/IT/ECS/AIDS', status: 'Closing Tomorrow', badgeColor: 'bg-amber-100 text-amber-800' },
    { name: 'Infosys', role: 'Systems Engineer', package: '3.6 LPA', branches: 'CS/IT/MCA', status: 'OA Results Out', badgeColor: 'bg-emerald-100 text-emerald-800' },
    { name: 'Coforge', role: 'Graduate Engineer Trainee', package: '4.5 LPA', branches: 'CS/IT/ECS', status: 'Shortlist Released', badgeColor: 'bg-pink-100 text-pink-800' },
    { name: 'TCS', role: 'Ninja', package: '3.5 LPA', branches: 'All Branches', status: 'Applications Open', badgeColor: 'bg-blue-100 text-blue-800' },
    { name: 'Wipro', role: 'Project Engineer', package: '4.0 LPA', branches: 'All Branches', status: 'Completed', badgeColor: 'bg-slate-100 text-slate-800' },
    { name: 'HCLTech', role: 'Software Engineer', package: '3.8 LPA', branches: 'CS/IT/MCA', status: 'Applications Open', badgeColor: 'bg-sky-100 text-sky-800' }
  ];

  // 3. Recent Activity Feed
  const recentActivities = [
    { text: 'John Doe (CS) applied to Accenture drive.', time: '10 mins ago', type: 'application' },
    { text: 'Capgemini scheduled interview for 15 shortlisted students.', time: '1 hr ago', type: 'interview' },
    { text: 'HCLTech registered as a recruitment partner.', time: '3 hrs ago', type: 'registration' },
    { text: 'TPO Notice: Infosys OA results have been published.', time: '5 hrs ago', type: 'notice' },
    { text: 'Offer Letter uploaded: Jane Smith selected at Wipro.', time: '1 day ago', type: 'selection' }
  ];

  // 4. Branch placement statistics for chart
  const branchData = [
    { name: 'Computer', rate: 92, count: '320/348', color: 'bg-blue-500' },
    { name: 'AIDS', rate: 85, count: '170/200', color: 'bg-indigo-500' },
    { name: 'ECS', rate: 78, count: '195/250', color: 'bg-purple-500' },
    { name: 'Mechanical', rate: 55, count: '110/200', color: 'bg-amber-500' },
    { name: 'Civil', rate: 45, count: '90/200', color: 'bg-rose-500' }
  ];

  return (
    <div className="space-y-6 p-2 md:p-4 bg-slate-50 min-h-screen">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute left-1/3 bottom-0 -mb-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 border border-indigo-500/30">
            Overview Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, Training & Placement Officer
          </h1>
          <p className="text-slate-300 max-w-xl text-sm md:text-base">
            Manage student registrations, monitor drives, and track job offers released in the 2026 academic placement cycle.
          </p>
        </div>
      </div>

      {/* 1. Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-bold text-slate-800 tracking-tight block">
                    {stat.value}
                  </span>
                </div>
                <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-2 text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                  <IconComponent className="text-xl" />
                </div>
              </div>
              <div className="mt-3 border-t border-slate-100 pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {stat.description}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <FaArrowUp className="text-[8px]" /> Active
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Branch-wise Placement rate */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 col-span-1 lg:col-span-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Placement Analytics</h3>
              <p className="text-xs text-slate-400">Placement rate and offers count per engineering branch</p>
            </div>
            <div className="flex rounded-lg bg-slate-100 p-0.5">
              <button
                onClick={() => setActiveTab('branch')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'branch' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Branch Stats
              </button>
              <button
                onClick={() => setActiveTab('trends')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'trends' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Placement Trend
              </button>
            </div>
          </div>

          {activeTab === 'branch' ? (
            <div className="space-y-4 py-2">
              {branchData.map((branch, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${branch.color}`}></span>
                      {branch.name} Engineering
                    </span>
                    <span>{branch.rate}% ({branch.count} placed)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${branch.color}`}
                      style={{ width: `${branch.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Monthly Placement Trend SVG Line Chart */
            <div className="relative pt-4 pb-2">
              <div className="flex justify-between text-[10px] text-slate-400 absolute w-full top-2 px-1">
                <span>Offers Count</span>
                <span>Jan - June 2026 Trend</span>
              </div>
              <svg viewBox="0 0 500 200" className="w-full h-52 overflow-visible">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="40" y1="180" x2="480" y2="180" stroke="#cbd5e1" strokeWidth="1" />

                {/* Y Axis Labels */}
                <text x="15" y="24" fill="#94a3b8" className="text-[10px]">200</text>
                <text x="15" y="64" fill="#94a3b8" className="text-[10px]">150</text>
                <text x="15" y="104" fill="#94a3b8" className="text-[10px]">100</text>
                <text x="15" y="144" fill="#94a3b8" className="text-[10px]">50</text>
                <text x="20" y="184" fill="#94a3b8" className="text-[10px]">0</text>

                {/* Area under curve */}
                <path
                  d="M40 180 L40 168 Q 120 158, 128 158 Q 200 144, 216 144 Q 280 112, 304 112 Q 380 64, 392 64 Q 460 30, 480 30 L 480 180 Z"
                  fill="url(#lineGrad)"
                />

                {/* Line Path */}
                <path
                  d="M40 168 Q 120 158, 128 158 Q 200 144, 216 144 Q 280 112, 304 112 Q 380 64, 392 64 Q 460 30, 480 30"
                  fill="none"
                  stroke="url(#strokeGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="40" cy="168" r="4" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />
                <circle cx="128" cy="158" r="4" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />
                <circle cx="216" cy="144" r="4" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
                <circle cx="304" cy="112" r="4" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
                <circle cx="392" cy="64" r="4" fill="#ec4899" stroke="#fff" strokeWidth="1.5" />
                <circle cx="480" cy="30" r="4" fill="#ec4899" stroke="#fff" strokeWidth="1.5" />

                {/* X Axis Labels */}
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

        {/* Chart 2: Applications Funnel (Shortlisted & Hired Donut) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between col-span-1">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Drives Funnel</h3>
            <p className="text-xs text-slate-400">Application conversions across active placements</p>
          </div>

          <div className="flex justify-center items-center py-4 relative">
            <svg width="150" height="150" viewBox="0 0 36 36" className="transform -rotate-90">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" />
              {/* Shortlisted Rate circle (45%) */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeDasharray="45 55"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              {/* Selected Rate circle (18.7%) */}
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.2"
                strokeDasharray="18.7 81.3"
                strokeDashoffset="-45"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-800">18.7%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Selected</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center p-2 rounded bg-slate-50 border-l-4 border-slate-300">
              <span className="text-slate-600">Total Applications</span>
              <span className="font-bold text-slate-800">1,000</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-indigo-50 border-l-4 border-indigo-500">
              <span className="text-indigo-600">Shortlisted (45%)</span>
              <span className="font-bold text-indigo-800">450</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-emerald-50 border-l-4 border-emerald-500">
              <span className="text-emerald-600">Selected (18.7%)</span>
              <span className="font-bold text-emerald-800">187</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Company Drives & Secondary Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Company Drives Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm col-span-1 lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Recent recruitment drives</h3>
              <p className="text-xs text-slate-400">List of ongoing and finished company hiring campaigns</p>
            </div>
            <span className="text-xs text-slate-400">Total: 7 drives</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-semibold text-xs">
                <tr>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Package</th>
                  <th className="py-2.5 px-3">Eligibility</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companyDrives.map((drive, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-800 flex items-center gap-2">
                      <div className="h-7 w-7 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                        {drive.name[0]}
                      </div>
                      {drive.name}
                    </td>
                    <td className="py-3 px-3 text-xs">{drive.role}</td>
                    <td className="py-3 px-3 font-medium text-slate-800 text-xs">{drive.package}</td>
                    <td className="py-3 px-3 text-[11px] text-slate-500">{drive.branches}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${drive.badgeColor}`}>
                        {drive.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 2: Notifications, Notices & Activity Feed */}
        <div className="space-y-6 col-span-1">
          {/* Notifications and Notices components */}
          <div className="space-y-4">
            <NotificationBox />
            <NoticeBox />
          </div>

          {/* Activity Feed */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Recent Activity</h3>
              <p className="text-xs text-slate-400">Live feeds from portal applications & events</p>
            </div>

            <div className="relative border-l-2 border-slate-100 pl-4 space-y-5">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="relative text-xs">
                  {/* Timeline dot */}
                  <span className="absolute -left-[22px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-indigo-500 shadow-sm flex items-center justify-center text-[7px] text-white">
                    <FaCheckCircle className="text-[8px]" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-slate-700 leading-snug font-medium">{act.text}</p>
                    <span className="text-[10px] text-slate-400 block flex items-center gap-1">
                      <FaClock className="text-[8px]" /> {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
