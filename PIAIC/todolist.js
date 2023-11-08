"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var fs = require("fs");
var todoList = [];
var taskIdCounter = 1;
var todoFilePath = 'todo.json';
function saveTodoList() {
    fs.writeFileSync(todoFilePath, JSON.stringify(todoList), 'utf-8');
}
function loadTodoList() {
    if (fs.existsSync(todoFilePath)) {
        var data = fs.readFileSync(todoFilePath, 'utf-8');
        todoList.push.apply(todoList, JSON.parse(data));
        taskIdCounter = Math.max.apply(Math, todoList.map(function (task) { return task.id; })) + 1;
    }
}
function showTodoList() {
    console.log('\n** Todo List **');
    if (todoList.length === 0) {
        console.log('No tasks in the list.');
    }
    else {
        todoList.forEach(function (task) {
            var status = task.completed ? '(Completed)' : '(Pending)';
            console.log("".concat(task.id, ". ").concat(task.text, " ").concat(status));
        });
    }
    console.log('*****************\n');
}
var prompt = (0, inquirer_1.createPromptModule)();
function addTodo() {
    return __awaiter(this, void 0, void 0, function () {
        var taskText, newTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt([
                        {
                            type: 'input',
                            name: 'taskText',
                            message: 'Enter the task you want to add:',
                        },
                    ])];
                case 1:
                    taskText = (_a.sent()).taskText;
                    newTask = {
                        id: taskIdCounter++,
                        text: taskText,
                        completed: false,
                    };
                    todoList.push(newTask);
                    saveTodoList();
                    console.log("Task added: \"".concat(taskText, "\""));
                    return [2 /*return*/];
            }
        });
    });
}
function markTaskAsCompleted() {
    return __awaiter(this, void 0, void 0, function () {
        var taskId, taskToMark;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prompt([
                        {
                            type: 'input',
                            name: 'taskId',
                            message: 'Enter the ID of the task you want to mark as completed:',
                        },
                    ])];
                case 1:
                    taskId = (_a.sent()).taskId;
                    taskToMark = todoList.find(function (task) { return task.id === parseInt(taskId); });
                    if (taskToMark) {
                        taskToMark.completed = true;
                        saveTodoList();
                        console.log("Task marked as completed: \"".concat(taskToMark.text, "\""));
                    }
                    else {
                        console.log("Task with ID ".concat(taskId, " not found."));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var action, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    loadTodoList();
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 10];
                    return [4 /*yield*/, prompt([
                            {
                                type: 'list',
                                name: 'action',
                                message: 'Choose an action:',
                                choices: ['Show Tasks', 'Add Task', 'Mark Task as Completed', 'Exit'],
                            },
                        ])];
                case 2:
                    action = (_b.sent()).action;
                    _a = action;
                    switch (_a) {
                        case 'Show Tasks': return [3 /*break*/, 3];
                        case 'Add Task': return [3 /*break*/, 4];
                        case 'Mark Task as Completed': return [3 /*break*/, 6];
                        case 'Exit': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 3:
                    showTodoList();
                    return [3 /*break*/, 9];
                case 4: return [4 /*yield*/, addTodo()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, markTaskAsCompleted()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    console.log('Goodbye!');
                    return [2 /*return*/];
                case 9: return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    });
}
main();
