import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react';

const reportTypes = [
  {
    title: 'User Activity Report',
    description: 'Detailed analysis of user engagement and activity',
    icon: Users,
    lastGenerated: '2 hours ago',
  },
  {
    title: 'Course Performance Report',
    description: 'Performance metrics for all courses',
    icon: BookOpen,
    lastGenerated: '1 day ago',
  },
  {
    title: 'Assignment Statistics',
    description: 'Completion rates and grading statistics',
    icon: BarChart3,
    lastGenerated: '3 hours ago',
  },
  {
    title: 'System Usage Report',
    description: 'Platform usage and technical metrics',
    icon: TrendingUp,
    lastGenerated: '6 hours ago',
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and download system reports
          </p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reportTypes.map((report) => (
          <Card key={report.title}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <report.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{report.title}</CardTitle>
              </div>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Last generated: {report.lastGenerated}
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm">
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Your recently generated reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Monthly User Activity - March 2024.pdf', date: '2 hours ago', size: '2.4 MB' },
              { name: 'Course Performance Q1 2024.xlsx', date: '1 day ago', size: '5.1 MB' },
              { name: 'Assignment Statistics - Week 12.pdf', date: '3 days ago', size: '1.8 MB' },
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {file.date} • {file.size}
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
