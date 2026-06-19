const User = require('../models/user.model');
const Company = require('../models/company.model');
const Job = require('../models/job.model');
const Notice = require('../models/notice.model');
const bcrypt = require('bcrypt');

const seedDemoStudents = async (hashedStudentPassword) => {
  try {
    const companies = await Company.find({});
    const jobs = await Job.find({});

    const jobMap = {};
    for (const j of jobs) {
      const comp = companies.find(c => String(c._id) === String(j.company));
      if (comp) {
        jobMap[comp.companyName] = j;
      }
    }

    // Find the default student to keep or rebuild later
    const defaultStudentEmail = 'student@cpms.com';
    const defaultStudent = await User.findOne({ email: defaultStudentEmail });
    const defaultStudentId = defaultStudent ? defaultStudent._id : null;

    // Clear old seeded demo students (except default student)
    await User.deleteMany({ role: 'student', email: { $ne: defaultStudentEmail } });

    // Clear applicants array for all jobs except the default student
    for (const j of jobs) {
      j.applicants = j.applicants.filter(a => defaultStudentId && String(a.studentId) === String(defaultStudentId));
    }

    const studentDataList = [
      { first_name: "Aarav", last_name: "Sharma", gender: "Male", department: "Computer Science", cgpa: 8.6, roll: 201, uin: "U2012023", email: "aarav.sharma@cpms.com", status: "Placed", company: "Accenture", internships: 2 },
      { first_name: "Vihaan", last_name: "Patel", gender: "Male", department: "Computer Science", cgpa: 7.9, roll: 202, uin: "U2022023", email: "vihaan.patel@cpms.com", status: "Placed", company: "Capgemini", internships: 1 },
      { first_name: "Ananya", last_name: "Iyer", gender: "Female", department: "Computer Science", cgpa: 9.1, roll: 203, uin: "U2032023", email: "ananya.iyer@cpms.com", status: "Placed", company: "Infosys", internships: 3 },
      { first_name: "Diya", last_name: "Reddy", gender: "Female", department: "Computer Science", cgpa: 8.4, roll: 204, uin: "U2042023", email: "diya.reddy@cpms.com", status: "Placed", company: "Coforge", internships: 2 },
      { first_name: "Kabir", last_name: "Malhotra", gender: "Male", department: "Computer Science", cgpa: 6.8, roll: 205, uin: "U2052023", email: "kabir.malhotra@cpms.com", status: "Shortlisted", company: "TCS", internships: 0 },
      { first_name: "Rohan", last_name: "Gupta", gender: "Male", department: "Computer Science", cgpa: 7.5, roll: 206, uin: "U2062023", email: "rohan.gupta@cpms.com", status: "Interview Scheduled", company: "Wipro", internships: 1 },
      { first_name: "Arjun", last_name: "Mehta", gender: "Male", department: "Computer Science", cgpa: 8.2, roll: 207, uin: "U2072023", email: "arjun.mehta@cpms.com", status: "Selected", company: "HCLTech", internships: 2 },
      { first_name: "Sneha", last_name: "Verma", gender: "Female", department: "Computer Science", cgpa: 9.0, roll: 208, uin: "U2082023", email: "sneha.verma@cpms.com", status: "Placed", company: "Tech Mahindra", internships: 3 },
      { first_name: "Aditya", last_name: "Nair", gender: "Male", department: "Computer Science", cgpa: 6.2, roll: 209, uin: "U2092023", email: "aditya.nair@cpms.com", status: "Applied", company: "Accenture", internships: 0 },
      { first_name: "Priyanka", last_name: "Joshi", gender: "Female", department: "Computer Science", cgpa: 7.1, roll: 210, uin: "U2102023", email: "priyanka.joshi@cpms.com", status: "Applied", company: "Capgemini", internships: 1 },
      { first_name: "Rahul", last_name: "Sen", gender: "Male", department: "Computer Science", cgpa: 8.7, roll: 211, uin: "U2112023", email: "rahul.sen@cpms.com", status: "Placed", company: "Coforge", internships: 2 },
      { first_name: "Divya", last_name: "Rao", gender: "Female", department: "Computer Science", cgpa: 7.8, roll: 212, uin: "U2122023", email: "divya.rao@cpms.com", status: "Shortlisted", company: "TCS", internships: 1 },
      { first_name: "Ishan", last_name: "Saxena", gender: "Male", department: "Computer Science", cgpa: 6.5, roll: 213, uin: "U2132023", email: "ishan.saxena@cpms.com", status: "Not Applied", company: null, internships: 0 },
      { first_name: "Tanvi", last_name: "Hegde", gender: "Female", department: "Computer Science", cgpa: 8.9, roll: 214, uin: "U2142023", email: "tanvi.hegde@cpms.com", status: "Selected", company: "Infosys", internships: 2 },
      { first_name: "Devendra", last_name: "Singh", gender: "Male", department: "Computer Science", cgpa: 7.3, roll: 215, uin: "U2152023", email: "devendra.singh@cpms.com", status: "Interview Scheduled", company: "Accenture", internships: 1 },

      { first_name: "Aisha", last_name: "Siddiqui", gender: "Female", department: "CSDS", cgpa: 8.5, roll: 216, uin: "U2162023", email: "aisha.siddiqui@cpms.com", status: "Placed", company: "Accenture", internships: 2 },
      { first_name: "Neha", last_name: "Deshmukh", gender: "Female", department: "CSDS", cgpa: 7.6, roll: 217, uin: "U2172023", email: "neha.deshmukh@cpms.com", status: "Placed", company: "Capgemini", internships: 1 },
      { first_name: "Siddharth", last_name: "Kulkarni", gender: "Male", department: "CSDS", cgpa: 8.8, roll: 218, uin: "U2182023", email: "siddharth.kulkarni@cpms.com", status: "Placed", company: "TCS", internships: 2 },
      { first_name: "Pranav", last_name: "Bhat", gender: "Male", department: "CSDS", cgpa: 6.9, roll: 219, uin: "U2192023", email: "pranav.bhat@cpms.com", status: "Shortlisted", company: "Infosys", internships: 0 },
      { first_name: "Shruti", last_name: "Mishra", gender: "Female", department: "CSDS", cgpa: 9.2, roll: 220, uin: "U2202023", email: "shruti.mishra@cpms.com", status: "Placed", company: "Tech Mahindra", internships: 3 },
      { first_name: "Kunal", last_name: "Choudhury", gender: "Male", department: "CSDS", cgpa: 7.4, roll: 221, uin: "U2212023", email: "kunal.choudhury@cpms.com", status: "Interview Scheduled", company: "Coforge", internships: 1 },
      { first_name: "Meera", last_name: "Pillai", gender: "Female", department: "CSDS", cgpa: 8.0, roll: 222, uin: "U2222023", email: "meera.pillai@cpms.com", status: "Selected", company: "Capgemini", internships: 2 },
      { first_name: "Yash", last_name: "Vardhan", gender: "Male", department: "CSDS", cgpa: 6.1, roll: 223, uin: "U2232023", email: "yash.vardhan@cpms.com", status: "Applied", company: "TCS", internships: 0 },
      { first_name: "Riya", last_name: "Kapoor", gender: "Female", department: "CSDS", cgpa: 8.3, roll: 224, uin: "U2242023", email: "riya.kapoor@cpms.com", status: "Placed", company: "HCLTech", internships: 2 },
      { first_name: "Amit", last_name: "Trivedi", gender: "Male", department: "CSDS", cgpa: 7.2, roll: 225, uin: "U2252023", email: "amit.trivedi@cpms.com", status: "Shortlisted", company: "Accenture", internships: 1 },

      { first_name: "Rashi", last_name: "Shah", gender: "Female", department: "Information Technology", cgpa: 8.7, roll: 226, uin: "U2262023", email: "rashi.shah@cpms.com", status: "Placed", company: "Capgemini", internships: 2 },
      { first_name: "Varun", last_name: "Dhawan", gender: "Male", department: "Information Technology", cgpa: 7.3, roll: 227, uin: "U2272023", email: "varun.dhawan@cpms.com", status: "Placed", company: "Wipro", internships: 1 },
      { first_name: "Aditi", last_name: "Roy", gender: "Female", department: "Information Technology", cgpa: 9.0, roll: 228, uin: "U2282023", email: "aditi.roy@cpms.com", status: "Placed", company: "Infosys", internships: 3 },
      { first_name: "Karan", last_name: "Johar", gender: "Male", department: "Information Technology", cgpa: 6.6, roll: 229, uin: "U2292023", email: "karan.johar@cpms.com", status: "Shortlisted", company: "HCLTech", internships: 0 },
      { first_name: "Pooja", last_name: "Bhatia", gender: "Female", department: "Information Technology", cgpa: 8.1, roll: 230, uin: "U2302023", email: "pooja.bhatia@cpms.com", status: "Interview Scheduled", company: "Accenture", internships: 2 },
      { first_name: "Madhavan", last_name: "Pillai", gender: "Male", department: "Information Technology", cgpa: 7.7, roll: 231, uin: "U2312023", email: "madhavan.pillai@cpms.com", status: "Selected", company: "TCS", internships: 1 },
      { first_name: "Swati", last_name: "Chaturvedi", gender: "Female", department: "Information Technology", cgpa: 8.2, roll: 232, uin: "U2322023", email: "swati.chaturvedi@cpms.com", status: "Placed", company: "Coforge", internships: 2 },
      { first_name: "Abhinav", last_name: "Shukla", gender: "Male", department: "Information Technology", cgpa: 6.0, roll: 233, uin: "U2332023", email: "abhinav.shukla@cpms.com", status: "Not Applied", company: null, internships: 0 },

      { first_name: "Kavita", last_name: "Dwivedi", gender: "Female", department: "ECS", cgpa: 8.0, roll: 234, uin: "U2342023", email: "kavita.dwivedi@cpms.com", status: "Placed", company: "Accenture", internships: 1 },
      { first_name: "Akash", last_name: "Banerjee", gender: "Male", department: "ECS", cgpa: 7.1, roll: 235, uin: "U2352023", email: "akash.banerjee@cpms.com", status: "Placed", company: "Tech Mahindra", internships: 2 },
      { first_name: "Shalini", last_name: "Mukhopadhyay", gender: "Female", department: "ECS", cgpa: 8.3, roll: 236, uin: "U2362023", email: "shalini.m@cpms.com", status: "Shortlisted", company: "Capgemini", internships: 1 },
      { first_name: "Vivek", last_name: "Agnihotri", gender: "Male", department: "ECS", cgpa: 6.7, roll: 237, uin: "U2372023", email: "vivek.agnihotri@cpms.com", status: "Interview Scheduled", company: "TCS", internships: 0 },
      { first_name: "Kriti", last_name: "Sanon", gender: "Female", department: "ECS", cgpa: 8.8, roll: 238, uin: "U2382023", email: "kriti.sanon@cpms.com", status: "Selected", company: "Infosys", internships: 2 },
      { first_name: "Kartik", last_name: "Aaryan", gender: "Male", department: "ECS", cgpa: 7.4, roll: 239, uin: "U2392023", email: "kartik.aaryan@cpms.com", status: "Applied", company: "Wipro", internships: 1 },
      { first_name: "Kiara", last_name: "Advani", gender: "Female", department: "ECS", cgpa: 8.5, roll: 240, uin: "U2402023", email: "kiara.advani@cpms.com", status: "Placed", company: "HCLTech", internships: 2 },

      { first_name: "Vicky", last_name: "Kaushal", gender: "Male", department: "AIDS", cgpa: 8.2, roll: 241, uin: "U2412023", email: "vicky.kaushal@cpms.com", status: "Placed", company: "Accenture", internships: 2 },
      { first_name: "Katrina", last_name: "Kaif", gender: "Female", department: "AIDS", cgpa: 7.5, roll: 242, uin: "U2422023", email: "katrina.kaif@cpms.com", status: "Shortlisted", company: "Capgemini", internships: 1 },
      { first_name: "Ranbir", last_name: "Kapoor", gender: "Male", department: "AIDS", cgpa: 8.9, roll: 243, uin: "U2432023", email: "ranbir.kapoor@cpms.com", status: "Interview Scheduled", company: "Infosys", internships: 3 },
      { first_name: "Alia", last_name: "Bhatt", gender: "Female", department: "AIDS", cgpa: 9.0, roll: 244, uin: "U2442023", email: "alia.bhatt@cpms.com", status: "Selected", company: "Coforge", internships: 2 },
      { first_name: "Sidharth", last_name: "Malhotra", gender: "Male", department: "AIDS", cgpa: 6.4, roll: 245, uin: "U2452023", email: "sidharth.m@cpms.com", status: "Applied", company: "TCS", internships: 0 },

      { first_name: "Shraddha", last_name: "Kapoor", gender: "Female", department: "Mechanical", cgpa: 8.1, roll: 246, uin: "U2462023", email: "shraddha.k@cpms.com", status: "Placed", company: "TCS", internships: 1 },
      { first_name: "Varun", last_name: "Tej", gender: "Male", department: "Mechanical", cgpa: 7.0, roll: 247, uin: "U2472023", email: "varun.tej@cpms.com", status: "Interview Scheduled", company: "Accenture", internships: 1 },
      { first_name: "Rashmika", last_name: "Mandanna", gender: "Female", department: "Mechanical", cgpa: 7.8, roll: 248, uin: "U2482023", email: "rashmika.m@cpms.com", status: "Applied", company: "Capgemini", internships: 0 },

      { first_name: "Dulquer", last_name: "Salmaan", gender: "Male", department: "Civil", cgpa: 8.4, roll: 249, uin: "U2492023", email: "dulquer.s@cpms.com", status: "Placed", company: "TCS", internships: 2 },
      { first_name: "Keerthy", last_name: "Suresh", gender: "Female", department: "Civil", cgpa: 6.2, roll: 250, uin: "U2502023", email: "keerthy.suresh@cpms.com", status: "Not Applied", company: null, internships: 0 }
    ];

    for (const s of studentDataList) {
      const sgpaVal = s.cgpa;
      const sgpaObj = {
        sem1: sgpaVal, sem2: sgpaVal, sem3: sgpaVal, sem4: sgpaVal,
        sem5: sgpaVal, sem6: sgpaVal, sem7: sgpaVal, sem8: sgpaVal
      };

      const internships = [];
      for (let j = 0; j < s.internships; j++) {
        const companies = ["Google", "Microsoft", "TCS", "Accenture", "Infosys", "Wipro"];
        const types = ["Full Time", "Part Time", "Work From Home"];
        const stipend = [10000, 15000, 20000, 25000];
        internships.push({
          type: types[j % types.length],
          companyName: companies[(j + s.roll) % companies.length],
          companyAddress: "Mumbai, India",
          companyWebsite: "https://example.com",
          internshipDuration: 90,
          startDate: new Date("2023-06-01"),
          endDate: new Date("2023-08-31"),
          monthlyStipend: stipend[j % stipend.length],
          description: "Developed and maintained software modules using standard engineering practices."
        });
      }

      const appliedJobs = [];
      if (s.company && jobMap[s.company]) {
        const mainJob = jobMap[s.company];
        let jobStatus = 'applied';
        if (s.status === 'Placed') jobStatus = 'hired';
        else if (s.status === 'Selected') jobStatus = 'selected';
        else if (s.status === 'Shortlisted') jobStatus = 'shortlisted';
        else if (s.status === 'Interview Scheduled') jobStatus = 'interview_scheduled';

        appliedJobs.push({
          jobId: mainJob._id,
          status: jobStatus,
          appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
        });
      }

      if (s.status !== 'Not Applied') {
        const otherCompanies = Object.keys(jobMap).filter(c => c !== s.company);
        if (otherCompanies.length > 0) {
          const firstOther = otherCompanies[s.roll % otherCompanies.length];
          appliedJobs.push({
            jobId: jobMap[firstOther]._id,
            status: 'rejected',
            appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
          });
        }
      }

      const newUser = new User({
        first_name: s.first_name,
        last_name: s.last_name,
        email: s.email,
        number: 9876543000 + (s.roll - 200),
        password: hashedStudentPassword,
        role: 'student',
        isProfileCompleted: true,
        gender: s.gender,
        dateOfBirth: new Date('2002-06-15'),
        fullAddress: {
          address: 'Apartment ' + s.roll + ', Campus View, Mumbai',
          pincode: 400001 + (s.roll - 200)
        },
        studentProfile: {
          isApproved: true,
          rollNumber: s.roll,
          UIN: s.uin,
          department: s.department,
          year: 4,
          addmissionYear: 2020,
          gap: false,
          liveKT: 0,
          SGPA: sgpaObj,
          pastQualification: {
            ssc: { board: 'CBSE', percentage: 82, year: 2018 },
            hsc: { board: 'CBSE', percentage: 79, year: 2020 }
          },
          appliedJobs: appliedJobs,
          internships: internships,
          resume: 'https://res.cloudinary.com/dgu6xwnzx/image/upload/v1743159225/dummy_resume.pdf'
        }
      });

      await newUser.save();

      for (const app of appliedJobs) {
        const companyName = Object.keys(jobMap).find(k => String(jobMap[k]._id) === String(app.jobId));
        if (companyName && jobMap[companyName]) {
          const job = jobMap[companyName];
          job.applicants.push({
            studentId: newUser._id,
            status: app.status,
            appliedAt: app.appliedAt
          });
        }
      }
    }

    for (const key of Object.keys(jobMap)) {
      await jobMap[key].save();
    }
    console.log(`Successfully seeded ${studentDataList.length} realistic student records with placement data.`);
  } catch (error) {
    console.error('Error seeding demo students: ', error);
  }
};

