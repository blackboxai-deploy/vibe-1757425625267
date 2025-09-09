"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AttendanceRecord {
  id: string;
  date: string;
  day: string;
  status: "hadir" | "izin" | "sakit" | "alpa";
  checkInTime?: string;
  checkOutTime?: string;
  note?: string;
}

export default function RiwayatSiswaPage() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState("2024-01");

  // Sample attendance data
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "1",
      date: "2024-01-15",
      day: "Senin",
      status: "hadir",
      checkInTime: "07:30",
      checkOutTime: "15:00"
    },
    {
      id: "2",
      date: "2024-01-16",
      day: "Selasa",
      status: "hadir",
      checkInTime: "07:25",
      checkOutTime: "15:05"
    },
    {
      id: "3",
      date: "2024-01-17",
      day: "Rabu",
      status: "izin",
      note: "Sakit demam"
    },
    {
      id: "4",
      date: "2024-01-18",
      day: "Kamis",
      status: "hadir",
      checkInTime: "07:35",
      checkOutTime: "14:58"
    },
    {
      id: "5",
      date: "2024-01-19",
      day: "Jumat",
      status: "hadir",
      checkInTime: "07:20",
      checkOutTime: "11:30"
    },
    {
      id: "6",
      date: "2024-01-22",
      day: "Senin",
      status: "sakit",
      note: "Flu dan batuk"
    },
    {
      id: "7",
      date: "2024-01-23",
      day: "Selasa",
      status: "hadir",
      checkInTime: "07:28",
      checkOutTime: "15:02"
    },
    {
      id: "8",
      date: "2024-01-24",
      day: "Rabu",
      status: "alpa"
    },
    {
      id: "9",
      date: "2024-01-25",
      day: "Kamis",
      status: "hadir",
      checkInTime: "07:32",
      checkOutTime: "15:00"
    },
    {
      id: "10",
      date: "2024-01-26",
      day: "Jumat",
      status: "hadir",
      checkInTime: "07:15",
      checkOutTime: "11:25"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "hadir":
        return <Badge className="bg-green-500 text-white">Hadir</Badge>;
      case "izin":
        return <Badge className="bg-yellow-500 text-white">Izin</Badge>;
      case "sakit":
        return <Badge className="bg-orange-500 text-white">Sakit</Badge>;
      case "alpa":
        return <Badge className="bg-red-500 text-white">Alpa</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hadir":
        return "border-l-4 border-green-500 bg-green-50";
      case "izin":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "sakit":
        return "border-l-4 border-orange-500 bg-orange-50";
      case "alpa":
        return "border-l-4 border-red-500 bg-red-50";
      default:
        return "border-l-4 border-gray-300 bg-gray-50";
    }
  };

  // Calculate statistics
  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(r => r.status === "hadir").length;
  const permissionDays = attendanceRecords.filter(r => r.status === "izin").length;
  const sickDays = attendanceRecords.filter(r => r.status === "sakit").length;
  const absentDays = attendanceRecords.filter(r => r.status === "alpa").length;
  const attendanceRate = Math.round((presentDays / totalDays) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Kehadiran</h1>
          <p className="text-sm text-gray-600">Lihat riwayat kehadiran anda</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="h-10"
        >
          Kembali
        </Button>
      </div>

      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{totalDays}</div>
              <div className="text-sm text-gray-600">Total Hari</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{presentDays}</div>
              <div className="text-sm text-gray-600">Hadir</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{permissionDays}</div>
              <div className="text-sm text-gray-600">Izin</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{sickDays}</div>
              <div className="text-sm text-gray-600">Sakit</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{absentDays}</div>
              <div className="text-sm text-gray-600">Alpa</div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Rate */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{attendanceRate}%</div>
              <div className="text-gray-600">Tingkat Kehadiran</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${attendanceRate}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Detail Kehadiran</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Bulan:</span>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-01">Januari 2024</SelectItem>
                <SelectItem value="2024-02">Februari 2024</SelectItem>
                <SelectItem value="2024-03">Maret 2024</SelectItem>
                <SelectItem value="2024-04">April 2024</SelectItem>
                <SelectItem value="2024-05">Mei 2024</SelectItem>
                <SelectItem value="2024-06">Juni 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Attendance Records */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-base">Riwayat Kehadiran Harian</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {attendanceRecords.map((record) => (
              <div
                key={record.id}
                className={`p-4 rounded-lg ${getStatusColor(record.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </h3>
                        <p className="text-sm text-gray-600">{record.date}</p>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Masuk: </span>
                        <span>{record.checkInTime || "-"}</span>
                      </div>
                      <div>
                        <span className="font-medium">Pulang: </span>
                        <span>{record.checkOutTime || "-"}</span>
                      </div>
                    </div>
                    
                    {record.note && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Catatan: </span>
                        <span>{record.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Export Options */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => toast.info("Fitur export PDF akan segera hadir!")}
            className="h-12 flex-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </Button>
          
          <Button
            variant="outline"
            onClick={() => toast.info("Fitur export Excel akan segera hadir!")}
            className="h-12 flex-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Excel
          </Button>
        </div>
      </div>
    </div>
  );
}