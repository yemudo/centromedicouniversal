# Centro Médico Universal - Sistema Integrado

🏥 **Professional Medical Center Website + Nivín EMR System**

---

## 🌐 Production System

**Live Site:** https://centromedicouniversal.com

**Server:** DigitalOcean Droplet
- **IP:** 167.172.255.78
- **OS:** Ubuntu 24
- **Stack:** Docker, Nginx, MySQL, PHP

**Domain:** Cloudflare DNS Management
- **Nameservers:** aarav.ns.cloudflare.com, barbara.ns.cloudflare.com
- **SSL:** Let's Encrypt (Auto-renew)

---

## 🎯 System Components

### 1. **Public Website** (Spanish)
- Homepage with services overview
- Doctor directory (100+ physicians)
- Online appointment booking
- Contact forms
- Facilities & diagnostic imaging
- Insurance provider information
- Mobile-responsive design

### 2. **Nivín EMR (Electronic Medical Records)**
- Employee portal (doctors, nurses, receptionists, billing)
- Patient management system
- Appointment scheduling with calendar
- User management with role-based access
- Password reset system
- Real-time notifications (SMS/WhatsApp)

### 3. **Nivín AI Chatbot** (Google Gemini Pro)
- Patient symptom assessment
- Appointment booking assistance
- Emergency triage
- Complaint handling
- WhatsApp integration

### 4. **Security Features**
- HIPAA-compliant architecture
- Role-based access control (6 roles)
- Secure authentication system
- Encrypted password storage
- Account lockout protection
- Session management
- Forced password change on first login

---

## 🔧 Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design (mobile-first)
- Progressive Web App (PWA) ready
- Service Worker for offline capability

### Backend
- PHP 8.x
- MySQL 8.0 (Docker container)
- RESTful APIs

### AI Integration
- Google Gemini Pro API
- Natural language processing
- Symptom mapping & triage

### Communication
- Twilio (SMS notifications)
- WhatsApp Business API
- SendGrid (Email - in setup)

### Infrastructure
- Docker containers
- Nginx web server
- DigitalOcean hosting
- Cloudflare CDN & DNS
- Automated daily backups

---

## 📁 Project Structure

```
01_WEBSITE/
├── index.html              # Homepage
├── servicios.html          # Services page
├── doctores.html           # Doctor directory
├── contacto.html           # Contact page
├── instalaciones.html      # Facilities
├── diagnostico-imagenes.html # Diagnostic imaging
├── booking.html            # Appointment booking
├── employee-portal.html    # EMR login
├── dashboard.html          # EMR dashboard
├── user-management.html    # Admin panel
├── css/
│   ├── styles.css          # Main stylesheet
│   └── mobile-responsive.css
├── js/
│   ├── main.js             # Core functionality
│   ├── booking-system.js   # Appointment booking
│   ├── gemini-integration.js # Nivín AI
│   └── mobile-enhancements.js
├── api/
│   ├── booking.php         # Booking API
│   ├── calendar-api.php    # Calendar integration
│   └── password-reset-api.php
├── images/
│   ├── logo/               # CMU & Nivín logos
│   ├── doctors/            # Doctor photos
│   └── insurance/          # Insurance logos
└── netlify/functions/      # Serverless functions
```

---

## 🚀 Deployment Process

### Automated Deployment to DigitalOcean

```bash
# SSH into server
ssh -i ~/Desktop/CENTRO_MEDICO_UNIVERSAL/DIGITALOCEAN_KEYS/digitalocean-ssh-key root@167.172.255.78

# Navigate to website directory
cd /var/www/centromedicouniversal

# Pull latest changes
git pull origin main

# Restart services if needed
docker-compose restart

# Clear cache
./clear-cache-SAFE.sh
```

### Manual File Transfer (Alternative)

```bash
# From local machine
scp -i ~/Desktop/CENTRO_MEDICO_UNIVERSAL/DIGITALOCEAN_KEYS/digitalocean-ssh-key -r 01_WEBSITE/* root@167.172.255.78:/var/www/centromedicouniversal/
```

---

## 🔐 Security & Credentials

⚠️ **IMPORTANT:** All credentials are stored locally in:
- `~/Desktop/CENTRO_MEDICO_UNIVERSAL/CREDENTIALS/`

**Never commit:**
- API keys
- Database passwords
- SSH keys
- Authentication tokens

