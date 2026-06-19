import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const StudentTable = ({ branchName, studentData }) => {
  const [currentUser, setCurrentUser] = useState({ role: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/user/detail`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCurrentUser({ role: res.data.role });
      })
      .catch(err => {
        console.log("StudentTableTemplate.jsx => ", err);
      });
  }, []);

  const getCGPA = (student) => {
    if (student?.studentProfile?.SGPA) {
      const sgpas = Object.values(student.studentProfile.SGPA)
        .map(Number)
        .filter(val => !isNaN(val) && val > 0);
      if (sgpas.length > 0) {
        return (sgpas.reduce((a, b) => a + b, 0) / sgpas.length).toFixed(2);
      }
    }
    return '6.70';
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

  const getPlacedCompany = (student) => {
    const hiredApp = student?.studentProfile?.appliedJobs?.find(a => a.status === 'hired' || a.status === 'selected');
    if (hiredApp && hiredApp.jobId && hiredApp.jobId.company) {
      return hiredApp.jobId.company.companyName;
    }
    return null;
  };

  const getStatusBadge = (student) => {
    const status = getPlacementStatus(student);
    const company = getPlacedCompany(student);
    
    switch (status) {
      case 'Placed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-sm">
            <span className="w-1.5 h-1.5 mr-1 bg-emerald-500 rounded-full animate-ping"></span>
            Placed {company ? `(${company})` : ''}
          </span>
        );
      case 'Selected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 shadow-sm">
            Selected {company ? `(${company})` : ''}
          </span>
        );
      case 'Interview Scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            Interview
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
            Shortlisted
          </span>
        );
      case 'Applied':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            Applied
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Not Applied
          </span>
        );
    }
  };

  return (
    <Accordion.Item eventKey={branchName} className='border border-slate-100 shadow-sm overflow-hidden mb-2 rounded-lg'>
      <Accordion.Header className="font-semibold text-slate-800 bg-slate-50">{branchName} ({studentData?.length || 0})</Accordion.Header>
      <Accordion.Body className="p-0 overflow-auto">
        <Table responsive hover className='mb-0 text-sm align-middle min-w-[1000px]'>
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "8%" }}>Roll No.</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "16%" }}>Full Name</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "10%" }}>UIN</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "18%" }}>Email</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "11%" }}>Phone Number</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "8%" }}>Resume</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "7%" }}>CGPA</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "8%" }}>Internships</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "8%" }}>Applied</th>
              <th className="py-3 px-4 text-slate-600 font-semibold" style={{ width: "16%" }}>Placement Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {
              studentData?.length > 0 ? (
                studentData
                  ?.sort((a, b) => {
                    const rollA = parseInt(a?.studentProfile?.rollNumber || 0);
                    const rollB = parseInt(b?.studentProfile?.rollNumber || 0);
                    return rollA - rollB;
                  })
                  ?.map((student, index) => (
                    <tr key={index} className="hover:bg-slate-50/55 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">{student?.studentProfile?.rollNumber}</td>
                      <td className="py-3 px-4">
                        {(currentUser.role === 'tpo_admin' || currentUser.role === 'management_admin') ? (
                          <Link to={`/${currentUser.role === 'tpo_admin' ? 'tpo' : 'management'}/user/${student?._id}`} className='font-semibold no-underline text-blue-600 hover:text-blue-800 transition-colors'>
                            {student?.first_name + " " + student?.last_name}
                          </Link>
                        ) : (
                          <span className="font-semibold text-slate-800">{student?.first_name + " " + student?.last_name}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{student?.studentProfile?.UIN}</td>
                      <td className="py-3 px-4">
                        <a
                          href={"mailto:" + student?.email}
                          target="_blank"
                          rel="noopener noreferrer"
                          className='no-underline text-blue-600 hover:text-blue-800 transition-colors'
                        >
                          {student?.email}
                        </a>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{student?.number}</td>
                      <td className="py-3 px-4">
                        <a
                          href={student?.studentProfile?.resume || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className='inline-flex items-center no-underline text-blue-600 hover:text-blue-800 font-medium transition-colors'
                        >
                          <i className="fa-regular fa-file-pdf mr-1 text-red-500"></i> View
                        </a>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{getCGPA(student)}</td>
                      <td className="py-3 px-4 text-center font-medium text-slate-700">{student?.studentProfile?.internships?.length || 0}</td>
                      <td className="py-3 px-4 text-center font-medium text-slate-700">{student?.studentProfile?.appliedJobs?.length || 0}</td>
                      <td className="py-3 px-4">{getStatusBadge(student)}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-6 text-center text-slate-400 font-medium bg-slate-50/50">No students registered in this department</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default StudentTable;