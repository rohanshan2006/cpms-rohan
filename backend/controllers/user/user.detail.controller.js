const UserDetail = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    const response = {
      id: `${user.id || ''}`,
      first_name: `${user.first_name || ''}`,
      last_name: `${user.last_name || ''}`,
      email: `${user.email || ''}`,
      number: `${user.number || ''}`,
      password: `${user.password || ''}`,
      profile: `${user.profile || ''}`,
      gender: `${user.gender || ''}`,
      dateOfBirth: `${user.dateOfBirth || ''}`,
      createdAt: `${user.createdAt || ''}`,
      role: `${user.role || ''}`,
      isProfileCompleted: `${user.isProfileCompleted}`
    };

    if (user.fullAddress) {
      response.fullAddress = {
        address: `${user.fullAddress.address || ''}`,
        pincode: `${user.fullAddress.pincode || ''}`
      };
    } else {
      response.fullAddress = {
        address: '',
        pincode: ''
      };
    }

    if (user.role === 'student') {
      const sp = user.studentProfile || {};
      const sgpa = sp.SGPA || {};
      const past = sp.pastQualification || {};
      const ssc = past.ssc || {};
      const hsc = past.hsc || {};
      const diploma = past.diploma || {};

      response.studentProfile = {
        rollNumber: `${sp.rollNumber || ''}`,
        uin: `${sp.UIN || ''}`,
        department: `${sp.department || ''}`,
        year: `${sp.year || ''}`,
        addmissionYear: `${sp.addmissionYear || ''}`,
        gap: `${sp.gap || 'false'}`,
        liveKT: `${sp.liveKT || '0'}`,
        resume: `${sp.resume || ''}`,
        SGPA: {
          sem1: `${sgpa.sem1 || ''}`,
          sem2: `${sgpa.sem2 || ''}`,
          sem3: `${sgpa.sem3 || ''}`,
          sem4: `${sgpa.sem4 || ''}`,
          sem5: `${sgpa.sem5 || ''}`,
          sem6: `${sgpa.sem6 || ''}`,
          sem7: `${sgpa.sem7 || ''}`,
          sem8: `${sgpa.sem8 || ''}`,
        },
        pastQualification: {
          ssc: {
            board: `${ssc.board || ''}`,
            percentage: `${ssc.percentage || ''}`,
            year: `${ssc.year || ''}`
          },
          hsc: {
            board: `${hsc.board || ''}`,
            percentage: `${hsc.percentage || ''}`,
            year: `${hsc.year || ''}`
          },
          diploma: {
            board: `${diploma.board || ''}`,
            percentage: `${diploma.percentage || ''}`,
            year: `${diploma.year || ''}`
          }
        }
      };
    }

    return res.json(response);
  } catch (error) {
    console.error("user.detail.controller.js error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = UserDetail;