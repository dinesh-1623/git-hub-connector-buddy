
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage system configuration and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>
              Basic system configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="DIL Platform" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input id="siteDescription" defaultValue="Digital Learning Platform" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input id="adminEmail" type="email" defaultValue="admin@dilplatform.com" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure system notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Send email notifications for important events
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Assignment Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Notify when assignments are submitted
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>User Registration Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Notify when new users register
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Security and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Two-Factor Authentication</Label>
                <div className="text-sm text-muted-foreground">
                  Require 2FA for admin accounts
                </div>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Session Timeout</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically log out inactive users
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" type="number" defaultValue="30" className="w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg">Save Settings</Button>
        </div>
      </div>
    </div>
  );
}
