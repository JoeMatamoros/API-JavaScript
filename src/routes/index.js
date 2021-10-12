const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({ 
        "Titulo": "PANTALLA PRINCIPAL DE CLOTHES API",
        "Desarrollado por": "José Ordoñez Matamoros"
         });
});

module.exports = router;