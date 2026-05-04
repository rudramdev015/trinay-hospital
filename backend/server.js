const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const JWT_SECRET = process.env.JWT_SECRET;
const STAFF_JWT_SECRET = process.env.STAFF_JWT_SECRET || JWT_SECRET;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const MONGO_URI = process.env.MONGO_URI;

const ADMIN_EFFECTIVE_HASH =
    ADMIN_PASSWORD_HASH || (ADMIN_PASSWORD ? bcrypt.hashSync(ADMIN_PASSWORD, 10) : null);

const requiredEnv = [
    ["JWT_SECRET", JWT_SECRET],
    ["ADMIN_USERNAME", ADMIN_USERNAME],
    ["ADMIN_PASSWORD or ADMIN_PASSWORD_HASH", ADMIN_EFFECTIVE_HASH],
    ["MONGO_URI", MONGO_URI],
].filter(([, value]) => !value);

if (requiredEnv.length > 0) {
    console.error(
        "Missing required environment variables:",
        requiredEnv.map(([name]) => name).join(", ")
    );
    process.exit(1);
}


// ── Security Middleware ────────────────────────────────────────────────────────

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                "connect-src": ["'self'", "https://trinayhospital.com"],
                "frame-src": ["'self'", "https://www.google.com"],
                "child-src": ["'self'", "https://www.google.com"],
            },
        },
    })
);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api', apiLimiter);


// ── Database ──────────────────────────────────────────────────────────────────

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};


// ── Schemas ───────────────────────────────────────────────────────────────────

const appointmentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: String,
        date: { type: String, required: true },
        time: { type: String, required: true },
        department: { type: String, required: true },
        doctor: String,
        message: String,
        status: { type: String, default: 'pending' },
    },
    { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

const feedbackSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 120 },
        email: { type: String, trim: true, maxlength: 200 },
        phone: { type: String, required: true, trim: true, maxlength: 20 },
        subject: { type: String, required: true, trim: true, maxlength: 200 },
        message: { type: String, required: true, trim: true, maxlength: 2000 },
        showOnTestimonials: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

