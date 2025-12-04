
## 🛡️ **2. secure.js**

```javascript
// =============================================
// SECURE.JS - MITIGACIONES DE SEGURIDAD
// =============================================

console.log('🔒 Cargando modo seguro...');

// Configuración segura
const SECURE_CONFIG = {
    csrfToken: generateSecureToken(),
    sessionId: generateSecureToken(),
    nonce: generateSecureToken()
};

// =============================================
// FUNCIONES SEGURAS
// =============================================

/**
 * Sanitiza entrada de usuario para prevenir XSS
 * @param {string} input - Texto del usuario
 * @returns {string} - Texto sanitizado
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // Eliminar caracteres peligrosos
    const dangerousChars = /[<>"'`]/g;
    let sanitized = input.replace(dangerousChars, '');
    
    // Limitar longitud
    const maxLength = SECURITY_LAB_CONFIG?.settings?.maxMessageLength || 500;
    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }
    
    return sanitized;
}

/**
 * Muestra mensaje de usuario de forma segura
 */
function shareMessageSecure() {
    const input = document.getElementById('custom-message');
    const display = document.getElementById('message-display');
    
    if (!input || !display) return;
    
    const userMessage = input.value;
    
    // 1. Sanitizar entrada
    const cleanMessage = sanitizeInput(userMessage);
    
    // 2. Usar textContent en lugar de innerHTML
    const messageElement = document.createElement('div');
    messageElement.className = 'secure-message';
    messageElement.textContent = `🔒 ${cleanMessage}`;
    
    // 3. Limpiar y añadir de forma segura
    display.innerHTML = '';
    display.appendChild(messageElement);
    
    // 4. Log seguro
    logSecurityEvent('Mensaje compartido (modo seguro)', {
        length: cleanMessage.length,
        originalLength: userMessage.length
    });
    
    input.value = '';
}

/**
 * Guarda puntuación alta con protección CSRF
 */
function saveHighScoreSecure() {
    const form = document.getElementById('score-form');
    if (!form) return;
    
    const usernameInput = form.querySelector('input[name="username"]');
    const scoreInput = form.querySelector('input[name="score"]');
    
    if (!usernameInput || !scoreInput) return;
    
    const username = sanitizeInput(usernameInput.value);
    const score = parseInt(scoreInput.value);
    
    // Validaciones
    if (!username || username.length < 2) {
        showSecureAlert('El nombre debe tener al menos 2 caracteres');
        return;
    }
    
    if (isNaN(score) || score < 0 || score > 9999) {
        showSecureAlert('La puntuación debe estar entre 0 y 9999');
        return;
    }
    
    // Crear solicitud segura con token CSRF
    const requestData = {
        username: username,
        score: score,
        csrfToken: SECURE_CONFIG.csrfToken,
        timestamp: new Date().toISOString()
    };
    
    // En una aplicación real, aquí iría fetch() al servidor
    // Por ahora simulamos la protección
    simulateSecureRequest(requestData);
    
    logSecurityEvent('Puntuación guardada (seguro)', {
        username: username,
        score: score
    });
}

/**
 * Aplica CSP estricto
 */
function applyStrictCSP() {
    // Eliminar CSP vulnerable
    const vulnerableMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (vulnerableMeta) {
        vulnerableMeta.remove();
    }
    
    // Crear CSP seguro
    const secureCSP = document.createElement('meta');
    secureCSP.httpEquiv = 'Content-Security-Policy';
    secureCSP.content = `
        default-src 'self';
        script-src 'self' 'nonce-${SECURE_CONFIG.nonce}';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data:;
        font-src 'self';
        connect-src 'self';
        frame-ancestors 'none';
        base-uri 'self';
        form-action 'self';
    `.replace(/\s+/g, ' ').trim();
    
    document.head.appendChild(secureCSP);
    
    // Añadir nonce a todos los scripts
    document.querySelectorAll('script:not([src])').forEach(script => {
        if (!script.hasAttribute('nonce')) {
            script.setAttribute('nonce', SECURE_CONFIG.nonce);
        }
    });
}

/**
 * Protege localStorage contra XSS
 */
function secureLocalStorage() {
    // Interceptar localStorage para sanitizar
    const originalSetItem = localStorage.setItem;
    
    localStorage.setItem = function(key, value) {
        if (typeof value === 'string') {
            // Sanitizar antes de guardar
            value = sanitizeInput(value);
        }
        return originalSetItem.call(this, key, value);
    };
    
    // También proteger getItem para evitar inyección al leer
    const originalGetItem = localStorage.getItem;
    
    localStorage.getItem = function(key) {
        const value = originalGetItem.call(this, key);
        if (typeof value === 'string') {
            return sanitizeInput(value);
        }
        return value;
    };
}

/**
 * Configura cookies seguras
 */
function configureSecureCookies() {
    // En un entorno real, el servidor configuraría estas cabeceras
    // Simulamos la configuración para la demo
    console.log('🍪 Configurando cookies seguras:');
    console.log('- SameSite=Strict');
    console.log('- HttpOnly');
    console.log('- Secure (HTTPS only)');
    console.log('- Path=/');
}

// =============================================
// FUNCIONES DE UTILIDAD SEGURAS
// =============================================

/**
 * Genera token seguro
 */
