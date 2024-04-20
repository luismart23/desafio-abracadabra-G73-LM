import express from 'express';
import path from 'path';

const app = express();
const __dirname = import.meta.dirname;

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));


// Arreglo de nombres de usuarios
const usuarios = [
    { nombre: 'juan' },
    { nombre: 'astrid' },
    { nombre: 'ignacia' }
];

// Middleware para validar si el usuario existe en el arreglo de nombres
const validarUsuarioMiddleware = (req, res, next) => {
    const usuario = req.params.usuario;
    if (!usuarios.some(u => u.nombre === usuario)) {
        return res.redirect('/assets/img/who.jpeg');
    }
    next();
};

// Ruta para devolver el arreglo de nombres de usuarios en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    return res.json(usuarios);
});

// Ruta para validar si el usuario existe y servir el archivo "juego.html"
app.get('/abracadabra/juego/:usuario', validarUsuarioMiddleware, (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'juego.html'));
});

// Ruta para devolver la imagen del conejo o de Voldemort según el número recibido
app.get('/abracadabra/conejo/:n', (req, res) => {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    const n = parseInt(req.params.n);
    if (n === numeroAleatorio) {
        return res.sendFile(path.join(__dirname, 'public', 'assets', 'img', 'conejo.jpg'));
    }
    return res.sendFile(path.join(__dirname, 'public', 'assets', 'img', 'voldemort.jpg'));
});

// Ruta para devolver la página HTML principal
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'juego.html'));
});

// Ruta genérica para manejar rutas no definidas
app.get('*', (req, res) => {
    return res.send('Esta página no existe...');
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});
