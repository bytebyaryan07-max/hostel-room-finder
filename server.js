const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Database initialized with seed data
let users = [
  { id: 1, name: 'Rahul Sharma', username: 'rahul', password: 'student123', role: 'student', email: 'rahul@example.com', phone: '+91 98765 43210' },
  { id: 2, name: 'Anjali Verma', username: 'anjali', password: 'student123', role: 'student', email: 'anjali@example.com', phone: '+91 98765 43211' },
  { id: 3, name: 'Rajesh Kumar', username: 'rajesh', password: 'owner123', role: 'owner', email: 'rajesh@example.com', phone: '+91 98765 43212' },
  { id: 4, name: 'Priya Singh', username: 'priya', password: 'owner123', role: 'owner', email: 'priya@example.com', phone: '+91 98765 43213' },
  { id: 5, name: 'System Admin', username: 'admin', password: 'admin123', role: 'admin', email: 'admin@roomfinder.com', phone: '+91 90000 00000' }
];

let properties = [
  {
    id: 101,
    name: 'Royal Heritage Student Living',
    type: 'boys',
    location: 'North Campus, Delhi University',
    price: 8500,
    rooms: 2,
    rating: 4.8,
    reviews: 24,
    views: 142,
    verified: true,
    ownerId: 3,
    ownerName: 'Rajesh Kumar',
    img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    desc: 'Premium student living with high-speed WiFi, 3-time organic meals, daily housekeeping, and 24/7 security near DU North Campus.',
    amenities: ['WiFi', 'AC', 'Food Included', 'Laundry', 'Gym', 'Security'],
    date: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 102,
    name: 'Serene Haven Girls Hostel',
    type: 'girls',
    location: 'South Extension, New Delhi',
    price: 7500,
    rooms: 3,
    rating: 4.9,
    reviews: 38,
    views: 215,
    verified: true,
    ownerId: 4,
    ownerName: 'Priya Singh',
    img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    desc: 'Safe, ultra-modern hostel for female students and working professionals. Includes biometric access, study lounge, and home-style food.',
    amenities: ['WiFi', 'AC', 'Food Included', 'CCTV Security', 'Study Room', 'Power Backup'],
    date: '2026-08-02T12:30:00.000Z'
  },
  {
    id: 103,
    name: 'Urban Nest Studio Apartments',
    type: 'pg',
    location: 'Koramangala, Bangalore',
    price: 11000,
    rooms: 1,
    rating: 4.6,
    reviews: 19,
    views: 98,
    verified: true,
    ownerId: 3,
    ownerName: 'Rajesh Kumar',
    img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    desc: 'Independent luxury studio with attached kitchenette, balcony view, desk setup, and high-speed fiber internet.',
    amenities: ['WiFi', 'Kitchenette', 'AC', 'Balcony', 'Washing Machine'],
    date: '2026-08-03T14:15:00.000Z'
  },
  {
    id: 104,
    name: 'Greenwoods Budget PG',
    type: 'boys',
    location: 'Sector 62, Noida',
    price: 6500,
    rooms: 4,
    rating: 4.4,
    reviews: 15,
    views: 76,
    verified: true,
    ownerId: 4,
    ownerName: 'Priya Singh',
    img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    desc: 'Affordable, clean twin sharing rooms for college students. Located right opposite IT Park and Metro Station.',
    amenities: ['WiFi', 'Food Included', 'RO Water', 'Housekeeping'],
    date: '2026-08-04T09:00:00.000Z'
  }
];

let inquiries = [
  {
    id: 1001,
    propertyId: 101,
    studentId: 1,
    studentName: 'Rahul Sharma',
    studentPhone: '+91 98765 43210',
    ownerId: 3,
    message: 'Hi, I would like to schedule a visit tomorrow evening around 5 PM.',
    response: 'Hello Rahul! Tomorrow 5 PM works great. Looking forward to showing you around!',
    status: 'responded',
    date: '2026-08-04T15:00:00.000Z',
    responseDate: '2026-08-04T16:30:00.000Z',
    readByStudent: false
  }
];

