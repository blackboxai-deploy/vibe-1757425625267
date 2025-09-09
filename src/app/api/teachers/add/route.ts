import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      password, 
      employeeId, 
      phone,
      subject,
      classAssignment,
      address,
      qualification,
      experience
    } = body;

    // Basic validation
    if (!name || !email || !password || !employeeId || !subject) {
      return NextResponse.json(
        { error: 'Field yang wajib harus diisi (nama, email, password, NIP, mata pelajaran)' },
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

    // Check if email or employee ID already exists
    // In real implementation, query Google Sheets
    const mockExistingTeachers = [
      { email: 'teacher@email.com', employeeId: '198501012010011001' }
    ];

    const emailExists = mockExistingTeachers.some(teacher => teacher.email === email);
    const idExists = mockExistingTeachers.some(teacher => teacher.employeeId === employeeId);

    if (emailExists) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar dalam sistem' },
        { status: 409 }
      );
    }

    if (idExists) {
      return NextResponse.json(
        { error: 'NIP/ID Pegawai sudah digunakan' },
        { status: 409 }
      );
    }

    // Create new teacher record
    const newTeacher = {
      id: `teacher_${Date.now()}`,
      name,
      email,
      employeeId,
      phone: phone || null,
      subject,
      classAssignment: classAssignment || null,
      address: address || null,
      qualification: qualification || null,
      experience: experience || null,
      role: 'guru',
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: 'admin' // In real app, get from authenticated user
    };

    // In real implementation:
    // 1. Hash the password
    // 2. Add to Google Sheets 'Users' table with columns:
    //    ID, Name, Email, EmployeeID, Phone, Subject, ClassAssignment, Address,
    //    Qualification, Experience, Role, Status, Password_Hash, Created_At, Created_By
    // 3. Assign class permissions if classAssignment is provided
    // 4. Send welcome email/notification
    
    console.log('New teacher would be saved to Google Sheets:', newTeacher);

    return NextResponse.json({
      success: true,
      message: 'Data guru berhasil ditambahkan',
      data: {
        id: newTeacher.id,
        name: newTeacher.name,
        email: newTeacher.email,
        employeeId: newTeacher.employeeId,
        subject: newTeacher.subject,
        classAssignment: newTeacher.classAssignment,
        status: newTeacher.status
      }
    });

  } catch (error) {
    console.error('Add teacher error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menambah guru' },
      { status: 500 }
    );
  }
}