<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of tasks for a user.
     */
    public function index($userId)
    {
        // Obtener las tareas de un usuario específico
        $user = User::findOrFail($userId);
        // Mostrar el usuario y las tareas asociadas
        //dd($user, $user->tasks); // Esto te permitirá ver el usuario y las tareas asociadas

        return $user->tasks; // Devolver todas las tareas del usuario
    }

    /**
     * Store a newly created task in storage.
     */
    public function store(Request $request, $userId)
    {

        // Crear una nueva tarea asociada a un usuario
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->id_user = $userId; // Asignar el user_id
        $task->save();
    }

    /**
     * Display the specified task.
     */
    public function show($userId, $taskId)
    {
        // Obtener la tarea de un usuario específico
        $user = User::findOrFail($userId);
        $task = $user->tasks()->findOrFail($taskId); // Buscar la tarea asociada al usuario

        return response()->json($task);
    }

    /**
     * Update the specified task in storage.
     */
    public function update(Request $request, $userId, $taskId)
    {
        // Validar los datos de la tarea
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Obtener la tarea y actualizarla
        $user = User::findOrFail($userId);
        $task = $user->tasks()->findOrFail($taskId); // Buscar la tarea asociada al usuario
        $task->update($request->all());

        return response()->json($task);
    }

    /**
     * Remove the specified task from storage.
     */
    public function destroy($userId, $taskId)
    {
        // Eliminar la tarea asociada a un usuario
        $user = User::findOrFail($userId);
        $task = $user->tasks()->findOrFail($taskId); // Buscar la tarea asociada al usuario
        $task->delete();

        return response()->json(['message' => 'Tarea eliminada']);
    }
}
