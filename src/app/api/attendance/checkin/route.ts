import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentId, date, time } = body;

    // Basic validation
    if (!studentId || !date || !time) {
      return NextResponse.json(
        { error: 'Student ID, tanggal, dan waktu harus diisi' },
        { status: 400 }
      );
    }

    // Check if student already checked in today
    // In real implementation, query Google Sheets for existing attendance record
    const today = new Date(date).toDateString();
    const mockExistingAttendance: Array<{
      studentId: string;
      date: string;
      checkInTime: string;
      checkOutTime?: string;
    }> = []; // This would come from Google Sheets query

    const existingCheckIn = mockExistingAttendance.find(
      (record) => record.studentId === studentId && 
                  new Date(record.date).toDateString() === today
    );

    if (existingCheckIn) {
      return NextResponse.json(
        { error: 'Anda sudah melakukan absen masuk hari ini' },
        { status: 409 }
      );
    }

    // Create attendance record
    const attendanceRecord = {
      id: `attendance_${Date.now()}`,
      studentId,
      date,
      checkInTime: time,
      checkOutTime: null,
      status: 'hadir',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In real implementation:
    // 1. Add record to Google Sheets attendance table
    // 2. Update student's attendance statistics
    // 3. Send notification if configured
    
    console.log('Attendance check-in would be saved to Google Sheets:', attendanceRecord);

    // Mock successful response
    return NextResponse.json({
      success: true,
      message: 'Absen masuk berhasil dicatat',
      data: {
        id: attendanceRecord.id,
        studentId: attendanceRecord.studentId,
        date: attendanceRecord.date,
        checkInTime: attendanceRecord.checkInTime,
        status: attendanceRecord.status
      }
    });

  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat absen masuk' },
      { status: 500 }
    );
  }
}