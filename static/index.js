let input = document.getElementById("url")
let copy_btn = document.getElementById("copy")
let paste_btn = document.getElementById("paste")
let submit_btn = document.getElementById("submit")


input.addEventListener("input", () => {
    if (input.value.trim() === ""){
        paste_btn.style.display = 'block'
        submit_btn.style.display = 'none'
    }
    else{
        paste_btn.style.display = 'none'
        submit_btn.style.display = 'block'
    }
})

function copy(){
    let text = document.getElementById('link').innerHTML
    console.log(text)
    navigator.clipboard.writeText(text)
}

function paste(){
    navigator.clipboard.readText().then((clipText) =>
        document.getElementById("url").value = clipText);
}


$(document).on('submit', '#url_shortner', function(e){

    e.preventDefault();

    let req = $.ajax({
        url: '',
        type:'post',
        data:{
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
            url: $('#url').val()
        }
    })

    req.done(function(response){
    
        $('#link').href = response.url
        document.getElementById('link').href = response.url
        document.getElementById('link').innerHTML = response.url
        var token  = document.getElementsByName('csrfmiddlewaretoken')[0]
        token.value = response['token']
        document.getElementById('output').style.display = 'block'

    })
})
