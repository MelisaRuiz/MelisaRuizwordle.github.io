// Configuración del Laboratorio de Seguridad
const SECURITY_LAB_CONFIG = {
    // Modos: 'vulnerable' | 'secure'
    mode: 'vulnerable',
    
    // Características activas
    features: {
        xss: true,
        csrf: true,
        csp: true,
        logging: true
    },
    
    // Configuración específica
    settings: {
        maxMessageLength: 500,
        enableLocalStorage: true,
        debugMode: true,
        showNotifications: true
    },
    
    // Estado del juego
    gameState: {
        guesses: [],
        currentScore: 0,
        vulnerabilitiesFound: 0,
        mitigationsApplied: 0
    },
    
    // Métodos de utilidad
    log: function(message, type = 'info') {
        if (this.settings.debugMode) {
            const colors = {
                info: '#2196F3',
                warning: '#FF9800',
                error: '#FF4444',
                success: '#4CAF50'
            };
            console.log(`%c[WordlePPY] ${message}`, `color: ${colors[type]}; font-weight: bold;`);
        }
    },
    
    updateScore: function(points) {
        this.gameState.currentScore += points;
        this.log(`Puntuación actualizada: ${this.gameState.currentScore}`, 'success');
    }
};

// Hacer disponible globalmente
window.SECURITY_LAB_CONFIG = SECURITY_LAB_CONFIG;