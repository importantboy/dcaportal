"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, AlertCircle, Info, BookOpen, Search, Filter } from "lucide-react"
import { fetchPortalData, type PortalData } from "@/lib/data"

export default function NoticesPage() {
  const [data, setData] = useState<PortalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

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
          <p className="text-gray-600">Loading notices...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load notices data</p>
        </div>
      </div>
    )
  }

  // Filter notices based on search and filters
  const filteredNotices = data.notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || notice.priority === selectedPriority
    return matchesSearch && matchesCategory && matchesPriority
  })

  // Sort notices by date (newest first)
  const sortedNotices = filteredNotices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "medium":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "low":
        return <BookOpen className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Notice Board</h1>
            <p className="text-xl text-blue-200 text-balance">
              Stay updated with the latest announcements and important information
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
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="examination">Examination</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="library">Library</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sortedNotices.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No notices found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {sortedNotices.map((notice) => (
                <Card
                  key={notice.id}
                  className={`border-l-4 ${getPriorityColor(notice.priority)} hover:shadow-lg transition-shadow`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getPriorityIcon(notice.priority)}
                          <CardTitle className="text-xl text-balance">{notice.title}</CardTitle>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(notice.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {notice.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge
                        variant={
                          notice.priority === "high"
                            ? "destructive"
                            : notice.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="capitalize"
                      >
                        {notice.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-pretty leading-relaxed">{notice.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Notice Categories Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Notice Categories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-pretty">
              Our notices are categorized to help you find relevant information quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Examination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Exam schedules, results, and related announcements</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Workshops, seminars, and department events</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Academic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Course updates, assignments, and academic policies</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">New arrivals, library hours, and resource updates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
