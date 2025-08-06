"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, LinkIcon, Calendar, Settings, Share2, MessageCircle, Heart, Bookmark } from "lucide-react"
import { mockPosts, mockProjects } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const currentUser = {
    id: "1",
    name: "Alex Rivera",
    title: "UI/UX Designer & Creative Director",
    location: "San Francisco, CA",
    website: "alexrivera.design",
    joinDate: "March 2022",
    bio: "Passionate about creating beautiful, functional designs that solve real problems. I love exploring new design trends and pushing creative boundaries.",
    avatar: "/placeholder.svg?height=120&width=120&text=AR",
    followers: 2847,
    following: 892,
    posts: 156,
    skills: ["UI Design", "UX Research", "Figma", "Prototyping", "Brand Design"],
  }
  const userPosts = mockPosts.slice(0, 6)
  const userProjects = mockProjects.slice(0, 6)
  const savedPosts = mockPosts.slice(2, 5)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentUser.name}</h1>
                      <p className="text-lg text-gray-600 mb-2">{currentUser.title}</p>
                      <div className="flex items-center text-gray-500 text-sm space-x-4 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {currentUser.location}
                        </div>
                        <div className="flex items-center">
                          <LinkIcon className="h-4 w-4 mr-1" />
                          {currentUser.website}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined {currentUser.joinDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{currentUser.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentUser.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-8 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{currentUser.followers.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{currentUser.following.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Following</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{currentUser.posts}</div>
                      <div className="text-sm text-gray-600">Posts</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <TabsContent value="posts">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                      <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="font-semibold text-sm mb-1">{post.title}</h3>
                        <div className="flex items-center space-x-3 text-xs">
                          <div className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {post.likes}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {post.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{project.year}</span>
                        <Button variant="outline" size="sm">
                          View Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-black bg-opacity-50 hover:bg-opacity-70"
                        >
                          <Bookmark className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="font-semibold text-sm mb-1">{post.title}</h3>
                        <p className="text-xs opacity-90">by {post.author.name}</p>
                      </div>
                    </div>
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