"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Calendar, Award, Eye, Target, History } from "lucide-react"
import Link from "next/link"
import { fetchPortalData, type PortalData } from "@/lib/data"

export default function HomePage() {
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
          <p className="text-gray-600">Loading portal data...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load portal data</p>
        </div>
      </div>
    )
  }

  const { department, notices, events } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">{department.name}</h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 text-balance">{department.college}</p>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8 text-pretty">
              Fostering innovation and excellence in computer applications since {department.established}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-300 text-blue-100 hover:bg-blue-800 bg-transparent"
              >
                <Link href="/faculty">Meet Faculty</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{department.totalStudents}+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{department.facultyCount}</div>
              <div className="text-gray-600">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">{department.labsCount}</div>
              <div className="text-gray-600">Computer Labs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                {new Date().getFullYear() - Number.parseInt(department.established)}+
              </div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, History */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-6 w-6 text-blue-600" />
                  Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-pretty">{department.vision}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6 text-green-600" />
                  Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-pretty">{department.mission}</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-6 w-6 text-orange-600" />
                  History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-pretty">{department.history}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/courses">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Courses</CardTitle>
                  <CardDescription>BCA & MCA Programs</CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/faculty">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Faculty</CardTitle>
                  <CardDescription>Meet Our Experts</CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/assignments">
                <CardHeader className="text-center">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Projects & Tasks</CardDescription>
                </CardHeader>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/library">
                <CardHeader className="text-center">
                  <BookOpen className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <CardTitle>Library</CardTitle>
                  <CardDescription>Books & Resources</CardDescription>
                </CardHeader>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Notices & Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Notices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Notices</span>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/notices">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notices.slice(0, 3).map((notice) => (
                    <div key={notice.id} className="border-l-4 border-l-blue-500 pl-4">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-balance">{notice.title}</h4>
                        <Badge
                          variant={
                            notice.priority === "high"
                              ? "destructive"
                              : notice.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {notice.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{new Date(notice.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-700 mt-2 text-pretty">{notice.content.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upcoming Events</span>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/events">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="border-l-4 border-l-green-500 pl-4">
                      <h4 className="font-semibold text-sm text-balance">{event.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <p className="text-sm text-gray-700 mt-2 text-pretty">{event.description.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
