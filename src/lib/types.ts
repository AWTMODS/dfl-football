export type MatchStage =
  | 'Group Stage'
  | 'Round of 16'
  | 'Quarter Final'
  | 'Semi Final'
  | 'Final';

export type MatchStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export type TicketStatus = 'VALID' | 'USED' | 'CANCELLED' | 'EXPIRED';

export type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED';

export type PaymentStatus = 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';

export type StaffRole =
  | 'SUPER_ADMIN'
  | 'ADMIN_MANAGER'
  | 'TICKET_STAFF'
  | 'SCANNER_STAFF';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  location: string;
  logo: string;
  founded: string;
  coach: string;
  matchesPlayed: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  position: number;
  description: string;
  squad: string[];
}

export interface Match {
  id: string;
  matchNumber: number;
  stage: MatchStage;
  teamAId: string;
  teamBId: string;
  teamAName: string;
  teamBName: string;
  teamALogo: string;
  teamBLogo: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. 07:00 PM
  venue: string;
  status: MatchStatus;
  scoreA?: number;
  scoreB?: number;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
  description?: string;
  importantNotes?: string[];
}

export interface TicketItem {
  id: string; // DFL-TKT-XXXXXX
  bookingId: string;
  ticketNumber: number;
  matchId: string;
  matchSummary: string;
  teamAName: string;
  teamBName: string;
  teamALogo: string;
  teamBLogo: string;
  date: string;
  time: string;
  venue: string;
  customerName: string;
  phone: string;
  email?: string;
  ticketType: string;
  price: number;
  qrToken: string;
  status: TicketStatus;
  scannedAt?: string;
  scannedBy?: string;
}

export interface Booking {
  id: string; // DFL-2026-XXXXXX
  customerName: string;
  phone: string;
  email?: string;
  matchId: string;
  matchSummary: string;
  matchDate: string;
  matchTime: string;
  matchVenue: string;
  quantity: number;
  ticketType: string;
  ticketPrice: number;
  convenienceFee: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  paymentRef: string;
  createdAt: string;
  tickets: TicketItem[];
}

export interface PaymentRecord {
  id: string; // DFL-PAY-XXXXXX
  bookingId: string;
  customerName: string;
  phone: string;
  amount: number;
  status: PaymentStatus;
  method: string;
  reference: string;
  createdAt: string;
  failureReason?: string;
}

export interface ScanLog {
  id: string;
  ticketId: string;
  bookingId: string;
  customerName: string;
  matchSummary: string;
  scanTime: string;
  result: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'CANCELLED';
  staffId: string;
  staffName: string;
  firstScanTime?: string;
  device?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  status: 'ACTIVE' | 'INACTIVE';
  lastActive: string;
}

export interface TournamentSettings {
  tournamentName: string;
  tagline: string;
  edition: string;
  location: string;
  venueName: string;
  venueAddress: string;
  startDate: string;
  endDate: string;
  teamCount: number;
  durationDays: number;
  generalTicketPrice: number;
  maxTicketsPerBooking: number;
  autoMarkUsedOnScan: boolean;
  alertDuplicateScans: boolean;
  whatsappEnabled: boolean;
  smsEnabled: boolean;
  emailEnabled: boolean;
  primaryColor: string;
  activeTheme: string;
}
