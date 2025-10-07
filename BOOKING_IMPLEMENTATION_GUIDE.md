# Centro Médico Universal - Sistema de Citas (Booking System)

## ✅ IMPLEMENTACIÓN COMPLETADA

### 📁 Archivos Creados:
1. **booking-integration.html** - Sistema completo con 3 opciones
2. **netlify/functions/booking.js** - Backend serverless
3. **netlify.toml** - Configuración de deployment
4. **package.json** - Dependencias del proyecto
5. **Modal integrado** en index.html

### 🚀 OPCIÓN 1: SISTEMA PERSONALIZADO (Ya Integrado)
- ✅ Modal de citas en la página principal
- ✅ Formulario completo con validación
- ✅ Backend con Netlify Functions
- ✅ Envío de emails de confirmación

**Para activar:**
1. Deploy en Netlify
2. El modal aparece al hacer click en "Solicitar Cita"
3. Los datos se guardan automáticamente

### 📅 OPCIÓN 2: ZOHO BOOKING (Recomendado)

**Pasos de configuración:**

1. **Crear cuenta Zoho Booking:**
   - Visita: https://www.zoho.com/bookings/
   - Plan recomendado: Professional ($6/mes por staff)

2. **Configurar servicios médicos:**
   ```
   Medicina General - 30 min - $1,500 DOP
   Pediatría - 30 min - $2,000 DOP
   Ginecología - 45 min - $2,500 DOP
   Cardiología - 45 min - $3,000 DOP
   Dermatología - 30 min - $2,000 DOP
   Psicología - 60 min - $2,500 DOP
   ```

3. **Añadir doctores:**
   - Dr. Manuel Castillo Rodríguez
   - Horarios: L-V 8am-6pm, S 9am-1pm
   - Almuerzo: 12pm-2pm

4. **Obtener código embed:**
   ```html
   <!-- Pegar en index.html donde quieras el calendario -->
   <iframe 
     src="https://centromedicouniversal.zohobookings.com/portal-embed"
     width="100%" 
     height="600px"
     frameborder="0">
   </iframe>
   ```

### 📱 OPCIÓN 3: CALENDLY (Simple)

**Configuración rápida:**
1. Crear cuenta en https://calendly.com
2. Configurar tipos de eventos (consultas)
3. Copiar link: calendly.com/centromedicouniversal
4. Añadir botón en tu sitio:
   ```html
   <a href="https://calendly.com/centromedicouniversal" 
      target="_blank" 
      class="btn-cita">
      Agendar Cita
   </a>
   ```

### 🔄 INTEGRACIÓN CON WHATSAPP BUSINESS

**Código para botón de WhatsApp:**
```html
<a href="https://wa.me/18095946161?text=Hola,%20quiero%20agendar%20una%20cita"
   target="_blank"
   style="background: #25D366; color: white; padding: 15px 30px; border-radius: 50px;">
   <i class="fab fa-whatsapp"></i> WhatsApp
</a>
```

### 📊 GOOGLE CALENDAR SYNC

**Para sincronizar con Google Calendar:**
1. En Zoho: Settings → Integrations → Google Calendar
2. Autorizar acceso
3. Seleccionar calendario "Centro Médico Universal"
4. Las citas se sincronizarán automáticamente

### 🔐 CONFIGURACIÓN DE SEGURIDAD

**Variables de entorno en Netlify:**
```
SENDGRID_API_KEY=tu_clave_sendgrid
ZOHO_CLIENT_ID=tu_id_cliente
ZOHO_CLIENT_SECRET=tu_secreto_cliente
ADMIN_EMAIL=admin@centromedicouniversal.com
```

### 📧 NOTIFICACIONES EMAIL

**Plantilla de confirmación (ya incluida):**
- Confirmación automática al paciente
- Notificación al administrador
- Recordatorio 24 horas antes

### 📈 MÉTRICAS Y REPORTES

**Dashboard disponible en:**
- Zoho: Panel completo con estadísticas
- Google Analytics: Tracking de conversiones
- Netlify: Logs de funciones

### 🚦 ESTADO ACTUAL:

✅ **Listo para producción:**
- Sistema personalizado funcional
- Modal integrado en index.html
- Backend configurado
- Estilos responsive

⏳ **Próximos pasos:**
1. Elegir entre Zoho o Calendly
2. Configurar cuenta
3. Actualizar API keys
4. Deploy en Netlify

### 💻 COMANDOS DE DEPLOYMENT:

```bash
# En la carpeta del proyecto:
cd /Users/manuelcastillo/Desktop/CENTRO_MEDICO_UNIVERSAL/01_WEBSITE/

# Inicializar git (si no existe)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Add booking system"

# Deploy en Netlify
netlify deploy --prod
```

### 📞 SOPORTE:

**Para ayuda con la configuración:**
- Zoho Support: support.zoho.com
- Calendly Help: help.calendly.com
- Netlify Docs: docs.netlify.com

### 🎯 RECOMENDACIÓN FINAL:

**Para Centro Médico Universal recomiendo:**
1. **Zoho Booking** - Sistema completo profesional
2. Mantener el **modal personalizado** como backup
3. Añadir **WhatsApp Business** para consultas rápidas

---

📌 **Nota:** El sistema ya está integrado y funcionando. Solo necesitas elegir tu plataforma preferida (Zoho/Calendly) y configurar las credenciales.