All sensitive files are protected by `.gitignore`

---

## 📊 Database Schema

### Main Tables
- `users` - Employee accounts & authentication
- `doctors` - Physician directory (100+ entries)
- `appointments` - Appointment scheduling
- `patients` - Patient records
- `schedules` - Doctor availability
- `complaints` - Patient complaints & feedback

### Security Tables
- `password_resets` - Password reset tokens
- `login_attempts` - Failed login tracking
- `sessions` - Active user sessions

---

## 🎨 Branding Guidelines

### Centro Médico Universal
- **Logo:** Circular official logo (images/logo/cmu-official-logo.png)
- **Colors:** 
  - Primary Green: #2E7D32
  - Dark Green: #1B5E20
  - White: #FFFFFF

### Nivín EMR
- **Logo:** Blue tech-focused branding
- **Colors:**
  - Primary Blue: #1976D2
  - Dark Blue: #0D47A1
  - White: #FFFFFF

**RULE:** Use official logos on ALL pages - no cartoons, no icons.

---

## 📱 Mobile Optimization

✅ **Fully Responsive Design**
- iPhone & Android optimized
- Touch-friendly interface
- Fast loading times (<2 seconds)
- Progressive Web App (PWA) features
- Offline capability (service worker)

---

## 🧪 Testing

### Test Accounts (Development Only)
- Super Admin: admin@centromedicouniversal.com
- Doctor: doctor@centromedicouniversal.com
- Receptionist: reception@centromedicouniversal.com

**Note:** Test accounts use lastname "TEST" - never use in production!

---

## 📞 API Integrations

### Twilio (SMS/WhatsApp)
- Purpose: Appointment reminders, emergency notifications
- Configuration: See `api/config.php` (not committed to Git)

### Google Gemini Pro (AI)
- Model: gemini-pro
- Purpose: Nivín chatbot, symptom assessment
- Configuration: See `api/config.php` (not committed to Git)

### SendGrid (Email)
- Purpose: Password resets, notifications
- Configuration: See `api/config.php` (not committed to Git)

---

## 🔄 Backup Strategy

- **Automated Daily Backups:** DigitalOcean automatic snapshots
- **Local Backups:** ~/Desktop/CENTRO_MEDICO_UNIVERSAL/04_BACKUPS/
- **Database Dumps:** Daily MySQL exports
- **Git Version Control:** All code changes tracked

---

## 📈 Future Enhancements

- [ ] Telemedicine video consultations
- [ ] Patient mobile app (iOS/Android)
- [ ] Pharmacy integration
- [ ] Lab results portal
- [ ] Billing system integration
- [ ] Multi-language support (English/Creole)
- [ ] Advanced analytics dashboard

---

## 🏗️ Development Guidelines

### Code Standards
1. **Spanish-first:** All UI text in Spanish
2. **No fake data:** Use real information only
3. **Mobile-first:** Design for phones first
4. **HIPAA compliance:** Follow all security protocols
5. **Test thoroughly:** Check on real devices

### Git Workflow
1. Always work in feature branches
2. Test changes locally before commit
3. Use descriptive commit messages
4. Document all changes in CHANGELOG
5. Never commit credentials or keys

### File Organization
- Keep files organized by type (css/, js/, api/)
- Use descriptive file names
- Document all custom functions
- Maintain consistent code formatting

---

## 🆘 Support & Troubleshooting

### Common Issues

**Issue:** Website not loading
- **Solution:** Check DigitalOcean server status, verify DNS

**Issue:** Nivín AI not responding
- **Solution:** Check Gemini Pro API key, verify endpoint

**Issue:** SMS not sending
- **Solution:** Verify Twilio credits, check phone numbers

**Issue:** Login not working
- **Solution:** Clear browser cache, check MySQL connection

---

## 📝 Documentation

Full documentation available in:
- `/02_DOCUMENTATION/` - Technical docs
- `/CREDENTIALS/` - API keys & credentials (local only)
- `SYSTEM_MASTER_REFERENCE.md` - Complete system overview

---

## 👥 Team

**Development:** Nivín Clinical IT Solutions LLC
**Owner:** Centro Médico Universal
**Location:** Dominican Republic

---

## 📄 License

Proprietary - Centro Médico Universal
All rights reserved.

---

**Last Updated:** October 7, 2025
**Version:** 1.0.0 Production
**Status:** ✅ Live & Operational
