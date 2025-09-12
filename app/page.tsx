"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Users, BookOpen, Calendar, Award, Eye, Target, History } from "lucide-react"
import Link from "next/link"
import { fetchPortalData, type PortalData } from "@/lib/data"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

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

  const heroImages = [
    "/pexels-ron-lach-10638075.jpg",
    "/pexels-joshsorenson-1714208.jpg",
    "/engineer-8499958.jpg",
    "/modern-computer-lab.png",
    "/university-building-blue-sky.png",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image Carousel */}
      <section className="relative overflow-hidden h-screen">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0 ">
          <Carousel
            className="w-full h-full"
            opts={{loop : true}}
            plugins={[
            
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
              }),
            ]}
            
          >
            <CarouselContent className="h-full">
              {heroImages.map((image, index) => (
                <CarouselItem key={index} className="h-full" >
                  <div className="relative h-full min-w-screen">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Campus image ${index + 1}`}
                      className="w-full  min-h-screen object-cover "
                      width={'10'}
                      height={'10'}
                      // objectFit="cover"
                      // fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-primary/90"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <div className="opacity-0 animate-fade-in-up mb-6 ">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                  <Award className="h-4 w-4 mr-2" />
                  Established {department.established} • {department.totalStudents}+ Students
                </div>
              </div>

              <h1 className="opacity-0 animate-fade-in-up animation-delay-200 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 text-balance leading-[0.9] tracking-tight">
                Empowering Future
                <span className="block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                  Innovators
                </span>
              </h1>

              <p className="opacity-0 animate-fade-in-up animation-delay-400 text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 text-balance font-light">
                {department.name}
              </p>

              <div className="opacity-0 animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-accent/25 transition-all duration-300 hover:scale-105 border-0"
                >
                  <Link href="/courses" className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Explore Programs
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white hover:text-primary bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Join Our Community
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>


        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 ">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">Excellence in Numbers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Our achievements reflect our commitment to academic excellence and innovation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-accent mb-4 hover:scale-110 transition-transform duration-300">
                {department.totalStudents}+
              </div>
              <div className="text-lg font-semibold text-primary">Active Students</div>
              <div className="text-muted-foreground">Pursuing Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-secondary mb-4 hover:scale-110 transition-transform duration-300">
                {department.facultyCount}
              </div>
              <div className="text-lg font-semibold text-primary">Expert Faculty</div>
              <div className="text-muted-foreground">Industry Leaders</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-accent mb-4 hover:scale-110 transition-transform duration-300">
                {department.labsCount}
              </div>
              <div className="text-lg font-semibold text-primary">Modern Labs</div>
              <div className="text-muted-foreground">State-of-the-art</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black text-secondary mb-4 hover:scale-110 transition-transform duration-300">
                {new Date().getFullYear() - Number.parseInt(department.established)}+
              </div>
              <div className="text-lg font-semibold text-primary">Years Legacy</div>
              <div className="text-muted-foreground">Of Excellence</div>
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
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl">Recent Notices</span>
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                    <Link href="/notices">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notices.slice(0, 3).map((notice) => (
                    <div key={notice.id} className="border-l-4 border-l-blue-500 pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm text-balance">{notice.title}</h4>
                        <Badge
                          variant={
                            notice.priority === "high"
                              ? "destructive"
                              : notice.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="w-fit"
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
                <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-lg sm:text-xl">Upcoming Events</span>
                  <Button asChild variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
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
