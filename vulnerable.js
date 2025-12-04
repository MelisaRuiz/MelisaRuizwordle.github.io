// =============================================
// VULNERABLE.JS - VULNERABILIDADES INTENCIONALES
// =============================================

console.log('⚠️ Cargando modo vulnerable...');

// =============================================
// VULNERABILIDADES XSS
// =============================================

/**
 * FUNCIÓN VULNERABLE - XSS Reflejado
 * Vulnerabilidad: Usa innerHTML directamente con entrada de usuario
 */
function shareMessageVulnerable() {
    const input = document.getElementById('custom-message');
    const display = document.getElementById('message-display');
    
    if (!input || !display) return;
    
    const userMessage = input.value;
    
    // 🔓 VULNERABLE: Usar innerHTML directamente
    display.innerHTML = `<div class="user-message">${userMessage}</div>`;
    
    // 🔓 VULNERABLE: Guardar en localStorage sin sanitizar
    localStorage.setItem('lastMessage', userMessage);
    
    console.warn('⚠️ XSS potencial detectado en mensaje:', userMessage);
    
    input.value = '';
}

/**
 * FUNCIÓN VULNERABLE - XSS desde localStorage
 * Vulnerabilidad: Carga contenido sin sanitizar
 */
function loadStoredMessages() {
    const display = document.getElementById('message-display');
    if (!display) return;
    
    const storedMessage = localStorage.getItem('lastMessage');
    if (storedMessage) {
        // 🔓 VULNERABLE: Cargar directamente
        display.innerHTML += `<br><small>Último mensaje: ${storedMessage}</small>`;
    }
}

/**
 * FUNCIÓN VULNERABLE - XSS desde URL
 * Vulnerabilidad: Leer parámetros sin sanitizar
 */
function loadMessageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    
    if (message) {
        const display = document.getElementById('message-display');
        if (display) {
            // 🔓 VULNERABLE: XSS reflejado desde URL
            display.innerHTML = `<div class="url-message">${decodeURIComponent(message)}</div>`;
        }
    }
}

/**
 * FUNCIÓN VULNERABLE - eval peligroso
 * Vulnerabilidad: Usar eval con entrada de usuario
 */
function dangerousEval(guess) {
    // 🔓 VULNERABLE: eval con entrada no confiable
    try {
        eval(`console.log("Procesando guess: ${guess}")`);
    } catch (e) {
        console.error('Error en eval:', e);
    }
}

// =============================================
// VULNERABILIDADES CSRF
// =============================================

/**
 * FUNCIÓN VULNERABLE - CSRF en formularios
 * Vulnerabilidad: Formulario sin token CSRF
 */
function saveHighScoreVulnerable() {
    const form = document.getElementById('score-form');
    if (!form) return;
    
    const usernameInput = form.querySelector('input[name="username"]');
    const scoreInput = form.querySelector('input[name="score"]');
    
    if (!usernameInput || !scoreInput) return;
    
    const username = usernameInput.value;
    const score = scoreInput.value;
    
    // 🔓 VULNERABLE: Solicitud sin protección CSRF
    const requestData = {
        username: username,
        score: score,
        timestamp: new Date().toISOString()
    };
    
    // Simular envío vulnerable
    simulateVulnerableRequest(requestData);
    
    console.warn('⚠️ Solicitud CSRF-vulnerable enviada:', requestData);
    
    // Limpiar formulario
    form.reset();
}

/**
 * SIMULACIÓN - Solicitud vulnerable a CSRF
 */
function simulateVulnerableRequest(data) {
    const output = document.getElementById('demo-output');
    if (!output) return;
    
    const requestInfo = document.createElement('div');
    requestInfo.className = 'vulnerable-request';
    requestInfo.innerHTML = `
        <h4>⚠️ Solicitud Vulnerable Enviada</h4>
        <p><strong>Usuario:</strong> ${data.username}</p>
        <p><strong>Puntuación:</strong> ${data.score}</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        <p><small>🔓 Esta solicitud NO tiene protección CSRF</small></p>
        <p><small>Un atacante podría forzar esta solicitud desde otro sitio</small></p>
    `;
    
    output.appendChild(requestInfo);
}

