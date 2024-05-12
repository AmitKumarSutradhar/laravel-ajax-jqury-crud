<!-- Modal -->
<div class="modal fade" id="todo-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="{{ route('todos.store') }}" method="POST" id="todo-form">
                @csrf
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-title">Create Todo</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group py-2">
                        <label for="title">Todo Title</label>
                        <input type="text" name="title" id="title" placeholder="Title" class="form-control">
                    </div>
                    <div class="form-group py-2">
                        <label for="description">Description</label>
                        <textarea name="description" id="description" class="form-control" placeholder="Description"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
