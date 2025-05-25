
const job = {
  title: "Frontend Developer",
  description: "We are looking for a skilled frontend developer to join our growing tech team.",
  requirements: [
    "Proficient in React.js and Tailwind CSS",
    "Experience with RESTful APIs",
    "Good understanding of responsive design"
  ],
  salary: 85000,
  experienceLevel: 2, // e.g. 0=Entry, 1=Junior, 2=Mid, 3=Senior
  location: "Delhi",
  jobType: "Full-time",
  position: 2, // Number of open roles
  company: {
    name: "Google",
    website: "https://www.google.com",
    logo: "https://logo.clearbit.com/google.com",
    description: "A global technology leader in search, advertising, cloud computing, and more.",
    location: "Mountain View, CA"
  },
  created_by: {
  fullname: "Arjun Mehta",
  email: "arjun@innovatech.com",
  phoneNumber: "+1-212-555-0199",
  password: "hashed_password_here", // hash this before saving
  role: "employer",
  company: {
  name: "Innovatech Solutions",
  website: "https://innovatech.com",
  logo: "/logos/innovatech.png",
  description: "A global leader in AI and software innovation, delivering top-tier enterprise solutions.",
  location: "New York, NY"
  }, // match company _id above
  profile: {
    bio: "Tech recruiter with a passion for connecting top talent to top companies.",
    resume: "",
    profilePhoto: "/profiles/arjun.png"
  }
},
  createdAt: "2025-11-04", // Use current date
  applications: [] // or insert existing application IDs
}


export default job;