"use client"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { mockPosts } from "@/lib/mock-data"
import { Navigation } from "@/components/navigation"
export default function HomePage() {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())
  const toggleLike = (postId: string) => {
    const newLiked = new Set(likedPosts)
    if (newLiked.has(postId)) {
      newLiked.delete(postId)
    } else {
      newLiked.add(postId)
    }
    setLikedPosts(newLiked)
  }
  const toggleSave = (postId: string) => {
    const newSaved = new Set(savedPosts)
    if (newSaved.has(postId)) {
      newSaved.delete(postId)
    } else {
      newSaved.add(postId)
    }
    setSavedPosts(newSaved)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Creative Feed</h1>
            <p className="text-gray-600">Discover amazing work from talented creators</p>
          </div>
          {mockPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{post.author.name}</p>
                      <p className="text-xs text-gray-500">{post.author.title}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-64 object-cover" />
                <div className="px-6 pt-4">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{post.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(post.id)}
                      className={likedPosts.has(post.id) ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSave(post.id)}
                    className={savedPosts.has(post.id) ? "text-blue-500" : ""}
                  >
                    <Bookmark className={`h-4 w-4 ${savedPosts.has(post.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}