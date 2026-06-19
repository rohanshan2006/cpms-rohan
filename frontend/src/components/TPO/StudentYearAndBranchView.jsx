import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import StudentTable from './StudentTableTemplate';
import AccordionPlaceholder from '../AccordionPlaceholder';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function StudentYearAndBranchView() {
  document.title = 'CPMS | All Students';

  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  // Filter and search states
  const [searchName, setSearchName] = useState('');
  const [searchRoll, setSearchRoll] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCGPA, setFilterCGPA] = useState('');

  const fetchStudentsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/student/all-students-data-year-and-branch`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      // Handle the new single flat array format
      if (response.data.students) {
        setStudents(response.data.students);
      } else {
        // Fallback for compatibility if it returns legacy grouped object
        const all = [
          ...(response.data.firstYearComputer || []),
          ...(response.data.firstYearCivil || []),
          ...(response.data.firstYearMechanical || []),
          ...(response.data.firstYearECS || []),
          ...(response.data.firstYearAIDS || []),
          ...(response.data.secondYearComputer || []),
          ...(response.data.secondYearCivil || []),
          ...(response.data.secondYearMechanical || []),
          ...(response.data.secondYearECS || []),
          ...(response.data.secondYearAIDS || []),
          ...(response.data.thirdYearComputer || []),
          ...(response.data.thirdYearCivil || []),
          ...(response.data.thirdYearMechanical || []),
          ...(response.data.thirdYearECS || []),
          ...(response.data.thirdYearAIDS || []),
          ...(response.data.fourthYearComputer || []),
          ...(response.data.fourthYearCivil || []),
          ...(response.data.fourthYearMechanical || []),
          ...(response.data.fourthYearECS || []),
          ...(response.data.fourthYearAIDS || []),
        ];
        setStudents(all);
      }
    } catch (error) {
      console.log("Error fetching students data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, []);

  // Helpers for stats and filtering
  const getCGPA = (student) => {
    if (student?.studentProfile?.SGPA) {
      const sgpas = Object.values(student.studentProfile.SGPA)
        .map(Number)
        .filter(val => !isNaN(val) && val > 0);
      if (sgpas.length > 0) {
        return parseFloat((sgpas.reduce((a, b) => a + b, 0) / sgpas.length).toFixed(2));
      }
    }
    return 6.70;
  };

  const getPlacementStatus = (student) => {
    const apps = student?.studentProfile?.appliedJobs || [];
    if (apps.some(a => a.status === 'hired')) return 'Placed';
    if (apps.some(a => a.status === 'selected')) return 'Selected';
    if (apps.some(a => a.status === 'interview_scheduled' || a.status === 'interview')) return 'Interview Scheduled';
    if (apps.some(a => a.status === 'shortlisted' || a.status === 'oa_cleared')) return 'Shortlisted';
    if (apps.length > 0) return 'Applied';
    return 'Not Applied';
  };

  // 1. Calculate KPI Metrics over ALL students
  const totalCount = students.length;
  
  const eligibleCount = students.filter(student => {
    const cgpa = getCGPA(student);
    const liveKT = student?.studentProfile?.liveKT || 0;
    return cgpa >= 6.5 && liveKT === 0;
  }).length;

  const placedCount = students.filter(student => {
    const status = getPlacementStatus(student);
    return status === 'Placed' || status === 'Selected';
  }).length;

  const seekingCount = students.filter(student => {
    const status = getPlacementStatus(student);
    return status !== 'Placed' && status !== 'Selected';
  }).length;

  // 2. Filter students based on UI filters
  const filteredStudents = students.filter(student => {
    // Name filter
    const fullName = `${student.first_name || ''} ${student.last_name || ''}`.toLowerCase();
    if (searchName && !fullName.includes(searchName.toLowerCase())) return false;

    // Roll number filter
    const roll = String(student?.studentProfile?.rollNumber || '');
    if (searchRoll && !roll.includes(searchRoll)) return false;

    // Department filter
    // Support mapping "Computer" -> "Computer Science" for backward compatibility if any
    let dept = student?.studentProfile?.department || '';
    if (dept === 'Computer') dept = 'Computer Science';
    
    if (filterDept !== 'All' && dept !== filterDept) return false;

    // Placement status filter
    const status = getPlacementStatus(student);
    if (filterStatus !== 'All' && status !== filterStatus) return false;

    // CGPA filter (minimum threshold)
    if (filterCGPA) {
      const minCGPA = parseFloat(filterCGPA);
      if (!isNaN(minCGPA) && getCGPA(student) < minCGPA) return false;
    }

    return true;
  });

  // Group filtered students by department
  const departmentsList = [
    'Computer Science',
    'CSDS',
    'Information Technology',
    'ECS',
    'AIDS',
    'Mechanical',
    'Civil'
  ];

  const studentsByDept = {};
  departmentsList.forEach(dept => {
    studentsByDept[dept] = filteredStudents.filter(s => {
      let sDept = s?.studentProfile?.department || '';
      if (sDept === 'Computer') sDept = 'Computer Science';
      return sDept === dept;
    });
  });

  const clearFilters = () => {
    setSearchName('');
    setSearchRoll('');
    setFilterDept('All');
    setFilterStatus('All');
    setFilterCGPA('');
  };

  return (
    <>
      {loading ? (
        <AccordionPlaceholder />
      ) : (
        <div className="my-4 max-md:p-2 md:p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Student Placement Directory</h2>
            <p className="text-slate-500 text-sm">Manage student profiles, monitor drives, and filter candidates.</p>
          </div>

          {/* KPI Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-100">Total Students</span>
                <h3 className="text-3xl font-bold mt-1">{totalCount}</h3>
              </div>
              <div className="p-3 bg-indigo-400/25 rounded-xl">
                <i className="fa-solid fa-users text-2xl text-white"></i>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-100">Eligible (&gt;=6.5 CGPA)</span>
                <h3 className="text-3xl font-bold mt-1">{eligibleCount}</h3>
              </div>
              <div className="p-3 bg-blue-400/25 rounded-xl">
                <i className="fa-solid fa-user-check text-2xl text-white"></i>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-100">Students Placed</span>
                <h3 className="text-3xl font-bold mt-1">{placedCount}</h3>
              </div>
              <div className="p-3 bg-emerald-400/25 rounded-xl">
                <i className="fa-solid fa-graduation-cap text-2xl text-white"></i>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-100">Seeking Placement</span>
                <h3 className="text-3xl font-bold mt-1">{seekingCount}</h3>
              </div>
              <div className="p-3 bg-amber-400/25 rounded-xl">
                <i className="fa-solid fa-briefcase text-2xl text-white"></i>
              </div>
            </div>
          </div>

          {/* Search and Filters Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-filter text-slate-500"></i>
                <h4 className="font-semibold text-slate-800 text-sm mb-0">Search and Filter Candidates</h4>
              </div>
              <button 
                onClick={clearFilters}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border-0 transition-colors"
              >
                Clear All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search Name */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Candidate Name</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by Name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                </div>
              </div>

              {/* Search Roll Number */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Roll Number</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Roll No..."
                    value={searchRoll}
                    onChange={(e) => setSearchRoll(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <i className="fa-solid fa-hashtag absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                </div>
              </div>

              {/* Filter Department */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Department</label>
                <select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="All">All Departments</option>
                  {departmentsList.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Filter Status */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Placement Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Not Applied">Not Applied</option>
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Placed">Placed</option>
                </select>
              </div>

              {/* Filter CGPA */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">Min CGPA</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    placeholder="Min CGPA (e.g. 7.5)"
                    value={filterCGPA}
                    onChange={(e) => setFilterCGPA(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <i className="fa-solid fa-graduation-cap absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Department Expandable Accordion */}
          <div className="mt-4">
            <Accordion defaultActiveKey={['Computer Science']} alwaysOpen className="flex flex-col gap-3">
              {departmentsList
                .filter(dept => filterDept === 'All' || filterDept === dept)
                .map((dept) => (
                  <StudentTable 
                    key={dept} 
                    branchName={dept} 
                    studentData={studentsByDept[dept]} 
                  />
                ))}
            </Accordion>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentYearAndBranchView;
