import express from 'express';
import cors from 'cors'; // Importa o middleware CORS
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const app = express();
app.use(cors()); // Permite todas as origens (não recomendado para produção)
app.use(express.json());

const tasks = [];

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany(); // Busca todas as tarefas no banco de dados
        res.json(tasks); // Envia as tarefas como resposta JSON
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
});

app.post('/tasks', async (req, res) => {
    console.log(req.body); // Loga o corpo da requisição
    const newTask = req.body;
    
    await prisma.task.create( { 
        data: {
            taskName: req.body.name,
        }
    } ) // Cria um novo registro no banco de dados

    // Verifica se o nome está presente
    if (!newTask || !newTask.name) {
        return res.status(400).send('Nome do usuário é obrigatório.');
    }

    tasks.push(newTask);
    res.status(201).json(newTask); // Retorna o novo registro adicionado
});

app.put('/tasks/:id', async (req, res) => {
    await prisma.task.update({
        where: {
            id: req.params.id,
        },
        data: {
            taskName: req.body.taskName, 
        }
    })
    res.status(200).json(req.body);
})

app.delete('/tasks/:id', async (req, res) => {
    await prisma.task.delete({
        where: {
            id: req.params.id,
        }
    })
    res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
