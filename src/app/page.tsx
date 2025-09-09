"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: ""
  });
  
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    class: ""
  });

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password || !loginData.role) {
      toast.error("Semua field harus diisi!");
      return;
    }

    // Simulate login success
    toast.success("Login berhasil!");
    
    // Navigate based on role
    if (loginData.role === "siswa") {
      router.push("/dashboard/siswa");
    } else if (loginData.role === "guru") {
      router.push("/dashboard/guru");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.name || !registerData.email || !registerData.password || 
        !registerData.confirmPassword || !registerData.role) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Password tidak cocok!");
      return;
    }

    if (registerData.role === "siswa" && !registerData.class) {
      toast.error("Siswa harus memilih kelas!");
      return;
    }

    // Simulate registration success
    toast.success("Registrasi berhasil! Silakan login.");
    
    // Reset form
    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      class: ""
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Kehadiran Siswa Online</h1>
          <p className="text-sm text-gray-600 mt-2">Sistem absensi digital untuk sekolah</p>
        </div>

        {/* Login/Register Tabs */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-lg">Selamat Datang</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="masukkan email anda"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="masukkan password anda"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-role">Login Sebagai</Label>
                    <Select onValueChange={(value) => setLoginData({...loginData, role: value})}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Pilih role anda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="siswa">Siswa</SelectItem>
                        <SelectItem value="guru">Guru/Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-600">
                    Masuk
                  </Button>
                </form>
              </TabsContent>
              
              {/* Register Form */}
              <TabsContent value="register" className="space-y-4 mt-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nama Lengkap</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="masukkan nama lengkap"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="masukkan email anda"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-role">Daftar Sebagai</Label>
                    <Select onValueChange={(value) => setRegisterData({...registerData, role: value})}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Pilih role anda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="siswa">Siswa</SelectItem>
                        <SelectItem value="guru">Guru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {registerData.role === "siswa" && (
                    <div className="space-y-2">
                      <Label htmlFor="register-class">Kelas</Label>
                      <Select onValueChange={(value) => setRegisterData({...registerData, class: value})}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Pilih kelas anda" />
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
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="masukkan password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Konfirmasi Password</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="ulangi password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full h-12 bg-green-500 hover:bg-green-600">
                    Daftar Sekarang
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-gray-500">
          Sistem Kehadiran Digital - SMA Indonesia
        </div>
      </div>
    </div>
  );
}