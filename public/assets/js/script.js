$.ajaxSetup({
    headers:  {
        "X-CSRF-TOKEN" : $('meta[name="csrf-token"]').attr('content')
    }
});



$(document).ready(function(){

    $("#create-todo-btn").click(function(){
        $('#todo-modal #title').val("");
        $('#todo-modal #description').val("");
        $("#todo-form input, #todo-form textarea").removeAttr("disabled");
        $('#todo-form button[type=submit]').removeClass("d-none");
        $('#modal-title').text('Create Todo');
        $("#todo-form").attr("action", `${baseUrl}/todos`);
        $("#hidden-todo-id").remove();
        $('#todo-modal').modal("toggle");
    });

    $("#todo-form").validate({

        rules:{
            title: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            description: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
        },
        messages: {
            title:{
                required:"Please enter todo title",
                minlength:"Todo title must be 3 character.",
                maxlength:"Todo title must be upto 50 character.",
            },
            description:{
                required:"Please enter todo description",
                minlength:"Todo description must be 3 character.",
                maxlength:"Todo description must be upto 50 character.",
            },
        },

        submitHandler: function(form){
            $("#response").empty();

            const formData = $(form).serializeArray();

            const todoId = $("#hidden-todo-id").val();
            const methodType = todoId && "PUT" || "POST";
            const formAction = $('form').attr("action");

            $.ajax({
                url : formAction,
                type: methodType,
                data: formData,
                beforeSend: function(){
                    console.log("Loading....");
                },
                success: function(response){
                    $("#todo-form")[0].reset();
                    $("#todo-modal").modal("toggle");

                    if (response.status === 'success'){
                        const Toast = Swal.mixin({
                            toast: true,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            icon: "success",
                            title: "Success",
                            text: response.message,
                        });

                        $("#response").html(
                            `<div class='alert alert-success alert-dismissble'>
                                ${response.message}
                                <button type="button" class="btn btn-close float-end" data-bs-dismiss="alert"></button>
                             </div>`
                        );

                        // For Update
                        if (todoId){
                            $(`#todo_${todoId} td:nth-child(2)`).html(response.todo.title);
                            $(`#todo_${todoId} td:nth-child(3)`).html(response.todo.description);
                        } else {
                            $("#todo-table").append(
                                `<tr id="todo_${response.todo.id}">
                                    <td class="dt-type-numeric sorting_1">${ response.todo.id }</td>
                                    <td>${ response.todo.title }</td>
                                    <td>${ response.todo.description }</td>
                                    <td>${ response.todo.is_completed ? 'Yes' : 'No' }</td>
                                    <td>
                                        <a class="btn btn-info btn-sm btn-view" href="javascript:void(0)" data-id="${response.todo.id}">View</a>
                                        <a class="btn btn-success btn-sm btn-edit" href="javascript:void(0)" data-id="${response.todo.id}">Edit</a>
                                        <a class="btn btn-danger btn-sm btn-delete" href="javascript:void(0)" data-id="${response.todo.id}">Delete</a>
                                    </td>
                                </tr>`
                            );
                        }

                    }else if(response.status === 'failed'){
                        $("#response").html(
                            `<div class='alert alert-danger alert-dismissble'>
                                ${response.message}
                                <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
                             </div>`
                        );
                    }
                    console.log('res', response);
                },
                error: function(error){
                    $("#response").html(
                        `<div class='alert alert-danger alert-dismissble'>
                                ${error.message}
                                <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
                             </div>`
                    );
                 console.log('error', error);
                }
            });
        }
    });

    $('#todo-table').DataTable();

    $("#todo-table").on("click", ".btn-view", function () {
        const todoId = $(this).data("id");
        const mode = "view"

        todoId && fetchTodo(todoId, mode);

        // console.log(todoId);
    });

    function fetchTodo(todoId, mode=null){
        if(todoId){
            $.ajax({
                url: `todos/${todoId}`,
                type: "GET",
                success: function (response) {
                    console.log(response);
                    if (response.status === 'success'){
                        const todo = response.todo;

                        $('#todo-modal #title').val(todo.title);
                        $('#todo-modal #description').val(todo.description);

                        if (mode === 'view'){
                            $('#todo-form input, #todo-form textarea').attr("disabled",true);
                            $('#todo-form button[type=submit]').addClass("d-none");
                            $('#modal-title').text('Todo Details.');
                            $("#todo-form").removeAttr('action');
                        } else if(mode === 'edit'){
                            $('#todo-form input, #todo-form textarea').removeAttr("disabled");
                            $('#todo-form button[type=submit]').removeClass("d-none");
                            $('#modal-title').text('Update Todo Details.');
                            $("#todo-form").attr("action", `${baseUrl}/todos/${todo.id}`);
                            $("#todo-form").append(`<input type="hidden" id="hidden-todo-id" value="${todo.id}"> `);
                        }


                        $('#todo-modal').modal("toggle");
                    }
                },

                error: function (error) {
                    console.error(error)
                }
            });
        }
    }

    // Edit BTN
    $("#todo-table").on("click", ".btn-edit", function () {
        const todoId = $(this).data('id');
        const mode = "edit"

        todoId && fetchTodo(todoId, mode);
    });

    // Delete BTN
   $("#todo-table").on("click",".btn-delete", function () {
        const todoId = $(this).data("id");

        if (todoId){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: `todos/${todoId}`,
                        type: "DELETE",
                        success: function (response) {
                            if (response.status === "success"){
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });

                                console.log(`${response.todo.id}`);
                                if (response.todo){
                                    console.log(`${response.todo.id}`);
                                    $(`#todo_${response.todo.id}`).remove();
                                }
                            }else {
                                Swal.fire({
                                    title: "Failed!",
                                    text: "Unable to delete file.",
                                    icon: "error"
                                });
                            }
                        },
                        error: function (error) {
                            Swal.fire({
                                title: "Failed!",
                                text: "Unable to delete file.",
                                icon: "error"
                            });
                        }
                    });


                }
            });
        }
   })

});
