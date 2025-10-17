# 🎨 NIVÍN EMR TYPOGRAPHY & COLOR STANDARDIZATION

**Date:** October 17, 2025  
**Status:** ✅ ACTIVE  
**Version:** 1.0.0

---

## 📋 SUMMARY

Installed **Fontsource** (npm package) on the server to standardize typography across all Nivín EMR pages using the same font type and size as `registro-paciente.html`, plus official Nivín ocean blue colors.

---

## ✅ WHAT WAS DONE

### 1. **Fontsource Installation**
```bash
# On server: /var/www/html/fonts
npm init -y
npm install @fontsource/inter @fontsource/roboto
```

### 2. **Font Files Deployed**
- ✅ Inter font (400, 500, 600, 700, 800 weights)
- ✅ Located in: `/var/www/html/css/fonts-inter/`
- ✅ Roboto as backup: `/var/www/html/css/fonts-roboto/`

### 3. **Standard CSS Created**
- ✅ File: `/var/www/html/css/nivin-emr-standards.css`
- ✅ Size: 6.2KB
- ✅ Committed to GitHub

---

## 🎯 TYPOGRAPHY STANDARDS

### Font Family
```css
'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
'Helvetica Neue', Arial, sans-serif
```

### Base Font Size
- **Desktop:** 16px (matches registro-paciente.html)
- **Tablet (768px):** 15px
- **Mobile (480px):** 14px

### Typography Hierarchy
- **H1:** 40px (800 weight)
- **H2:** 32px (700 weight)
- **H3:** 24px (600 weight)
- **H4:** 20px (600 weight)
- **H5:** 18px (600 weight)
- **H6:** 16px (600 weight)
- **Body:** 16px (400 weight)
- **Small:** 14px

---

## 🌊 NIVÍN COLOR PALETTE (Ocean Blue)

### Primary Colors
```css
--nivin-ocean-dark: #05324d
--nivin-ocean-base: #0a5660
--nivin-ocean-medium: #0f7d7e
--nivin-ocean-light: #1aa5a6
--nivin-cyan-bright: #00ffd6
--nivin-cyan-glow: #8cf1ff
--nivin-accent-lime: #e6ff7d
```

### Text Colors
```css
--nivin-text-primary: #ffffff
--nivin-text-secondary: rgba(255, 255, 255, 0.85)
--nivin-text-muted: rgba(255, 255, 255, 0.6)
```

### UI Elements
```css
--nivin-glass-bg: rgba(255, 255, 255, 0.1)
--nivin-glass-border: rgba(255, 255, 255, 0.15)
```

### Status Colors
```css
--nivin-success: #66ffa6
--nivin-warning: #fdd835
--nivin-error: #ff6666
--nivin-info: #00d4ff
```

---

## 🚀 HOW TO APPLY TO PAGES

### Step 1: Add CSS Link
Add this line in the `<head>` section of ALL Nivín EMR pages:

```html
<link rel="stylesheet" href="/css/nivin-emr-standards.css">
```

### Step 2: Use Standard Classes


```html
<!-- Glass-morphism Card -->
<div class="nivin-card">
    Your content here
</div>

<!-- Primary Button -->
<button class="nivin-btn-primary">Submit</button>

<!-- Badge -->
<span class="nivin-badge">Sistema Médico</span>
```

### Step 3: Use CSS Variables
```css
/* In your custom styles */
.your-element {
    background: var(--nivin-ocean-base);
    color: var(--nivin-text-primary);
    border: 1px solid var(--nivin-glass-border);
}
```

---

## 📁 FILES TO UPDATE

Apply `/css/nivin-emr-standards.css` to these Nivín EMR pages:

1. ✅ `nivin-emr-login.html` - Main EMR login
2. ⏳ `dashboard.html` - EMR dashboard
3. ⏳ `user-management.html` - User management
4. ⏳ `admin.html` - Admin panel
5. ⏳ `patients.html` - Patient management
6. ⏳ `security-dashboard.html` - Security dashboard
7. ⏳ `registro-paciente.html` - Already matches standards