const seedData = async () => {
  try {
    const superAdminEmail = 'admin@cpms.com';
    const tpoEmail = 'tpo@cpms.com';
    const managementEmail = 'management@cpms.com';
    const studentEmail = 'student@cpms.com';

    // Delete old legacy demo accounts to avoid duplicate key conflicts
    const deleteResult = await User.deleteMany({
      email: {
        $in: [
          'student@example.com',
          'admin@example.com',
          'tpo@example.com',
          'management@example.com'
        ]
      }
    });
    if (deleteResult.deletedCount > 0) {
      console.log(`Cleared ${deleteResult.deletedCount} legacy demo accounts.`);
    }

    const existingSuperAdmin = await User.findOne({ email: superAdminEmail });
    const existingTPO = await User.findOne({ email: tpoEmail });
    const existingManagement = await User.findOne({ email: managementEmail });
    const existingStudent = await User.findOne({ email: studentEmail });

    const userCount = await User.countDocuments();
    const hashedSuperAdminPassword = await bcrypt.hash('Admin@123', 10);
    const hashedTPOPassword = await bcrypt.hash('TPO@123', 10);
    const hashedManagementPassword = await bcrypt.hash('Management@123', 10);
    const hashedStudentPassword = await bcrypt.hash('Student@123', 10);

    // If fresh install
    if (userCount === 0) {
      console.log('Fresh installation detected. Seeding full demo data...');

      await User.deleteMany({});
      await Company.deleteMany({});
      await Job.deleteMany({});
      await Notice.deleteMany({});

      const superuser = await User.create({
        first_name: 'System',
        last_name: 'Admin',
        email: superAdminEmail,
        number: 9876543213,
        password: hashedSuperAdminPassword,
        role: 'superuser',
        isProfileCompleted: true
      });

      const tpo = await User.create({
        first_name: 'TPO',
        last_name: 'Officer',
        email: tpoEmail,
        number: 9876543211,
        password: hashedTPOPassword,
        role: 'tpo_admin',
        isProfileCompleted: true,
        tpoProfile: { position: 'Training & Placement Officer' }
      });

      const management = await User.create({
        first_name: 'Management',
        last_name: 'Director',
        email: managementEmail,
        number: 9876543212,
        password: hashedManagementPassword,
        role: 'management_admin',
        isProfileCompleted: true,
        managementProfile: { position: 'Director of Placements' }
      });

      const accentureComp = await Company.create({
        companyName: 'Accenture',
        companyDescription: 'Accenture plc is an Irish-American professional services company specializing in information technology services.',
        companyWebsite: 'https://accenture.com',
        companyLocation: 'Mumbai',
        companyDifficulty: 'Moderate'
      });

      const capgeminiComp = await Company.create({
        companyName: 'Capgemini',
        companyDescription: 'Capgemini SE is a French multinational information technology services and consulting company.',
        companyWebsite: 'https://capgemini.com',
        companyLocation: 'Pune',
        companyDifficulty: 'Moderate'
      });

      const infosysComp = await Company.create({
        companyName: 'Infosys',
        companyDescription: 'Infosys Limited is an Indian multinational information technology company.',
        companyWebsite: 'https://infosys.com',
        companyLocation: 'Bangalore',
        companyDifficulty: 'Easy'
      });

      const coforgeComp = await Company.create({
        companyName: 'Coforge',
        companyDescription: 'Coforge is an IT services company based in Noida, India.',
        companyWebsite: 'https://coforge.com',
        companyLocation: 'Greater Noida',
        companyDifficulty: 'Moderate'
      });

      const tcsComp = await Company.create({
        companyName: 'TCS',
        companyDescription: 'Tata Consultancy Services is an Indian multinational information technology services company.',
        companyWebsite: 'https://tcs.com',
        companyLocation: 'Mumbai',
        companyDifficulty: 'Easy'
      });

      const wiproComp = await Company.create({
        companyName: 'Wipro',
        companyDescription: 'Wipro Limited is an Indian multinational corporation providing IT and consulting services.',
        companyWebsite: 'https://wipro.com',
        companyLocation: 'Pune',
        companyDifficulty: 'Easy'
      });

      const hclComp = await Company.create({
        companyName: 'HCLTech',
        companyDescription: 'HCLTech is an Indian multinational information technology services company.',
        companyWebsite: 'https://hcltech.com',
        companyLocation: 'Noida',
        companyDifficulty: 'Easy'
      });

      const techmComp = await Company.create({
        companyName: 'Tech Mahindra',
        companyDescription: 'Tech Mahindra is an Indian multinational IT services company.',
        companyWebsite: 'https://techmahindra.com',
        companyLocation: 'Pune',
        companyDifficulty: 'Easy'
      });

      const accentureJob = await Job.create({
        jobTitle: 'Associate Software Engineer',
        jobDescription: 'Develop, design, test and maintain technologies for clients at Accenture.',
        eligibility: 'BE / B.Tech (All Branches) / MCA',
        salary: 4.5,
        howToApply: 'Apply through the portal.',
        applicationDeadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        company: accentureComp._id
      });

      const capgeminiJob = await Job.create({
        jobTitle: 'Analyst',
        jobDescription: 'Perform system analysis and write clean code in Java/React.',
        eligibility: 'BE / B.Tech (CS, IT, ECS, AIDS) / MCA',
        salary: 4.25,
        howToApply: 'Apply on portal. A shortlisting test will be scheduled.',
        applicationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        company: capgeminiComp._id
      });

      const infosysJob = await Job.create({
        jobTitle: 'Systems Engineer',
        jobDescription: 'Work on software lifecycle steps.',
        eligibility: 'BE / B.Tech / MCA / MSc (CS/IT)',
        salary: 3.6,
        howToApply: 'Apply via placement portal.',
        applicationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        company: infosysComp._id
      });

      const coforgeJob = await Job.create({
        jobTitle: 'Graduate Engineer Trainee',
        jobDescription: 'Participate in structured training program.',
        eligibility: 'BE / B.Tech (CS, IT, ECS)',
        salary: 4.5,
        howToApply: 'Apply on portal.',
        applicationDeadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        company: coforgeComp._id
      });

      const tcsJob = await Job.create({
        jobTitle: 'Ninja',
        jobDescription: 'Work on application development and maintenance at TCS.',
        eligibility: 'BE / B.Tech / MCA',
        salary: 3.5,
        howToApply: 'Register on TCS NextStep portal.',
        applicationDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        company: tcsComp._id
      });

      const wiproJob = await Job.create({
        jobTitle: 'Project Engineer',
        jobDescription: 'Work on custom application development.',
        eligibility: 'BE / B.Tech / MCA',
        salary: 4.0,
        howToApply: 'Apply through the portal.',
        applicationDeadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        company: wiproComp._id
      });

      const hclJob = await Job.create({
        jobTitle: 'Software Engineer',
        jobDescription: 'Work on application design and development projects at HCLTech.',
        eligibility: 'BE / B.Tech / MCA',
        salary: 3.8,
        howToApply: 'Apply through the portal.',
        applicationDeadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        company: hclComp._id
      });

      const techmJob = await Job.create({
        jobTitle: 'Software Engineer Trainee',
        jobDescription: 'Work on software testing at Tech Mahindra.',
        eligibility: 'BE / B.Tech / MCA',
        salary: 3.25,
        howToApply: 'Apply via placement portal.',
        applicationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        company: techmComp._id
      });

      // Seed Student User (John Doe)
      const student = new User({
        first_name: 'John',
        last_name: 'Doe',
        email: studentEmail,
        number: 9876543210,
        password: hashedStudentPassword,
        role: 'student',
        isProfileCompleted: true,
        gender: 'Male',
        dateOfBirth: new Date('2002-05-15'),
        fullAddress: {
          address: 'A-102, Rizvi Residency, Bandra West, Mumbai',
          pincode: 400050
        },
        studentProfile: {
          isApproved: true,
          rollNumber: 101,
          UIN: 'U1012023',
          department: 'Computer Science',
          year: 4,
          addmissionYear: 2020,
          gap: false,
          liveKT: 0,
          SGPA: {
            sem1: 6.5, sem2: 6.6, sem3: 6.8, sem4: 6.7, sem5: 6.5, sem6: 6.9, sem7: 6.8, sem8: 6.8
          },
          pastQualification: {
            ssc: { board: 'CBSE', percentage: 85, year: 2018 },
            hsc: { board: 'CBSE', percentage: 80, year: 2020 }
          },
          appliedJobs: [
            { jobId: accentureJob._id, status: 'applied', appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
            { jobId: capgeminiJob._id, status: 'shortlisted', appliedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) }
          ],
          internships: []
        }
      });
      await student.save();

      accentureJob.applicants.push({ studentId: student._id, status: 'applied', appliedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) });
      capgeminiJob.applicants.push({ studentId: student._id, status: 'shortlisted', appliedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) });
      await accentureJob.save();
      await capgeminiJob.save();

      // Seed 50 demo students
      await seedDemoStudents(hashedStudentPassword);

      // Seed Student Notices
      await Notice.create({
        sender: tpo._id,
        sender_role: 'tpo_admin',
        receiver_role: 'student',
        title: 'Accenture Off-Campus Drive Registration Open',
        message: 'Accenture has announced its Off-Campus Recruitment Drive for Associate Software Engineer roles.'
      });

      await Notice.create({
        sender: tpo._id,
        sender_role: 'tpo_admin',
        receiver_role: 'student',
        title: 'Capgemini Exceller Hiring',
        message: 'Capgemini is hiring through Exceller drive.'
      });

      await Notice.create({
        sender: tpo._id,
        sender_role: 'tpo_admin',
        receiver_role: 'tpo_admin',
        title: 'Accenture hiring drive scheduled for 25 June',
        message: 'The Accenture hiring drive is scheduled. Please ensure the student eligibility lists are uploaded by 22 June.'
      });

      console.log('Database seeded successfully with professional demo data!');
    } else {
      // Non-empty database: check missing default accounts
      if (!existingSuperAdmin) {
        await User.create({
          first_name: 'System',
          last_name: 'Admin',
          email: superAdminEmail,
          number: 9876543213,
          password: hashedSuperAdminPassword,
          role: 'superuser',
          isProfileCompleted: true
        });
        console.log('Seeded missing default Super Admin account.');
      }

      if (!existingTPO) {
        await User.create({
          first_name: 'TPO',
          last_name: 'Officer',
          email: tpoEmail,
          number: 9876543211,
          password: hashedTPOPassword,
          role: 'tpo_admin',
          isProfileCompleted: true,
          tpoProfile: { position: 'Training & Placement Officer' }
        });
        console.log('Seeded missing default TPO account.');
      }

      if (!existingManagement) {
        await User.create({
          first_name: 'Management',
          last_name: 'Director',
          email: managementEmail,
          number: 9876543212,
          password: hashedManagementPassword,
          role: 'management_admin',
          isProfileCompleted: true,
          managementProfile: { position: 'Director of Placements' }
        });
        console.log('Seeded missing default Management account.');
      }

      if (!existingStudent) {
        await User.deleteMany({ 'studentProfile.UIN': 'U1012023' });
        await User.create({
          first_name: 'John',
          last_name: 'Doe',
          email: studentEmail,
          number: 9876543210,
          password: hashedStudentPassword,
          role: 'student',
          isProfileCompleted: true,
          gender: 'Male',
          dateOfBirth: new Date('2002-05-15'),
          fullAddress: {
            address: 'A-102, Rizvi Residency, Bandra West, Mumbai',
            pincode: 400050
          },
          studentProfile: {
            isApproved: true,
            rollNumber: 101,
            UIN: 'U1012023',
            department: 'Computer Science',
            year: 4,
            addmissionYear: 2020,
            gap: false,
            liveKT: 0,
            SGPA: {
              sem1: 6.5, sem2: 6.6, sem3: 6.8, sem4: 6.7, sem5: 6.5, sem6: 6.9, sem7: 6.8, sem8: 6.8
            },
            pastQualification: {
              ssc: { board: 'CBSE', percentage: 85, year: 2018 },
              hsc: { board: 'CBSE', percentage: 80, year: 2020 }
            },
            appliedJobs: [],
            internships: []
          }
        });
        console.log('Seeded missing default Student account.');
      }

      // Check student count to ensure 50+ students are seeded
      const studentCount = await User.countDocuments({ role: 'student' });
      if (studentCount < 10) {
        console.log(`Only ${studentCount} students found. Seeding 50+ demo students...`);
        await seedDemoStudents(hashedStudentPassword);
      }
    }
  } catch (error) {
    console.error('Error seeding database: ', error);
  }
};

module.exports = seedData;
