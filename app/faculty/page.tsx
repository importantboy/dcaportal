"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Award, Clock } from "lucide-react"
import Image from "next/image"
import { fetchPortalData, type PortalData } from "@/lib/data"

export default function FacultyPage() {
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
          <p className="text-gray-600">Loading faculty information...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load faculty data</p>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Faculty</h1>
            <p className="text-xl text-blue-200 text-balance">
              Meet our dedicated team of experienced educators and researchers
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.faculty.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.photo || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-balance">{member.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-blue-600">{member.designation}</CardDescription>
                  <Badge variant="outline" className="w-fit mx-auto">
                    {member.qualification}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-600" />
                      Specialization
                    </h4>
                    <p className="text-sm text-gray-700 text-pretty">{member.specialization}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Experience:</span>
                    <span className="text-sm text-gray-700">{member.experience}</span>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        {member.email}
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent" asChild>
                      <a href={`tel:${member.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        {member.phone}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Department Leadership */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Department Leadership</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-pretty">
              Our department is led by experienced professionals committed to academic excellence and student success.
            </p>
          </div>

          {/* HOD Highlight */}
          {data.faculty
            .filter((member) => member.designation.includes("Head"))
            .map((hod) => (
              <Card key={hod.id} className="max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-40 h-40 flex-shrink-0">
                      <Image
                        src={hod.photo || "/placeholder.svg"}
                        alt={hod.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-2 text-balance">{hod.name}</h3>
                      <p className="text-lg text-blue-600 font-medium mb-3">{hod.designation}</p>
                      <p className="text-gray-700 mb-4 text-pretty">
                        With {hod.experience} of experience in {hod.specialization.split(",")[0]}, {hod.name} leads our
                        department with a vision for innovation and academic excellence.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Badge variant="secondary">{hod.qualification}</Badge>
                        <Badge variant="outline">{hod.experience} Experience</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Faculty Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Faculty Excellence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">{data.faculty.length}</div>
                <CardTitle className="text-lg">Total Faculty</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {data.faculty.filter((f) => f.qualification.includes("Ph.D")).length}
                </div>
                <CardTitle className="text-lg">PhD Holders</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {data.faculty.filter((f) => f.designation.includes("Professor")).length}
                </div>
                <CardTitle className="text-lg">Professors</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {Math.round(
                    data.faculty.reduce((acc, f) => acc + Number.parseInt(f.experience), 0) / data.faculty.length,
                  )}
                  +
                </div>
                <CardTitle className="text-lg">Avg. Experience</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