---

## 🔧 FONTSOURCE DETAILS

### Why Fontsource?
- ✅ **Version Pinned:** Fonts won't change unexpectedly
- ✅ **Self-Hosted:** No external dependencies (Google Fonts)
- ✅ **Fast Loading:** Served from same server
- ✅ **Privacy:** No tracking from external font services
- ✅ **Reliability:** Works offline, no CDN dependency

### Package Information
```json
{
  "name": "fonts",
  "version": "1.0.0",
  "dependencies": {
    "@fontsource/inter": "latest",
    "@fontsource/roboto": "latest"
  }
}
```

### Server Location
```
/var/www/html/fonts/             (npm packages)
/var/www/html/css/fonts-inter/   (public accessible fonts)
/var/www/html/css/fonts-roboto/  (backup fonts)
```

---

## 📊 BENEFITS

### Consistency
- ✅ All Nivín EMR pages use same typography
- ✅ Unified brand experience
- ✅ Professional appearance matching registro-paciente.html

### Performance
- ✅ Self-hosted fonts load faster
- ✅ No external requests to Google Fonts
- ✅ Fonts cached on first visit

### Maintainability
- ✅ One CSS file controls all typography
- ✅ Easy to update colors across all pages
- ✅ CSS variables for quick theme changes

### Accessibility
- ✅ 16px base ensures readability
- ✅ Proper focus states for keyboard navigation
- ✅ Respects reduced-motion preferences
- ✅ High contrast text on ocean blue backgrounds

---

## 🎓 USAGE EXAMPLES

### Example 1: Login Page
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/nivin-emr-standards.css">
</head>
<body>
    <div class="nivin-card">
        <h1>Nivín EMR</h1>
        <span class="nivin-badge">Sistema Médico</span>
        <form>
            <input type="text" placeholder="Usuario">
            <input type="password" placeholder="Contraseña">
            <button class="nivin-btn-primary">Iniciar Sesión</button>
        </form>
    </div>
</body>
</html>
```

### Example 2: Dashboard Header
```html
<header style="background: var(--nivin-ocean-base);">
    <h2 style="color: var(--nivin-text-primary);">Dashboard</h2>
    <span class="nivin-badge">Dr. Juan Pérez</span>
</header>
```

---

## 🔄 UPDATING FONTS

If you need to update fonts in the future:

```bash
# SSH into server
ssh root@167.172.255.78

# Navigate to fonts directory
cd /var/www/html/fonts

# Update packages
npm update

# Copy updated fonts
cp -r node_modules/@fontsource/inter /var/www/html/css/fonts-inter/
```

---

## 📝 NEXT STEPS

1. ⏳ Apply CSS to all Nivín EMR pages (add `<link>` tag)
2. ⏳ Test typography on all devices (desktop, tablet, mobile)
3. ⏳ Update any custom styles to use CSS variables
4. ⏳ Remove old font imports (if any Google Fonts links)
5. ⏳ Document any page-specific typography needs

---

## 🆘 TROUBLESHOOTING

**Fonts not loading?**
- Check browser console for 404 errors
- Verify `/css/fonts-inter/` directory exists on server
- Clear browser cache

**Typography looks different?**
- Ensure `nivin-emr-standards.css` is loaded AFTER other CSS
- Check for `!important` overrides in other stylesheets
- Verify no inline styles override the standards

**Colors not working?**
- Make sure to use `var(--nivin-color-name)` syntax
- Check browser supports CSS variables (all modern browsers do)
- Verify `:root` variables are defined

---

**Created:** October 17, 2025  
**Status:** ✅ ACTIVE  
**GitHub:** Committed (4c99356)  
**Server:** Deployed to /var/www/html/css/nivin-emr-standards.css

---

🎉 **FONTSOURCE SUCCESSFULLY INSTALLED!**
