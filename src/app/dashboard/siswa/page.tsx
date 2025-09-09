"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function StudentDashboard() {
  const router = useRouter();
  const [attendanceToday, setAttendanceToday] = useState({
    checkedIn: false,
    checkedOut: false,
    checkInTime: "",
    checkOutTime: "",
    status: "belum_absen" // belum_absen, hadir, izin, sakit, alpa
  });

  const [studentData] = useState({
    name: "Ahmad Rizki Pratama",
    class: "11A",
    studentId: "2023001",
    profileImage: "https://placehold.co/150x150?text=Student+Profile+Photo",
    attendanceRate: 92
  });

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setAttendanceToday({
      ...attendanceToday,
      checkedIn: true,
      checkInTime: timeString,
      status: "hadir"
    });
    
    toast.success(`Absen masuk berhasil pada ${timeString}`);
  };

  const handleCheckOut = () => {
    if (!attendanceToday.checkedIn) {
      toast.error("Anda harus absen masuk terlebih dahulu!");
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setAttendanceToday({
      ...attendanceToday,
      checkedOut: true,
      checkOutTime: timeString
    });
    
    toast.success(`Absen pulang berhasil pada ${timeString}`);
  };

  const getStatusBadge = () => {
    switch (attendanceToday.status) {
      case "hadir":
        return <Badge className="bg-green-500">Hadir</Badge>;
      case "izin":
        return <Badge className="bg-yellow-500">Izin</Badge>;
      case "sakit":
        return <Badge className="bg-orange-500">Sakit</Badge>;
      case "alpa":
        return <Badge className="bg-red-500">Alpa</Badge>;
      default:
        return <Badge variant="outline">Belum Absen</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Siswa</h1>
          <p className="text-sm text-gray-600">Selamat datang kembali!</p>
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
        {/* Profile Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={studentData.profileImage} />
                <AvatarFallback className="bg-blue-500 text-white text-lg">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{studentData.name}</h2>
                <p className="text-sm text-gray-600">Kelas {studentData.class} • {studentData.studentId}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="text-sm text-gray-600">Kehadiran:</div>
                  <div className="flex-1 max-w-24">
                    <Progress value={studentData.attendanceRate} className="h-2" />
                  </div>
                  <div className="text-sm font-medium text-blue-600">{studentData.attendanceRate}%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Attendance Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Absensi Hari Ini</span>
              {getStatusBadge()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-600 mb-4">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>

            {/* Check In/Out Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleCheckIn}
                disabled={attendanceToday.checkedIn}
                className={`h-20 flex flex-col items-center justify-center space-y-2 ${
                  attendanceToday.checkedIn 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <div className="text-center">
                  <div className="font-medium">
                    {attendanceToday.checkedIn ? "Masuk" : "Absen Masuk"}
                  </div>
                  {attendanceToday.checkInTime && (
                    <div className="text-xs opacity-90">{attendanceToday.checkInTime}</div>
                  )}
                </div>
              </Button>

              <Button
                onClick={handleCheckOut}
                disabled={!attendanceToday.checkedIn || attendanceToday.checkedOut}
                className={`h-20 flex flex-col items-center justify-center space-y-2 ${
                  attendanceToday.checkedOut 
                    ? 'bg-gray-500 hover:bg-gray-600' 
                    : 'bg-orange-500 hover:bg-orange-600'
                }`}
                variant={attendanceToday.checkedOut ? "secondary" : "default"}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <div className="text-center">
                  <div className="font-medium">
                    {attendanceToday.checkedOut ? "Pulang" : "Absen Pulang"}
                  </div>
                  {attendanceToday.checkOutTime && (
                    <div className="text-xs opacity-90">{attendanceToday.checkOutTime}</div>
                  )}
                </div>
              </Button>
            </div>

            {/* Status Information */}
            {attendanceToday.checkedIn && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-800">
                  <div className="font-medium mb-2">Status Kehadiran Hari Ini:</div>
                  <div className="space-y-1">
                    <div>✓ Absen masuk: {attendanceToday.checkInTime}</div>
                    {attendanceToday.checkedOut && (
                      <div>✓ Absen pulang: {attendanceToday.checkOutTime}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">23</div>
              <div className="text-sm text-gray-600">Hari Hadir</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">2</div>
              <div className="text-sm text-gray-600">Hari Tidak Hadir</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/riwayat/siswa")}
            className="h-14 flex flex-col items-center justify-center space-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-sm">Riwayat</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => toast.info("Fitur notifikasi akan segera hadir!")}
            className="h-14 flex flex-col items-center justify-center space-y-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5-5-5 5h5zm0 0v-5" />
            </svg>
            <span className="text-sm">Izin/Sakit</span>
          </Button>
        </div>
      </div>
    </div>
  );
}