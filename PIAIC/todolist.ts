import { createPromptModule } from 'inquirer';
import * as fs from 'fs';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const todoList: Task[] = [];
let taskIdCounter: number = 1;

const todoFilePath = 'todo.json';

function saveTodoList() {
    fs.writeFileSync(todoFilePath, JSON.stringify(todoList), 'utf-8');
}

function loadTodoList() {
    if (fs.existsSync(todoFilePath)) {
        const data = fs.readFileSync(todoFilePath, 'utf-8');
        todoList.push(...JSON.parse(data));
        taskIdCounter = Math.max(...todoList.map(task => task.id)) + 1;
    }
}

function showTodoList() {
    console.log('\n** Todo List **');
    if (todoList.length === 0) {
        console.log('No tasks in the list.');
    } else {
        todoList.forEach(task => {
            const status = task.completed ? '(Completed)' : '(Pending)';
            console.log(`${task.id}. ${task.text} ${status}`);
        });
    }
    console.log('*****************\n');
}

const prompt = createPromptModule();

async function addTodo() {
    const { taskText } = await prompt([
        {
            type: 'input',
            name: 'taskText',
            message: 'Enter the task you want to add:',
        },
    ]);

    const newTask: Task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
    };

    todoList.push(newTask);
    saveTodoList();
    console.log(`Task added: "${taskText}"`);
}

async function markTaskAsCompleted() {
    const { taskId } = await prompt([
        {
            type: 'input',
            name: 'taskId',
            message: 'Enter the ID of the task you want to mark as completed:',
        },
    ]);

    const taskToMark = todoList.find(task => task.id === parseInt(taskId));

    if (taskToMark) {
        taskToMark.completed = true;
        saveTodoList();
        console.log(`Task marked as completed: "${taskToMark.text}"`);
    } else {
        console.log(`Task with ID ${taskId} not found.`);
    }
}

async function main() {
    loadTodoList();
    while (true) {
        const { action } = await prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Show Tasks', 'Add Task', 'Mark Task as Completed', 'Exit'],
            },
        ]);

        switch (action) {
            case 'Show Tasks':
                showTodoList();
                break;
            case 'Add Task':
                await addTodo();
                break;
            case 'Mark Task as Completed':
                await markTaskAsCompleted();
                break;
            case 'Exit':
                console.log('Goodbye!');
                return;
        }
    }
}

main();