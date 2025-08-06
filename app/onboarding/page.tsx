"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react"
import { useRouter } from "next/navigation"
const availableSkills = [
  "UI Design",
  "UX Research",
  "Graphic Design",
  "Web Development",
  "Mobile Design",
  "Branding",
  "Illustration",
  "Photography",
  "Video Editing",
  "3D Modeling",
  "Animation",
  "Copywriting",
  "Product Design",
  "Frontend Development",
  "Backend Development",
]
export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    location: "",
    website: "",
    skills: [] as string[],
    avatar: "",
  })
  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/")
    }
  }
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  const isStep1Valid = formData.name && formData.title && formData.bio
  const isStep2Valid = formData.skills.length > 0
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Atives</h1>
          <p className="text-gray-600">Let's set up your creative profile</p>
        </div>
        <div className="mb-8">
          <Progress value={(currentStep / 2) * 100} className="w-full" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Step {currentStep} of 2</span>
            <span>{Math.round((currentStep / 2) * 100)}% Complete</span>
          </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 1 ? "Tell us about yourself" : "What are your skills?"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl">
                        {formData.name ? formData.name.charAt(0) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          avatar: "/placeholder.svg?height=96&width=96&text=" + (prev.name || "User"),
                        }))
                      }
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., UI/UX Designer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself and your creative journey..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website/Portfolio</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                      placeholder="yourportfolio.com"
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">Select the skills that best describe your expertise</p>
                  <p className="text-sm text-gray-500 mt-2">Choose at least one skill to continue</p>
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {availableSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {formData.skills.includes(skill) && <Check className="h-3 w-3 mr-1" />}
                      {skill}
                    </Badge>
                  ))}
                </div>
                {formData.skills.length > 0 && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Selected Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}>
                {currentStep === 2 ? "Complete Setup" : "Next"}
                {currentStep < 2 && <ArrowRight className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}