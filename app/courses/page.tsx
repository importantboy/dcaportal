"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, GraduationCap, BookOpen } from "lucide-react"
import { fetchPortalData, type PortalData } from "@/lib/data"

export default function CoursesPage() {
  const [data, setData] = useState<PortalData | null>(null)
  const [loading, setLoading] = useState(true)

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
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load courses data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Courses</h1>
            <p className="text-xl text-blue-200 text-balance">
              Comprehensive programs designed to shape future IT professionals
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-balance">{course.name}</CardTitle>
                      <CardDescription className="text-lg mt-2">{course.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      {course.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Intake: {course.intake} students</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Eligibility: {course.eligibility}</span>
                    </div>
                  </div>

                  {/* Syllabus */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-orange-600" />
                      Syllabus Overview
                    </h4>
                    <Tabs defaultValue="1" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        {course.syllabus.slice(0, 3).map((sem) => (
                          <TabsTrigger key={sem.semester} value={sem.semester.toString()}>
                            Semester {sem.semester}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {course.syllabus.slice(0, 3).map((sem) => (
                        <TabsContent key={sem.semester} value={sem.semester.toString()}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {sem.subjects.map((subject, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-md">
                                <span className="text-sm font-medium">{subject}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Why Choose Our Programs?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-pretty">
              Our courses are designed with industry requirements in mind, ensuring students gain practical skills
              alongside theoretical knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Industry-Relevant Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Updated syllabus aligned with current industry trends and technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Learn from experienced professionals with industry and academic expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Practical Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Hands-on projects, internships, and lab sessions for real-world experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
