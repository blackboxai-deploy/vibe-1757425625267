import { NextRequest, NextResponse } from 'next/server';

interface AttendanceRecord {
  studentId: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
}

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

    // Check if student has checked in today
    // In real implementation, query Google Sheets for existing attendance record
    const today = new Date(date).toDateString();
    const mockExistingAttendance: AttendanceRecord[] = [
      {
        studentId: "1",
        date: today,
        checkInTime: "07:30",
      }
    ]; // This would come from Google Sheets query

    const existingCheckIn = mockExistingAttendance.find(
      (record: AttendanceRecord) => record.studentId === studentId && 
                                   new Date(record.date).toDateString() === today
    );

    if (!existingCheckIn) {
      return NextResponse.json(
        { error: 'Anda harus melakukan absen masuk terlebih dahulu' },
        { status: 400 }
      );
    }

    if (existingCheckIn.checkOutTime) {
      return NextResponse.json(
        { error: 'Anda sudah melakukan absen pulang hari ini' },
        { status: 409 }
      );
    }

    // Update attendance record with check-out time
    const updatedRecord = {
      ...existingCheckIn,
      checkOutTime: time,
      updatedAt: new Date().toISOString()
    };

    // In real implementation:
    // 1. Update the record in Google Sheets attendance table
    // 2. Calculate total hours if needed
    // 3. Update attendance statistics
    
    console.log('Attendance check-out would be updated in Google Sheets:', updatedRecord);

    // Mock successful response
    return NextResponse.json({
      success: true,
      message: 'Absen pulang berhasil dicatat',
      data: {
        studentId: updatedRecord.studentId,
        date: updatedRecord.date,
        checkInTime: updatedRecord.checkInTime,
        checkOutTime: updatedRecord.checkOutTime
      }
    });

  } catch (error) {
    console.error('Check-out error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat absen pulang' },
      { status: 500 }
    );
  }
}