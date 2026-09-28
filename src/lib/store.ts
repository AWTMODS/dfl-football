import {
  Team,
  Match,
  Booking,
  TicketItem,
  PaymentRecord,
  ScanLog,
  StaffMember,
  TournamentSettings,
} from './types';
import { generateBookingId, generateTicketId, generatePaymentId } from './utils';

// Helper to create team crest SVG Data URI
function createTeamLogo(name: string, bg: string, text: string): string {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <linearGradient id="g_${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg}" />
        <stop offset="100%" stop-color="#0a0f18" />
      </linearGradient>
    </defs>
    <path d="M 50 5 L 88 20 L 88 55 C 88 78 50 95 50 95 C 50 95 12 78 12 55 L 12 20 Z" fill="url(#g_${initials})" stroke="${text}" stroke-width="3" />
    <circle cx="50" cy="45" r="24" fill="#000" fill-opacity="0.3" stroke="${text}" stroke-width="1.5" stroke-dasharray="3,3" />
    <text x="50" y="52" fill="${text}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" text-anchor="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-1',
    name: 'Kondotty FC',
    shortName: 'KFC',
    location: 'Kondotty, Malappuram',
    logo: createTeamLogo('Kondotty FC', '#10B981', '#ffffff'),
    founded: '2016',
    coach: 'Shabeer Rahman',
    matchesPlayed: 3,
    won: 2,
    drawn: 1,
    lost: 0,
    goalsFor: 7,
    goalsAgainst: 2,
    points: 7,
    position: 1,
    description: 'Renowned for fast counter-attacking football and passionate fanbase.',
    squad: ['Fasalu (GK)', 'Rashid', 'Salman', 'Jamsheer (C)', 'Bilal', 'Anas', 'Nihal'],
  },
  {
    id: 'team-2',
    name: 'Vengara United',
    shortName: 'VUFC',
    location: 'Vengara, Malappuram',
    logo: createTeamLogo('Vengara United', '#0ea5e9', '#ffffff'),
    founded: '2018',
    coach: 'Musthafa Kamal',
    matchesPlayed: 3,
    won: 2,
    drawn: 0,
    lost: 1,
    goalsFor: 6,
    goalsAgainst: 3,
    points: 6,
    position: 2,
    description: 'The hometown favorites known for high pressing and vocal local crowd.',
    squad: ['Ameen (GK)', 'Suhail', 'Fahad (C)', 'Rinshad', 'Ziyad', 'Shafi', 'Irshad'],
  },
  {
    id: 'team-3',
    name: 'FC Nilambur',
    shortName: 'FCN',
    location: 'Nilambur, Malappuram',
    logo: createTeamLogo('FC Nilambur', '#f59e0b', '#ffffff'),
    founded: '2017',
    coach: 'Ashraf Ali',
    matchesPlayed: 3,
    won: 1,
    drawn: 2,
    lost: 0,
    goalsFor: 4,
    goalsAgainst: 2,
    points: 5,
    position: 3,
    description: 'Defensive powerhouse featuring solid backlines and set-piece prowess.',
    squad: ['Vipin (GK)', 'Midhlaj', 'Habeeb (C)', 'Sarath', 'Arjun', 'Shihab', 'Dhanesh'],
  },
  {
    id: 'team-4',
    name: 'Malappuram FC',
    shortName: 'MFC',
    location: 'Down Hill, Malappuram',
    logo: createTeamLogo('Malappuram FC', '#ec4899', '#ffffff'),
    founded: '2015',
    coach: 'Abdul Kareem',
    matchesPlayed: 3,
    won: 1,
    drawn: 1,
    lost: 1,
    goalsFor: 5,
    goalsAgainst: 5,
    points: 4,
    position: 4,
    description: 'Historic district titans boasting seasoned 7s veterans.',
    squad: ['Shameer (GK)', 'Niyas', 'Faris (C)', 'Junaid', 'Sajid', 'Basith', 'Safwan'],
  },
  {
    id: 'team-5',
    name: 'Areekode FC',
    shortName: 'AFC',
    location: 'Areekode, Malappuram',
    logo: createTeamLogo('Areekode FC', '#8b5cf6', '#ffffff'),
    founded: '2019',
    coach: 'Haneefa Master',
    matchesPlayed: 2,
    won: 1,
    drawn: 1,
    lost: 0,
    goalsFor: 4,
    goalsAgainst: 3,
    points: 4,
    position: 5,
    description: 'The cradle of Malabar football with technically gifted playmakers.',
    squad: ['Manaf (GK)', 'Afsal', 'Babu (C)', 'Shukoor', 'Muneer', 'Rafeeq', 'Sameer'],
  },
  {
    id: 'team-6',
    name: 'Feroke FC',
    shortName: 'FFC',
    location: 'Feroke, Kozhikode/Border',
    logo: createTeamLogo('Feroke FC', '#06b6d4', '#ffffff'),
    founded: '2020',
    coach: 'Nisar Ahmed',
    matchesPlayed: 2,
    won: 1,
    drawn: 0,
    lost: 1,
    goalsFor: 3,
    goalsAgainst: 3,
    points: 3,
    position: 6,
    description: 'Dynamic young squad with blistering flank pace.',
    squad: ['Ramees (GK)', 'Adhil', 'Shibil (C)', 'Sinan', 'Mufeed', 'Hashim', 'Rauf'],
  },
  {
    id: 'team-7',
    name: 'Manjeri FC',
    shortName: 'MAN',
    location: 'Manjeri, Malappuram',
    logo: createTeamLogo('Manjeri FC', '#ef4444', '#ffffff'),
    founded: '2016',
    coach: 'Kunjumon',
    matchesPlayed: 2,
    won: 1,
    drawn: 0,
    lost: 1,
    goalsFor: 2,
    goalsAgainst: 3,
    points: 3,
    position: 7,
    description: 'Physical and disciplined side with clutch tournament pedigree.',
    squad: ['Sudheesh (GK)', 'Aneesh', 'Pradeep (C)', 'Bibin', 'Deepak', 'Sujith', 'Lijesh'],
  },
  {
    id: 'team-8',
    name: 'Tirur United',
    shortName: 'TUFC',
    location: 'Tirur, Malappuram',
    logo: createTeamLogo('Tirur United', '#14b8a6', '#ffffff'),
    founded: '2017',
    coach: 'Ibrahim Kutty',
    matchesPlayed: 2,
    won: 0,
    drawn: 1,
    lost: 1,
    goalsFor: 2,
    goalsAgainst: 4,
    points: 1,
    position: 8,
    description: 'Coastal warriors known for resilience under pressure.',
    squad: ['Noufal (GK)', 'Ashiq', 'Riyas (C)', 'Saheer', 'Afsal', 'Jasir', 'Fayiz'],
  },
  {
    id: 'team-9',
    name: 'Kottakkal City',
    shortName: 'KCT',
    location: 'Kottakkal, Malappuram',
    logo: createTeamLogo('Kottakkal City', '#84cc16', '#ffffff'),
    founded: '2019',
    coach: 'K.P. Ramdas',
    matchesPlayed: 2,
    won: 0,
    drawn: 1,
    lost: 1,
    goalsFor: 1,
    goalsAgainst: 3,
    points: 1,
    position: 9,
    description: 'Methodical passing side focused on midfield control.',
    squad: ['Rohit (GK)', 'Kiran', 'Sujith (C)', 'Vinod', 'Anil', 'Prasanth', 'Manoj'],
  },
  {
    id: 'team-10',
    name: 'Tanur Warriors',
    shortName: 'TWFC',
    location: 'Tanur, Malappuram',
    logo: createTeamLogo('Tanur Warriors', '#eab308', '#ffffff'),
    founded: '2021',
    coach: 'Siddique Master',
    matchesPlayed: 2,
    won: 0,
    drawn: 0,
    lost: 2,
    goalsFor: 1,
    goalsAgainst: 5,
    points: 0,
    position: 10,
    description: 'Tenacious coastal unit with aggressive pressing.',
    squad: ['Siyad (GK)', 'Rameez', 'Fawas (C)', 'Jabir', 'Musthafa', 'Shaheen', 'Nabeel'],
  },
  {
    id: 'team-11',
    name: 'Edavanna FC',
    shortName: 'EFC',
    location: 'Edavanna, Malappuram',
    logo: createTeamLogo('Edavanna FC', '#6366f1', '#ffffff'),
    founded: '2018',
    coach: 'Noushad V',
    matchesPlayed: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    goalsFor: 3,
    goalsAgainst: 1,
    points: 3,
    position: 11,
    description: 'Sharp attack with experienced 7-a-side goalscorers.',
    squad: ['Faizal (GK)', 'Shaji', 'Babu (C)', 'Hassan', 'Navas', 'Rauf', 'Salam'],
  },
  {
    id: 'team-12',
    name: 'Wandoor Blasters',
    shortName: 'WBFC',
    location: 'Wandoor, Malappuram',
    logo: createTeamLogo('Wandoor Blasters', '#f97316', '#ffffff'),
    founded: '2020',
    coach: 'Sreejith Menon',
    matchesPlayed: 1,
    won: 0,
    drawn: 0,
    lost: 1,
    goalsFor: 1,
    goalsAgainst: 3,
    points: 0,
    position: 12,
    description: 'Energetic young squad known for long-range strikes.',
    squad: ['Rahul (GK)', 'Akhil', 'Sanoop (C)', 'Nithin', 'Vishnu', 'Sreehari', 'Anoop'],
  },
  {
    id: 'team-13',
    name: 'Parappanangadi FC',
    shortName: 'PFC',
    location: 'Parappanangadi, Malappuram',
    logo: createTeamLogo('Parappanangadi FC', '#10b981', '#ffffff'),
    founded: '2019',
    coach: 'Ghafoor Bapu',
    matchesPlayed: 1,
    won: 1,
    drawn: 0,
    lost: 0,
    goalsFor: 2,
    goalsAgainst: 0,
    points: 3,
    position: 13,
    description: 'Tactically disciplined side with impenetrable defending.',
    squad: ['Anoop (GK)', 'Haris', 'Kunjalavi (C)', 'Shamsu', 'Hameed', 'Nasser', 'Subair'],
  },
  {
    id: 'team-14',
    name: 'Perinthalmanna FC',
    shortName: 'PMFC',
    location: 'Perinthalmanna, Malappuram',
    logo: createTeamLogo('Perinthalmanna FC', '#3b82f6', '#ffffff'),
    founded: '2017',
    coach: 'Jaleel Ahmed',
    matchesPlayed: 1,
    won: 0,
    drawn: 0,
    lost: 1,
    goalsFor: 0,
    goalsAgainst: 2,
    points: 0,
    position: 14,
    description: 'Strong technical unit seeking comeback momentum.',
    squad: ['Subin (GK)', 'Dileep', 'Suresh (C)', 'Vijayan', 'Rajan', 'Mukesh', 'Praveen'],
  },
  {
    id: 'team-15',
    name: 'Valanchery Strikers',
    shortName: 'VSFC',
    location: 'Valanchery, Malappuram',
    logo: createTeamLogo('Valanchery Strikers', '#a855f7', '#ffffff'),
    founded: '2021',
    coach: 'K. Unnikrishnan',
    matchesPlayed: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    position: 15,
    description: 'Eager tournament debutants eager to surprise the league.',
    squad: ['Anas (GK)', 'Shabeer', 'Irfan (C)', 'Shahid', 'Asif', 'Nizam', 'Thariq'],
  },
  {
    id: 'team-16',
    name: 'Ponnani Pirates',
    shortName: 'PPFC',
    location: 'Ponnani, Malappuram',
    logo: createTeamLogo('Ponnani Pirates', '#0284c7', '#ffffff'),
    founded: '2018',
    coach: 'Moideen Kutty',
    matchesPlayed: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    position: 16,
    description: 'Harbor city favorites with relentless high endurance.',
    squad: ['Riyas (GK)', 'Suhail', 'Faris (C)', 'Nabeel', 'Shamil', 'Jafar', 'Kamal'],
  },
  {
    id: 'team-17',
    name: 'Pandikkad FC',
    shortName: 'PND',
    location: 'Pandikkad, Malappuram',
    logo: createTeamLogo('Pandikkad FC', '#f43f5e', '#ffffff'),
    founded: '2020',
    coach: 'Muhammedali',
    matchesPlayed: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    position: 17,
    description: 'Fast paced attackers with exciting youth talent.',
    squad: ['Mubarak (GK)', 'Fayis', 'Shahin (C)', 'Murshid', 'Sinan', 'Zubair', 'Nihal'],
  },
  {
    id: 'team-18',
    name: 'Chemmad Titans',
    shortName: 'CTFC',
    location: 'Chemmad, Malappuram',
    logo: createTeamLogo('Chemmad Titans', '#14b8a6', '#ffffff'),
    founded: '2019',
    coach: 'Bava Master',
    matchesPlayed: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    position: 18,
    description: 'Heavy artillery squad with formidable set piece routines.',
    squad: ['Jasil (GK)', 'Swalih', 'Dilshad (C)', 'Thabsheer', 'Raees', 'Hafil', 'Nabeel'],
  },
  {
    id: 'team-19',
    name: 'Mampad FC',
    shortName: 'MFC2',
    location: 'Mampad, Malappuram',
    logo: createTeamLogo('Mampad FC', '#d97706', '#ffffff'),
    founded: '2015',
    coach: 'Prof. Shihab',
    matchesPlayed: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    position: 19,
    description: 'Collegiate heritage team with intricate passing combinations.',
    squad: ['Nadir (GK)', 'Rashdan', 'Afham (C)', 'Adnan', 'Rayyan', 'Danish', 'Luqman'],
  },
  {
    id: 'team-20',
    name: 'Kizhisseri FC',
    shortName: 'KFC2',
    location: 'Kizhisseri, Malappuram',
    logo: createTeamLogo('Kizhisseri FC', '#4f46e5', '#ffffff'),
    founded: '2022',
    coach: 'Alavi Master',
    matchesPlayed: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    position: 20,
    description: 'Rapidly emerging force with passionate community support.',
    squad: ['Bilal (GK)', 'Mufeed', 'Yaseen (C)', 'Rayan', 'Afnan', 'Rizwan', 'Sahal'],
  },
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match-1',
    matchNumber: 1,
    stage: 'Group Stage',
    teamAId: 'team-1',
    teamBId: 'team-2',
    teamAName: 'Kondotty FC',
    teamBName: 'Vengara United',
    teamALogo: INITIAL_TEAMS[0].logo,
    teamBLogo: INITIAL_TEAMS[1].logo,
    date: '2026-10-20',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 150,
    totalTickets: 1200,
    availableTickets: 684,
    description: 'Tournament Opener! Hometown favorites Vengara United take on high-flying Kondotty FC under the floodlights in front of an electric crowd.',
    importantNotes: [
      'Gates open 1 hour prior to kickoff (06:00 PM)',
      'Digital ticket or QR code is mandatory at gate entry',
      'Food & beverage stalls available inside the stadium',
      'Dedicated two-wheeler and four-wheeler parking at Vengara Grounds',
    ],
  },
  {
    id: 'match-2',
    matchNumber: 2,
    stage: 'Group Stage',
    teamAId: 'team-3',
    teamBId: 'team-4',
    teamAName: 'FC Nilambur',
    teamBName: 'Malappuram FC',
    teamALogo: INITIAL_TEAMS[2].logo,
    teamBLogo: INITIAL_TEAMS[3].logo,
    date: '2026-10-21',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 150,
    totalTickets: 1200,
    availableTickets: 820,
    description: 'Blockbuster Group Clash: The teak town boys of Nilambur take on the historic football power of Malappuram FC.',
    importantNotes: [
      'Children under 5 enter free with adult ticket holder',
      'Free match brochure provided at entry',
    ],
  },
  {
    id: 'match-3',
    matchNumber: 3,
    stage: 'Group Stage',
    teamAId: 'team-5',
    teamBId: 'team-6',
    teamAName: 'Areekode FC',
    teamBName: 'Feroke FC',
    teamALogo: INITIAL_TEAMS[4].logo,
    teamBLogo: INITIAL_TEAMS[5].logo,
    date: '2026-10-22',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 150,
    totalTickets: 1200,
    availableTickets: 910,
    description: 'Fast paced attacking contest featuring two of the quickest frontline squads in Malabar 7s.',
    importantNotes: ['Live DJ & stadium commentary on site.'],
  },
  {
    id: 'match-4',
    matchNumber: 4,
    stage: 'Group Stage',
    teamAId: 'team-7',
    teamBId: 'team-8',
    teamAName: 'Manjeri FC',
    teamBName: 'Tirur United',
    teamALogo: INITIAL_TEAMS[6].logo,
    teamBLogo: INITIAL_TEAMS[7].logo,
    date: '2026-10-23',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 150,
    totalTickets: 1200,
    availableTickets: 740,
    description: 'High stakes rivalry clash between historic towns Manjeri and coastal power Tirur United.',
    importantNotes: ['High attendance expected, reserve tickets early.'],
  },
  {
    id: 'match-5',
    matchNumber: 5,
    stage: 'Group Stage',
    teamAId: 'team-9',
    teamBId: 'team-10',
    teamAName: 'Kottakkal City',
    teamBName: 'Tanur Warriors',
    teamALogo: INITIAL_TEAMS[8].logo,
    teamBLogo: INITIAL_TEAMS[9].logo,
    date: '2026-10-24',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 150,
    totalTickets: 1200,
    availableTickets: 890,
  },
  {
    id: 'match-6',
    matchNumber: 6,
    stage: 'Group Stage',
    teamAId: 'team-11',
    teamBId: 'team-12',
    teamAName: 'Edavanna FC',
    teamBName: 'Wandoor Blasters',
    teamALogo: INITIAL_TEAMS[10].logo,
    teamBLogo: INITIAL_TEAMS[11].logo,
    date: '2026-10-25',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 150,
    totalTickets: 1200,
    availableTickets: 950,
  },
  {
    id: 'match-7',
    matchNumber: 7,
    stage: 'Group Stage',
    teamAId: 'team-13',
    teamBId: 'team-14',
    teamAName: 'Parappanangadi FC',
    teamBName: 'Perinthalmanna FC',
    teamALogo: INITIAL_TEAMS[12].logo,
    teamBLogo: INITIAL_TEAMS[13].logo,
    date: '2026-10-26',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 150,
    totalTickets: 1200,
    availableTickets: 830,
  },
  {
    id: 'match-8',
    matchNumber: 8,
    stage: 'Quarter Final',
    teamAId: 'team-1',
    teamBId: 'team-4',
    teamAName: 'Kondotty FC',
    teamBName: 'Malappuram FC',
    teamALogo: INITIAL_TEAMS[0].logo,
    teamBLogo: INITIAL_TEAMS[3].logo,
    date: '2026-10-30',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 200,
    totalTickets: 1500,
    availableTickets: 420,
  },
  {
    id: 'match-9',
    matchNumber: 9,
    stage: 'Semi Final',
    teamAId: 'team-2',
    teamBId: 'team-5',
    teamAName: 'Vengara United',
    teamBName: 'Areekode FC',
    teamALogo: INITIAL_TEAMS[1].logo,
    teamBLogo: INITIAL_TEAMS[4].logo,
    date: '2026-11-02',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 250,
    totalTickets: 1800,
    availableTickets: 310,
  },
  {
    id: 'match-10',
    matchNumber: 10,
    stage: 'Final',
    teamAId: 'team-1',
    teamBId: 'team-2',
    teamAName: 'Kondotty FC',
    teamBName: 'Vengara United',
    teamALogo: INITIAL_TEAMS[0].logo,
    teamBLogo: INITIAL_TEAMS[1].logo,
    date: '2026-11-04',
    time: '07:30 PM',
    venue: 'DFL Stadium, Vengara',
    status: 'UPCOMING',
    ticketPrice: 300,
    totalTickets: 2500,
    availableTickets: 180,
  },
];

