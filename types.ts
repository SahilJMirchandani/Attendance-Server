
export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  faceRegistered: boolean;
  faceData?: string; // Base64 representation of registered face
}

export interface Lecture {
  id: string;
  day: string; // "Monday", "Tuesday", etc.
  name: string;
  startTime: string; // "08:30"
  endTime: string; // "09:30"
  professor: string;
}

export interface AttendanceRecord {
  date: string;
  lectureId: string;
  status: 'present' | 'absent' | 'ongoing';
}

export type View = 'landing' | 'auth' | 'dashboard' | 'profile' | 'timetable' | 'recognition' | 'analytics' | 'bunk' | 'notifications' | 'about';
