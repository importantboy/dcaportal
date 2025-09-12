export interface Department {
  name: string
  college: string
  vision: string
  mission: string
  history: string
  established: string
  totalStudents: number
  facultyCount: number
  labsCount: number
}

export interface Course {
  id: number
  name: string
  duration: string
  eligibility: string
  intake: number
  description: string
  syllabus: {
    semester: number
    subjects: string[]
  }[]
}

export interface Faculty {
  id: number
  name: string
  designation: string
  qualification: string
  specialization: string
  experience: string
  email: string
  phone: string
  photo: string
}

export interface Notice {
  id: number
  title: string
  date: string
  content: string
  priority: "high" | "medium" | "low"
  category: string
}

export interface Event {
  id: number
  title: string
  date: string
  description: string
  venue: string
  time: string
  images: string[]
}

export interface Assignment {
  id: number
  title: string
  course: string
  subject: string
  dueDate: string
  description: string
  downloadUrl: string
  submissionFormat: string
}

export interface Project {
  id: number
  title: string
  students: string[]
  guide: string
  year: string
  description: string
  downloadUrl: string
  status: string
}

export interface LibraryData {
  books: {
    id: number
    title: string
    author: string
    isbn: string
    category: string
    availability: string
    copies: number
  }[]
  ebooks: {
    id: number
    title: string
    author: string
    category: string
    downloadUrl: string
    format: string
  }[]
  journals: {
    id: number
    title: string
    publisher: string
    category: string
    accessUrl: string
    subscription: string
  }[]
}

export interface Contact {
  address: string
  phone: string
  email: string
  office_hours: string
  hod_email: string
  coordinates: {
    lat: number
    lng: number
  }
  mapEmbedUrl: string
}

export interface PortalData {
  department: Department
  courses: Course[]
  faculty: Faculty[]
  notices: Notice[]
  events: Event[]
  assignments: Assignment[]
  projects: Project[]
  library: LibraryData
  contact: Contact
}

export async function fetchPortalData(): Promise<PortalData> {
  const response = await fetch("/data.json")
  if (!response.ok) {
    throw new Error("Failed to fetch portal data")
  }
  return response.json()
}
