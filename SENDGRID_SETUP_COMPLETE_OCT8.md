# 📧 SENDGRID DNS SETUP - COMPLETE GUIDE
## Centro Médico Universal
**Date:** October 8, 2025 | **Status:** ✅ WORKING

---

## ✅ DNS RECORDS SUCCESSFULLY ADDED TO CLOUDFLARE

### **What Was Configured:**

**SendGrid Domain Authentication for:** centromedicouniversal.com

**4 DNS Records Added:**
1. ✅ `em7653` → CNAME → `u56575303.wl054.sendgrid.net`
2. ✅ `s1._domainkey` → CNAME → `s1.domainkey.u56575303.wl054.sendgrid.net`
3. ✅ `s2._domainkey` → CNAME → `s2.domainkey.u56575303.wl054.sendgrid.net`
4. ✅ `_dmarc` → TXT → `"v=DMARC1; p=none;"`

**Status:** All records imported successfully to Cloudflare

---

## 🎯 CRITICAL: CLOUDFLARE IMPORT FILE FORMAT

### **THE ONLY FORMAT THAT WORKS:**

**File Format:** Plain text with TABS (not commas) between fields

**Working Example:**
```
; DNS Records for SendGrid - centromedicouniversal.com
; Created: October 8, 2025

; ========================================
; SENDGRID EMAIL RECORDS
; ========================================
em7653	CNAME	u56575303.wl054.sendgrid.net
s1._domainkey	CNAME	s1.domainkey.u56575303.wl054.sendgrid.net
s2._domainkey	CNAME	s2.domainkey.u56575303.wl054.sendgrid.net
_dmarc	TXT	"v=DMARC1; p=none;"
```

**Key Points:**
- ✅ Use TABS between fields (not commas, not spaces)
- ✅ Comments start with semicolon (;)
- ✅ TXT records need quotes: `"value"`
- ✅ No TTL or proxy columns needed
- ❌ CSV format does NOT work (we tried multiple times)

---

## 🚨 FORMATS THAT DON'T WORK (TRIED AND FAILED)

**CSV Format (FAILED):**
```
em7653,CNAME,u56575303.wl054.sendgrid.net,1,false
```
**Error:** "dns: not a TTL"

**CSV with Auto TTL (FAILED):**
```
em7653,CNAME,u56575303.wl054.sendgrid.net,Auto
```
**Error:** "dns: not a TTL"

**CSV with 3600 TTL (FAILED):**
```
em7653,CNAME,u56575303.wl054.sendgrid.net,3600,false
```
**Error:** "dns: not a TTL"

**Simple CSV (FAILED):**
```
em7653,CNAME,u56575303.wl054.sendgrid.net
```
**Error:** "dns: not a TTL"

**CSV with Quotes (FAILED):**
```
"em7653","CNAME","u56575303.wl054.sendgrid.net","1","false"
```
**Error:** "dns: not a TTL"

### **LESSON LEARNED:**
Cloudflare import ONLY accepts TAB-delimited format, NOT CSV!

---

## 📁 WORKING FILE LOCATIONS

### **Original Working File (Full DNS):**
```
/Desktop/CENTRO_MEDICO_UNIVERSAL/cloudflare_dns_import.txt
```
This file worked and was used as the template.

### **SendGrid-Only File (Today):**
```
/Desktop/CENTRO_MEDICO_UNIVERSAL/sendgrid_dns_import.txt
```
Created using the same TAB-delimited format.

---

## 📋 SENDGRID ACCOUNT INFO

### **Account Details:**
- **Email:** nuelcastillo@centromedicouniversal.com (or theyemudo@gmail.com)
- **Domain Authenticated:** centromedicouniversal.com
- **Status:** Pending verification (need to verify in SendGrid dashboard)

### **DNS Records Configured:**
- **em7653:** Mail subdomain (CNAME)
- **s1._domainkey:** DKIM key 1 (CNAME)
- **s2._domainkey:** DKIM key 2 (CNAME)
- **_dmarc:** DMARC policy (TXT)

---