// =============================================
// VULNERABILIDADES DE POLÍTICAS
// =============================================

/**
 * Configura CSP vulnerable
 */
function setupVulnerableCSP() {
    console.log('🔓 Configurando CSP vulnerable...');
    
    // 🔓 VULNERABLE: CSP débil que permite scripts inline
    const vulnerableCSP = `
        default-src 'self' 'unsafe-inline';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
        style-src 'self' 'unsafe-inline' https:;
        img-src * data:;
        connect-src *;
        frame-ancestors *;
    `.replace(/\s+/g, ' ').trim();
    
    // Añadir meta tag vulnerable
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = vulnerableCSP;
    document.head.appendChild(meta);
}

/**
 * Configura cookies vulnerables
 */
function setupVulnerableCookies() {
    console.log('🔓 Configurando cookies vulnerables...');
    // En un entorno real, el servidor configuraría cookies sin SameSite
    console.warn('⚠️ Cookies sin atributo SameSite - Vulnerables a CSRF');
}

// =============================================
// DEMOSTRACIONES DE ATAQUES
// =============================================

/**
 * Demuestra ataque XSS
 */
function demoXSS() {
    const output = document.getElementById('demo-output');
    if (!output) return;
    
    const payloads = [
        '<script>alert("🎯 XSS Demo!\\n\\nEsta alerta se ejecuta porque innerHTML procesa scripts.")</script>',
        '<img src="x" onerror="alert(\'XSS desde atributo onerror\')">',
        '<svg onload="alert(\'XSS desde SVG onload\')"><circle cx="50" cy="50" r="40"/></svg>',
        '<iframe src="javascript:alert(\'XSS desde iframe\')"></iframe>',
        '<body onload="alert(\'XSS desde body onload\')">Texto</body>'
    ];
    
    const randomPayload = payloads[Math.floor(Math.random() * payloads.length)];
    
    output.innerHTML = `
        <div class="xss-demo">
            <h4>🎯 Demostración de XSS</h4>
            <p><strong>Payload utilizado:</strong></p>
            <code class="payload">${randomPayload.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>
            <p><strong>Este payload se ejecuta porque:</strong></p>
            <ul>
                <li>Usamos <code>innerHTML</code> en lugar de <code>textContent</code></li>
                <li>No sanitizamos la entrada del usuario</li>
                <li>El CSP permite <code>unsafe-inline</code></li>
                <li>No escapamos caracteres especiales</li>
            </ul>
            <p><strong>Consecuencias:</strong></p>
            <ul>
                <li>Robo de cookies de sesión</li>
                <li>Redirección a sitios maliciosos</li>
                <li>Keylogging (registro de teclas)</li>
                <li>Defacement (modificación del sitio)</li>
            </ul>
        </div>
    `;
    
    // Ejecutar el payload en el área de mensajes
    const messageDisplay = document.getElementById('message-display');
    if (messageDisplay) {
        messageDisplay.innerHTML = randomPayload;
    }
}

/**
 * Demuestra ataque CSRF
 */
function demoCSRF() {
    const output = document.getElementById('demo-output');
    if (!output) return;
    
    output.innerHTML = `
        <div class="csrf-demo">
            <h4>🎯 Demostración de CSRF</h4>
            <p><strong>Código de ataque CSRF:</strong></p>
            <pre><code>
&lt;!-- Página maliciosa del atacante --&gt;
&lt;html&gt;
&lt;body&gt;
    &lt;h1&gt;¡Ganaste un premio!&lt;/h1&gt;
    &lt;p&gt;Haz clic para reclamar...&lt;/p&gt;
    
    &lt;!-- Formulario CSRF oculto --&gt;
    &lt;form id="csrf-attack" 
          action="https://tusitio.com/api/highscore" 
          method="POST"&gt;
        &lt;input type="hidden" name="username" value="hacker"&gt;
        &lt;input type="hidden" name="score" value="9999"&gt;
    &lt;/form&gt;
    
    &lt;script&gt;
        // Enviar automáticamente cuando la página cargue
        document.getElementById('csrf-attack').submit();
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
            </code></pre>
            
            <p><strong>Cómo funciona:</strong></p>
            <ol>
                <li>El usuario visita una página maliciosa</li>
                <li>La página contiene un formulario oculto hacia tu sitio</li>
                <li>El navegador envía automáticamente la solicitud</li>
                <li>Si el usuario está logeado, la acción se ejecuta</li>
            </ol>
            
            <p><strong>Por qué funciona aquí:</strong></p>
            <ul>
                <li>No hay tokens CSRF en los formularios</li>
                <li>No se verifica el origen de las solicitudes</li>
                <li>Las cookies se envían automáticamente</li>
            </ul>
        </div>
    `;
}

