import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, class: studentClass } = body;

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Semua field wajib harus diisi' },
        { status: 400 }
      );
    }

    if (role === 'siswa' && !studentClass) {
      return NextResponse.json(
        { error: 'Siswa harus memilih kelas' },
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

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      );
    }

    // Here you would integrate with Google Sheets API to:
    // 1. Check if email already exists
    // 2. Add new user to the spreadsheet
    
    // Mock implementation - check if email exists
    const mockExistingEmails = ['test@email.com', 'admin@school.com'];
    if (mockExistingEmails.includes(email)) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Create new user object
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      role,
      class: studentClass || null,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    // In real implementation:
    // 1. Hash the password
    // 2. Save to Google Sheets with columns: ID, Name, Email, Role, Class, Password_Hash, Created_At, Status
    // 3. Generate unique student/teacher ID
    
    console.log('New user would be saved to Google Sheets:', newUser);

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil! Silakan login.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        class: newUser.class
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    );
  }
}