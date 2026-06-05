const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ── Email Transporter ─────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const NOTIFY_EMAIL = 'info@trinay.in';

async function sendAppointmentEmail(appt) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
    try {
        await transporter.sendMail({
            from: `"Trinay Hospital Website" <${process.env.SMTP_USER}>`,
            to: NOTIFY_EMAIL,
            subject: `New Appointment Request — ${appt.name}`,
            html: `
                <h2 style="color:#003366">New Appointment Request</h2>
                <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${appt.name || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${appt.phone || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${appt.email || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Department</td><td style="padding:8px;border:1px solid #ddd">${appt.department || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Doctor</td><td style="padding:8px;border:1px solid #ddd">${appt.doctor || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date</td><td style="padding:8px;border:1px solid #ddd">${appt.date || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Time</td><td style="padding:8px;border:1px solid #ddd">${appt.time || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${appt.message || '—'}</td></tr>
                </table>
                <p style="color:#666;margin-top:16px">Submitted via trinay-hospital.vercel.app</p>
            `,
        });
    } catch (e) { console.error('Email send error:', e.message); }
}

async function sendFeedbackEmail(fb) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
    try {
        await transporter.sendMail({
            from: `"Trinay Hospital Website" <${process.env.SMTP_USER}>`,
            to: NOTIFY_EMAIL,
            subject: `New Contact/Feedback — ${fb.name}`,
            html: `
                <h2 style="color:#003366">New Contact Form Submission</h2>
                <table style="border-collapse:collapse;width:100%;font-family:sans-serif">
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${fb.name || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${fb.phone || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${fb.email || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Subject</td><td style="padding:8px;border:1px solid #ddd">${fb.subject || '—'}</td></tr>
                    <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${fb.message || '—'}</td></tr>
                </table>
                <p style="color:#666;margin-top:16px">Submitted via trinay-hospital.vercel.app</p>
            `,
        });
    } catch (e) { console.error('Email send error:', e.message); }
}

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
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true, limit: '8mb' }));

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

const dynamicDoctorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        designation: { type: String, required: true, trim: true, default: 'CONSULTANT' },
        dept: { type: String, required: true, trim: true },
        qualification: { type: String, required: true, trim: true },
        timing: { type: String, required: true, trim: true },
        experience: { type: Number, required: true },
        camp: { type: String, default: '', trim: true },
        bio: { type: String, default: '', trim: true },
        expertise: [{ type: String, trim: true }],
        photo: { type: String, default: '' }, // base64 data URL
        staticId: { type: Number, default: null }, // numeric ID of static doctor this overrides
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const DynamicDoctor = mongoose.model('DynamicDoctor', dynamicDoctorSchema);