// =============================================
// INICIALIZACIÓN DEL MODO VULNERABLE
// =============================================

/**
 * Inicializa todas las vulnerabilidades
 */
function initializeVulnerableMode() {
    console.log('🔓 Inicializando modo vulnerable...');
    
    // 1. Configurar CSP vulnerable
    setupVulnerableCSP();
    
    // 2. Configurar cookies vulnerables
    setupVulnerableCookies();
    
    // 3. Sobrescribir funciones con versiones vulnerables
    if (typeof window.shareMessage === 'function') {
        window.shareMessage = shareMessageVulnerable;
    }
    
    if (typeof window.saveHighScore === 'function') {
        window.saveHighScore = saveHighScoreVulnerable;
    }
    
    // 4. Cargar mensajes vulnerables
    loadStoredMessages();
    loadMessageFromURL();
    
    // 5. Actualizar interfaz
    updateUIForVulnerableMode();
    
    // 6. Mostrar advertencia
    console.warn('⚠️ MODO VULNERABLE ACTIVADO');
    console.warn('⚠️ No introducir datos reales');
    console.warn('⚠️ Solo para fines educativos');
}

/**
 * Actualiza UI para modo vulnerable
 */
function updateUIForVulnerableMode() {
    // Cambiar clases CSS
    document.body.classList.remove('secure-mode');
    document.body.classList.add('vulnerable-mode');
    
    // Actualizar badge de modo
    const modeBadge = document.getElementById('lab-mode');
    if (modeBadge) {
        modeBadge.textContent = 'MODO VULNERABLE';
        modeBadge.className = 'mode-badge vulnerable';
    }
    
    // Actualizar botón de toggle
    const toggleBtn = document.getElementById('toggle-mode');
    if (toggleBtn) {
        toggleBtn.textContent = '🛡️ Cambiar a Modo Seguro';
        toggleBtn.title = 'Cambiar a modo seguro con protecciones';
    }
    
    // Mostrar advertencia
    showVulnerableWarning();
}

/**
 * Muestra advertencia de modo vulnerable
 */
function showVulnerableWarning() {
    const warningDiv = document.createElement('div');
    warningDiv.className = 'vulnerable-warning';
    warningDiv.innerHTML = `
        <h4>⚠️ ADVERTENCIA: MODO VULNERABLE ACTIVADO</h4>
        <p>Todas las vulnerabilidades están activas. Este modo es solo para:</p>
        <ul>
            <li>🧪 Pruebas educativas</li>
            <li>🎯 Demostraciones de seguridad</li>
            <li>🔬 Análisis de vulnerabilidades</li>
        </ul>
        <p><strong>❌ NO usar datos reales</strong></p>
        <p><strong>❌ NO usar en producción</strong></p>
        <p><strong>✅ Solo para aprendizaje local</strong></p>
    `;
    warningDiv.style.cssText = `
        background: linear-gradient(to right, #ff4444, #ff6b6b);
        color: white;
        padding: 15px;
        border-radius: 10px;
        margin: 20px 0;
        border: 3px solid #ff0000;
    `;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(warningDiv, container.firstChild.nextSibling);
    }
}

// =============================================
// FUNCIONES PÚBLICAS
// =============================================

// Hacer funciones disponibles globalmente
window.shareMessage = shareMessageVulnerable;
window.saveHighScore = saveHighScoreVulnerable;
window.demoXSS = demoXSS;
window.demoCSRF = demoCSRF;
window.initializeVulnerableMode = initializeVulnerableMode;