export const INITIAL_SETTINGS: TournamentSettings = {
  tournamentName: 'DFL FOOTBALL',
  tagline: 'Defenders Football League — 7-A-Side Spectacle',
  edition: '2026 Edition',
  location: 'Vengara, Malappuram, Kerala',
  venueName: 'DFL Stadium Ground',
  venueAddress: 'Near Mini Stadium Bypass, Vengara, Malappuram, Kerala 676304',
  startDate: '2026-10-20',
  endDate: '2026-11-04',
  teamCount: 20,
  durationDays: 15,
  generalTicketPrice: 150,
  maxTicketsPerBooking: 10,
  autoMarkUsedOnScan: false,
  alertDuplicateScans: true,
  whatsappEnabled: true,
  smsEnabled: true,
  emailEnabled: true,
  primaryColor: '#00E676',
  activeTheme: 'electric-pitch',
};

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Ameen Farooq',
    email: 'admin@dflfootball.com',
    phone: '+91 98470 11223',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    lastActive: 'Just now',
  },
  {
    id: 'staff-2',
    name: 'Suhail Vengara',
    email: 'manager@dflfootball.com',
    phone: '+91 98470 44556',
    role: 'ADMIN_MANAGER',
    status: 'ACTIVE',
    lastActive: '10 mins ago',
  },
  {
    id: 'staff-3',
    name: 'Rahul K',
    email: 'tickets@dflfootball.com',
    phone: '+91 98470 77889',
    role: 'TICKET_STAFF',
    status: 'ACTIVE',
    lastActive: '1 hour ago',
  },
  {
    id: 'staff-4',
    name: 'Staff 01 (Gate Scanner)',
    email: 'scanner1@dflfootball.com',
    phone: '+91 98470 99001',
    role: 'SCANNER_STAFF',
    status: 'ACTIVE',
    lastActive: 'Active now',
  },
];

