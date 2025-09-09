import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      password, 
      class: studentClass, 
      studentId, 
      phone,
      address,
      parentName,
      parentPhone
    } = body;

    // Basic validation
    if (!name || !email || !password || !studentClass || !studentId) {
      return NextResponse.json(
        { error: 'Field yang wajib harus diisi (nama, email, password, kelas, ID siswa)' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Check if email or student ID already exists
    // In real implementation, query Google Sheets
    const mockExistingUsers = [
      { email: 'existing@email.com', studentId: '2023001' }
    ];

    const emailExists = mockExistingUsers.some(user => user.email === email);
    const idExists = mockExistingUsers.some(user => user.studentId === studentId);

    if (emailExists) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar dalam sistem' },
        { status: 409 }
      );
    }

    if (idExists) {
      return NextResponse.json(
        { error: 'ID siswa sudah digunakan' },
        { status: 409 }
      );
    }

    // Create new student record
    const newStudent = {
      id: `student_${Date.now()}`,
      name,
      email,
      studentId,
      class: studentClass,
      phone: phone || null,
      address: address || null,
      parentName: parentName || null,
      parentPhone: parentPhone || null,
      role: 'siswa',
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: 'teacher' // In real app, get from authenticated user
    };

    // In real implementation:
    // 1. Hash the password
    // 2. Add to Google Sheets 'Users' table with columns:
    //    ID, Name, Email, StudentID, Class, Phone, Address, ParentName, ParentPhone, 
    //    Role, Status, Password_Hash, Created_At, Created_By
    // 3. Initialize attendance record for the student
    // 4. Send welcome email/notification
    
    console.log('New student would be saved to Google Sheets:', newStudent);

    return NextResponse.json({
      success: true,
      message: 'Data siswa berhasil ditambahkan',
      data: {
        id: newStudent.id,
        name: newStudent.name,
        email: newStudent.email,
        studentId: newStudent.studentId,
        class: newStudent.class,
        status: newStudent.status
      }
    });

  } catch (error) {
    console.error('Add student error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menambah siswa' },
      { status: 500 }
    );
  }
}