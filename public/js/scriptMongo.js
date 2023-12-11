const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.filepath+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.filename+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
                '<div class="card-reveal">'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#filename').val();
    formData.filepath = $('#filepath').val();

    console.log(formData);
    postPicture(formData);
}

function postPicture(picture){
    $.ajax({
        url:'/api/picture',
        type:'POST',
        data:picture,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('Picture post successful');
            }
        }
    });
}

function getAllPictures(){
    $.get('/api/pictures', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllPictures();
});