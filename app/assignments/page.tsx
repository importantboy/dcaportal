"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, FileText, Users, Clock, Search, Filter, BookOpen } from "lucide-react"
import { fetchPortalData, type PortalData } from "@/lib/data"

export default function AssignmentsPage() {
  const [data, setData] = useState<PortalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")

  useEffect(() => {
    fetchPortalData()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load assignments data</p>
        </div>
      </div>
    )
  }

  // Filter assignments
  const filteredAssignments = data.assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "all" || assignment.course.includes(selectedCourse)
    return matchesSearch && matchesCourse
  })

  // Filter projects
  const filteredProjects = data.projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.guide.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.students.some((student) => student.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Assignments & Projects</h1>
            <p className="text-xl text-blue-200 text-balance">
              Access your assignments, projects, and submission guidelines
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search assignments and projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="MCA">MCA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="assignments" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="assignments">Current Assignments</TabsTrigger>
              <TabsTrigger value="projects">Student Projects</TabsTrigger>
            </TabsList>

            {/* Assignments Tab */}
            <TabsContent value="assignments">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredAssignments.length === 0 ? (
                  <Card className="col-span-full text-center py-12">
                    <CardContent>
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No assignments found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredAssignments.map((assignment) => {
                    const daysUntilDue = getDaysUntilDue(assignment.dueDate)
                    const overdue = isOverdue(assignment.dueDate)

                    return (
                      <Card
                        key={assignment.id}
                        className={`hover:shadow-lg transition-shadow ${
                          overdue
                            ? "border-l-4 border-l-red-500"
                            : daysUntilDue <= 3
                              ? "border-l-4 border-l-yellow-500"
                              : ""
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl text-balance">{assignment.title}</CardTitle>
                              <CardDescription className="text-lg font-medium text-blue-600 mt-1">
                                {assignment.subject}
                              </CardDescription>
                              <Badge variant="outline" className="mt-2 w-fit">
                                {assignment.course}
                              </Badge>
                            </div>
                            <div className="text-right">
                              {overdue ? (
                                <Badge variant="destructive">Overdue</Badge>
                              ) : daysUntilDue <= 3 ? (
                                <Badge variant="default" className="bg-yellow-500">
                                  Due Soon
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Active</Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700 text-pretty">{assignment.description}</p>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span>
                                Due:{" "}
                                {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                              {!overdue && (
                                <span className="text-xs text-gray-500">
                                  ({daysUntilDue > 0 ? `${daysUntilDue} days left` : "Due today"})
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText className="h-4 w-4 text-green-600" />
                              <span>Format: {assignment.submissionFormat}</span>
                            </div>
                          </div>

                          <Button className="w-full" asChild>
                            <a href={assignment.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Download Assignment
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.length === 0 ? (
                  <Card className="col-span-full text-center py-12">
                    <CardContent>
                      <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
                      <p className="text-gray-500">Try adjusting your search criteria.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-balance">{project.title}</CardTitle>
                            <CardDescription className="text-lg font-medium text-purple-600 mt-1">
                              Guide: {project.guide}
                            </CardDescription>
                          </div>
                          <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700 text-pretty">{project.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span>Students: {project.students.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span>Year: {project.year}</span>
                          </div>
                        </div>

                        {project.status === "Completed" && (
                          <Button variant="outline" className="w-full bg-transparent" asChild>
                            <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              View Project Report
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Submission Guidelines</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-pretty">
              Please follow these guidelines for assignment and project submissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Format Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Follow the specified format for each assignment. Include proper documentation and comments in code.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Timely Submission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Submit assignments before the due date. Late submissions may result in grade penalties.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Academic Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Maintain academic honesty. Plagiarism and copying will result in disciplinary action.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