// Prepopulated Aadith C V Booking DFL-2026-A8F92K with 4 tickets
const aadithBookingId = 'DFL-2026-A8F92K';
const aadithTickets: TicketItem[] = [
  {
    id: 'DFL-TKT-0001',
    bookingId: aadithBookingId,
    ticketNumber: 1,
    matchId: 'match-1',
    matchSummary: 'Kondotty FC vs Vengara United',
    teamAName: 'Kondotty FC',
    teamBName: 'Vengara United',
    teamALogo: INITIAL_TEAMS[0].logo,
    teamBLogo: INITIAL_TEAMS[1].logo,
    date: '2026-10-20',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    customerName: 'Aadith C V',
    phone: '+91 98765 43210',
    email: 'aadith@example.com',
    ticketType: 'General Pass',
    price: 150,
    qrToken: 'DFL-TKT-0001',
    status: 'VALID',
  },
  {
    id: 'DFL-TKT-0002',
    bookingId: aadithBookingId,
    ticketNumber: 2,
    matchId: 'match-1',
    matchSummary: 'Kondotty FC vs Vengara United',
    teamAName: 'Kondotty FC',
    teamBName: 'Vengara United',
    teamALogo: INITIAL_TEAMS[0].logo,
    teamBLogo: INITIAL_TEAMS[1].logo,
    date: '2026-10-20',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    customerName: 'Aadith C V',
    phone: '+91 98765 43210',
    email: 'aadith@example.com',
    ticketType: 'General Pass',
    price: 150,
    qrToken: 'DFL-TKT-0002',
    status: 'VALID',
  },
  {
    id: 'DFL-TKT-0003',
    bookingId: aadithBookingId,
    ticketNumber: 3,
    matchId: 'match-1',
    matchSummary: 'Kondotty FC vs Vengara United',
    teamAName: 'Kondotty FC',
    teamBName: 'Vengara United',
    teamALogo: INITIAL_TEAMS[0].logo,
    teamBLogo: INITIAL_TEAMS[1].logo,
    date: '2026-10-20',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    customerName: 'Aadith C V',
    phone: '+91 98765 43210',
    email: 'aadith@example.com',
    ticketType: 'General Pass',
    price: 150,
    qrToken: 'DFL-TKT-0003',
    status: 'USED',
    scannedAt: '2026-10-20T18:58:00',
    scannedBy: 'Staff 01',
  },
  {
    id: 'DFL-TKT-0004',
    bookingId: aadithBookingId,
    ticketNumber: 4,
    matchId: 'match-1',
    matchSummary: 'Kondotty FC vs Vengara United',
    teamAName: 'Kondotty FC',
    teamBName: 'Vengara United',
    teamALogo: INITIAL_TEAMS[0].logo,
    teamBLogo: INITIAL_TEAMS[1].logo,
    date: '2026-10-20',
    time: '07:00 PM',
    venue: 'DFL Stadium, Vengara',
    customerName: 'Aadith C V',
    phone: '+91 98765 43210',
    email: 'aadith@example.com',
    ticketType: 'General Pass',
    price: 150,
    qrToken: 'DFL-TKT-0004',
    status: 'VALID',
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: aadithBookingId,
    customerName: 'Aadith C V',
    phone: '+91 98765 43210',
    email: 'aadith@example.com',
    matchId: 'match-1',
    matchSummary: 'Kondotty FC vs Vengara United',
    matchDate: '2026-10-20',
    matchTime: '07:00 PM',
    matchVenue: 'DFL Stadium, Vengara',
    quantity: 4,
    ticketType: 'General Pass',
    ticketPrice: 150,
    convenienceFee: 0,
    totalAmount: 600,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI (Demo)',
    paymentRef: 'UPI-DEMO-A8F92K',
    createdAt: '2026-10-18T14:32:00',
    tickets: aadithTickets,
  },
  {
    id: 'DFL-2026-K3L9D',
    customerName: 'Jishnu P',
    phone: '+91 98450 12345',
    email: 'jishnu@gmail.com',
    matchId: 'match-2',
    matchSummary: 'FC Nilambur vs Malappuram FC',
    matchDate: '2026-10-21',
    matchTime: '07:00 PM',
    matchVenue: 'DFL Stadium, Vengara',
    quantity: 2,
    ticketType: 'General Pass',
    ticketPrice: 150,
    convenienceFee: 0,
    totalAmount: 300,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'Card (Demo)',
    paymentRef: 'CRD-DEMO-K3L9D',
    createdAt: '2026-10-18T16:15:00',
    tickets: [
      {
        id: 'DFL-TKT-0005',
        bookingId: 'DFL-2026-K3L9D',
        ticketNumber: 1,
        matchId: 'match-2',
        matchSummary: 'FC Nilambur vs Malappuram FC',
        teamAName: 'FC Nilambur',
        teamBName: 'Malappuram FC',
        teamALogo: INITIAL_TEAMS[2].logo,
        teamBLogo: INITIAL_TEAMS[3].logo,
        date: '2026-10-21',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Jishnu P',
        phone: '+91 98450 12345',
        email: 'jishnu@gmail.com',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0005',
        status: 'VALID',
      },
      {
        id: 'DFL-TKT-0006',
        bookingId: 'DFL-2026-K3L9D',
        ticketNumber: 2,
        matchId: 'match-2',
        matchSummary: 'FC Nilambur vs Malappuram FC',
        teamAName: 'FC Nilambur',
        teamBName: 'Malappuram FC',
        teamALogo: INITIAL_TEAMS[2].logo,
        teamBLogo: INITIAL_TEAMS[3].logo,
        date: '2026-10-21',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Jishnu P',
        phone: '+91 98450 12345',
        email: 'jishnu@gmail.com',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0006',
        status: 'VALID',
      },
    ],
  },
  {
    id: 'DFL-2026-Q7P4M',
    customerName: 'Mohammed R',
    phone: '+91 97440 98765',
    email: 'mohammed@outlook.com',
    matchId: 'match-3',
    matchSummary: 'Areekode FC vs Feroke FC',
    matchDate: '2026-10-22',
    matchTime: '07:00 PM',
    matchVenue: 'DFL Stadium, Vengara',
    quantity: 3,
    ticketType: 'General Pass',
    ticketPrice: 150,
    convenienceFee: 0,
    totalAmount: 450,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI (Demo)',
    paymentRef: 'UPI-DEMO-Q7P4M',
    createdAt: '2026-10-18T18:40:00',
    tickets: [
      {
        id: 'DFL-TKT-0007',
        bookingId: 'DFL-2026-Q7P4M',
        ticketNumber: 1,
        matchId: 'match-3',
        matchSummary: 'Areekode FC vs Feroke FC',
        teamAName: 'Areekode FC',
        teamBName: 'Feroke FC',
        teamALogo: INITIAL_TEAMS[4].logo,
        teamBLogo: INITIAL_TEAMS[5].logo,
        date: '2026-10-22',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Mohammed R',
        phone: '+91 97440 98765',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0007',
        status: 'VALID',
      },
      {
        id: 'DFL-TKT-0008',
        bookingId: 'DFL-2026-Q7P4M',
        ticketNumber: 2,
        matchId: 'match-3',
        matchSummary: 'Areekode FC vs Feroke FC',
        teamAName: 'Areekode FC',
        teamBName: 'Feroke FC',
        teamALogo: INITIAL_TEAMS[4].logo,
        teamBLogo: INITIAL_TEAMS[5].logo,
        date: '2026-10-22',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Mohammed R',
        phone: '+91 97440 98765',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0008',
        status: 'VALID',
      },
      {
        id: 'DFL-TKT-0009',
        bookingId: 'DFL-2026-Q7P4M',
        ticketNumber: 3,
        matchId: 'match-3',
        matchSummary: 'Areekode FC vs Feroke FC',
        teamAName: 'Areekode FC',
        teamBName: 'Feroke FC',
        teamALogo: INITIAL_TEAMS[4].logo,
        teamBLogo: INITIAL_TEAMS[5].logo,
        date: '2026-10-22',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Mohammed R',
        phone: '+91 97440 98765',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0009',
        status: 'VALID',
      },
    ],
  },
  {
    id: 'DFL-2026-Z1N6F',
    customerName: 'Arjun K',
    phone: '+91 94460 33445',
    email: 'arjun@live.com',
    matchId: 'match-1',
    matchSummary: 'Kondotty FC vs Vengara United',
    matchDate: '2026-10-20',
    matchTime: '07:00 PM',
    matchVenue: 'DFL Stadium, Vengara',
    quantity: 1,
    ticketType: 'General Pass',
    ticketPrice: 150,
    convenienceFee: 0,
    totalAmount: 150,
    status: 'PENDING',
    paymentStatus: 'PENDING',
    paymentMethod: 'NetBanking (Demo)',
    paymentRef: 'NB-PENDING-Z1N6F',
    createdAt: '2026-10-18T19:10:00',
    tickets: [
      {
        id: 'DFL-TKT-0010',
        bookingId: 'DFL-2026-Z1N6F',
        ticketNumber: 1,
        matchId: 'match-1',
        matchSummary: 'Kondotty FC vs Vengara United',
        teamAName: 'Kondotty FC',
        teamBName: 'Vengara United',
        teamALogo: INITIAL_TEAMS[0].logo,
        teamBLogo: INITIAL_TEAMS[1].logo,
        date: '2026-10-20',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Arjun K',
        phone: '+91 94460 33445',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0010',
        status: 'VALID',
      },
    ],
  },
  {
    id: 'DFL-2026-R5U9K',
    customerName: 'Nikhil J',
    phone: '+91 99950 88776',
    email: 'nikhil@yahoo.com',
    matchId: 'match-4',
    matchSummary: 'Manjeri FC vs Tirur United',
    matchDate: '2026-10-23',
    matchTime: '07:00 PM',
    matchVenue: 'DFL Stadium, Vengara',
    quantity: 2,
    ticketType: 'General Pass',
    ticketPrice: 150,
    convenienceFee: 0,
    totalAmount: 300,
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    paymentMethod: 'UPI (Demo)',
    paymentRef: 'UPI-REFUND-R5U9K',
    createdAt: '2026-10-17T11:20:00',
    tickets: [
      {
        id: 'DFL-TKT-0011',
        bookingId: 'DFL-2026-R5U9K',
        ticketNumber: 1,
        matchId: 'match-4',
        matchSummary: 'Manjeri FC vs Tirur United',
        teamAName: 'Manjeri FC',
        teamBName: 'Tirur United',
        teamALogo: INITIAL_TEAMS[6].logo,
        teamBLogo: INITIAL_TEAMS[7].logo,
        date: '2026-10-23',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Nikhil J',
        phone: '+91 99950 88776',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0011',
        status: 'CANCELLED',
      },
      {
        id: 'DFL-TKT-0012',
        bookingId: 'DFL-2026-R5U9K',
        ticketNumber: 2,
        matchId: 'match-4',
        matchSummary: 'Manjeri FC vs Tirur United',
        teamAName: 'Manjeri FC',
        teamBName: 'Tirur United',
        teamALogo: INITIAL_TEAMS[6].logo,
        teamBLogo: INITIAL_TEAMS[7].logo,
        date: '2026-10-23',
        time: '07:00 PM',
        venue: 'DFL Stadium, Vengara',
        customerName: 'Nikhil J',
        phone: '+91 99950 88776',
        ticketType: 'General Pass',
        price: 150,
        qrToken: 'DFL-TKT-0012',
        status: 'CANCELLED',
      },
    ],
  },
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'DFL-PAY-000001',
    bookingId: 'DFL-2026-A8F92K',
    customerName: 'Aadith C V',
    phone: '+91 98765 43210',
    amount: 600,
    status: 'PAID',
    method: 'UPI (Demo)',
    reference: 'UPI-DEMO-A8F92K',
    createdAt: '2026-10-18T14:32:00',
  },
  {
    id: 'DFL-PAY-000002',
    bookingId: 'DFL-2026-K3L9D',
    customerName: 'Jishnu P',
    phone: '+91 98450 12345',
    amount: 300,
    status: 'PAID',
    method: 'Card (Demo)',
    reference: 'CRD-DEMO-K3L9D',
    createdAt: '2026-10-18T16:15:00',
  },
  {
    id: 'DFL-PAY-000003',
    bookingId: 'DFL-2026-Q7P4M',
    customerName: 'Mohammed R',
    phone: '+91 97440 98765',
    amount: 450,
    status: 'PAID',
    method: 'UPI (Demo)',
    reference: 'UPI-DEMO-Q7P4M',
    createdAt: '2026-10-18T18:40:00',
  },
  {
    id: 'DFL-PAY-000004',
    bookingId: 'DFL-2026-Z1N6F',
    customerName: 'Arjun K',
    phone: '+91 94460 33445',
    amount: 150,
    status: 'PENDING',
    method: 'NetBanking (Demo)',
    reference: 'NB-PENDING-Z1N6F',
    createdAt: '2026-10-18T19:10:00',
  },
  {
    id: 'DFL-PAY-000005',
    bookingId: 'DFL-2026-R5U9K',
    customerName: 'Nikhil J',
    phone: '+91 99950 88776',
    amount: 300,
    status: 'REFUNDED',
    method: 'UPI (Demo)',
    reference: 'UPI-REFUND-R5U9K',
    createdAt: '2026-10-17T11:20:00',
  },
];