// --- AUTH API ---
app.post('/api/auth/login', (req, res) => {
  const { username, password, role } = req.body;
  const user = users.find(u => u.username.toLowerCase() === (username || '').toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Invalid username or password' });
  }
  if (role && user.role !== role) {
    return res.status(403).json({ success: false, error: `Account is registered as a ${user.role}, not ${role}` });
  }
  const { password: _, ...userWithoutPass } = user;
  res.json({ success: true, user: userWithoutPass });
});

app.post('/api/auth/register', (req, res) => {
  const { name, username, password, role, email, phone } = req.body;
  if (!name || !username || !password || !role) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return res.status(400).json({ success: false, error: 'Username already taken' });
  }
  const newUser = {
    id: Date.now(),
    name,
    username: username.toLowerCase(),
    password,
    role,
    email: email || '',
    phone: phone || ''
  };
  users.push(newUser);
  const { password: _, ...userWithoutPass } = newUser;
  res.json({ success: true, user: userWithoutPass });
});

// --- PROPERTIES API ---
app.get('/api/properties', (req, res) => {
  res.json({ success: true, properties });
});

app.post('/api/properties', (req, res) => {
  const newProp = {
    id: Date.now(),
    verified: false, // Default pending approval for admin
    rating: 5.0,
    reviews: 0,
    views: 0,
    date: new Date().toISOString(),
    ...req.body
  };
  properties.unshift(newProp);
  res.json({ success: true, property: newProp });
});

app.put('/api/properties/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = properties.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Property not found' });
  properties[idx] = { ...properties[idx], ...req.body };
  res.json({ success: true, property: properties[idx] });
});

app.delete('/api/properties/:id', (req, res) => {
  const id = parseInt(req.params.id);
  properties = properties.filter(p => p.id !== id);
  inquiries = inquiries.filter(i => i.propertyId !== id);
  res.json({ success: true });
});

// --- INQUIRIES API ---
app.get('/api/inquiries', (req, res) => {
  res.json({ success: true, inquiries });
});

app.post('/api/inquiries', (req, res) => {
  const newInquiry = {
    id: Date.now(),
    status: 'new',
    date: new Date().toISOString(),
    response: '',
    responseDate: null,
    readByStudent: true,
    ...req.body
  };
  inquiries.unshift(newInquiry);
  res.json({ success: true, inquiry: newInquiry });
});

app.put('/api/inquiries/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = inquiries.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ success: false, error: 'Inquiry not found' });
  inquiries[idx] = { ...inquiries[idx], ...req.body };
  res.json({ success: true, inquiry: inquiries[idx] });
});

// --- USERS API (ADMIN) ---
app.get('/api/users', (req, res) => {
  const safeUsers = users.map(({ password, ...u }) => u);
  res.json({ success: true, users: safeUsers });
});

app.put('/api/users/:id/role', (req, res) => {
  const id = parseInt(req.params.id);
  const { role } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ success: false, error: 'User not found' });
  user.role = role;
  const { password: _, ...userWithoutPass } = user;
  res.json({ success: true, user: userWithoutPass });
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ success: true });
});

// --- ADMIN STATS ---
app.get('/api/admin/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalUsers: users.length,
      totalStudents: users.filter(u => u.role === 'student').length,
      totalOwners: users.filter(u => u.role === 'owner').length,
      totalProperties: properties.length,
      verifiedProperties: properties.filter(p => p.verified).length,
      pendingProperties: properties.filter(p => !p.verified).length,
      totalInquiries: inquiries.length,
      monthlyRevenue: properties.reduce((sum, p) => sum + (p.verified ? p.price * 0.05 : 0), 0)
    }
  });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 RoomFinder Backend Server running on http://localhost:${PORT}`);
  console.log(`=================================================`);
});
