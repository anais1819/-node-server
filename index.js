const readline = require('readline');
const fs = require('fs');

const filePath = 'tareas.json';

// Lee el archivo JSON con las tareas
const readTasks = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Guarda las tareas en el archivo JSON
const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Imprime la lista de tareas
const printTasks = () => {
  const tasks = readTasks();
  console.log('\nLista de tareas:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.description}`);
  });
  console.log('');
};

// Añade una nueva tarea
const addTask = (description) => {
  const tasks = readTasks();
  const newTask = {
    indicator: tasks.length + 1,
    description,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`\nTarea añadida: ${description}\n`);
};

// Elimina una tarea
const deleteTask = (index) => {
  const tasks = readTasks();
  if (index >= 0 && index < tasks.length) {
    const deletedTask = tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`\nTarea eliminada: ${deletedTask[0].description}\n`);
  } else {
    console.log('\nÍndice de tarea no válido.\n');
  }
};

// Completa una tarea
const completeTask = (index) => {
  const tasks = readTasks();
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    console.log(`\nTarea marcada como ${tasks[index].completed ? 'completada' : 'pendiente'}.\n`);
  } else {
    console.log('\nÍndice de tarea no válido.\n');
  }
};

// Crea la interfaz para leer la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Menú principal
const showMenu = () => {
  console.log('1. Ver tareas');
  console.log('2. Añadir tarea');
  console.log('3. Eliminar tarea');
  console.log('4. Completar tarea');
  console.log('0. Salir');
  rl.question('\nSeleccione una opción: ', (answer) => {
    handleOption(answer);
  });
};

// Maneja la opción seleccionada por el usuario
const handleOption = (option) => {
  switch (option) {
    case '1':
      printTasks();
      showMenu();
      break;
    case '2':
      rl.question('\nIngrese la descripción de la tarea: ', (description) => {
        addTask(description);
        showMenu();
      });
      break;
    case '3':
      rl.question('\nIngrese el índice de la tarea a eliminar: ', (index) => {
        deleteTask(parseInt(index) - 1);
        showMenu();
      });
      break;
    case '4':
      rl.question('\nIngrese el índice de la tarea a completar: ', (index) => {
        completeTask(parseInt(index) - 1);
        showMenu();
      });
      break;
    case '0':
      rl.close();
      break;
    default:
      console.log('\nOpción no válida. Inténtalo de nuevo.\n');
      showMenu();
      break;
  }
};

// Inicia el programa
const startProgram = () => {
  console.log('¡Bienvenido al administrador de tareas!\n');
  showMenu();
};

// Ejecuta el programa
startProgram();
