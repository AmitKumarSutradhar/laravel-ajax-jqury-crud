@extends('layouts.app')
@include('todos.subview.create')

@section('content')
<div class="container py-5">
    <h3 class="text-center">Ajax Laravel CRUD</h3>
    <div class="row">
        <div class="col-xl-12">
            <div id="response">
            </div>
        </div>
        <div class="col-xl-12 text-end">
            <a href="javascript:void(0)" id="create-todo-btn" class="btn btn-primary">Create Todo's</a>
        </div>
    </div>

    <div class="table-responsive pt-5">
        <table class="table table-striped" id="todo-table">
            <thead>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Action</th>
            </thead>

            <tbody>
            @forelse($todos as $todo)
                <tr id="{{ 'todo_'.$todo->id }}">
                    <td>{{ $todo->id }}</td>
                    <td>{{ $todo->title }}</td>
                    <td>{{ $todo->description }}</td>
                    <td>{{ $todo->is_completed ? 'Yes' : 'No' }}</td>
                    <td>
                        <a class="btn btn-info btn-sm btn-view" href="javascript:void(0)" data-id="{{ $todo->id }}">View</a>
                        <a class="btn btn-success btn-sm btn-edit" href="javascript:void(0)" data-id="{{ $todo->id }}">Edit</a>
                        <a class="btn btn-danger btn-sm btn-delete" href="javascript:void(0)" data-id="{{ $todo->id }}">Delete</a>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5">
                        <p class="text-danger">No todo's created.</p>
                    </td>
                </tr>
            @endforelse
            </tbody>
        </table>
    </div>
</div>

@endsection
