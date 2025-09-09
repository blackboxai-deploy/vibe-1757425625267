"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TambahSiswaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    class: "",
    studentId: "",
    phone: "",
    address: "",
    parentName: "",
    parentPhone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || 
        !formData.class || !formData.studentId) {
      toast.error("Field yang wajib harus diisi!");
      return;
    }

    // Simulate saving to Google Sheets
    toast.success("Data siswa berhasil ditambahkan!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      class: "",
      studentId: "",
      phone: "",
      address: "",
      parentName: "",
      parentPhone: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tambah Siswa Baru</h1>
          <p className="text-sm text-gray-600">Lengkapi data siswa untuk mendaftarkan ke sistem</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="h-10"
        >
          Kembali
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Data Siswa</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Informasi Dasar</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap siswa"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentId">NIS/ID Siswa <span className="text-red-500">*</span></Label>
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Contoh: 2023001"
                      value={formData.studentId}
                      onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="siswa@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. Telepon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0812-3456-7890"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Kelas <span className="text-red-500">*</span></Label>
                    <Select onValueChange={(value) => setFormData({...formData, class: value})}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Pilih kelas siswa" />
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Buat password untuk siswa"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Textarea
                    id="address"
                    placeholder="Alamat lengkap siswa"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="min-h-20"
                  />
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Informasi Orang Tua/Wali</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Nama Orang Tua/Wali</Label>
                    <Input
                      id="parentName"
                      type="text"
                      placeholder="Nama lengkap orang tua/wali"
                      value={formData.parentName}
                      onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">No. Telepon Orang Tua</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      placeholder="0812-3456-7890"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-12 flex-1"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="h-12 flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Simpan Data Siswa
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Catatan Penting:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Data akan tersimpan otomatis ke database Google Sheets</li>
                      <li>• Password akan digunakan siswa untuk login ke aplikasi</li>
                      <li>• Pastikan email belum terdaftar di sistem</li>
                      <li>• Field bertanda (*) wajib diisi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}