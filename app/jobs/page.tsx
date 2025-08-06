"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, DollarSign, Filter } from "lucide-react"
import { mockJobs } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"
export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterType, setFilterType] = useState("all")
  const filteredJobs = mockJobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .filter((job) => filterType === "all" || job.type.toLowerCase() === filterType)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      if (sortBy === "salary") return b.salary - a.salary
      return 0
    })
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Jobs Board</h1>
            <p className="text-gray-600">Find your next creative opportunity</p>
          </div>
          {}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <p className="text-lg text-gray-700 mb-2">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />${job.salary.toLocaleString()}/year
                        </div>
                      </div>
                    </div>
                    <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Posted {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                    <Button>Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}