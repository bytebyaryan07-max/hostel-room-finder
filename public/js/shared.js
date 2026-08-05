// ============================================
// HOSTEL & ROOM FINDER - SHARED DATA & UTILS
// ============================================

const DB = {
    // ---- Default Data (with demo accounts) ----
    defaultProperties: [
        { id: 1, name: "Sunshine Boys Hostel", location: "0.5km from University Main Gate", price: 7500, type: "boys",
          img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800", verified: true, rating: 4.5, reviews: 28, rooms: 24, views: 342,
          desc: "Premium boys hostel with modern amenities. Located just 500m from the university main gate. Spacious rooms with attached bathrooms. 24/7 security and CCTV surveillance.",
          amenities: ["WiFi", "AC", "Security", "Food", "Laundry"], ownerId: 101, date: "2024-01-15" },
        { id: 2, name: "Elite Girls Residency", location: "Near Engineering Block, College Road", price: 9000, type: "girls",
          img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800", verified: true, rating: 4.8, reviews: 45, rooms: 32, views: 518,
          desc: "Luxury girls residency with premium facilities. Safe and secure environment with female wardens. Gym, study rooms, and recreational area available.",
          amenities: ["WiFi", "AC", "Security", "Gym", "Food", "Parking"], ownerId: 102, date: "2024-02-01" },
        { id: 3, name: "Campus View PG", location: "Opposite Main Library, Campus Road", price: 6500, type: "pg",
          img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800", verified: false, rating: 4.2, reviews: 12, rooms: 16, views: 156,
          desc: "Affordable PG with great view of the campus. Perfect for students who prefer quiet study environment. Home-cooked meals available.",
          amenities: ["WiFi", "Food", "Laundry", "Power Backup"], ownerId: 103, date: "2024-03-10" },
        { id: 4, name: "Scholar's Den", location: "1km from University, Market Street", price: 8200, type: "boys",
          img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800", verified: true, rating: 4.3, reviews: 19, rooms: 20, views: 289,
          desc: "Modern hostel designed for serious students. Study-focused environment with library access. Close to shopping and dining areas.",
          amenities: ["WiFi", "AC", "Security", "Parking", "Power Backup"], ownerId: 101, date: "2024-01-20" },
        { id: 5, name: "Heritage Girls Hostel", location: "Old Campus Road, Heritage Colony", price: 7800, type: "girls",
          img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800", verified: true, rating: 4.6, reviews: 33, rooms: 28, views: 401,
          desc: "Traditional yet modern girls hostel in a peaceful neighborhood. Beautiful garden and outdoor sitting area. Strict security protocols.",
          amenities: ["WiFi", "Security", "Food", "Laundry", "Gym"], ownerId: 104, date: "2024-02-15" },
        { id: 6, name: "Budget Stay Rooms", location: "Back Gate Area, Student Lane", price: 4500, type: "pg",
          img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800", verified: true, rating: 3.9, reviews: 15, rooms: 12, views: 198,
          desc: "Economical option for budget-conscious students. Clean and basic rooms. Shared kitchen facility. Best value for money in the area.",
          amenities: ["WiFi", "Food", "Power Backup"], ownerId: 105, date: "2024-03-01" }
    ],

    defaultUsers: [
        { id: 101, name: "Rajesh Kumar", username: "rajesh", password: "owner123", role: "owner", email: "rajesh@example.com", phone: "+91 98765 43210", active: true, joined: "2023-12-01", avatar: "RK" },
        { id: 102, name: "Priya Sharma", username: "priya", password: "owner123", role: "owner", email: "priya@example.com", phone: "+91 98765 43211", active: true, joined: "2024-01-10", avatar: "PS" },
        { id: 103, name: "Amit Singh", username: "amit", password: "owner123", role: "owner", email: "amit@example.com", phone: "+91 98765 43212", active: true, joined: "2024-02-20", avatar: "AS" },
        { id: 104, name: "Sunita Devi", username: "sunita", password: "owner123", role: "owner", email: "sunita@example.com", phone: "+91 98765 43213", active: true, joined: "2024-01-05", avatar: "SD" },
        { id: 105, name: "Vikram Patel", username: "vikram", password: "owner123", role: "owner", email: "vikram@example.com", phone: "+91 98765 43214", active: false, joined: "2024-03-15", avatar: "VP" },
        { id: 201, name: "Rahul Mehta", username: "rahul", password: "student123", role: "student", email: "rahul@example.com", phone: "+91 91234 56789", active: true, joined: "2024-01-01", avatar: "RM" },
        { id: 202, name: "Anjali Gupta", username: "anjali", password: "student123", role: "student", email: "anjali@example.com", phone: "+91 92345 67890", active: true, joined: "2024-02-01", avatar: "AG" },
        { id: 203, name: "Vikram Rao", username: "vikramr", password: "student123", role: "student", email: "vikram.s@example.com", phone: "+91 93456 78901", active: true, joined: "2024-03-01", avatar: "VR" },
        { id: 204, name: "Priya Nair", username: "priyan", password: "student123", role: "student", email: "priya.n@example.com", phone: "+91 94567 89012", active: true, joined: "2024-03-15", avatar: "PN" },
        { id: 999, name: "Admin User", username: "admin", password: "admin123", role: "admin", email: "admin@roomfinder.com", phone: "+91 99999 99999", active: true, joined: "2023-01-01", avatar: "AD" }
    ],

    defaultInquiries: [
        { id: 1001, propertyId: 1, studentId: 201, studentName: "Rahul Mehta", studentPhone: "+91 91234 56789",
          ownerId: 101, message: "Hi, I am interested in a single room. Is it available from next month?",
          response: "Yes Rahul, we have 2 single rooms available. Please visit between 10am-6pm.",
          status: "responded", date: "2024-06-15T10:00:00Z", responseDate: "2024-06-15T14:30:00Z", readByStudent: false },
        { id: 1002, propertyId: 2, studentId: 202, studentName: "Anjali Gupta", studentPhone: "+91 92345 67890",
          ownerId: 102, message: "Do you have AC rooms available? What is the security deposit?",
          response: "",
          status: "new", date: "2024-06-18T09:00:00Z", responseDate: null, readByStudent: true },
        { id: 1003, propertyId: 1, studentId: 203, studentName: "Vikram Rao", studentPhone: "+91 93456 78901",
          ownerId: 101, message: "Is food included in the rent? What about laundry charges?",
          response: "",
          status: "new", date: "2024-06-20T11:00:00Z", responseDate: null, readByStudent: true },
        { id: 1004, propertyId: 5, studentId: 204, studentName: "Priya Nair", studentPhone: "+91 94567 89012",
          ownerId: 104, message: "I need a room urgently. Can I visit tomorrow?",
          response: "Sure Priya, please come at 11am. I will show you the available rooms.",
          status: "responded", date: "2024-06-21T08:00:00Z", responseDate: "2024-06-21T10:15:00Z", readByStudent: false }
    ],

    // ---- Getters with localStorage fallback ----
    get properties() {
        return JSON.parse(localStorage.getItem('rf_properties')) || [...this.defaultProperties];
    },
    set properties(val) {
        localStorage.setItem('rf_properties', JSON.stringify(val));
    },

    get users() {
        return JSON.parse(localStorage.getItem('rf_users')) || [...this.defaultUsers];
    },
    set users(val) {
        localStorage.setItem('rf_users', JSON.stringify(val));
    },

    get inquiries() {
        return JSON.parse(localStorage.getItem('rf_inquiries')) || [...this.defaultInquiries];
    },
    set inquiries(val) {
        localStorage.setItem('rf_inquiries', JSON.stringify(val));
    },

    get wishlist() {
        return JSON.parse(localStorage.getItem('rf_wishlist')) || [];
    },
    set wishlist(val) {
        localStorage.setItem('rf_wishlist', JSON.stringify(val));
    },

    get currentUser() {
        return JSON.parse(localStorage.getItem('rf_currentUser')) || null;
    },
    set currentUser(val) {
        if (val) localStorage.setItem('rf_currentUser', JSON.stringify(val));
        else localStorage.removeItem('rf_currentUser');
    },

    get currentRole() {
        return localStorage.getItem('rf_role') || null;
    },
    set currentRole(val) {
        if (val) localStorage.setItem('rf_role', val);
        else localStorage.removeItem('rf_role');
    },

    // ---- Auth Helpers ----
    findUser(username, password) {
        return this.users.find(u => u.username === username && u.password === password && u.active);
    },

    usernameExists(username) {
        return this.users.some(u => u.username === username);
    },

    addUser(user) {
        const list = this.users;
        list.push(user);
        this.users = list;
    },

    // ---- Property Helpers ----
    addProperty(prop) {
        const list = this.properties;
        list.push(prop);
        this.properties = list;
    },

    updateProperty(id, updates) {
        const list = this.properties;
        const idx = list.findIndex(p => p.id === id);
        if (idx !== -1) {
            list[idx] = { ...list[idx], ...updates };
            this.properties = list;
        }
    },

    deleteProperty(id) {
        this.properties = this.properties.filter(p => p.id !== id);
        this.inquiries = this.inquiries.filter(i => i.propertyId !== id);
        this.wishlist = this.wishlist.filter(w => w !== id);
    },

    // ---- Inquiry Helpers ----
    addInquiry(inquiry) {
        const list = this.inquiries;
        list.push(inquiry);
        this.inquiries = list;
    },

    updateInquiry(id, updates) {
        const list = this.inquiries;
        const idx = list.findIndex(i => i.id === id);
        if (idx !== -1) {
            list[idx] = { ...list[idx], ...updates };
            this.inquiries = list;
        }
    },

    deleteInquiry(id) {
        this.inquiries = this.inquiries.filter(i => i.id !== id);
    },

    getUserInquiries(userId, role) {
        if (role === 'student') {
            return this.inquiries.filter(i => i.studentId === userId);
        } else if (role === 'owner') {
            const myProps = this.properties.filter(p => p.ownerId === userId).map(p => p.id);
            return this.inquiries.filter(i => myProps.includes(i.propertyId));
        }
        return this.inquiries;
    },

    getUnreadCount(userId, role) {
        if (role === 'student') {
            return this.inquiries.filter(i => i.studentId === userId && i.status === 'responded' && !i.readByStudent).length;
        } else if (role === 'owner') {
            const myProps = this.properties.filter(p => p.ownerId === userId).map(p => p.id);
            return this.inquiries.filter(i => myProps.includes(i.propertyId) && i.status === 'new').length;
        }
        return 0;
    },

    reset() {
        localStorage.removeItem('rf_properties');
        localStorage.removeItem('rf_users');
        localStorage.removeItem('rf_inquiries');
        localStorage.removeItem('rf_wishlist');
        localStorage.removeItem('rf_currentUser');
        localStorage.removeItem('rf_role');
        localStorage.removeItem('rf_theme');
    }
};

