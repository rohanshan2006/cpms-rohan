import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { 
  LuUsers, 
  LuBuilding, 
  LuActivity, 
  LuCalendar, 
  LuBriefcase, 
  LuGraduationCap, 
  LuTrendingUp, 
  LuCheck, 
  LuPlus, 
  LuSend, 
  LuDownload, 
  LuFileText, 
  LuBell, 
  LuDollarSign, 
  LuClock,
  LuLayoutDashboard
} from 'react-icons/lu';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {
  document.title = 'CPMS | Admin Dashboard';

  const [countUsers, setCountUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState('');

  // Fetch users count on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/all-users`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setCountUsers(response.data);
      } catch (error) {
        console.log("Home.jsx => ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Set time clock
    const updateTime = () => {
      const now = new Date();
      setDateTime(now.toLocaleDateString('en-IN', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }) + ' | ' + now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handler for exporting report
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Department,Total Students,Eligible Students,Placed Students,Placement Percentage,Highest Package\n"
      + "CSE,320,280,268,84%,18.0 LPA\n"
      + "CSDS,180,160,126,79%,15.5 LPA\n"
      + "IT,140,130,95,76%,14.0 LPA\n"
      + "ECS,110,100,65,68%,12.0 LPA\n"
      + "AIDS,90,80,40,50%,11.5 LPA\n"
      + "Mechanical,70,60,30,50%,8.5 LPA\n"
      + "Civil,50,45,20,44%,6.0 LPA\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "CPMS_Admin_Placement_Report_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Blending DB live stats with realistic fallback cohorts
  const stats = {
    totalStudents: 1240,
    portalRegistered: countUsers.studentUsers || 51,
    totalCompanies: 42,
    activeDrives: 8,
    internshipsCount: 15,
    placedStudents: 187,
    placementPercentage: "78%",
    activeRecruiters: 8,
    pendingApprovals: countUsers.studentApprovalPendingUsers || 0
  };

  // Top recruiters data
  const recruiters = [
    { name: "Accenture", package: "4.5 LPA", hired: 42, openings: 3, logoBg: "bg-purple-100 text-purple-700" },
    { name: "Capgemini", package: "4.25 LPA", hired: 35, openings: 2, logoBg: "bg-blue-100 text-blue-700" },
    { name: "Infosys", package: "3.6 LPA", hired: 28, openings: 4, logoBg: "bg-green-100 text-green-700" },
    { name: "TCS", package: "3.5 LPA", hired: 32, openings: 6, logoBg: "bg-red-100 text-red-700" },
    { name: "Wipro", package: "4.0 LPA", hired: 20, openings: 1, logoBg: "bg-sky-100 text-sky-700" },
    { name: "Coforge", package: "4.5 LPA", hired: 15, openings: 2, logoBg: "bg-indigo-100 text-indigo-700" },
    { name: "HCLTech", package: "3.8 LPA", hired: 10, openings: 3, logoBg: "bg-slate-100 text-slate-700" },
    { name: "Tech Mahindra", package: "3.25 LPA", hired: 5, openings: 2, logoBg: "bg-orange-100 text-orange-700" }
  ];

  // Branch Performance
  const departments = [
    { name: "CSE (Computer Science)", total: 320, eligible: 280, placed: 268, rate: "84%", highest: "18.0 LPA" },
    { name: "CSDS (Data Science)", total: 180, eligible: 160, placed: 126, rate: "79%", highest: "15.5 LPA" },
    { name: "IT (Information Tech)", total: 140, eligible: 130, placed: 95, rate: "76%", highest: "14.0 LPA" },
    { name: "ECS (Electronics & Comp)", total: 110, eligible: 100, placed: 65, rate: "68%", highest: "12.0 LPA" },
    { name: "AIDS (AI & Data Science)", total: 90, eligible: 80, placed: 45, rate: "56%", highest: "11.5 LPA" },
    { name: "Mechanical Engg", total: 70, eligible: 60, placed: 30, rate: "50%", highest: "8.5 LPA" },
    { name: "Civil Engg", total: 50, eligible: 45, placed: 20, rate: "44%", highest: "6.0 LPA" }
  ];

  // Recent Activity Feed
  const recentActivities = [
    { text: "Accenture Drive: 12 students shortlisted for final technical interviews.", time: "10 mins ago", type: "drive" },
    { text: "New Recruiter Registered: Tech Mahindra profile completed and verified.", time: "45 mins ago", type: "company" },
    { text: "Notice Published: Capgemini Exceller Registration Deadline extended.", time: "2 hrs ago", type: "notice" },
    { text: "Internship Approved: Aarav Sharma (CSE) - Google Software Intern.", time: "3 hrs ago", type: "intern" },
    { text: "Student Account registered: Vihaan Patel (U2022023) CSDS portal created.", time: "5 hrs ago", type: "student" }
  ];

  // Notifications
  const notifications = [
    { msg: "Accenture drive scheduled for 25 June.", priority: "high", time: "Today" },
    { msg: "Capgemini registration closing today at 11:59 PM.", priority: "high", time: "Today" },
    { msg: "Pending TPO Approval: 2 job drive postings require validation.", priority: "medium", time: "1 day ago" },
    { msg: "System database backup completed successfully.", priority: "low", time: "2 days ago" }
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-50 min-h-screen text-slate-800">
      
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute left-1/3 bottom-0 -mb-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300 border border-indigo-500/30">
              <LuLayoutDashboard className="w-3.5 h-3.5" />
              System Control Center
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome Back, System Administrator
            </h1>
            <p className="text-slate-300 max-w-xl text-sm md:text-base">
              Monitor university placements, manage TPO & Management portals, authorize student profiles, and review campus drive analytics.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-right flex flex-col justify-center max-md:text-left self-start">
            <div className="text-xs text-indigo-200 font-bold uppercase tracking-widest flex items-center gap-1">
              <LuCalendar className="w-3.5 h-3.5" />
              Session 2026-27
            </div>
            <div className="text-sm font-semibold mt-1 text-white flex items-center gap-1.5">
              <LuClock className="w-4 h-4 text-emerald-400" />
              {dateTime || "Loading Time..."}
            </div>
          </div>
        </div>
      </div>

      {/* 2. TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Students */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Cohort Size</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalStudents}</h3>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <LuUsers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            <span className="font-semibold text-emerald-600 inline-flex items-center">
              +12.4% <i className="fa-solid fa-caret-up ml-0.5"></i>
            </span>
            <span>({stats.portalRegistered} registered on portal)</span>
          </div>
        </div>

        {/* Total Companies */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Companies</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalCompanies}</h3>
            </div>
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <LuBuilding className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            <span className="font-semibold text-emerald-600 inline-flex items-center">
              +8.5% <i className="fa-solid fa-caret-up ml-0.5"></i>
            </span>
            <span>recruiting partners</span>
          </div>
        </div>

        {/* Total Job Drives */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Job Drives Posted</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.activeDrives}</h3>
            </div>
            <div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl">
              <LuActivity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Active</span>
            <span>recruitment rounds</span>
          </div>
        </div>

        {/* Total Internships */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Internships</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.internshipsCount}</h3>
            </div>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <LuBriefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            <span className="font-semibold text-emerald-600 inline-flex items-center">
              +14% <i className="fa-solid fa-caret-up ml-0.5"></i>
            </span>
            <span>approved placements</span>
          </div>
        </div>

        {/* Students Placed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Students Placed</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.placedStudents}</h3>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <LuGraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            <span className="font-semibold text-emerald-600 inline-flex items-center">
              +15% <i className="fa-solid fa-caret-up ml-0.5"></i>
            </span>
            <span>YoY unique offers</span>
          </div>
        </div>

        {/* Placement Percentage */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Placement Rate</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.placementPercentage}</h3>
            </div>
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <LuTrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            <span className="font-semibold text-emerald-600 inline-flex items-center">
              +3.2% <i className="fa-solid fa-caret-up ml-0.5"></i>
            </span>
            <span>higher than 2025 cohort</span>
          </div>
        </div>

        {/* Active Recruiters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active Recruiters</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.activeRecruiters}</h3>
            </div>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <LuBuilding className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">Stable</span>
            <span>recruiting drives</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Pending Approvals</span>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.pendingApprovals}</h3>
            </div>
            <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
              <LuCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs flex items-center gap-1.5 text-slate-500">
            {stats.pendingApprovals > 0 ? (
              <Link to="../admin/approve-student" className="font-bold text-rose-600 no-underline hover:text-rose-800 transition-colors">
                Action Required <Badge bg="danger" pill className="ml-1 text-[10px]">Verify</Badge>
              </Link>
            ) : (
              <span className="text-slate-400 font-semibold">No pending registrations</span>
            )}
          </div>
        </div>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <LuActivity className="w-4 h-4 text-indigo-600" />
          Quick Actions Portal
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link to="/admin/add-company" className="no-underline text-center p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-700 font-medium text-xs flex flex-col items-center justify-center gap-2 transition-all">
            <LuPlus className="w-5 h-5 text-indigo-500" />
            Add Company
          </Link>
          <Link to="/admin/post-job" className="no-underline text-center p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 font-medium text-xs flex flex-col items-center justify-center gap-2 transition-all">
            <LuPlus className="w-5 h-5 text-emerald-500" />
            Add Job Drive
          </Link>
          <Link to="/admin/add-tpo-admin" className="no-underline text-center p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium text-xs flex flex-col items-center justify-center gap-2 transition-all">
            <LuPlus className="w-5 h-5 text-blue-500" />
            Add TPO
          </Link>
          <Link to="/admin/add-management-admin" className="no-underline text-center p-3 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-700 font-medium text-xs flex flex-col items-center justify-center gap-2 transition-all">
            <LuPlus className="w-5 h-5 text-purple-500" />
            Add Management
          </Link>
          <Link to="/admin/send-notice" className="no-underline text-center p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-700 font-medium text-xs flex flex-col items-center justify-center gap-2 transition-all">
            <LuSend className="w-5 h-5 text-amber-500" />
            Publish Notice
          </Link>
          <button onClick={handleExport} className="no-underline text-center p-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-700 font-medium text-xs flex flex-col items-center justify-center gap-2 transition-all">
            <LuDownload className="w-5 h-5 text-rose-500" />
            Export Reports
          </button>
        </div>
      </div>

      {/* 6. PLACEMENT OVERVIEW FINANCIALS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <LuDollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Highest Package</span>
            <span className="text-lg font-black text-slate-800">₹18.0 LPA</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <LuDollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average Package</span>
            <span className="text-lg font-black text-slate-800">₹7.2 LPA</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <LuDollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Median Package</span>
            <span className="text-lg font-black text-slate-800">₹6.5 LPA</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center gap-3.5">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <LuFileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Offers Issued</span>
            <span className="text-lg font-black text-slate-800">145 Offers</span>
          </div>
        </div>
      </div>

      {/* 3. PLACEMENT ANALYTICS (CUSTOM SVG CHARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Students Placed by Department */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm">Students Placed by Department</h3>
            <span className="text-xs text-slate-400">Total: 699 Placements</span>
          </div>
          <div className="relative pt-2">
            <svg viewBox="0 0 500 220" className="w-full h-56 overflow-visible">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Y Axis Labels */}
              <text x="30" y="24" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">250</text>
              <text x="30" y="64" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">180</text>
              <text x="30" y="104" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">120</text>
              <text x="30" y="144" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">60</text>
              <text x="30" y="184" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">0</text>

              {/* Bars with Gradient fill */}
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>

              {/* CSE - 268 (Height: 160) */}
              <rect x="55" y="20" width="32" height="160" rx="4" fill="url(#barGrad)" className="hover:opacity-90 transition-opacity cursor-pointer" />
              <text x="71" y="15" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">268</text>
              <text x="71" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">CSE</text>

              {/* CSDS - 126 (Height: 80) */}
              <rect x="115" y="100" width="32" height="80" rx="4" fill="url(#barGrad)" className="hover:opacity-90 transition-opacity cursor-pointer" />
              <text x="131" y="95" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">126</text>
              <text x="131" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">CSDS</text>

              {/* IT - 95 (Height: 62) */}
              <rect x="175" y="118" width="32" height="62" rx="4" fill="url(#barGrad)" className="hover:opacity-90 transition-opacity cursor-pointer" />
              <text x="191" y="113" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">95</text>
              <text x="191" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">IT</text>

              {/* ECS - 65 (Height: 42) */}
              <rect x="235" y="138" width="32" height="42" rx="4" fill="url(#barGrad)" className="hover:opacity-90 transition-opacity cursor-pointer" />
              <text x="251" y="133" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">65</text>
              <text x="251" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">ECS</text>

              {/* AIDS - 45 (Height: 28) */}
              <rect x="295" y="152" width="32" height="28" rx="4" fill="url(#barGrad)" className="hover:opacity-90 transition-opacity cursor-pointer" />
              <text x="311" y="147" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">45</text>
              <text x="311" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">AIDS</text>

              {/* Mechanical - 30 (Height: 20) */}
              <rect x="355" y="160" width="32" height="20" rx="4" fill="url(#barGrad)" className="hover:opacity-90 transition-opacity cursor-pointer" />
              <text x="371" y="155" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">30</text>
              <text x="371" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">Mech</text>

              {/* Civil - 20 (Height: 12) */}
              <rect x="415" y="168" width="32" height="12" rx="4" fill="url(#barGrad)" className="hover:opacity-90 transition-opacity cursor-pointer" />
              <text x="431" y="163" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">20</text>
              <text x="431" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">Civil</text>
            </svg>
          </div>
        </div>

        {/* Chart 2: Placement Trend (12 Months) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm">Placement Trend (Offers Released)</h3>
            <span className="text-xs text-slate-400">Cumulative Progress</span>
          </div>
          <div className="relative pt-2">
            <svg viewBox="0 0 500 220" className="w-full h-56 overflow-visible">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Y Axis */}
              <text x="30" y="24" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">150</text>
              <text x="30" y="74" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">100</text>
              <text x="30" y="124" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">50</text>
              <text x="30" y="184" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">0</text>

              {/* Line points: Jan(10), Feb(15), Mar(25), Apr(40), May(65), Jun(85), Jul(105), Aug(120), Sep(130), Oct(135), Nov(140), Dec(145) */}
              {/* Map points: Jan (45, 174), Feb (85, 168), Mar (125, 156), Apr (165, 140), May (205, 115), Jun (245, 95), Jul (285, 75), Aug (325, 60), Sep (365, 50), Oct (405, 45), Nov (445, 40), Dec (475, 35) */}
              <path 
                d="M 45 174 L 85 168 L 125 156 L 165 140 L 205 115 L 245 95 L 285 75 L 325 60 L 365 50 L 405 45 L 445 40 L 475 35" 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="3.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Area Under the Line */}
              <path 
                d="M 45 174 L 85 168 L 125 156 L 165 140 L 205 115 L 245 95 L 285 75 L 325 60 L 365 50 L 405 45 L 445 40 L 475 35 L 475 180 L 45 180 Z" 
                fill="url(#areaGrad)" 
                opacity="0.12"
              />

              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Dots for key points */}
              <circle cx="245" cy="95" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <circle cx="475" cy="35" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="245" y="85" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700">85 (Jun)</text>
              <text x="475" y="25" textAnchor="end" className="text-[9px] font-bold fill-emerald-700">145 (Dec)</text>

              {/* X Axis Labels */}
              <text x="45" y="196" textAnchor="middle" className="text-[9px] fill-slate-400 font-semibold">Jan</text>
              <text x="125" y="196" textAnchor="middle" className="text-[9px] fill-slate-400 font-semibold">Mar</text>
              <text x="205" y="196" textAnchor="middle" className="text-[9px] fill-slate-400 font-semibold">May</text>
              <text x="285" y="196" textAnchor="middle" className="text-[9px] fill-slate-400 font-semibold">Jul</text>
              <text x="365" y="196" textAnchor="middle" className="text-[9px] fill-slate-400 font-semibold">Sep</text>
              <text x="445" y="196" textAnchor="middle" className="text-[9px] fill-slate-400 font-semibold">Nov</text>
            </svg>
          </div>
        </div>

        {/* Chart 3: Company Wise Hiring Distribution */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm">Recruiter Hiring Distribution</h3>
            <span className="text-xs text-slate-400">Total Hired: 187</span>
          </div>
          <div className="relative pt-2">
            <svg viewBox="0 0 500 220" className="w-full h-56 overflow-visible">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Y Axis Labels */}
              <text x="30" y="24" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">50</text>
              <text x="30" y="60" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">35</text>
              <text x="30" y="100" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">20</text>
              <text x="30" y="140" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">5</text>

              {/* Area path */}
              <path 
                d="M 45 45 L 95 68 L 145 92 L 195 78 L 245 116 L 295 132 L 345 147 L 395 163 L 445 163 M 445 180 L 45 180 Z" 
                fill="url(#areaGradPurple)" 
                opacity="0.25"
              />
              <path 
                d="M 45 45 L 95 68 L 145 92 L 195 78 L 245 116 L 295 132 L 345 147 L 395 163 L 445 163" 
                fill="none" 
                stroke="#8b5cf6" 
                strokeWidth="2.5" 
              />

              <defs>
                <linearGradient id="areaGradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Dots */}
              <circle cx="45" cy="45" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
              <text x="45" y="35" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">42</text>
              <circle cx="95" cy="68" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
              <text x="95" y="58" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">35</text>
              <circle cx="145" cy="92" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
              <text x="145" y="82" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">28</text>

              {/* X Labels */}
              <text x="45" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">Accenture</text>
              <text x="95" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">Capgemini</text>
              <text x="145" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">Infosys</text>
              <text x="195" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">TCS</text>
              <text x="245" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">Wipro</text>
              <text x="295" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">Coforge</text>
              <text x="345" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">HCLTech</text>
              <text x="395" y="196" textAnchor="middle" className="text-[8px] fill-slate-400 font-semibold">TechM</text>
            </svg>
          </div>
        </div>

        {/* Chart 4: Highest vs Average Package */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-slate-800 text-sm">Package Comparison (Highest vs Average)</h3>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center text-xs font-semibold text-amber-500">
                <span className="w-2.5 h-2.5 mr-1 bg-amber-500 rounded-sm"></span> Highest
              </span>
              <span className="inline-flex items-center text-xs font-semibold text-indigo-500">
                <span className="w-2.5 h-2.5 mr-1 bg-indigo-500 rounded-sm"></span> Average
              </span>
            </div>
          </div>
          <div className="relative pt-2">
            <svg viewBox="0 0 500 220" className="w-full h-56 overflow-visible">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Y Axis Labels */}
              <text x="30" y="24" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">20L</text>
              <text x="30" y="64" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">15L</text>
              <text x="30" y="104" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">10L</text>
              <text x="30" y="144" textAnchor="end" className="text-[10px] fill-slate-400 font-semibold">5L</text>

              {/* CSE: 18.0 vs 7.2 (Height: 144 vs 58) */}
              <rect x="52" y="36" width="12" height="144" rx="2" fill="#f59e0b" />
              <rect x="66" y="122" width="12" height="58" rx="2" fill="#4f46e5" />
              <text x="65" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">CSE</text>

              {/* CSDS: 15.5 vs 6.8 (Height: 124 vs 54) */}
              <rect x="112" y="56" width="12" height="124" rx="2" fill="#f59e0b" />
              <rect x="126" y="126" width="12" height="54" rx="2" fill="#4f46e5" />
              <text x="125" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">CSDS</text>

              {/* IT: 14.0 vs 6.5 (Height: 112 vs 52) */}
              <rect x="172" y="68" width="12" height="112" rx="2" fill="#f59e0b" />
              <rect x="186" y="128" width="12" height="52" rx="2" fill="#4f46e5" />
              <text x="185" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">IT</text>

              {/* ECS: 12.0 vs 5.8 (Height: 96 vs 46) */}
              <rect x="232" y="84" width="12" height="96" rx="2" fill="#f59e0b" />
              <rect x="246" y="134" width="12" height="46" rx="2" fill="#4f46e5" />
              <text x="245" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">ECS</text>

              {/* AIDS: 11.5 vs 5.5 (Height: 92 vs 44) */}
              <rect x="292" y="88" width="12" height="92" rx="2" fill="#f59e0b" />
              <rect x="306" y="136" width="12" height="44" rx="2" fill="#4f46e5" />
              <text x="305" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">AIDS</text>

              {/* Mech: 8.5 vs 4.8 (Height: 68 vs 38) */}
              <rect x="352" y="112" width="12" height="68" rx="2" fill="#f59e0b" />
              <rect x="366" y="142" width="12" height="38" rx="2" fill="#4f46e5" />
              <text x="365" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">Mech</text>

              {/* Civil: 6.0 vs 4.2 (Height: 48 vs 33) */}
              <rect x="412" y="132" width="12" height="48" rx="2" fill="#f59e0b" />
              <rect x="426" y="147" width="12" height="33" rx="2" fill="#4f46e5" />
              <text x="425" y="196" textAnchor="middle" className="text-[10px] font-semibold fill-slate-500">Civil</text>
            </svg>
          </div>
        </div>

      </div>

      {/* 5. TOP RECRUITERS GRID */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span>
          Top Recruiting Partners
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recruiters.map((recruiter) => (
            <div key={recruiter.name} className="border border-slate-100 rounded-xl p-3.5 hover:shadow-sm transition-all flex flex-col justify-between h-32">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-sm">{recruiter.name}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${recruiter.logoBg}`}>
                  {recruiter.package}
                </span>
              </div>
              <div className="mt-3 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Hired</span>
                  <span className="text-base font-bold text-slate-700">{recruiter.hired}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold tracking-wider">Openings</span>
                  <span className="text-base font-bold text-indigo-600">{recruiter.openings} Positions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. DEPARTMENT PERFORMANCE TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm overflow-hidden">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full"></span>
          Department-wise Placement Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left align-middle border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <th className="py-3 px-4 font-semibold">Department</th>
                <th className="py-3 px-4 font-semibold text-center">Total Students</th>
                <th className="py-3 px-4 font-semibold text-center">Eligible Pool</th>
                <th className="py-3 px-4 font-semibold text-center">Placed Students</th>
                <th className="py-3 px-4 font-semibold text-center">Placement %</th>
                <th className="py-3 px-4 font-semibold text-right">Highest Package</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {departments.map((dept, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-800">{dept.name}</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-600">{dept.total}</td>
                  <td className="py-3 px-4 text-center font-medium text-slate-600">{dept.eligible}</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-600">{dept.placed}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {dept.rate}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-slate-800">{dept.highest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY PANEL & 9. NOTIFICATIONS PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <LuActivity className="w-4 h-4 text-indigo-500" />
            Recent Placement Activities
          </h3>
          <div className="relative border-l-2 border-slate-100 pl-4 ml-2 space-y-4">
            {recentActivities.map((act, index) => (
              <div key={index} className="relative">
                <span className="absolute -left-[23px] top-1 bg-white border-2 border-indigo-500 rounded-full w-2.5 h-2.5"></span>
                <div className="flex justify-between items-start gap-2">
                  <p className="text-xs font-semibold text-slate-700 mb-0">{act.text}</p>
                  <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap inline-flex items-center gap-1">
                    <LuClock className="w-2.5 h-2.5" />
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications Alert Board */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <LuBell className="w-4 h-4 text-rose-500" />
              Notifications & Alerts
            </h3>
            <div className="space-y-2.5">
              {notifications.map((note, idx) => (
                <div key={idx} className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                  note.priority === 'high' ? 'bg-rose-50/70 border-rose-100 text-rose-800' :
                  note.priority === 'medium' ? 'bg-amber-50/70 border-amber-100 text-amber-800' :
                  'bg-slate-50 border-slate-100 text-slate-800'
                }`}>
                  <span className="text-xs font-semibold">{note.msg}</span>
                  <span className="text-[10px] font-bold opacity-60 whitespace-nowrap">{note.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3 mt-4 text-center">
            <Link to="/admin/all-notice" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors no-underline">
              View Announcement Board
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Home;
