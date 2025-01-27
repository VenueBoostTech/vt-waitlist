"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText, AlertCircle } from "lucide-react";
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/ui/toast';

interface ImportAndExportProps {
  waitlist: {
    id: string;
    name: string;
  };
}

export default function ImportAndExport({ waitlist }: ImportAndExportProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
    } else {
      addToast('error', 'Please select a valid CSV file');
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      addToast('error', 'Please select a file first');
      return;
    }

    setIsImporting(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`/api/waitlist/${waitlist.id}/waitlist-signups/import`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Import failed');
      }

      addToast('success', 'Import completed successfully');
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      addToast('error', error instanceof Error ? error.message : 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`/api/waitlist/${waitlist.id}/waitlist-signups?limit=1000`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Export failed');
      }

      // Convert signups to CSV
      const signups = data.data;
      const headers = ['Email', 'Name', 'Status', 'Referrals', 'Created At'];
      const csvContent = [
        headers.join(','),
        ...signups.map((signup: any) => [
          signup.email,
          signup.name || '',
          signup.status,
          signup.referrals,
          new Date(signup.createdAt).toLocaleString(),
        ].join(','))
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${waitlist.name}-signups.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      addToast('success', 'Export completed');
    } catch (error) {
      addToast('error', error instanceof Error ? error.message : 'Export failed');
    }
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Import Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <span className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">CSV files only</span>
                </label>
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{selectedFile.name}</span>
                  </div>
                  <Button
                    onClick={handleImport}
                    disabled={isImporting}
                    size="sm"
                  >
                    {isImporting ? 'Importing...' : 'Import'}
                  </Button>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">CSV Format Requirements:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Must include an "email" column (required)</li>
                    <li>Optional "name" column for subscriber names</li>
                    <li>Headers should be in lowercase</li>
                    <li>Maximum file size: 5MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Download your waitlist signups as a CSV file. The export includes email addresses,
                names, status, referral counts, and signup dates.
              </p>
              <Button onClick={handleExport} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export to CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}