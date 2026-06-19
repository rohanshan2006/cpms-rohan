import React, { useState, useEffect } from 'react'
import TablePlaceholder from '../TablePlaceholder';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function MyApplied() {
  document.title = 'CPMS | My Applied Job';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // useState for load data
  const [currentUser, setCurrentUser] = useState({});

  const [jobs, setJobs] = useState([]);

  // checking for authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/user/detail`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        setCurrentUser({
          id: res.data.id,
          role: res.data.role,
        });
      })
      .catch(err => {
        console.log("MyApplied.jsx => ", err);
        setToastMessage(err);
        setShowToast(true);
      });
  }, []);


  const fetchMyJob = async () => {
    if (!currentUser?.id) return;
    try {
      const response = await axios.get(`${BASE_URL}/tpo/myjob/${currentUser?.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response?.data)
        setJobs(response?.data)
      // if (response?.data?.msg)
    } catch (error) {
      console.log("Error While Fetching Error => ", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMyJob();
  }, [currentUser?.id]);

  const renderTooltipViewPost = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      View Post
    </Tooltip>
  );

  return (
    <div className=''>
      {
        loading ? (
          <TablePlaceholder />
        ) : (
          <Table
            striped
            bordered
            hover
            responsive="sm"
            className='bg-white my-6 rounded-lg shadow text-base max-sm:text-sm'
          >
            <thead>
              <tr>
                <th style={{ width: '6%' }}>Sr. No.</th>
                <th style={{ width: '16%' }}><b>Company Name</b></th>
                <th style={{ width: '16%' }}>Job Title</th>
                <th style={{ width: '10%' }}>Annual CTC</th>
                <th style={{ width: '10%' }}>Applied On</th>
                <th style={{ width: '10%' }}>Last date of Application</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '12%' }}>No. of Students Applied</th>
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.length > 0 ? (
                jobs?.map((job, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <b>
                        {job?.companyName}
                      </b>
                    </td>
                    <td>
                      {job?.jobTitle}
                    </td>
                    <td>
                      {job?.salary}
                    </td>
                    <td>
                      {new Date(job?.appliedAt.split('T')).toLocaleDateString('en-IN')}
                    </td>
                    <td>
                      {new Date(job?.applicationDeadline).toLocaleDateString('en-IN')}
                    </td>
                    <td>
                      {(() => {
                        const s = job?.status?.toLowerCase();
                        if (s === 'applied') return <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800 border border-blue-200">Applied</span>;
                        if (s === 'shortlisted') return <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-purple-100 text-purple-800 border border-purple-200">Shortlisted</span>;
                        if (s === 'oa_cleared') return <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-100 text-amber-800 border border-amber-200">OA Cleared</span>;
                        if (s === 'interview_scheduled') return <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-indigo-100 text-indigo-800 border border-indigo-200">Interview Scheduled</span>;
                        if (s === 'rejected') return <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-red-100 text-red-800 border border-red-200">Rejected</span>;
                        if (s === 'hired' || s === 'selected') return <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">Selected</span>;
                        return <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-gray-100 text-gray-800">{job?.status}</span>;
                      })()}
                    </td>
                    <td>
                      {job?.numberOfApplicants}
                    </td>
                    <td>
                      {/* for hover label effect  */}
                      <div className="flex justify-around items-center">
                        <div className="px-0.5">
                          {/* view post  */}
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipViewPost}
                          >
                            <Link className="text-black" to={`/student/job/${job.jobId}`}>
                              <i className='fa-solid fa-circle-info text-2xl max-sm:text-lg cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-500' />
                            </Link>
                          </OverlayTrigger>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No Jobs found</td>
                </tr>
              )}
            </tbody>
          </Table>
        )
      }
      <div className="flex items-center gap-3 mt-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="outline-primary" onClick={() => navigate('/student/dashboard')}>
          Home
        </Button>
      </div>
    </div>
  )
}

export default MyApplied
