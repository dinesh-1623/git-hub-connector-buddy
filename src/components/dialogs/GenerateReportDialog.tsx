
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Download, FileText, Calendar } from 'lucide-react';

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ReportFormData {
  reportType: string;
  dateRange: string;
  format: string;
}

const reportTypes = [
  { value: 'user-activity', label: 'User Activity Report' },
  { value: 'course-performance', label: 'Course Performance Report' },
  { value: 'assignment-statistics', label: 'Assignment Statistics' },
  { value: 'system-usage', label: 'System Usage Report' },
];

const dateRanges = [
  { value: 'last-7-days', label: 'Last 7 days' },
  { value: 'last-30-days', label: 'Last 30 days' },
  { value: 'last-quarter', label: 'Last quarter' },
  { value: 'last-year', label: 'Last year' },
];

const formats = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel (XLSX)' },
  { value: 'csv', label: 'CSV' },
];

export function GenerateReportDialog({ open, onOpenChange }: GenerateReportDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<ReportFormData>({
    defaultValues: {
      reportType: '',
      dateRange: '',
      format: 'pdf',
    },
  });

  const onSubmit = async (data: ReportFormData) => {
    setIsGenerating(true);
    console.log('Generating report:', data);
    
    const reportTypeLabel = reportTypes.find(t => t.value === data.reportType)?.label;
    const dateRangeLabel = dateRanges.find(d => d.value === data.dateRange)?.label;
    
    // Simulate report generation
    toast.info(`Generating ${reportTypeLabel} for ${dateRangeLabel}...`);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate download
    const fileName = `${data.reportType}-${data.dateRange}.${data.format}`;
    toast.success(`Report generated successfully! Download started: ${fileName}`);
    
    form.reset();
    onOpenChange(false);
    setIsGenerating(false);
  };

  const handleQuickGenerate = async (reportType: string) => {
    setIsGenerating(true);
    console.log('Quick generating report:', reportType);
    
    const reportTypeLabel = reportTypes.find(t => t.value === reportType)?.label;
    
    toast.info(`Quick generating ${reportTypeLabel}...`);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const fileName = `${reportType}-quick.pdf`;
    toast.success(`Report generated! Download started: ${fileName}`);
    
    setIsGenerating(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Report
          </DialogTitle>
          <DialogDescription>
            Create custom reports or use quick generation options.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Generate Options */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Quick Generate</h4>
            <div className="grid grid-cols-2 gap-2">
              {reportTypes.slice(0, 4).map((report) => (
                <Button
                  key={report.value}
                  variant="outline"
                  size="sm"
                  className="justify-start h-auto p-3"
                  disabled={isGenerating}
                  onClick={() => handleQuickGenerate(report.value)}
                >
                  <div className="text-left">
                    <div className="text-xs font-medium">{report.label}</div>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Report Form */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Custom Report</h4>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="reportType"
                  rules={{ required: 'Please select a report type' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Report Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {reportTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dateRange"
                  rules={{ required: 'Please select a date range' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date Range
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dateRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Format</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {formats.map((format) => (
                            <SelectItem key={format.value} value={format.value}>
                              {format.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    disabled={isGenerating}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isGenerating}>
                    <Download className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate & Download'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
