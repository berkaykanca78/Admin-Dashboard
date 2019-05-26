$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id=button.data('id');
    var firstName = button.data('name');
    var lastName = button.data('surname');
    var email = button.data('email');
    document.getElementById("inputName").value = firstName;
    document.getElementById("inputSurname").value = lastName;
    document.getElementById("inputEmail").value = email;
    document.getElementById("inputId").value = id;
})  