export const INITIAL_SCAN_LOGS: ScanLog[] = [
  {
    id: 'scan-1',
    ticketId: 'DFL-TKT-0003',
    bookingId: 'DFL-2026-A8F92K',
    customerName: 'Aadith C V',
    matchSummary: 'Kondotty FC vs Vengara United',
    scanTime: '2026-10-20T18:58:00',
    result: 'VALID',
    staffId: 'staff-4',
    staffName: 'Staff 01 (Gate Scanner)',
    firstScanTime: '2026-10-20T18:58:00',
    device: 'Mobile Scanner 01',
  },
];

// Browser LocalStorage keys
const STORAGE_KEYS = {
  BOOKINGS: 'dfl_bookings_v1',
  MATCHES: 'dfl_matches_v1',
  TEAMS: 'dfl_teams_v1',
  PAYMENTS: 'dfl_payments_v1',
  SCAN_LOGS: 'dfl_scan_logs_v1',
  STAFF: 'dfl_staff_v1',
  SETTINGS: 'dfl_settings_v1',
  CURRENT_STAFF_USER: 'dfl_current_staff_user',
};

// Safe storage access for Next.js SSR
class DFLStore {
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // Get Bookings
  getBookings(): Booking[] {
    if (!this.isBrowser()) return INITIAL_BOOKINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
        return INITIAL_BOOKINGS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_BOOKINGS;
    }
  }

  // Get all individual Tickets across all bookings
  getAllTickets(): TicketItem[] {
    const bookings = this.getBookings();
    return bookings.flatMap((b) => b.tickets || []);
  }

  // Get Matches
  getMatches(): Match[] {
    if (!this.isBrowser()) return INITIAL_MATCHES;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MATCHES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(INITIAL_MATCHES));
        return INITIAL_MATCHES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_MATCHES;
    }
  }

  // Get Teams
  getTeams(): Team[] {
    if (!this.isBrowser()) return INITIAL_TEAMS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TEAMS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(INITIAL_TEAMS));
        return INITIAL_TEAMS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_TEAMS;
    }
  }

  // Get Payments
  getPayments(): PaymentRecord[] {
    if (!this.isBrowser()) return INITIAL_PAYMENTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
        return INITIAL_PAYMENTS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_PAYMENTS;
    }
  }

  // Get Scan Logs
  getScanLogs(): ScanLog[] {
    if (!this.isBrowser()) return INITIAL_SCAN_LOGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SCAN_LOGS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.SCAN_LOGS, JSON.stringify(INITIAL_SCAN_LOGS));
        return INITIAL_SCAN_LOGS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_SCAN_LOGS;
    }
  }

  // Get Settings
  getSettings(): TournamentSettings {
    if (!this.isBrowser()) return INITIAL_SETTINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
        return INITIAL_SETTINGS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_SETTINGS;
    }
  }

  // Get Staff
  getStaff(): StaffMember[] {
    if (!this.isBrowser()) return INITIAL_STAFF;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STAFF);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
        return INITIAL_STAFF;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_STAFF;
    }
  }

  // Track Booking by ID and Phone/Email
  trackBooking(bookingId: string, contact: string): Booking | null {
    const cleanId = bookingId.trim().toUpperCase();
    const cleanContact = contact.trim().toLowerCase().replace(/\s+/g, '');
    const bookings = this.getBookings();

    const booking = bookings.find((b) => {
      const matchesId = b.id.toUpperCase() === cleanId;
      if (!matchesId) return false;
      const bPhone = (b.phone || '').replace(/\s+/g, '').toLowerCase();
      const bEmail = (b.email || '').trim().toLowerCase();
      return bPhone.includes(cleanContact) || (bEmail && bEmail === cleanContact);
    });

    return booking || null;
  }

  // Find Ticket by ID
  getTicketById(ticketId: string): TicketItem | null {
    const cleanId = ticketId.trim().toUpperCase();
    const tickets = this.getAllTickets();
    return tickets.find((t) => t.id.toUpperCase() === cleanId) || null;
  }

  // Find Booking by ID
  getBookingById(bookingId: string): Booking | null {
    const cleanId = bookingId.trim().toUpperCase();
    const bookings = this.getBookings();
    return bookings.find((b) => b.id.toUpperCase() === cleanId) || null;
  }

  // Create a New Booking with Tickets and Demo Payment
  createBooking(params: {
    matchId: string;
    customerName: string;
    phone: string;
    email?: string;
    quantity: number;
    paymentMethod: string;
    paymentStatus?: 'PAID' | 'FAILED' | 'PENDING';
  }): Booking {
    const matches = this.getMatches();
    const match = matches.find((m) => m.id === params.matchId);
    if (!match) throw new Error('Match not found');

    const bookingId = generateBookingId();
    const isPaid = (params.paymentStatus || 'PAID') === 'PAID';
    const unitPrice = match.ticketPrice;
    const totalAmount = unitPrice * params.quantity;

    // Generate individual tickets
    const tickets: TicketItem[] = [];
    for (let i = 1; i <= params.quantity; i++) {
      tickets.push({
        id: generateTicketId(i),
        bookingId,
        ticketNumber: i,
        matchId: match.id,
        matchSummary: `${match.teamAName} vs ${match.teamBName}`,
        teamAName: match.teamAName,
        teamBName: match.teamBName,
        teamALogo: match.teamALogo,
        teamBLogo: match.teamBLogo,
        date: match.date,
        time: match.time,
        venue: match.venue,
        customerName: params.customerName,
        phone: params.phone,
        email: params.email,
        ticketType: 'General Pass',
        price: unitPrice,
        qrToken: '', // Will populate with ticket ID
        status: isPaid ? 'VALID' : 'CANCELLED',
      });
    }

    // Set QR token to unique ticket ID
    tickets.forEach((t) => {
      t.qrToken = t.id;
    });

    const newBooking: Booking = {
      id: bookingId,
      customerName: params.customerName,
      phone: params.phone,
      email: params.email,
      matchId: match.id,
      matchSummary: `${match.teamAName} vs ${match.teamBName}`,
      matchDate: match.date,
      matchTime: match.time,
      matchVenue: match.venue,
      quantity: params.quantity,
      ticketType: 'General Pass',
      ticketPrice: unitPrice,
      convenienceFee: 0,
      totalAmount,
      status: isPaid ? 'CONFIRMED' : 'CANCELLED',
      paymentStatus: isPaid ? 'PAID' : 'FAILED',
      paymentMethod: params.paymentMethod || 'UPI (Demo)',
      paymentRef: `${params.paymentMethod.slice(0, 3).toUpperCase()}-DEMO-${bookingId.slice(-6)}`,
      createdAt: new Date().toISOString(),
      tickets,
    };

    // Save Booking
    const currentBookings = this.getBookings();
    currentBookings.unshift(newBooking);
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(currentBookings));
    }

    // Create Payment Record
    const paymentRecord: PaymentRecord = {
      id: generatePaymentId(),
      bookingId,
      customerName: params.customerName,
      phone: params.phone,
      amount: totalAmount,
      status: isPaid ? 'PAID' : 'FAILED',
      method: params.paymentMethod,
      reference: newBooking.paymentRef,
      createdAt: new Date().toISOString(),
      failureReason: isPaid ? undefined : 'Payment declined by demo simulator',
    };

    const currentPayments = this.getPayments();
    currentPayments.unshift(paymentRecord);
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(currentPayments));
    }

    // Deduct available tickets on match
    if (isPaid) {
      match.availableTickets = Math.max(0, match.availableTickets - params.quantity);
      this.updateMatch(match);
    }

    return newBooking;
  }

  // Update Match
  updateMatch(updatedMatch: Match) {
    const matches = this.getMatches();
    const idx = matches.findIndex((m) => m.id === updatedMatch.id);
    if (idx !== -1) {
      matches[idx] = updatedMatch;
    } else {
      matches.push(updatedMatch);
    }
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
    }
  }

  // Create Match
  createMatch(newMatchData: Omit<Match, 'id'>): Match {
    const matches = this.getMatches();
    const newId = `match-${matches.length + 1}`;
    const newMatch: Match = {
      ...newMatchData,
      id: newId,
      matchNumber: matches.length + 1,
    };
    matches.push(newMatch);
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
    }
    return newMatch;
  }

  // Update Team
  updateTeam(updatedTeam: Team) {
    const teams = this.getTeams();
    const idx = teams.findIndex((t) => t.id === updatedTeam.id);
    if (idx !== -1) {
      teams[idx] = updatedTeam;
    } else {
      teams.push(updatedTeam);
    }
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
    }
  }

  // Create Team
  createTeam(teamData: Omit<Team, 'id'>): Team {
    const teams = this.getTeams();
    const newId = `team-${teams.length + 1}`;
    const newTeam: Team = {
      ...teamData,
      id: newId,
      logo: teamData.logo || createTeamLogo(teamData.name, '#10b981', '#ffffff'),
    };
    teams.push(newTeam);
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(teams));
    }
    return newTeam;
  }

  // Cancel Booking
  cancelBooking(bookingId: string): boolean {
    const bookings = this.getBookings();
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return false;

    booking.status = 'CANCELLED';
    booking.paymentStatus = 'REFUNDED';
    booking.tickets.forEach((t) => {
      t.status = 'CANCELLED';
    });

    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    }
    return true;
  }

  // Scanner Validation logic: returns validation outcome and records history
  scanTicket(
    ticketIdInput: string,
    staffId: string = 'staff-4',
    staffName: string = 'Staff 01 (Gate Scanner)'
  ): {
    result: 'VALID' | 'ALREADY_USED' | 'INVALID' | 'CANCELLED';
    ticket: TicketItem | null;
    firstScanTime?: string;
    message: string;
  } {
    const cleanId = ticketIdInput.trim().toUpperCase();
    const bookings = this.getBookings();
    let foundTicket: TicketItem | null = null;
    let parentBooking: Booking | null = null;

    for (const b of bookings) {
      const t = b.tickets.find((item) => item.id.toUpperCase() === cleanId);
      if (t) {
        foundTicket = t;
        parentBooking = b;
        break;
      }
    }

    if (!foundTicket || !parentBooking) {
      const log: ScanLog = {
        id: `scan-${Date.now()}`,
        ticketId: cleanId,
        bookingId: 'UNKNOWN',
        customerName: 'Unknown',
        matchSummary: 'N/A',
        scanTime: new Date().toISOString(),
        result: 'INVALID',
        staffId,
        staffName,
      };
      const logs = this.getScanLogs();
      logs.unshift(log);
      if (this.isBrowser()) {
        localStorage.setItem(STORAGE_KEYS.SCAN_LOGS, JSON.stringify(logs));
      }
      return {
        result: 'INVALID',
        ticket: null,
        message: 'This ticket does not exist in the database or has an invalid QR code.',
      };
    }

    if (foundTicket.status === 'CANCELLED' || parentBooking.status === 'CANCELLED') {
      const log: ScanLog = {
        id: `scan-${Date.now()}`,
        ticketId: foundTicket.id,
        bookingId: foundTicket.bookingId,
        customerName: foundTicket.customerName,
        matchSummary: foundTicket.matchSummary,
        scanTime: new Date().toISOString(),
        result: 'CANCELLED',
        staffId,
        staffName,
      };
      const logs = this.getScanLogs();
      logs.unshift(log);
      if (this.isBrowser()) {
        localStorage.setItem(STORAGE_KEYS.SCAN_LOGS, JSON.stringify(logs));
      }
      return {
        result: 'CANCELLED',
        ticket: foundTicket,
        message: 'This ticket has been cancelled and cannot be used for entry.',
      };
    }

    if (foundTicket.status === 'USED') {
      const log: ScanLog = {
        id: `scan-${Date.now()}`,
        ticketId: foundTicket.id,
        bookingId: foundTicket.bookingId,
        customerName: foundTicket.customerName,
        matchSummary: foundTicket.matchSummary,
        scanTime: new Date().toISOString(),
        result: 'ALREADY_USED',
        staffId,
        staffName,
        firstScanTime: foundTicket.scannedAt,
      };
      const logs = this.getScanLogs();
      logs.unshift(log);
      if (this.isBrowser()) {
        localStorage.setItem(STORAGE_KEYS.SCAN_LOGS, JSON.stringify(logs));
      }
      return {
        result: 'ALREADY_USED',
        ticket: foundTicket,
        firstScanTime: foundTicket.scannedAt,
        message: `Ticket was already used at ${foundTicket.scannedAt ? new Date(foundTicket.scannedAt).toLocaleTimeString() : 'earlier today'}. Duplicate entry rejected.`,
      };
    }

    // Ticket is VALID! Check if auto-mark is enabled or keep ready for "Mark as Used"
    const settings = this.getSettings();
    const shouldAutoMark = settings.autoMarkUsedOnScan;

    if (shouldAutoMark) {
      foundTicket.status = 'USED';
      foundTicket.scannedAt = new Date().toISOString();
      foundTicket.scannedBy = staffName;

      if (this.isBrowser()) {
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
      }
    }

    const log: ScanLog = {
      id: `scan-${Date.now()}`,
      ticketId: foundTicket.id,
      bookingId: foundTicket.bookingId,
      customerName: foundTicket.customerName,
      matchSummary: foundTicket.matchSummary,
      scanTime: new Date().toISOString(),
      result: 'VALID',
      staffId,
      staffName,
    };
    const logs = this.getScanLogs();
    logs.unshift(log);
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.SCAN_LOGS, JSON.stringify(logs));
    }

    return {
      result: 'VALID',
      ticket: foundTicket,
      message: 'Valid ticket verified! Match details and spectator identity confirmed.',
    };
  }

  // Explicit Mark as Used action
  markTicketAsUsed(ticketId: string, staffName: string = 'Staff 01 (Gate Scanner)'): boolean {
    const cleanId = ticketId.trim().toUpperCase();
    const bookings = this.getBookings();
    let updated = false;

    for (const b of bookings) {
      const t = b.tickets.find((item) => item.id.toUpperCase() === cleanId);
      if (t) {
        t.status = 'USED';
        t.scannedAt = new Date().toISOString();
        t.scannedBy = staffName;
        updated = true;
        break;
      }
    }

    if (updated && this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    }
    return updated;
  }

  // Update Settings
  updateSettings(settings: TournamentSettings) {
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
  }

  // Reset to initial demo data
  resetDemoData() {
    if (this.isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(INITIAL_MATCHES));
      localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify(INITIAL_TEAMS));
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(INITIAL_PAYMENTS));
      localStorage.setItem(STORAGE_KEYS.SCAN_LOGS, JSON.stringify(INITIAL_SCAN_LOGS));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
    }
  }
}

export const dflStore = new DFLStore();
