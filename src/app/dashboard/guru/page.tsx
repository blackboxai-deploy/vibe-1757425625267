"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  class: string;
  email: string;
  profileImage: string;
  todayStatus: "hadir" | "izin" | "sakit" | "alpa" | "belum_absen";
  checkInTime?: string;
  checkOutTime?: string;
  attendanceRate: number;
}

export default function TeacherDashboard() {
  const router = useRouter();
  
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Ahmad Rizki Pratama",
      class: "11A",
      email: "ahmad@email.com",
      profileImage: "https://placehold.co/150x150?text=Ahmad+Student+Photo",
      todayStatus: "hadir",
      checkInTime: "07:30",
      checkOutTime: "15:00",
      attendanceRate: 92
    },
    {
      id: "2",
      name: "Siti Nurhaliza",
      class: "11A",
      email: "siti@email.com",
      profileImage: "https://placehold.co/150x150?text=Siti+Student+Photo",
      todayStatus: "hadir",
      checkInTime: "07:25",
      attendanceRate: 96
    },
    {
      id: "3",
      name: "Budi Santoso",
      class: "11A",
      email: "budi@email.com",
      profileImage: "https://placehold.co/150x150?text=Budi+Student+Photo",
      todayStatus: "izin",
      attendanceRate: 88
    },
    {
      id: "4",
      name: "Maya Sari",
      class: "11A",
      email: "maya@email.com",
      profileImage: "https://placehold.co/150x150?text=Maya+Student+Photo",
      todayStatus: "sakit",
      attendanceRate: 90
    },
    {
      id: "5",
      name: "Deni Kurniawan",
      class: "11A",
      email: "deni@email.com",
      profileImage: "https://placehold.co/150x150?text=Deni+Student+Photo",
      todayStatus: "belum_absen",
      attendanceRate: 75
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
        return <Badge variant="outline">Belum Absen</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hadir":
        return "border-l-4 border-green-500";
      case "izin":
        return "border-l-4 border-yellow-500";
      case "sakit":
        return "border-l-4 border-orange-500";
      case "alpa":
        return "border-l-4 border-red-500";
      default:
        return "border-l-4 border-gray-300";
    }
  };

  const totalStudents = students.length;
  const presentToday = students.filter(s => s.todayStatus === "hadir").length;
  const permissionToday = students.filter(s => s.todayStatus === "izin").length;
  const sickToday = students.filter(s => s.todayStatus === "sakit").length;
  const notYetChecked = students.filter(s => s.todayStatus === "belum_absen").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Guru</h1>
          <p className="text-sm text-gray-600">Kelola kehadiran siswa dengan mudah</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="h-10"
        >
          Logout
        </Button>
      </div>

      <div className="space-y-6">
        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{totalStudents}</div>
              <div className="text-sm text-gray-600">Total Siswa</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{presentToday}</div>
              <div className="text-sm text-gray-600">Hadir</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{permissionToday}</div>
              <div className="text-sm text-gray-600">Izin</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">{sickToday}</div>
              <div className="text-sm text-gray-600">Sakit</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600 mb-1">{notYetChecked}</div>
              <div className="text-sm text-gray-600">Belum Absen</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Kehadiran Hari Ini</TabsTrigger>
            <TabsTrigger value="manage">Kelola Siswa</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>

          {/* Today's Attendance Overview */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Daftar Kehadiran Siswa - Kelas 11A</span>
                  <div className="text-sm text-gray-600">
                    {new Date().toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 bg-white rounded-lg shadow-sm ${getStatusColor(student.todayStatus)}`}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.profileImage} />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{student.name}</h3>
                          {getStatusBadge(student.todayStatus)}
                        </div>
                        <p className="text-sm text-gray-600">{student.class} • {student.email}</p>
                        
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          {student.checkInTime && (
                            <span>Masuk: {student.checkInTime}</span>
                          )}
                          {student.checkOutTime && (
                            <span>Pulang: {student.checkOutTime}</span>
                          )}
                          <span>Kehadiran: {student.attendanceRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Management */}
          <TabsContent value="manage" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Kelola Data Siswa</h2>
              <Button
                onClick={() => router.push("/tambah/siswa")}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Tambah Siswa Baru
              </Button>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.profileImage} />
                            <AvatarFallback className="bg-blue-500 text-white text-sm">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.class} • {student.email}</p>
                            <div className="flex items-center mt-1 space-x-2">
                              <div className="text-xs text-gray-600">Kehadiran:</div>
                              <div className="flex-1 max-w-20">
                                <Progress value={student.attendanceRate} className="h-1" />
                              </div>
                              <div className="text-xs text-blue-600">{student.attendanceRate}%</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toast.info("Fitur edit akan segera hadir!")}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600"
                            onClick={() => toast.info("Fitur hapus akan segera hadir!")}
                          >
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Laporan Kehadiran</h2>
              <Button
                onClick={() => router.push("/riwayat/guru")}
                variant="outline"
              >
                Lihat Riwayat Lengkap
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekly Chart Placeholder */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Kehadiran Mingguan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-sm">Grafik Kehadiran</div>
                      <div className="text-xs">Data 7 hari terakhir</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Ringkasan Bulanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Hari Sekolah</span>
                      <span className="font-medium">20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rata-rata Kehadiran</span>
                      <span className="font-medium text-green-600">88%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Siswa Terbaik</span>
                      <span className="font-medium text-blue-600">Siti Nurhaliza</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Perlu Perhatian</span>
                      <span className="font-medium text-red-600">Deni Kurniawan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}