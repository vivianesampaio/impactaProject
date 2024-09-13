import express from 'express';
import cors from 'cors'; // Importa o middleware CORS
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const app = express();
app.use(cors()); // Permite todas as origens (não recomendado para produção)
app.use(express.json());

const tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    console.log(req.body); // Loga o corpo da requisição
    const newUser = req.body;
    
    await prisma.task.create( { 
        data: {
            taskName: req.body.name,
        }
    } ) // Cria um novo usuário no banco de dados

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
