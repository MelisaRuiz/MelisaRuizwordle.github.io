// =============================================
// MAIN.JS - CONTROLADOR PRINCIPAL
// =============================================

class SecurityLabController {
    constructor() {
        this.currentMode = 'vulnerable'; // 'vulnerable' | 'secure'
        this.init();
    }

    init() {
        console.log('🔧 Inicializando WordlePPY Security Lab...');
        
        this.setupModeToggle();
        this.setupEventListeners();
        this.initializeCurrentMode();
        this.setupDemoButtons();
        
        console.log('✅ Laboratorio inicializado');
    }

    setupModeToggle() {
        const toggleBtn = document.getElementById('toggle-mode');
        if (!toggleBtn) return;
        
        toggleBtn.addEventListener('click', () => {
            this.toggleSecurityMode();
        });
    }

    toggleSecurityMode() {
        this.currentMode = this.currentMode === 'vulnerable' ? 'secure' : 'vulnerable';
        
        // Actualizar configuración global
        if (window.SECURITY_LAB_CONFIG) {
            window.SECURITY_LAB_CONFIG.mode = this.currentMode;
        }
        
        // Aplicar modo correspondiente
        if (this.currentMode === 'secure') {
            this.activateSecureMode();
        } else {
            this.activateVulnerableMode();
        }
        
        // Mostrar notificación
        this.showNotification(
            `Modo ${this.currentMode === 'vulnerable' ? 'Vulnerable' : 'Seguro'} activado`,
            this.currentMode === 'vulnerable' ? 'warning' : 'success'
        );
    }

    activateVulnerableMode() {
        console.log('🔓 Activando modo vulnerable...');
        
        if (typeof initializeVulnerableMode === 'function') {
            initializeVulnerableMode();
        } else {
            console.error('❌ initializeVulnerableMode no está disponible');
        }
        
        // Actualizar UI
        this.updateUIMode('vulnerable');
    }

    activateSecureMode() {
        console.log('🛡️ Activando modo seguro...');
        
        if (typeof initializeSecureMode === 'function') {
            initializeSecureMode();
        } else {
            console.error('❌ initializeSecureMode no está disponible');
        }
        
        // Actualizar UI
        this.updateUIMode('secure');
    }

    updateUIMode(mode) {
        // Actualizar clase del body
        document.body.className = `${mode}-mode`;
        
        // Actualizar badge
        const modeBadge = document.getElementById('lab-mode');
        if (modeBadge) {
            modeBadge.textContent = mode === 'vulnerable' ? 'MODO VULNERABLE' : 'MODO SEGURO';
            modeBadge.className = `mode-badge ${mode}`;
        }
        
        // Actualizar botón de toggle
        const toggleBtn = document.getElementById('toggle-mode');
        if (toggleBtn) {
            toggleBtn.textContent = mode === 'vulnerable' 
                ? '🛡️ Cambiar a Modo Seguro' 
                : '🔓 Cambiar a Modo Vulnerable';
        }
    }

    initializeCurrentMode() {
        // Leer modo de la configuración o URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlMode = urlParams.get('mode');
        
        if (urlMode === 'secure') {
            this.currentMode = 'secure';
        }
        
        // Aplicar modo inicial
        if (this.currentMode === 'secure') {
            this.activateSecureMode();
        } else {
            this.activateVulnerableMode();
        }
    }

    setupEventListeners() {
        // Botón de compartir mensaje
        const shareBtn = document.querySelector('button[onclick*="shareMessage"]');
        if (shareBtn) {
            shareBtn.removeAttribute('onclick');
            shareBtn.addEventListener('click', () => {
                if (typeof shareMessage === 'function') {
                    shareMessage();
                }
            });
        }
        
        // Botón de guardar puntuación
        const saveBtn = document.querySelector('button[onclick*="saveHighScore"]');
        if (saveBtn) {
            saveBtn.removeAttribute('onclick');
            saveBtn.addEventListener('click', () => {
                if (typeof saveHighScore === 'function') {
                    saveHighScore();
                }
            });
        }
    }

