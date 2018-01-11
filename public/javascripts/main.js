$( document ).ready(function(){
    $('.delete').on('click', deleteTodo);
    $('.edit').on('click', editTodo);

    function deleteTodo(){
        // console.log($(this).data('id'));
    		$.ajax({
    			type: 'DELETE',	
    			url: '/delete/'+$(this).data('id')
    		});
        window.location.replace('/');
    }

    function editTodo(){
            $.ajax({
                type: 'GET', 
                url: '/edit/'+$(this).data('id')
            });
        window.location.replace('/edit/'+$(this).data('id'));
    }
});