## 🔄 NEXT STEPS (TO COMPLETE SETUP)

### **Step 1: Verify Domain in SendGrid**
1. **Login to SendGrid:** https://app.sendgrid.com
2. **Go to:** Settings → Sender Authentication
3. **Find:** centromedicouniversal.com
4. **Click:** "Verify" button
5. **Wait:** 5-10 seconds for verification
6. **Confirm:** Should show ✅ "Verified"

### **Step 2: Create API Key**
1. **Go to:** Settings → API Keys
2. **Click:** "Create API Key"
3. **Name:** "Nivin EMR Password Reset"
4. **Permissions:** Full Access (or Mail Send)
5. **Copy:** The API key (starts with `SG.`)
6. **Save it:** You can only see it once!

### **Step 3: Add API Key to Server**
```bash
# SSH into server
ssh -i ~/Desktop/CENTRO_MEDICO_UNIVERSAL/DIGITALOCEAN_KEYS/digitalocean-ssh-key root@167.172.255.78

# Edit config file
nano /var/www/html/api/config.php

# Add or update this line:
define('SENDGRID_API_KEY', 'SG.xxxxxxxxxxxxxxxxxxxxxxxxx');

# Save and exit (Ctrl+O, Enter, Ctrl+X)

# Restart Apache
systemctl restart apache2
```

### **Step 4: Test Email System**
```bash
# Test password reset email
curl -X POST https://centromedicouniversal.com/password-reset-api.php \
  -d "action=request_reset&username=nuelcastillo"
```

**Expected Result:**
```json
{
  "success": true,
  "email_sent": true,
  "message": "Reset code sent to email"
}
```

---

## 📊 CURRENT STATUS

### **Completed:**
- ✅ DNS records added to Cloudflare
- ✅ Records using correct format (TAB-delimited)
- ✅ All 4 SendGrid records configured
- ✅ Domain authentication set up

### **Pending:**
- ⏳ Verify domain in SendGrid dashboard
- ⏳ Create SendGrid API key
- ⏳ Add API key to server config
- ⏳ Test password reset emails

---

## 🎓 LESSONS LEARNED

### **For Future DNS Imports:**
1. **ALWAYS use TAB-delimited format** for Cloudflare
2. **NEVER use CSV format** - it doesn't work
3. **Use the template** from `cloudflare_dns_import.txt`
4. **Comments with semicolons** are okay and helpful
5. **TXT records need quotes** around the value
6. **No TTL or proxy columns** needed in import file

### **What Took Time:**
- Tried 6+ different CSV formats - all failed
- Error message "dns: not a TTL" was misleading
- Solution was using TAB-delimited format from previous working file
- Total time wasted on CSV attempts: ~20 minutes
- TAB format worked immediately

---

## 📝 TEMPLATE FOR FUTURE DNS IMPORTS

**File:** `dns_import_template.txt`

```
; DNS Records for [DOMAIN]
; Created: [DATE]

; ========================================
; RECORD TYPE 1
; ========================================
[NAME]	[TYPE]	[VALUE]

; ========================================
; RECORD TYPE 2
; ========================================
[NAME]	[TYPE]	"[VALUE]"
```

**Replace:**
- `[DOMAIN]` with actual domain
- `[DATE]` with current date
- `[NAME]` with record name (@ for root, subdomain, etc.)
- `[TYPE]` with A, CNAME, TXT, MX, etc.
- `[VALUE]` with target/content (quotes for TXT records)

**Critical:** Use TAB character between fields!

---

## 🚀 READY FOR COMPLETION

All DNS records are configured correctly. Next time you work on this:
1. Open SendGrid dashboard
2. Verify the domain
3. Create API key
4. Add to server
5. Test emails

**Everything is ready!** ✅

---

## 📞 SUPPORT CONTACTS

**SendGrid Support:** https://support.sendgrid.com
**Cloudflare Support:** https://dash.cloudflare.com/support

---

**Document Created:** October 8, 2025, 11:41 PM EST
**Status:** DNS Configuration Complete - Ready for SendGrid Verification