// ============================================
// AUTH & NAVIGATION
// ============================================

const Auth = {
    login(username, password) {
        const user = DB.findUser(username, password);
        if (!user) return null;
        DB.currentUser = user;
        DB.currentRole = user.role;
        return user;
    },

    register(userData) {
        if (DB.usernameExists(userData.username)) {
            return { success: false, error: 'Username already taken' };
        }
        const newUser = {
            id: Date.now(),
            name: userData.name,
            username: userData.username,
            password: userData.password,
            role: userData.role,
            email: userData.email || '',
            phone: userData.phone || '',
            active: true,
            joined: new Date().toISOString().split('T')[0],
            avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase()
        };
        DB.addUser(newUser);
        DB.currentUser = newUser;
        DB.currentRole = newUser.role;
        return { success: true, user: newUser };
    },

    logout() {
        DB.currentUser = null;
        DB.currentRole = null;
    },

    require(role, redirect = 'index.html') {
        const user = DB.currentUser;
        const currentRole = DB.currentRole;
        if (!user || !currentRole || user.role !== role) {
            window.location.href = redirect;
            return false;
        }
        return true;
    },

    initNav(page) {
        const user = DB.currentUser;
        if (!user) return;
        const roleBadge = document.getElementById('role-indicator');
        if (roleBadge) roleBadge.innerText = user.role.toUpperCase();
        const userName = document.getElementById('nav-user-name');
        if (userName) userName.innerText = user.name;
        const userAvatar = document.getElementById('nav-user-avatar');
        if (userAvatar) userAvatar.innerText = user.avatar || user.name.charAt(0);
    }
};

