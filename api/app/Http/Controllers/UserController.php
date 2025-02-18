<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Obtener todos los usuarios
        $users = User::all();
        return $users;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Crear nuevo usuario
        $user = new User();
        //Obtener parametros para la tabla
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        //Guardar datos en la tabla
        $user->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //Mostrar usuario en específico
        $user = User::find($id);
        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //Solicitar usuario para luego actualizarlo
        $user = User::findOrFail($id);
        //Obtener parametros para la tabla
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        //Guardar datos ACTUALIZADOS en la tabla
        // $user->update();
        $user->update($request->all());
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //Eliminar usuario
        $user = User::destroy($id);
        return $user;
    }
}
