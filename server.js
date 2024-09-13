import express from 'express';
import cors from 'cors'; // Importa o middleware CORS

const app = express();
app.use(cors()); // Permite todas as origens (não recomendado para produção)
app.use(express.json());

const tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    console.log(req.body); // Loga o corpo da requisição
    const newUser = req.body;

    // Verifica se o nome está presente
    if (!newUser || !newUser.name) {
        return res.status(400).send('Nome do usuário é obrigatório.');
    }

    tasks.push(newUser);
    res.status(201).json(newUser); // Retorna o novo usuário adicionado
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