function generateSecureToken() {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

/**
 * Muestra alerta segura
 */
function showSecureAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'secure-alert';
    alertDiv.textContent = `🛡️ ${message}`;
    alertDiv.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        margin: 10px 0;
        font-weight: bold;
    `;
    
    const demoOutput = document.getElementById('demo-output');
    if (demoOutput) {
        demoOutput.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }
}

/**
 * Simula solicitud segura
 */
function simulateSecureRequest(data) {
    const output = document.getElementById('demo-output');
    if (!output) return;
    
    const requestInfo = document.createElement('div');
    requestInfo.className = 'secure-request';
    requestInfo.innerHTML = `
        <h4>✅ Solicitud Segura Enviada</h4>
        <p><strong>Usuario:</strong> ${data.username}</p>
        <p><strong>Puntuación:</strong> ${data.score}</p>
        <p><strong>Token CSRF:</strong> ${data.csrfToken.substring(0, 16)}...</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        <p><small>⚠️ Esta solicitud incluye protección CSRF</small></p>
    `;
    
    output.appendChild(requestInfo);
}

/**
 * Registra evento de seguridad
 */
function logSecurityEvent(event, details = {}) {
    if (SECURITY_LAB_CONFIG?.settings?.debugMode) {
        console.group('🔒 Evento de Seguridad');
        console.log('Evento:', event);
        console.log('Detalles:', details);
        console.log('Timestamp:', new Date().toISOString());
        console.groupEnd();
    }
}

// =============================================
// DEMOSTRACIONES SEGURAS
// =============================================

/**
 * Demuestra mitigación XSS
 */
function demoXSS_Secure() {
    const output = document.getElementById('demo-output');
    if (!output) return;
    
    output.innerHTML = `
        <div class="secure-demo">
            <h4>🛡️ Mitigación XSS en Acción</h4>
            <p><strong>Payload peligroso:</strong> <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></p>
            <p><strong>Resultado después de sanitización:</strong></p>
            <div class="sanitized-output">
                scriptalert('XSS')script
            </div>
            <p><strong>Técnicas usadas:</strong></p>
            <ul>
                <li>Sanitización de entrada (remoción de &lt;&gt;)</li>
                <li>Uso de <code>textContent</code> en lugar de <code>innerHTML</code></li>
                <li>Escape de caracteres especiales</li>
                <li>CSP restrictivo</li>
            </ul>
        </div>
    `;
}

/**
 * Demuestra mitigación CSRF
 */
function demoCSRF_Secure() {
    const output = document.getElementById('demo-output');
    if (!output) return;
    
    output.innerHTML = `
        <div class="secure-demo">
            <h4>🛡️ Mitigación CSRF en Acción</h4>
            <p><strong>Ataque CSRF bloqueado por:</strong></p>
            <ul>
                <li>Token CSRF único por sesión</li>
                <li>Validación del token en el servidor</li>
                <li>Cabecera de origen verificada</li>
                <li>Cookies con atributo SameSite=Strict</li>
            </ul>
            <p><strong>Token de esta sesión:</strong></p>
            <code class="token-display">${SECURE_CONFIG.csrfToken}</code>
            <p><small>⚠️ Sin este token, las solicitudes POST son rechazadas</small></p>
        </div>
    `;
}

// =============================================
// INICIALIZACIÓN DEL MODO SEGURO
// =============================================

/**
 * Inicializa todas las protecciones
 */
function initializeSecureMode() {
    console.log('🛡️ Inicializando modo seguro...');
    
    // 1. Aplicar CSP estricto
    applyStrictCSP();
    
    // 2. Proteger localStorage
    secureLocalStorage();
    
    // 3. Configurar cookies seguras
    configureSecureCookies();
    
    // 4. Sobrescribir funciones vulnerables
    if (typeof window.shareMessage === 'function') {
        window.shareMessage = shareMessageSecure;
    }
    
    if (typeof window.saveHighScore === 'function') {
        window.saveHighScore = saveHighScoreSecure;
    }
    
    // 5. Actualizar interfaz
    updateUIForSecureMode();
    
    // 6. Registrar inicialización
    logSecurityEvent('Modo seguro inicializado', {
        csrfToken: SECURE_CONFIG.csrfToken.substring(0, 8) + '...',
        sessionId: SECURE_CONFIG.sessionId.substring(0, 8) + '...',
        nonce: SECURE_CONFIG.nonce.substring(0, 8) + '...'
    });
    
    console.log('✅ Modo seguro inicializado');
}

/**
 * Actualiza UI para modo seguro
 */
function updateUIForSecureMode() {
    // Cambiar clases CSS
    document.body.classList.remove('vulnerable-mode');
    document.body.classList.add('secure-mode');
    
    // Actualizar badge de modo
    const modeBadge = document.getElementById('lab-mode');
    if (modeBadge) {
        modeBadge.textContent = 'MODO SEGURO';
        modeBadge.className = 'mode-badge secure';
    }
    
    // Actualizar botón de toggle
    const toggleBtn = document.getElementById('toggle-mode');
    if (toggleBtn) {
        toggleBtn.textContent = '🔓 Cambiar a Modo Vulnerable';
        toggleBtn.title = 'Cambiar a modo vulnerable para pruebas';
    }
    
    // Mostrar notificación
    showSecureAlert('Modo seguro activado. Todas las protecciones están en marcha.');
}

// =============================================
// EXPORTAR FUNCIONES PÚBLICAS
// =============================================

// Hacer funciones disponibles globalmente
window.shareMessageSecure = shareMessageSecure;
window.saveHighScoreSecure = saveHighScoreSecure;
window.initializeSecureMode = initializeSecureMode;
window.demoXSS_Secure = demoXSS_Secure;
window.demoCSRF_Secure = demoCSRF_Secure;