"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { fetchPortalData, type PortalData } from "@/lib/data"

export default function EventsPage() {
  const [data, setData] = useState<PortalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load events data</p>
        </div>
      </div>
    )
  }

  // Sort events by date (newest first)
  const sortedEvents = data.events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const nextImage = (event: any) => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length)
  }

  const prevImage = (event: any) => {
    setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length)
  }

  const isUpcoming = (date: string) => {
    return new Date(date) > new Date()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Events & Activities</h1>
            <p className="text-xl text-blue-200 text-balance">
              Discover our vibrant campus life through various events and activities
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sortedEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-64">
                  <Image src={event.images[0] || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <div className="absolute top-4 right-4">
                    <Badge variant={isUpcoming(event.date) ? "default" : "secondary"}>
                      {isUpcoming(event.date) ? "Upcoming" : "Completed"}
                    </Badge>
                  </div>
                  {event.images.length > 1 && (
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="outline" className="bg-white/90">
                        <Camera className="h-3 w-3 mr-1" />
                        {event.images.length} Photos
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-balance">{event.title}</CardTitle>
                  <CardDescription className="text-pretty">{event.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {event.images.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {selectedEvent === event.id ? "Hide Gallery" : "View Photo Gallery"}
                    </Button>
                  )}

                  {/* Photo Gallery */}
                  {selectedEvent === event.id && (
                    <div className="mt-4 space-y-4">
                      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={event.images[currentImageIndex] || "/placeholder.svg"}
                          alt={`${event.title} - Photo ${currentImageIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                        {event.images.length > 1 && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90"
                              onClick={() => prevImage(event)}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90"
                              onClick={() => nextImage(event)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                      <div className="flex justify-center gap-2">
                        {event.images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-blue-600" : "bg-gray-300"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Types of Events</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-pretty">
              We organize various types of events to enhance learning and provide practical exposure to our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Technical Festivals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Annual tech fests featuring coding competitions, project exhibitions, and innovation showcases.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Industry Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Educational visits to leading IT companies to provide real-world industry exposure.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Workshops & Seminars</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Expert-led workshops and seminars on emerging technologies and industry trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
