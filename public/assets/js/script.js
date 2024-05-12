// $.ajaxSetup({
//     headers:  {
//         "X-CSRF-TOKEN" : $('meta[name="csrf-token"]').attr('content')
//     }
// });



$(document).ready(function(){


    $("#create-todo-btn").click(function(){
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

            $.ajax({
                url : "todos",
                type: "POST",
                data: formData,
                beforeSend: function(){
                    console.log("Loading....");
                },
                success: function(response){
                    $("#todo-form")[0].reset();
                    $("#todo-modal").modal("toggle");

                    if (response.status === 'success'){
                        console.log('response.test')
                        $("#response").html(
                            `<div class='alert alert-success alert-dismissble'>
                                ${response.message}
                                <button type="button" class="btn btn-close float-end" data-bs-dismiss="alert"></button>
                             </div>`
                        );

                        $("#todo-table").append(
                            `<tr>
                                <td class="dt-type-numeric sorting_1">${ response.todo.id }</td>
                                <td>${ response.todo.title }</td>
                                <td>${ response.todo.description }</td>
                                <td>${ response.todo.is_completed ? 'Yes' : 'No' }</td>
                                <td>
                                    <a class="btn btn-info btn-sm" href="javascript:void(0)" data-id="${response.todo.id}">View</a>
                                    <a class="btn btn-success btn-sm" href="javascript:void(0)" data-id="${response.todo.id}">Edit</a>
                                    <a class="btn btn-danger btn-sm" href="javascript:void(0)" data-id="${response.todo.id}">Delete</a>
                                </td>
                             </tr>`
                        );
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

    $('.btn-view').click(function () {
        const todoId = $(this).data("id");
        console.log(todoId);
    });
});