// ============================================
// UI UTILITIES
// ============================================

const UI = {
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'custom-toast mb-2 animate-slide';
        const icons = {
            success: 'bi-check-circle-fill text-success',
            warning: 'bi-exclamation-triangle-fill text-warning',
            error: 'bi-x-circle-fill text-danger',
            info: 'bi-info-circle-fill text-info'
        };
        const icon = icons[type] || icons.info;
        toast.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <i class="bi ${icon} fs-4"></i>
                <div class="flex-fill">${message}</div>
                <button class="btn btn-sm btn-link text-muted" onclick="this.parentElement.parentElement.remove()">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
        `;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    },

    renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) stars += '<i class="bi bi-star-fill"></i>';
            else if (i === Math.ceil(rating) && rating % 1 !== 0) stars += '<i class="bi bi-star-half"></i>';
            else stars += '<i class="bi bi-star"></i>';
        }
        return stars;
    },

    formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    },

    formatDateTime(dateStr) {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    },

    formatPrice(price) {
        return 'Rs ' + price.toLocaleString('en-IN');
    },

    toggleTheme() {
        const html = document.documentElement;
        const icon = document.getElementById('themeIcon');
        if (html.getAttribute('data-theme') === 'dark') {
            html.removeAttribute('data-theme');
            if (icon) icon.className = 'bi bi-moon-stars';
            localStorage.setItem('rf_theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            if (icon) icon.className = 'bi bi-sun';
            localStorage.setItem('rf_theme', 'dark');
        }
    },

    initTheme() {
        const savedTheme = localStorage.getItem('rf_theme');
        const icon = document.getElementById('themeIcon');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (icon) icon.className = 'bi bi-sun';
        }
    },

    switchTab(tabClass, tabId, btn) {
        document.querySelectorAll('.' + tabClass).forEach(t => t.classList.add('d-none'));
        document.getElementById(tabId).classList.remove('d-none');
        if (btn) {
            const parent = btn.parentElement;
            parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    },

    exportData() {
        const data = {
            properties: DB.properties,
            users: DB.users,
            inquiries: DB.inquiries,
            exportedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'roomfinder-data.json';
        a.click();
        URL.revokeObjectURL(url);
        UI.showToast('Data exported successfully', 'success');
    }
};

// ============================================
// WISHLIST
// ============================================

const Wishlist = {
    isSaved(id) {
        return DB.wishlist.includes(id);
    },

    toggle(id) {
        let list = DB.wishlist;
        if (list.includes(id)) {
            list = list.filter(w => w !== id);
            DB.wishlist = list;
            return false;
        } else {
            list.push(id);
            DB.wishlist = list;
            return true;
        }
    },

    getItems() {
        return DB.properties.filter(p => DB.wishlist.includes(p.id));
    },

    count() {
        return DB.wishlist.length;
    }
};
