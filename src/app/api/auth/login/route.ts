import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    // Basic validation
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, dan role harus diisi' },
        { status: 400 }
      );
    }

    // Here you would integrate with Google Sheets API to verify credentials
    // For now, we'll use mock authentication
    
    // Mock user verification - In real implementation, check against Google Sheets
    const mockUsers = [
      {
        id: '1',
        name: 'Ahmad Rizki Pratama',
        email: 'ahmad@email.com',
        role: 'siswa',
        class: '11A',
        password: 'student123' // In real app, this would be hashed
      },
      {
        id: '2',
        name: 'Ibu Sarah',
        email: 'sarah@guru.com',
        role: 'guru',
        password: 'teacher123' // In real app, this would be hashed
      }
    ];

    const user = mockUsers.find(u => u.email === email && u.role === role);
    
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Email, password, atau role tidak valid' },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // In a real implementation, you would create a JWT token here
    const token = `mock-token-${user.id}-${Date.now()}`;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}