const heroMediaSchema = new mongoose.Schema(
    {
        type: { type: String, enum: ['image', 'video'], required: true },
        screenType: { type: String, enum: ['desktop', 'mobile', 'both'], default: 'both' },
        // base64 data URL for uploaded images; empty for video URL entries
        data: { type: String, default: '' },
        // external video URL (YouTube, CDN, Google Drive direct link, etc.)
        url: { type: String, default: '' },
        mimeType: { type: String, default: '' },
        label: { type: String, default: '', trim: true, maxlength: 120 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const HeroMedia = mongoose.model('HeroMedia', heroMediaSchema);


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
        sendAppointmentEmail(appointment).catch(() => {});
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
        sendFeedbackEmail({ name, email, phone, subject, message }).catch(() => {});
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


// ── Dynamic Doctor Routes ─────────────────────────────────────────────────────

app.get('/api/doctors/dynamic', async (req, res) => {
    try {
        const doctors = await DynamicDoctor.find({ isActive: true }).sort({ name: 1 });
        return res.json({ success: true, doctors });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/doctors/dynamic/:id', async (req, res) => {
    try {
        const doctor = await DynamicDoctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
        return res.json({ success: true, doctor });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/doctors', authenticate, async (req, res) => {
    try {
        const doctors = await DynamicDoctor.find().sort({ name: 1 }).select('-photo');
        return res.json({ success: true, doctors });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/admin/doctors', authenticate, async (req, res) => {
    try {
        const { name, designation, dept, qualification, timing, experience, camp, bio, expertise, photo } = req.body || {};
        if (!name || !dept || !qualification || !timing || !experience) {
            return res.status(400).json({ success: false, message: 'Name, department, qualification, timing and experience are required' });
        }
        const doctor = await DynamicDoctor.create({
            name: name.trim().toUpperCase(),
            designation: (designation || 'CONSULTANT').trim().toUpperCase(),
            dept: dept.trim().toUpperCase(),
            qualification: qualification.trim().toUpperCase(),
            timing: timing.trim(),
            experience: Number(experience),
            camp: camp?.trim() || '',
            bio: bio?.trim() || '',
            expertise: Array.isArray(expertise) ? expertise.filter(Boolean) : [],
            photo: photo || '',
        });
        return res.status(201).json({ success: true, doctor });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/admin/doctors/:id', authenticate, async (req, res) => {
    try {
        const doctor = await DynamicDoctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
        return res.json({ success: true, doctor });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.patch('/api/admin/doctors/:id', authenticate, async (req, res) => {
    try {
        const update = {};
        const fields = ['name', 'designation', 'dept', 'qualification', 'timing', 'experience', 'camp', 'bio', 'expertise', 'photo', 'isActive'];
        for (const f of fields) {
            if (req.body[f] !== undefined) update[f] = req.body[f];
        }
        if (update.name) update.name = String(update.name).trim().toUpperCase();
        if (update.designation) update.designation = String(update.designation).trim().toUpperCase();
        if (update.dept) update.dept = String(update.dept).trim().toUpperCase();
        if (update.qualification) update.qualification = String(update.qualification).trim().toUpperCase();
        const doctor = await DynamicDoctor.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
        return res.json({ success: true, doctor });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/admin/doctors/:id', authenticate, async (req, res) => {
    try {
        await DynamicDoctor.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});


// ── Hero Media Routes ─────────────────────────────────────────────────────────

// Public: returns all active hero media items (no base64 data, just metadata + url)
app.get('/api/hero-media', async (req, res) => {
    try {
        const items = await HeroMedia.find({ isActive: true }).sort({ updatedAt: -1 });
        return res.json({ success: true, heroMedia: items });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Admin: list all hero media (including inactive), without base64 data
app.get('/api/admin/hero-media', authenticate, async (req, res) => {
    try {
        const items = await HeroMedia.find().sort({ updatedAt: -1 }).select('-data');
        return res.json({ success: true, heroMedia: items });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Admin: upload new hero media (larger body limit handled inline)
app.post('/api/admin/hero-media', authenticate, express.json({ limit: '15mb' }), async (req, res) => {
    try {
        const { type, screenType, data, url, mimeType, label } = req.body || {};
        if (!type || !['image', 'video'].includes(type)) {
            return res.status(400).json({ success: false, message: 'type must be "image" or "video"' });
        }
        if (type === 'image' && !data) {
            return res.status(400).json({ success: false, message: 'Image data (base64) is required' });
        }
        if (type === 'video' && !url) {
            return res.status(400).json({ success: false, message: 'Video URL is required' });
        }
        const item = await HeroMedia.create({
            type,
            screenType: screenType || 'both',
            data: type === 'image' ? (data || '') : '',
            url: type === 'video' ? (url || '') : '',
            mimeType: mimeType || '',
            label: label?.trim() || '',
            isActive: true,
        });
        return res.status(201).json({ success: true, heroMedia: { ...item.toObject(), data: undefined } });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Admin: toggle active / update label / screenType
app.patch('/api/admin/hero-media/:id', authenticate, async (req, res) => {
    try {
        const { isActive, label, screenType } = req.body || {};
        const update = {};
        if (isActive !== undefined) update.isActive = Boolean(isActive);
        if (label !== undefined) update.label = String(label).trim();
        if (screenType !== undefined) update.screenType = screenType;
        const item = await HeroMedia.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).select('-data');
        if (!item) return res.status(404).json({ success: false, message: 'Hero media not found' });
        return res.json({ success: true, heroMedia: item });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Admin: delete hero media
app.delete('/api/admin/hero-media/:id', authenticate, async (req, res) => {
    try {
        await HeroMedia.findByIdAndDelete(req.params.id);
        return res.json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Public: get the active hero image/video data by id (for rendering)
app.get('/api/hero-media/:id/data', async (req, res) => {
    try {
        const item = await HeroMedia.findById(req.params.id);
        if (!item || !item.isActive) return res.status(404).json({ success: false, message: 'Not found' });
        return res.json({ success: true, data: item.data, url: item.url, type: item.type, mimeType: item.mimeType });
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
