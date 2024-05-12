<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use function PHPUnit\TextUI\Configuration\name;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todos = Todo::all();
        return view('todos.index',compact('todos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

         $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);


        $test = array(
            'name' => [
                'amit', 'promit', 'sumit'
            ]
        );
        if($todo){
            return  response()->json(['status' => 'success', 'message' => 'Todo created successfully.', 'todo' => $todo, 'test' => $test]);
        }else{
            return  response()->json(['status' => 'failed', 'message' => 'Todo creation failed.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
