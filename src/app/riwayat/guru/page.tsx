"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface StudentAttendance {
  studentId: string;
  studentName: string;
  class: string;
  records: {
    date: string;
    status: "hadir" | "izin" | "sakit" | "alpa";
    checkInTime?: string;
    checkOutTime?: string;
    note?: string;
  }[];
}

export default function RiwayatGuruPage() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const [selectedClass, setSelectedClass] = useState("11A");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const [attendanceData] = useState<StudentAttendance[]>([
    {
      studentId: "1",
      studentName: "Ahmad Rizki Pratama",
      class: "11A",
      records: [
        {
          date: "2024-01-15",
          status: "hadir",
          checkInTime: "07:30",
          checkOutTime: "15:00"
        },
        {
          date: "2024-01-16",
          status: "hadir",
          checkInTime: "07:25",
          checkOutTime: "15:05"
        },
        {
          date: "2024-01-17",
          status: "izin",
          note: "Keperluan keluarga"
        }
      ]
    },
    {
      studentId: "2",
      studentName: "Siti Nurhaliza",
      class: "11A",
      records: [
        {
          date: "2024-01-15",
          status: "hadir",
          checkInTime: "07:25",
          checkOutTime: "15:00"
        },
        {
          date: "2024-01-16",
          status: "hadir",
          checkInTime: "07:30",
          checkOutTime: "15:02"
        },
        {
          date: "2024-01-17",
          status: "hadir",
          checkInTime: "07:20",
          checkOutTime: "15:00"
        }
      ]
    },
    {
      studentId: "3",
      studentName: "Budi Santoso",
      class: "11A",
      records: [
        {
          date: "2024-01-15",
          status: "hadir",
          checkInTime: "07:35",
          checkOutTime: "15:05"
        },
        {
          date: "2024-01-16",
          status: "sakit",
          note: "Demam tinggi"
        },
        {
          date: "2024-01-17",
          status: "sakit",
          note: "Masih dalam perawatan"
        }
      ]
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "hadir":
        return <Badge className="bg-green-500 text-white text-xs">Hadir</Badge>;
      case "izin":
        return <Badge className="bg-yellow-500 text-white text-xs">Izin</Badge>;
      case "sakit":
        return <Badge className="bg-orange-500 text-white text-xs">Sakit</Badge>;
      case "alpa":
        return <Badge className="bg-red-500 text-white text-xs">Alpa</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">-</Badge>;
    }
  };

  const getAttendanceRate = (records: any[]) => {
    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === "hadir").length;
    return totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
  };

  const filteredStudents = attendanceData.filter(student => 
    student.class === selectedClass && 
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate class statistics
  const classStats = {
    totalStudents: filteredStudents.length,
    averageAttendance: Math.round(
      filteredStudents.reduce((sum, student) => sum + getAttendanceRate(student.records), 0) / 
      (filteredStudents.length || 1)
    ),
    perfectAttendance: filteredStudents.filter(student => getAttendanceRate(student.records) === 100).length,
    needsAttention: filteredStudents.filter(student => getAttendanceRate(student.records) < 80).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Kehadiran Kelas</h1>
          <p className="text-sm text-gray-600">Kelola dan pantau kehadiran siswa</p>
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
        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Kelas</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10A">10A</SelectItem>
                    <SelectItem value="10B">10B</SelectItem>
                    <SelectItem value="10C">10C</SelectItem>
                    <SelectItem value="11A">11A</SelectItem>
                    <SelectItem value="11B">11B</SelectItem>
                    <SelectItem value="11C">11C</SelectItem>
                    <SelectItem value="12A">12A</SelectItem>
                    <SelectItem value="12B">12B</SelectItem>
                    <SelectItem value="12C">12C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Bulan</label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
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

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Cari Siswa</label>
                <Input
                  placeholder="Nama siswa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{classStats.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Siswa</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{classStats.averageAttendance}%</div>
              <div className="text-sm text-gray-600">Rata-rata Kehadiran</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">{classStats.perfectAttendance}</div>
              <div className="text-sm text-gray-600">Kehadiran Perfect</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{classStats.needsAttention}</div>
              <div className="text-sm text-gray-600">Perlu Perhatian</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Ringkasan Siswa</TabsTrigger>
            <TabsTrigger value="detailed">Detail Kehadiran</TabsTrigger>
          </TabsList>

          {/* Summary View */}
          <TabsContent value="summary" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Ringkasan Kehadiran - Kelas {selectedClass}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredStudents.map((student) => {
                  const attendanceRate = getAttendanceRate(student.records);
                  const presentDays = student.records.filter(r => r.status === "hadir").length;
                  const totalDays = student.records.length;
                  
                  return (
                    <div key={student.studentId} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{student.studentName}</h3>
                          <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">{attendanceRate}%</div>
                          <div className="text-sm text-gray-600">{presentDays}/{totalDays} hari</div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${
                            attendanceRate >= 90 ? 'bg-green-500' : 
                            attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${attendanceRate}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {student.records.slice(-5).map((record, index) => (
                          <div key={index} className="flex flex-col items-center">
                            {getStatusBadge(record.status)}
                            <div className="text-xs text-gray-500 mt-1">
                              {new Date(record.date).getDate()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Detailed View */}
          <TabsContent value="detailed" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Detail Kehadiran Harian - Kelas {selectedClass}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nama Siswa</th>
                        <th className="text-center p-2">15 Jan</th>
                        <th className="text-center p-2">16 Jan</th>
                        <th className="text-center p-2">17 Jan</th>
                        <th className="text-center p-2">Kehadiran</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.studentId} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{student.studentName}</td>
                          {student.records.map((record, index) => (
                            <td key={index} className="text-center p-2">
                              {getStatusBadge(record.status)}
                              {record.checkInTime && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {record.checkInTime}
                                </div>
                              )}
                            </td>
                          ))}
                          <td className="text-center p-2">
                            <span className="font-medium">{getAttendanceRate(student.records)}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => toast.info("Fitur export laporan bulanan akan segera hadir!")}
            className="h-12"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Laporan Bulanan
          </Button>
          
          <Button
            variant="outline"
            onClick={() => toast.info("Fitur export data kelas akan segera hadir!")}
            className="h-12"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data Kelas
          </Button>
          
          <Button
            variant="outline"
            onClick={() => toast.info("Fitur print akan segera hadir!")}
            className="h-12"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Laporan
          </Button>
        </div>
      </div>
    </div>
  );
}