const fs = require('fs');

// Middleware pour enregistrer les informations des requêtes dans un fichier texte
const requestLoggerMiddleware = (req, res, next) => {
    const logData = `Method: ${req.method}, URL: ${req.url} ,IP: ${req.ip},User Agent: ${req.headers['user-agent']}\n`;
    // Enregistrer les informations dans un fichier texte
    fs.promises.appendFile('request_logs.txt',logData)
    .catch(err=>console.error('Erreur lors de l\'enregistrement des informations de requête :', err));
   
    // Passer à la prochaine étape du middleware
    next();
};

module.exports = requestLoggerMiddleware;
