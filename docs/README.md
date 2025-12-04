# 📚 Documentación de WordlePPY Security Lab

¡Bienvenido a la documentación completa del laboratorio de seguridad WordlePPY!

## 🎯 Guías de Aprendizaje

### 🔓 Vulnerabilidades
- [🎯 XSS (Cross-Site Scripting)](xss-guide.md) - Aprende sobre inyección de scripts
- [🎯 CSRF (Cross-Site Request Forgery)](csrf-guide.md) - Ataques de solicitud entre sitios
- [🛡️ CSP (Content Security Policy)](csp-guide.md) - Políticas de seguridad de contenido

### 🚀 Empezando
- [🚀 Guía de Inicio Rápido](getting-started.md) - Comienza en 5 minutos
- [🎮 Cómo Jugar](game-guide.md) - Instrucciones del juego Wordle

### 🧪 Laboratorio
- [🔬 Uso del Laboratorio](lab-guide.md) - Cómo usar las funciones de seguridad
- [🛡️ Mitigaciones](mitigations-guide.md) - Cómo proteger tu aplicación

## 📖 Estructura del Proyecto
wordleppy-lab/
├── index.html # Página principal
├── style.css # Estilos CSS
├── script.js # Lógica del Wordle
├── config.js # Configuración
├── vulnerable.js # Funciones vulnerables
├── secure.js # Funciones seguras
├── main.js # Controlador
└── docs/ # Esta documentación

## 🎓 Niveles de Aprendizaje

### 👶 Nivel Básico
1. Lee la [Guía de Inicio Rápido](getting-started.md)
2. Juega al Wordle normalmente
3. Prueba payloads XSS básicos

### 🧑‍💻 Nivel Intermedio
1. Estudia las [guías de vulnerabilidades](#-guías-de-aprendizaje)
2. Analiza el código en `vulnerable.js`
3. Crea payloads personalizados

### 🧠 Nivel Avanzado
1. Intenta bypass de mitigaciones
2. Analiza políticas CSP complejas
3. Desarrolla exploits avanzados

## 🔧 Recursos Adicionales

### Herramientas
- [OWASP ZAP](https://www.zaproxy.org/) - Scanner de seguridad
- [Burp Suite](https://portswigger.net/burp) - Suite de testing
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Evaluador de CSP

### Referencias
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Web.dev Security](https://web.dev/secure/)

## 🤝 Contribuir

¿Encontraste un error? ¿Tienes una mejora?

1. Haz fork del proyecto
2. Crea una rama: `git checkout -b mi-mejora`
3. Haz commit: `git commit -m 'Mejora en docs'`
4. Haz push: `git push origin mi-mejora`
5. Abre un Pull Request

## 📄 Licencia

Esta documentación está bajo la [Licencia MIT](../LICENSE).

---

*Última actualización: ${new Date().toLocaleDateString()}*