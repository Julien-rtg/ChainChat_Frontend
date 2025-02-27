import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { profileService } from "@/services/profile.service"
import { useEffect } from "react"

export default function ProfileSettings() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleChangePassword = () => {
    // Implement password change logic
    console.log("Change password clicked")
  }

  const handleGetProfileEmail = async () => {
    try {
      const response = await profileService.getProfileEmail()
      console.log(response);
      setEmail(response.email)
      setFullName(response.firstName + " " + response.lastName)
      setStatus("available")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetProfileEmail()
  }, [])

  const handleViewSessions = () => {
    // Implement view sessions logic
    console.log("View sessions clicked")
  }

  const handleSignOut = () => {
    // Implement sign out logic
    console.log("Sign out clicked")
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and security preferences
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/path-to-avatar.jpg" alt={fullName} />
            <AvatarFallback>{fullName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-0 right-0"
          >
            Change
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and public profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select your status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="away">Away</SelectItem>
                <SelectItem value="dnd">Do Not Disturb</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your security preferences and active sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium leading-none">Change Password</h4>
              <p className="text-sm text-muted-foreground">
                Update your password regularly to keep your account secure
              </p>
            </div>
            <Button variant="outline" onClick={handleChangePassword}>
              Change
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium leading-none">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-medium leading-none">Session Management</h4>
              <p className="text-sm text-muted-foreground">
                Manage your active sessions and devices
              </p>
            </div>
            <Button variant="outline" onClick={handleViewSessions}>
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          variant="destructive"
          size="lg"
          onClick={handleSignOut}
          className="min-w-[200px]"
        >
          Sign Out
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        ChainChat Secure Messaging © 2025
      </p>
    </div>
  )
}
