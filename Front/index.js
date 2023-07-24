$(document).ready(function () {
    $('#divTitulo').html('Titulo Padrao');
    $('#btnEnviar').click(function () {
        var nome = $('#inputNome').val();
        var idade = $('#inputIdade').val();

        if (nome === '' || idade === '') {
            alert('Favor preencher todos os campos.');
            return;
        }

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ nome: nome, idade: idade }),
            content: 'application/json',
            url: "http://127.0.0.1:3000/addUser", success: function (result) {
                fillUsers(result);
            }
        });
    });

    $.ajax({
        url: "http://127.0.0.1:3000/listUsers", success: function (result) {
            fillUsers(result);
        }
    });

    function fillUsers(result) {
        $('#tbodyUsuarios').empty();

        result.forEach((element, i) => {
            $('#tbodyUsuarios').append('<tr id="trUsuarioId-' + i + '"><td>' + element._id + '</td><td>' + element.nome + '</td><td>' + element.idade + '</td></tr>');
        });

        trDoubleClick();
        outSideClick();
    }

    var currentEdition = '';

    function trDoubleClick() {
        $('#tbodyUsuarios > tr').dblclick(function(e) {
            e.stopPropagation();

            var $tr = $(this);
            currentEdition = $tr[0].id;
            $($tr[0]).find('td').toArray().forEach(function(o, i) {
                if (i > 0) {
                    $(o).html("<input value='" + $(o).html() + "' />");
                }
            });
        });
    }

    function outSideClick() {
        $(window).click(function(e) {
            e.preventDefault();

            var targetName = e.target.localName;

            if (targetName === 'table' || targetName === 'tr' 
                || targetName === 'td' || targetName === 'tobdy' 
                || targetName === 'thead' || targetName === 'th') {
                return;
            }

            if (currentEdition !== '') {
                $('#' + currentEdition).find('td').toArray().forEach(function(o, i) {
                    $(o).html($($($(o)[0]).find('input')).val());
                });

                currentEdition = '';
            }
        });
    }
});