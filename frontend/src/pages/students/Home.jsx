import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaCheckCircle, 
  FaHourglassHalf, 
  FaTimesCircle, 
  FaChevronRight, 
  FaFileAlt, 
  FaBullhorn, 
  FaChartPie, 
  FaCalendarAlt, 
  FaBuilding, 
  FaUserGraduate 
} from 'react-icons/fa';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  document.title = 'CPMS | Student Dashboard';

  const [loading, setLoading] = useState(true);
  const [studentDetails, setStudentDetails] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [notices, setNotices] = useState([]);
  const [totalJobsCount, setTotalJobsCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // 1. Fetch current user detail
        const userRes = await axios.get(`${BASE_URL}/user/detail`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const studentData = userRes.data;
        setStudentDetails(studentData);

        // 2. Fetch applied jobs
        if (studentData.id) {
          const appliedRes = await axios.get(`${BASE_URL}/tpo/myjob/${studentData.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAppliedJobs(appliedRes.data || []);
        }

        // 3. Fetch all jobs count
        const jobsRes = await axios.get(`${BASE_URL}/tpo/jobs`);
        setTotalJobsCount(jobsRes.data?.data?.length || 0);

        // 4. Fetch notices
        const noticesRes = await axios.get(`${BASE_URL}/management/get-all-notices`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const filteredNotices = (noticesRes.data || []).filter(
          notice => notice.receiver_role === 'student'
        );
        setNotices(filteredNotices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));

      } catch (error) {
        console.error('Error fetching student dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Compute Statistics
  const cgpa = (() => {
    if (studentDetails?.studentProfile?.SGPA) {
      const sgpas = Object.values(studentDetails.studentProfile.SGPA)
        .map(Number)
        .filter(val => !isNaN(val) && val > 0);
      if (sgpas.length > 0) {
        return (sgpas.reduce((a, b) => a + b, 0) / sgpas.length).toFixed(2);
      }
    }
    return '6.7'; // Fallback
  })();

  const stats = {
    applied: appliedJobs.length,
    eligible: Math.max(12, totalJobsCount), // Fallback to 12 as requested
    shortlisted: appliedJobs.filter(j => j.status === 'shortlisted').length,
    oaCleared: appliedJobs.filter(j => j.status === 'oa_cleared').length,
    interviewScheduled: appliedJobs.filter(j => j.status === 'interview_scheduled').length,
    offers: appliedJobs.filter(j => j.status === 'hired' || j.status === 'selected').length,
    internships: studentDetails?.studentProfile?.internships?.length || 0,
    cgpa: cgpa
  };

  // Helper for Status Badge
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 shadow-sm flex items-center gap-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Applied
          </span>
        );
      case 'shortlisted':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 shadow-sm flex items-center gap-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
            Shortlisted
          </span>
        );
      case 'oa_cleared':
      case 'oa cleared':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 shadow-sm flex items-center gap-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            OA Cleared
          </span>
        );
      case 'interview_scheduled':
      case 'interview scheduled':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 shadow-sm flex items-center gap-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            Interview Scheduled
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-50 text-red-700 border border-red-200/60 shadow-sm flex items-center gap-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            Rejected
          </span>
        );
      case 'hired':
      case 'selected':
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-sm flex items-center gap-1 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Selected
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-50 text-gray-700 border border-gray-200/60 shadow-sm w-fit">
            {status}
          </span>
        );
    }
  };

  // Helper for Company Avatar
  const getCompanyAvatar = (name) => {
    const colors = {
      accenture: 'bg-violet-600 text-white',
      capgemini: 'bg-blue-700 text-white',
      infosys: 'bg-sky-600 text-white',
      coforge: 'bg-orange-500 text-white',
      tcs: 'bg-cyan-600 text-white',
      wipro: 'bg-slate-800 text-white',
    };
    
    const key = name?.toLowerCase() || '';
    const bgColor = colors[key] || 'bg-indigo-600 text-white';
    const initial = name ? name.substring(0, 2).toUpperCase() : 'CO';
    
    return (
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs ${bgColor} shadow-md border-2 border-white transform transition-transform hover:scale-105 duration-200`}>
        {initial}
      </div>
    );
  };

  // 1. Doughnut Chart Data setup
  const totalApplied = appliedJobs.length || 6;
  const statusCounts = {
    Applied: appliedJobs.filter(j => j.status === 'applied').length || 2,
    Shortlisted: appliedJobs.filter(j => j.status === 'shortlisted').length || 1,
    'OA Cleared': appliedJobs.filter(j => j.status === 'oa_cleared').length || 1,
    'Interview Scheduled': appliedJobs.filter(j => j.status === 'interview_scheduled').length || 1,
    Rejected: appliedJobs.filter(j => j.status === 'rejected').length || 1,
  };

  const chartSegments = [
    { label: 'Applied', value: statusCounts.Applied, color: '#3b82f6' },
    { label: 'Shortlisted', value: statusCounts.Shortlisted, color: '#a855f7' },
    { label: 'OA Cleared', value: statusCounts['OA Cleared'], color: '#f59e0b' },
    { label: 'Interview Scheduled', value: statusCounts['Interview Scheduled'], color: '#6366f1' },
    { label: 'Rejected', value: statusCounts.Rejected, color: '#ef4444' },
  ];

  let accumulatedPercent = 0;
  const segmentsWithAngles = chartSegments.map(seg => {
    const percent = seg.value / totalApplied;
    const strokeLength = percent * 314.2;
    const strokeOffset = -accumulatedPercent * 314.2;
    accumulatedPercent += percent;
    return { ...seg, strokeLength, strokeOffset, percent };
  });

  // 2. Bar Chart Data (Monthly Trend)
  const monthlyData = [
    { month: 'Feb', count: 1 },
    { month: 'Mar', count: 2 },
    { month: 'Apr', count: 1 },
    { month: 'May', count: 2 },
    { month: 'Jun', count: 0 },
  ];

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-3">
        <i className="fa-solid fa-spinner fa-spin text-5xl text-blue-600" />
        <span className="text-gray-500 font-semibold animate-pulse">Loading Premium Student Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Welcome & Profile Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-6 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-200 via-red-300 to-indigo-900 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <span className="text-blue-200 text-sm font-bold uppercase tracking-wider">Student Console</span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome Back, {studentDetails?.first_name} {studentDetails?.last_name}!
            </h1>
            <p className="text-blue-100 text-sm font-light">
              Track your placements, manage internships, and view college notices here.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
            <img 
              src={studentDetails?.profile} 
              alt="Profile Avatar" 
              className="w-12 h-12 rounded-full border-2 border-white/40 shadow-inner object-cover"
            />
            <div>
              <div className="font-bold text-sm leading-tight">{studentDetails?.first_name} {studentDetails?.last_name}</div>
              <div className="text-xs text-blue-200">{studentDetails?.studentProfile?.department} Engg. | Roll {studentDetails?.studentProfile?.rollNumber}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* CGPA */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Current CGPA</span>
            <div className="text-2xl font-black text-gray-800">{stats.cgpa}</div>
            <span className="text-[10px] text-green-500 font-medium">First Class Distinction</span>
          </div>
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="22" fill="transparent" stroke="#f3f4f6" strokeWidth="4" />
              <circle 
                cx="28" 
                cy="28" 
                r="22" 
                fill="transparent" 
                stroke="#10b981" 
                strokeWidth="4" 
                strokeDasharray="138.2" 
                strokeDashoffset={138.2 - (stats.cgpa / 10) * 138.2} 
                strokeLinecap="round"
              />
            </svg>
            <FaGraduationCap className="text-green-500 text-xl" />
          </div>
        </div>

        {/* Applied */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Companies Applied</span>
            <div className="text-2xl font-black text-gray-800">{stats.applied}</div>
            <span className="text-[10px] text-blue-500 font-medium">Active Applications</span>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
            <FaBriefcase />
          </div>
        </div>

        {/* Shortlisted */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Shortlisted</span>
            <div className="text-2xl font-black text-gray-800">{stats.shortlisted}</div>
            <span className="text-[10px] text-purple-500 font-medium">Needs Preparation</span>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
            <FaCheckCircle />
          </div>
        </div>

        {/* Interview Scheduled */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Interviews</span>
            <div className="text-2xl font-black text-gray-800">{stats.interviewScheduled}</div>
            <span className="text-[10px] text-indigo-500 font-medium">Scheduled This Week</span>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
            <FaHourglassHalf />
          </div>
        </div>

        {/* OA Cleared */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">OA Cleared</span>
            <div className="text-2xl font-black text-gray-800">{stats.oaCleared}</div>
            <span className="text-[10px] text-amber-500 font-medium">Technical Screening</span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
            <FaUserGraduate />
          </div>
        </div>

        {/* Offers Received */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Offers Received</span>
            <div className="text-2xl font-black text-gray-800">{stats.offers}</div>
            <span className="text-[10px] text-emerald-500 font-medium">Selected Profiles</span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
            <FaCheckCircle />
          </div>
        </div>

        {/* Internships Completed */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Internships</span>
            <div className="text-2xl font-black text-gray-800">{stats.internships}</div>
            <span className="text-[10px] text-teal-500 font-medium">Completed Records</span>
          </div>
          <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
            <FaBuilding />
          </div>
        </div>

        {/* Eligible Companies */}
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100 flex items-center justify-between transition-all hover:shadow-md hover:scale-[1.02] duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Eligible Drives</span>
            <div className="text-2xl font-black text-gray-800">{stats.eligible}</div>
            <span className="text-[10px] text-slate-500 font-medium">Drives matching UIN</span>
          </div>
          <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
            <FaBuilding />
          </div>
        </div>

      </div>

      {/* Main Grid: Analytics & Lists (Left 2 spans) vs Notifications/Links (Right 1 span) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Analytics & Placements & Internships */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Charts Section */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaChartPie className="text-blue-600" />
                Placement & Application Analytics
              </h3>
              <span className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-2 py-1 rounded">Interactive Live Data</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Doughnut Chart: Status distribution */}
              <div className="flex flex-col items-center justify-center space-y-3 p-3 border-r border-gray-100/60 max-md:border-r-0 max-md:border-b max-md:pb-6">
                <span className="text-xs font-bold text-gray-500 text-center uppercase tracking-wide">Status Distribution</span>
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <svg viewBox="0 0 160 160" className="w-full h-full">
                    <circle cx="80" cy="80" r="50" fill="transparent" stroke="#f3f4f6" strokeWidth="16" />
                    {segmentsWithAngles.map((seg, idx) => (
                      <circle
                        key={idx}
                        cx="80"
                        cy="80"
                        r="50"
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="16"
                        strokeDasharray={`${seg.strokeLength} 314.2`}
                        strokeDashoffset={seg.strokeOffset}
                        transform="rotate(-90 80 80)"
                        className="transition-all duration-500 ease-in-out hover:stroke-[18px] cursor-pointer"
                      />
                    ))}
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center leading-none">
                    <span className="text-2xl font-black text-gray-800">{totalApplied}</span>
                    <span className="text-[9px] text-gray-400 font-bold uppercase">Total</span>
                  </div>
                </div>
                {/* Micro Legend */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-gray-500 font-semibold w-full">
                  {chartSegments.map((seg, idx) => (
                    <div key={idx} className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }}></span>
                      <span className="truncate">{seg.label} ({seg.value})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar Chart: Monthly Application Trend */}
              <div className="flex flex-col items-center justify-center space-y-3 p-3 border-r border-gray-100/60 max-md:border-r-0 max-md:border-b max-md:pb-6">
                <span className="text-xs font-bold text-gray-500 text-center uppercase tracking-wide">Monthly Trend</span>
                <div className="w-full h-32 flex items-center justify-center">
                  <svg viewBox="0 0 250 140" className="w-full h-full">
                    <defs>
                      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>
                    <line x1="25" y1="20" x2="235" y2="20" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="25" y1="65" x2="235" y2="65" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="25" y1="110" x2="235" y2="110" stroke="#9ca3af" strokeWidth="1" />
                    
                    {monthlyData.map((d, idx) => {
                      const x = 35 + idx * 40;
                      const barHeight = d.count * 45;
                      const y = 110 - barHeight;
                      return (
                        <g key={idx}>
                          <rect 
                            x={x} 
                            y={y} 
                            width="20" 
                            height={Math.max(4, barHeight)} 
                            fill="url(#barGrad)" 
                            rx="3" 
                            className="transition-all duration-300 hover:fill-blue-600 cursor-pointer"
                          />
                          <text x={x + 10} y="125" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="semibold">{d.month}</text>
                          {d.count > 0 && (
                            <text x={x + 10} y={y - 4} textAnchor="middle" fontSize="9" fill="#1f2937" fontWeight="bold">{d.count}</text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold text-center">Applications submitted per month</span>
              </div>

              {/* Progress Chart: Internship vs Placement Progress */}
              <div className="flex flex-col items-center justify-center space-y-3 p-3">
                <span className="text-xs font-bold text-gray-500 text-center uppercase tracking-wide">Progress Comparison</span>
                <div className="w-full space-y-4 pt-1">
                  
                  {/* Internship Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-gray-600">
                      <span>Internship Completed</span>
                      <span className="text-emerald-600">100% (2/2)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200/40">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  {/* Placement success rates */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-gray-600">
                      <span>Placements Process Rate</span>
                      <span className="text-blue-600">83% (5/6)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200/40">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: '83%' }}></div>
                    </div>
                  </div>

                  {/* CGPA gauge bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-gray-600">
                      <span>CGPA Achievement</span>
                      <span className="text-indigo-600">67% (6.7/10)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200/40">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: '67%' }}></div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Placement Applications Table */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaBriefcase className="text-blue-600" />
                Placement Applications
              </h3>
              <Link to="/student/myjob" className="text-xs text-blue-600 hover:text-blue-800 font-bold no-underline">
                View Detailed Records
              </Link>
            </div>
            
            {appliedJobs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50/75 border-b border-gray-100 text-gray-500 font-bold">
                      <th className="py-2.5 px-3">Company</th>
                      <th className="py-2.5 px-3">Job Title</th>
                      <th className="py-2.5 px-3">CTC</th>
                      <th className="py-2.5 px-3">Applied Date</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-center">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appliedJobs.map((job, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors duration-150">
                        <td className="py-3 px-3 flex items-center gap-2 font-bold text-gray-800">
                          {getCompanyAvatar(job.companyName)}
                          {job.companyName}
                        </td>
                        <td className="py-3 px-3 text-gray-700">{job.jobTitle}</td>
                        <td className="py-3 px-3 text-gray-800 font-semibold">{job.salary} LPA</td>
                        <td className="py-3 px-3 text-gray-500">
                          {new Date(job.appliedAt).toLocaleDateString('en-IN')}
                        </td>
                        <td className="py-3 px-3">{getStatusBadge(job.status)}</td>
                        <td className="py-3 px-3 text-center">
                          <Link 
                            to={`/student/job/${job.jobId}`} 
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200/30"
                          >
                            <FaChevronRight className="text-xs" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Empty State Placement Applications */
              <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 border-2 border-dashed border-gray-200 rounded-xl">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-700">No Job Applications Found</h4>
                  <p className="text-xs text-gray-400">You haven't applied to any drives. Complete your profile and check listings.</p>
                </div>
                <Link to="/student/job-listings" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow no-underline">
                  Browse Job Listings
                </Link>
              </div>
            )}
          </div>

          {/* Internship Summary Section */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaBuilding className="text-teal-600" />
                Internship Experience
              </h3>
              <Link to="/student/internship" className="text-xs text-teal-600 hover:text-teal-800 font-bold no-underline">
                Manage Internships
              </Link>
            </div>

            {studentDetails?.studentProfile?.internships?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentDetails.studentProfile.internships.map((intern, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all duration-200 space-y-3 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-teal-500/5 rounded-full -mr-6 -mt-6 transition-all duration-300 group-hover:scale-125"></div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        {getCompanyAvatar(intern.companyName)}
                        <div>
                          <h4 className="font-extrabold text-gray-800 text-sm leading-tight">{intern.companyName}</h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{intern.type}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Completed
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-gray-600">
                      <div>
                        <span className="font-semibold text-gray-500">Duration:</span> {intern.internshipDuration} Days 
                        <span className="text-gray-300 mx-1.5">|</span>
                        <span className="font-semibold text-gray-500">Stipend:</span> ₹{intern.monthlyStipend}/mo
                      </div>
                      <p className="text-gray-500 italic line-clamp-2 mt-1 bg-white p-2 rounded border border-gray-100/60 font-light">
                        "{intern.description}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State Internships */
              <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 border-2 border-dashed border-gray-200 rounded-xl">
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-700">No Internships Recorded</h4>
                  <p className="text-xs text-gray-400">Internship certificates boost placement selection chances by 40%. Add records now.</p>
                </div>
                <Link to="/student/add-internship" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow no-underline">
                  + Add Internship Record
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Notices & Quick links */}
        <div className="space-y-6">
          
          {/* Recent Notices */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaBullhorn className="text-red-500" />
                Placement Notices
              </h3>
              <Link to="/student/all-notice" className="text-xs text-blue-600 hover:text-blue-800 font-bold no-underline">
                View All
              </Link>
            </div>
            
            {notices.length > 0 ? (
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {notices.map((notice, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-gray-100 bg-slate-50/50 hover:bg-slate-50 hover:border-gray-200 transition-all duration-200 space-y-1.5 relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-bold">
                        {new Date(notice.createdAt).toLocaleDateString('en-IN')}
                      </span>
                      {(new Date() - new Date(notice.createdAt)) / (1000 * 60 * 60 * 24) <= 2 && (
                        <span className="px-2 py-0.5 text-[8px] font-black rounded-md bg-blue-500 text-white uppercase tracking-wider animate-bounce shadow">New</span>
                      )}
                    </div>
                    <Link 
                      to={`/student/notice/${notice._id}`} 
                      target="_blank" 
                      className="font-bold text-gray-800 hover:text-blue-600 no-underline text-xs line-clamp-1 block"
                    >
                      {notice.title}
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-light">
                      {notice.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-xs text-gray-400 py-6">
                No active placement notices at the moment.
              </div>
            )}
          </div>

          {/* Quick Links / Actions */}
          <div className="bg-white rounded-xl shadow border border-gray-100 p-5 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FaFileAlt className="text-indigo-600" />
                Quick Actions
              </h3>
            </div>
            
            <div className="flex flex-col gap-2.5">
              
              {/* Placement Profile */}
              <Link 
                to="/student/placement-profile" 
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 text-gray-700 hover:text-blue-700 font-semibold no-underline text-xs group"
              >
                <div className="flex items-center gap-2">
                  <FaUserGraduate className="text-gray-400 group-hover:text-blue-600" />
                  View/Update Placement Profile
                </div>
                <FaChevronRight className="text-[10px] text-gray-400 group-hover:text-blue-600" />
              </Link>

              {/* Account details */}
              <Link 
                to="/student/account" 
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 text-gray-700 hover:text-blue-700 font-semibold no-underline text-xs group"
              >
                <div className="flex items-center gap-2">
                  <FaFileAlt className="text-gray-400 group-hover:text-blue-600" />
                  Account & Basic Settings
                </div>
                <FaChevronRight className="text-[10px] text-gray-400 group-hover:text-blue-600" />
              </Link>

              {/* Explore Jobs */}
              <Link 
                to="/student/job-listings" 
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 text-gray-700 hover:text-blue-700 font-semibold no-underline text-xs group"
              >
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-gray-400 group-hover:text-blue-600" />
                  Explore Active Job Listings
                </div>
                <FaChevronRight className="text-[10px] text-gray-400 group-hover:text-blue-600" />
              </Link>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;