const staffSchema = new mongoose.Schema(
    {
        employeeId: { type: String, required: true, unique: true, uppercase: true, trim: true },
        name: { type: String, required: true, trim: true, maxlength: 100 },
        pin: { type: String, required: true },
        role: { type: String, required: true, trim: true, maxlength: 80 },
        department: { type: String, trim: true, maxlength: 80, default: 'General' },
        shift: { type: String, enum: ['morning', 'evening', 'night'], default: 'morning' },
        phone: { type: String, trim: true, maxlength: 20, default: '' },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

const attendanceSchema = new mongoose.Schema(
    {
        staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
        employeeId: { type: String, required: true, uppercase: true },
        name: { type: String, required: true },
        date: { type: String, required: true }, // YYYY-MM-DD (IST)
        checkIn: { type: String },   // ISO timestamp
        checkOut: { type: String },  // ISO timestamp
        status: { type: String, enum: ['present', 'late', 'half-day', 'absent'], default: 'absent' },
        hoursWorked: { type: Number, default: 0 },
    },
    { timestamps: true }
);

attendanceSchema.index({ staffId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);


// ── Helpers ───────────────────────────────────────────────────────────────────

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (payload.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

const authenticateStaff = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    try {
        const payload = jwt.verify(token, STAFF_JWT_SECRET);
        if (payload.role !== 'staff') {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        req.staff = payload;
        next();
    } catch {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// Returns current date in IST as YYYY-MM-DD
const getISTDateString = () => {
    const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    return ist.toISOString().slice(0, 10);
};

// Returns IST hours/minutes (UTC+5:30)
const getISTTime = () => {
    const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    return { hours: ist.getUTCHours(), minutes: ist.getUTCMinutes() };
};


// ── API Routes ────────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'ok', hospital: 'Trinay Hospital' });
});


// Admin login
app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    if (
        username === ADMIN_USERNAME &&
        ADMIN_EFFECTIVE_HASH &&
        bcrypt.compareSync(password || '', ADMIN_EFFECTIVE_HASH)
    ) {
        const token = jwt.sign(
            { sub: ADMIN_USERNAME, role: 'admin' },
            JWT_SECRET,
            { expiresIn: '2h' }
        );
        return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
});


// ── Appointment Routes ────────────────────────────────────────────────────────

app.post('/api/appointments', async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/appointments', authenticate, async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json({ success: true, appointments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.patch('/api/appointments/:id', authenticate, async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
        res.json({ success: true, appointment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/appointments/:id', authenticate, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// ── Feedback Routes ───────────────────────────────────────────────────────────

app.post('/api/feedback', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body || {};
        if (!name || !phone || !subject || !message) {
            return res.status(400).json({ success: false, message: 'Name, phone, subject and message are required' });
        }
        const feedback = await Feedback.create({ name, email, phone, subject, message });
        return res.status(201).json({ success: true, feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/feedback', authenticate, async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        return res.json({ success: true, feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Feedback.find({ showOnTestimonials: true })
            .sort({ createdAt: -1 })
            .select('name message createdAt');
        return res.json({ success: true, testimonials });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.patch('/api/feedback/:id/testimonial', authenticate, async (req, res) => {
    try {
        const { showOnTestimonials } = req.body;
        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { showOnTestimonials: Boolean(showOnTestimonials) },
            { new: true, runValidators: true }
        );
        if (!feedback) return res.status(404).json({ success: false, message: 'Feedback not found' });
        return res.json({ success: true, feedback });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/feedback/:id', authenticate, async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// ── Staff Auth Routes ─────────────────────────────────────────────────────────

app.post('/api/staff/login', async (req, res) => {
    try {
        const { employeeId, pin } = req.body || {};
        if (!employeeId || !pin) {
            return res.status(400).json({ success: false, message: 'Employee ID and PIN are required' });
        }

        const staff = await Staff.findOne({
            employeeId: employeeId.toUpperCase().trim(),
            isActive: true,
        });
        if (!staff) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const valid = await bcrypt.compare(String(pin), staff.pin);
        if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign(
            { sub: staff._id, employeeId: staff.employeeId, name: staff.name, role: 'staff' },
            STAFF_JWT_SECRET,
            { expiresIn: '12h' }
        );

        return res.json({
            success: true,
            token,
            staff: {
                _id: staff._id,
                employeeId: staff.employeeId,
                name: staff.name,
                role: staff.role,
                department: staff.department,
                shift: staff.shift,
                phone: staff.phone,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/staff/today', authenticateStaff, async (req, res) => {
    try {
        const today = getISTDateString();
        const attendance = await Attendance.findOne({ staffId: req.staff.sub, date: today });
        return res.json({ success: true, attendance: attendance || null });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/staff/checkin', authenticateStaff, async (req, res) => {
    try {
        const today = getISTDateString();
        const existing = await Attendance.findOne({ staffId: req.staff.sub, date: today });
        if (existing && existing.checkIn) {
            return res.status(409).json({ success: false, message: 'Already checked in today' });
        }

        const now = new Date();
        const { hours, minutes } = getISTTime();
        const isLate = hours > 9 || (hours === 9 && minutes > 30);

        const attendance = await Attendance.findOneAndUpdate(
            { staffId: req.staff.sub, date: today },
            {
                $set: {
                    staffId: req.staff.sub,
                    employeeId: req.staff.employeeId,
                    name: req.staff.name || '',
                    date: today,
                    checkIn: now.toISOString(),
                    status: isLate ? 'late' : 'present',
                },
            },
            { upsert: true, new: true }
        );

        return res.json({ success: true, attendance });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/staff/checkout', authenticateStaff, async (req, res) => {
    try {
        const today = getISTDateString();
        const attendance = await Attendance.findOne({ staffId: req.staff.sub, date: today });

        if (!attendance || !attendance.checkIn) {
            return res.status(400).json({ success: false, message: 'Not checked in yet' });
        }
        if (attendance.checkOut) {
            return res.status(409).json({ success: false, message: 'Already checked out today' });
        }

        const checkOutTime = new Date();
        const checkInTime = new Date(attendance.checkIn);
        const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);

        attendance.checkOut = checkOutTime.toISOString();
        attendance.hoursWorked = Math.round(hoursWorked * 100) / 100;
        if (hoursWorked < 4) attendance.status = 'half-day';
        await attendance.save();

        return res.json({ success: true, attendance });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/staff/attendance', authenticateStaff, async (req, res) => {
    try {
        const records = await Attendance.find({ staffId: req.staff.sub })
            .sort({ date: -1 })
            .limit(30);
        return res.json({ success: true, attendance: records });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


// ── Admin Staff Management Routes ─────────────────────────────────────────────

app.get('/api/admin/staff', authenticate, async (req, res) => {
    try {
        const staff = await Staff.find().sort({ name: 1 }).select('-pin');
        return res.json({ success: true, staff });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/admin/staff', authenticate, async (req, res) => {
    try {
        const { employeeId, name, pin, role, department, shift, phone } = req.body || {};
        if (!employeeId || !name || !pin || !role) {
            return res.status(400).json({ success: false, message: 'Employee ID, name, PIN, and role are required' });
        }
        if (String(pin).length < 4 || String(pin).length > 8) {
            return res.status(400).json({ success: false, message: 'PIN must be 4–8 digits' });
        }

        const hashedPin = await bcrypt.hash(String(pin), 10);
        const staff = await Staff.create({
            employeeId: employeeId.toUpperCase().trim(),
            name: name.trim(),
            pin: hashedPin,
            role: role.trim(),
            department: department?.trim() || 'General',
            shift: shift || 'morning',
            phone: phone?.trim() || '',
        });

        const safeStaff = staff.toObject();
        delete safeStaff.pin;
        return res.status(201).json({ success: true, staff: safeStaff });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: 'Employee ID already exists' });
        }
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.patch('/api/admin/staff/:id', authenticate, async (req, res) => {
    try {
        const { name, role, department, shift, phone, isActive, pin } = req.body || {};
        const update = {};
        if (name !== undefined) update.name = name.trim();
        if (role !== undefined) update.role = role.trim();
        if (department !== undefined) update.department = department.trim();
        if (shift !== undefined) update.shift = shift;
        if (phone !== undefined) update.phone = phone.trim();
        if (isActive !== undefined) update.isActive = Boolean(isActive);
        if (pin) {
            if (String(pin).length < 4 || String(pin).length > 8) {
                return res.status(400).json({ success: false, message: 'PIN must be 4–8 digits' });
            }
            update.pin = await bcrypt.hash(String(pin), 10);
        }

        const staff = await Staff.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).select('-pin');
        if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });
        return res.json({ success: true, staff });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/admin/staff/:id', authenticate, async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Get attendance records — optional ?date=YYYY-MM-DD & ?employeeId=XX
app.get('/api/admin/attendance', authenticate, async (req, res) => {
    try {
        const { date, employeeId } = req.query;
        const query = {};
        if (date) query.date = date;
        if (employeeId) query.employeeId = employeeId.toUpperCase();
        const records = await Attendance.find(query).sort({ date: -1, checkIn: -1 }).limit(500);
        return res.json({ success: true, attendance: records });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/attendance/today', authenticate, async (req, res) => {
    try {
        const today = getISTDateString();
        const records = await Attendance.find({ date: today }).sort({ checkIn: 1 });
        return res.json({ success: true, date: today, attendance: records });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


// ── Serve Frontend ────────────────────────────────────────────────────────────

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


// ── Start Server ──────────────────────────────────────────────────────────────

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Trinay Hospital server running on port ${PORT}`);
    });
});
