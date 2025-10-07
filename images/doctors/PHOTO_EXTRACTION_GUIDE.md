# 📸 Photo Extraction Guide - Centro Médico Universal

## 🎯 Photos to Extract from CleanShot Image

From the uploaded image `1758646765003_CleanShot_2025-09-23_at_12_59_19_2x.png`, you need to extract **2 actual doctor photos**:

### 1. **Dra. Vidalva Decena Medina** (CENTER)
- **Filename:** `vidalva-decena-medina.jpg`
- **Location:** Center card in the uploaded image
- **Current photo:** Professional headshot of woman with dark hair
- **Crop area:** The circular photo area from the center doctor card
- **Used in:** Ginecología y Obstetricia section

### 2. **Dr. Manuel Antonio Castillo Rodríguez** (RIGHT) 
- **Filename:** `manuel-antonio-castillo.jpg`
- **Location:** Right card in the uploaded image
- **Current photo:** Professional photo of older gentleman with gray hair, blue shirt
- **Crop area:** The circular photo area from the right doctor card  
- **Used in:** Especialista en Salud Sexual section

### ❌ **Dr. Castillo Rodríguez** (LEFT)
- **Status:** Uses placeholder icon (not extractable)
- **Currently shows:** Medical emoji/icon, not actual photo
- **Database uses:** `placeholder-male.jpg`

## 🔧 Extraction Instructions

### Method 1: Manual Crop
1. Open the CleanShot image in any photo editor
2. Crop around the circular photo areas for the 2 doctors
3. Save as square images (300x300px recommended)
4. Name exactly as specified above

### Method 2: Screenshot Tool
1. Use screenshot tool to capture just the photo areas
2. Crop to square aspect ratio
3. Save with correct filenames

## 📁 File Placement
Save the extracted photos to:
```
/Users/manuelcastillo/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE/images/doctors/
├── vidalva-decena-medina.jpg     ⭐ EXTRACT FROM CENTER
├── manuel-antonio-castillo.jpg   ⭐ EXTRACT FROM RIGHT
├── placeholder-male.jpg          (create generic icon)
└── placeholder-female.jpg        (create generic icon)
```

## ✅ After Extraction

Once you place these 2 photos in the `/images/doctors/` folder:

1. **Dra. Vidalva Decena Medina** will show her actual photo
2. **Dr. Manuel Antonio Castillo Rodríguez** will show his actual photo
3. All other doctors will show professional medical icons
4. The website will be ready for deployment

## 🚀 Database Status

- ✅ **95+ doctors** loaded in database
- ✅ **Photo paths** correctly configured
- ✅ **2 actual photos** identified for extraction
- ✅ **Placeholder system** working for others
- ✅ **Ready for deployment**

**Next step:** Extract the 2 photos and deploy the complete doctors directory!
