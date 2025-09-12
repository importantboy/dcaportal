"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Book, Download, ExternalLink, Search, Filter, FileText, Globe } from "lucide-react"
import { fetchPortalData, type PortalData } from "@/lib/data"

export default function LibraryPage() {
  const [data, setData] = useState<PortalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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
          <p className="text-gray-600">Loading library resources...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load library data</p>
        </div>
      </div>
    )
  }

  // Filter functions
  const filterBooks = () => {
    return data.library.books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || book.category.toLowerCase().includes(selectedCategory.toLowerCase())
      return matchesSearch && matchesCategory
    })
  }

  const filterEbooks = () => {
    return data.library.ebooks.filter((ebook) => {
      const matchesSearch =
        ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || ebook.category.toLowerCase().includes(selectedCategory.toLowerCase())
      return matchesSearch && matchesCategory
    })
  }

  const filterJournals = () => {
    return data.library.journals.filter((journal) => {
      const matchesSearch =
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.publisher.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || journal.category.toLowerCase().includes(selectedCategory.toLowerCase())
      return matchesSearch && matchesCategory
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Digital Library</h1>
            <p className="text-xl text-blue-200 text-balance">
              Access our comprehensive collection of books, e-books, and journals
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
                placeholder="Search books, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="algorithms">Algorithms</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="software engineering">Software Engineering</SelectItem>
                  <SelectItem value="machine learning">Machine Learning</SelectItem>
                  <SelectItem value="web development">Web Development</SelectItem>
                  <SelectItem value="computer science">Computer Science</SelectItem>
                  <SelectItem value="computing">Computing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Library Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="books" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="books">Physical Books</TabsTrigger>
              <TabsTrigger value="ebooks">E-Books</TabsTrigger>
              <TabsTrigger value="journals">Journals</TabsTrigger>
            </TabsList>

            {/* Physical Books Tab */}
            <TabsContent value="books">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterBooks().length === 0 ? (
                  <Card className="col-span-full text-center py-12">
                    <CardContent>
                      <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterBooks().map((book) => (
                    <Card key={book.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-balance leading-tight">{book.title}</CardTitle>
                            <CardDescription className="text-base font-medium text-blue-600 mt-1">
                              {book.author}
                            </CardDescription>
                          </div>
                          <Badge variant={book.availability === "Available" ? "default" : "secondary"}>
                            {book.availability}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">ISBN:</span> {book.isbn}
                          </div>
                          <div>
                            <span className="font-medium">Category:</span> {book.category}
                          </div>
                          <div>
                            <span className="font-medium">Copies Available:</span> {book.copies}
                          </div>
                        </div>
                        <Button
                          variant={book.availability === "Available" ? "default" : "outline"}
                          className="w-full"
                          disabled={book.availability !== "Available"}
                        >
                          <Book className="h-4 w-4 mr-2" />
                          {book.availability === "Available" ? "Issue Book" : "Currently Unavailable"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* E-Books Tab */}
            <TabsContent value="ebooks">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterEbooks().length === 0 ? (
                  <Card className="col-span-full text-center py-12">
                    <CardContent>
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No e-books found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterEbooks().map((ebook) => (
                    <Card key={ebook.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg text-balance leading-tight">{ebook.title}</CardTitle>
                        <CardDescription className="text-base font-medium text-green-600">
                          {ebook.author}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Category:</span> {ebook.category}
                          </div>
                          <div>
                            <span className="font-medium">Format:</span> {ebook.format}
                          </div>
                        </div>
                        <Button className="w-full" asChild>
                          <a href={ebook.downloadUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download {ebook.format}
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* Journals Tab */}
            <TabsContent value="journals">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterJournals().length === 0 ? (
                  <Card className="col-span-full text-center py-12">
                    <CardContent>
                      <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No journals found</h3>
                      <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                  </Card>
                ) : (
                  filterJournals().map((journal) => (
                    <Card key={journal.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-balance leading-tight">{journal.title}</CardTitle>
                            <CardDescription className="text-base font-medium text-purple-600 mt-1">
                              {journal.publisher}
                            </CardDescription>
                          </div>
                          <Badge variant={journal.subscription === "Active" ? "default" : "secondary"}>
                            {journal.subscription}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Category:</span> {journal.category}
                        </div>
                        <Button
                          className="w-full"
                          variant={journal.subscription === "Active" ? "default" : "outline"}
                          disabled={journal.subscription !== "Active"}
                          asChild={journal.subscription === "Active"}
                        >
                          {journal.subscription === "Active" ? (
                            <a href={journal.accessUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Access Journal
                            </a>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Subscription Inactive
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Library Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Library Statistics</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-pretty">
              Our digital library provides comprehensive resources for academic and research purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">{data.library.books.length}</div>
                <CardTitle className="text-lg">Physical Books</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">{data.library.ebooks.length}</div>
                <CardTitle className="text-lg">E-Books</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">{data.library.journals.length}</div>
                <CardTitle className="text-lg">Journals</CardTitle>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-blue-900 mb-2">
                  {data.library.books.reduce((acc, book) => acc + book.copies, 0)}
                </div>
                <CardTitle className="text-lg">Total Copies</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Library Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-balance">Library Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Book Issuing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Issue physical books for a period of 15 days with renewal options available.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Digital Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Download e-books and research papers for offline reading and reference.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Online Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-pretty">
                  Access premium journals and research databases through our institutional subscriptions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
