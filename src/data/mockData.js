export const mockClaims = [
  { id: "FRA-1001", name: "Ramesh Munda", area: 2.4, status: "Approved", lat: 21.2, lng: 81.3, state: "Chhattisgarh", district: "Raipur", village: "Tilda", date: "2023-01-15", daysPending: 0, stage: 4 },
  { id: "FRA-1002", name: "Sita Devi", area: 1.8, status: "Pending", lat: 20.9, lng: 81.6, state: "Chhattisgarh", district: "Dhamtari", village: "Kurud", date: "2023-11-20", daysPending: 154, stage: 2 },
  { id: "FRA-1003", name: "Birsa Oram", area: 3.1, status: "Rejected", lat: 22.1, lng: 82.1, state: "Chhattisgarh", district: "Bilaspur", village: "Kota", date: "2023-05-10", daysPending: 0, stage: 4 },
  { id: "FRA-1004", name: "Kamla Bai", area: 1.2, status: "Approved", lat: 21.0, lng: 81.0, state: "Chhattisgarh", district: "Durg", village: "Patan", date: "2022-08-14", daysPending: 0, stage: 4 },
  { id: "FRA-2001", name: "Arjun Majhi", area: 4.0, status: "Pending", lat: 20.3, lng: 85.8, state: "Odisha", district: "Khurda", village: "Bhubaneswar", date: "2023-10-05", daysPending: 200, stage: 3 },
  { id: "FRA-2002", name: "Laxmi Nayak", area: 2.2, status: "Approved", lat: 19.8, lng: 85.3, state: "Odisha", district: "Puri", village: "Satyabadi", date: "2023-02-28", daysPending: 0, stage: 4 },
  { id: "FRA-2003", name: "Suresh Pradhan", area: 1.5, status: "Conflict", lat: 21.5, lng: 86.9, state: "Odisha", district: "Balasore", village: "Soro", date: "2023-09-12", daysPending: 224, stage: 2 },
  { id: "FRA-2004", name: "Gita Sahoo", area: 2.8, status: "Pending", lat: 20.5, lng: 84.2, state: "Odisha", district: "Phulbani", village: "Tikabali", date: "2024-01-10", daysPending: 103, stage: 1 },
  { id: "FRA-2847", name: "Hari Gond", area: 5.2, status: "Pending", lat: 20.1, lng: 83.5, state: "Odisha", district: "Kalahandi", village: "Lanjigarh", date: "2023-08-20", daysPending: 247, stage: 2, overlap: true },
  { id: "FRA-3001", name: "Prakash Bhil", area: 1.9, status: "Approved", lat: 19.9, lng: 75.3, state: "Maharashtra", district: "Aurangabad", village: "Paithan", date: "2022-11-11", daysPending: 0, stage: 4 },
  { id: "FRA-3002", name: "Savita Pawar", area: 3.4, status: "Rejected", lat: 18.5, lng: 73.8, state: "Maharashtra", district: "Pune", village: "Mulshi", date: "2023-04-05", daysPending: 0, stage: 4 },
  { id: "FRA-3003", name: "Dilip Kokna", area: 2.1, status: "Pending", lat: 20.0, lng: 73.7, state: "Maharashtra", district: "Nashik", village: "Trimbak", date: "2023-12-01", daysPending: 143, stage: 2 },
  { id: "FRA-3004", name: "Rani Warli", area: 1.7, status: "Approved", lat: 19.2, lng: 73.0, state: "Maharashtra", district: "Thane", village: "Shahapur", date: "2023-03-22", daysPending: 0, stage: 4 },
  { id: "FRA-3012", name: "Mohan Rathod", area: 6.5, status: "Conflict", lat: 21.1, lng: 75.8, state: "Maharashtra", district: "Jalgaon", village: "Chopda", date: "2024-02-15", daysPending: 67, stage: 1, protected: true },
  { id: "FRA-1203", name: "Sunil Munda", area: 4.8, status: "Approved", lat: 20.1, lng: 83.505, state: "Odisha", district: "Kalahandi", village: "Lanjigarh", date: "2021-05-10", daysPending: 0, stage: 4 },
  { id: "FRA-4001", name: "Kisan Singh", area: 2.5, status: "Pending", lat: 22.7, lng: 81.9, state: "Chhattisgarh", district: "Gaurela", village: "Pendra", date: "2024-03-01", daysPending: 52, stage: 1 },
  { id: "FRA-4002", name: "Malti Netam", area: 1.1, status: "Approved", lat: 19.1, lng: 81.9, state: "Chhattisgarh", district: "Kondagaon", village: "Baderajpur", date: "2022-12-12", daysPending: 0, stage: 4 },
  { id: "FRA-4003", name: "Shankar Uikey", area: 3.2, status: "Rejected", lat: 21.9, lng: 80.5, state: "Maharashtra", district: "Gondia", village: "Deori", date: "2023-06-18", daysPending: 0, stage: 4 },
  { id: "FRA-4004", name: "Anita Dhurve", area: 2.7, status: "Pending", lat: 20.7, lng: 79.9, state: "Maharashtra", district: "Bhandara", village: "Sakoli", date: "2024-01-25", daysPending: 88, stage: 2 },
  { id: "FRA-0991", name: "Vilas Mahajan", area: 3.0, status: "Pending", lat: 18.9, lng: 76.2, state: "Maharashtra", district: "Beed", village: "Majalgaon", date: "2023-08-20", daysPending: 247, stage: 2 },
];

export const mockAlerts = [
  { id: 1, severity: "High", title: "Overlap Detected", message: "Claim #FRA-2847 overlaps 38% with approved Claim #FRA-1203", claims: ["FRA-2847", "FRA-1203"], confidence: 94 },
  { id: 2, severity: "High", title: "Protected Zone Violation", message: "Claim #FRA-3012 falls inside Protected Forest Zone boundary", claims: ["FRA-3012"], confidence: 99 },
  { id: 3, severity: "Medium", title: "Abnormal Delay", message: "Claim #FRA-0991 pending 247 days at SDLC stage (Avg is 45 days)", claims: ["FRA-0991"], confidence: 85 },
  { id: 4, severity: "Medium", title: "Suspicious Document", message: "Automated scan suggests low resolution or potentially modified document in #FRA-2003", claims: ["FRA-2003"], confidence: 72 },
  { id: 5, severity: "Low", title: "Area Discrepancy", message: "Claimed area (4.0ha) in #FRA-2001 exceeds typical family plot size in region", claims: ["FRA-2001"], confidence: 60 }
];