    setupDemoButtons() {
        // Botón demo XSS
        const demoXSSBtn = document.querySelector('button[onclick*="demoXSS"]');
        if (demoXSSBtn) {
            demoXSSBtn.removeAttribute('onclick');
            demoXSSBtn.addEventListener('click', () => {
                if (this.currentMode === 'vulnerable' && typeof demoXSS === 'function') {
                    demoXSS();
                } else if (this.currentMode === 'secure' && typeof demoXSS_Secure === 'function') {
                    demoXSS_Secure();
                } else {
                    alert('Función de demo no disponible en este modo');
                }
            });
        }
        
        // Botón demo CSRF
        const demoCSRFBtn = document.querySelector('button[onclick*="demoCSRF"]');
        if (demoCSRFBtn) {
            demoCSRFBtn.removeAttribute('onclick');
            demoCSRFBtn.addEventListener('click', () => {
                if (this.currentMode === 'vulnerable' && typeof demoCSRF === 'function') {
                    demoCSRF();
                } else if (this.currentMode === 'secure' && typeof demoCSRF_Secure === 'function') {
                    demoCSRF_Secure();
                } else {
                    alert('Función de demo no disponible en este modo');
                }
            });
        }
        
        // Botón ver solución
        const fixBtn = document.querySelector('button[onclick*="showFix"]');
        if (fixBtn) {
            fixBtn.removeAttribute('onclick');
            fixBtn.addEventListener('click', () => {
                this.showFixGuide();
            });
        }
    }

    showFixGuide() {
        const output = document.getElementById('demo-output');
        if (!output) return;
        
        output.innerHTML = `
            <div class="fix-guide">
                <h4>🛡️ Guía de Mitigaciones</h4>
                
                <div class="mitigation">
                    <h5>✅ Contra XSS:</h5>
                    <ul>
                        <li>Usar <code>textContent</code> en lugar de <code>innerHTML</code></li>
                        <li>Sanitizar entradas con librerías como DOMPurify</li>
                        <li>Escapar caracteres especiales (&lt;, &gt;, &amp;, etc.)</li>
                        <li>Implementar CSP estricto sin <code>unsafe-inline</code></li>
                        <li>Usar HTTP-only cookies para datos sensibles</li>
                    </ul>
                </div>
                
                <div class="mitigation">
                    <h5>✅ Contra CSRF:</h5>
                    <ul>
                        <li>Tokens CSRF únicos por sesión</li>
                        <li>Verificar cabecera Origin/Referer</li>
                        <li>Cookies con atributo SameSite=Strict</li>
                        <li>Validar métodos HTTP (usar POST para acciones críticas)</li>
                        <li>ReCAPTCHA para acciones sensibles</li>
                    </ul>
                </div>
                
                <div class="mitigation">
                    <h5>✅ Mejores Prácticas:</h5>
                    <ul>
                        <li>Principio de menor privilegio</li>
                        <li>Validación de entrada en cliente y servidor</li>
                        <li>Logging y monitoreo de seguridad</li>
                        <li>Actualizaciones regulares de dependencias</li>
                        <li>Pruebas de seguridad periódicas</li>
                    </ul>
                </div>
                
                <p><strong>🔧 Cambia a "Modo Seguro" para ver estas mitigaciones en acción.</strong></p>
            </div>
        `;
    }

    logGuess(guess, attemptsLeft) {
        if (!window.SECURITY_LAB_CONFIG?.features?.logging) return;
        
        console.log(`🎮 Guess registrado: "${guess}", intentos restantes: ${attemptsLeft}`);
        
        // Aquí podrías añadir lógica de logging más avanzada
        if (window.SECURITY_LAB_CONFIG?.gameState) {
            window.SECURITY_LAB_CONFIG.gameState.guesses.push({
                word: guess,
                timestamp: new Date().toISOString(),
                attemptsLeft: attemptsLeft
            });
        }
    }

    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        // Colores según tipo
        if (type === 'warning') {
            notification.style.background = 'linear-gradient(to right, #ff9800, #ff5722)';
        } else if (type === 'success') {
            notification.style.background = 'linear-gradient(to right, #4CAF50, #2E7D32)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(to right, #ff4444, #d32f2f)';
        } else {
            notification.style.background = 'linear-gradient(to right, #2196F3, #1976D2)';
        }
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// =============================================
// INICIALIZACIÓN
// =============================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar controlador
    window.labController = new SecurityLabController();
    
    // Configurar evento para el botón "mal"
    const malBtn = document.getElementById('mal');
    if (malBtn) {
        malBtn.addEventListener('click', () => {
            malBtn.style.display = 'none';
        });
    }
    
    console.log('🎉 WordlePPY Security Lab listo para usar!');
    console.log('🔓 Modo: Vulnerable (inicial)');
    console.log('🛡️ Usa el botón para cambiar a modo seguro');
});