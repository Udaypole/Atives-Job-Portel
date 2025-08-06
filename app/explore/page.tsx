"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Briefcase, BookOpen, UserPlus } from "lucide-react"
import { mockUsers, mockResources } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"
export default function ExplorePage() {
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set())
  const toggleFollow = (userId: string) => {
    const newFollowed = new Set(followedUsers)
    if (newFollowed.has(userId)) {
      newFollowed.delete(userId)
    } else {
      newFollowed.add(userId)
    }
    setFollowedUsers(newFollowed)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore</h1>
            <p className="text-gray-600">Discover talented creators, portfolios, and resources</p>
          </div>
          <Tabs defaultValue="members" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Members
              </TabsTrigger>
              <TabsTrigger value="portfolios" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Portfolios
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Resources
              </TabsTrigger>
            </TabsList>
            <TabsContent value="members">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUsers.map((user) => (
                  <Card key={user.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Avatar className="w-20 h-20 mx-auto mb-4">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{user.title}</p>
                        <p className="text-gray-500 text-xs mb-4">{user.location}</p>
                        <div className="flex justify-center space-x-4 text-sm text-gray-600 mb-4">
                          <div className="text-center">
                            <div className="font-semibold">{user.followers}</div>
                            <div>Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold">{user.projects}</div>
                            <div>Projects</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          {user.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button
                          onClick={() => toggleFollow(user.id)}
                          variant={followedUsers.has(user.id) ? "outline" : "default"}
                          className="w-full"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          {followedUsers.has(user.id) ? "Following" : "Follow"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="portfolios">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden">
                      <img
                        src={`/placeholder.svg?height=200&width=300&text=${user.name}'s Portfolio`}
                        alt={`${user.name}'s portfolio`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-sm">{user.name}</h3>
                          <p className="text-gray-600 text-xs">{user.title}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {user.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockResources.map((resource) => (
                  <Card key={resource.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{resource.category}</Badge>
                            <Button variant="outline" size="sm">
                              View Resource
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}