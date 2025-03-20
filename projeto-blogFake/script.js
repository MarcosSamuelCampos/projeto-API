
async function readPosts() {
    console.log("passou aqui");
    let postArea = document.querySelector(".posts")
    postArea.innerHTML ="carregando posts..."

    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if(!response.ok){
            throw new Error(`Erro na requisição ${response.status}`)
        }
            let json = await response.json();

        if (json.length > 0) {
            postArea.innerHTML = "";
            let postsHTML = "";

            for(let posts of json){
            postsHTML = `<div><h1>${posts.title}</h1><p>${posts.body}</p><hr></div>`;
            postArea.innerHTML += postsHTML;
            }
    }else{
        postArea.innerHTML = "Nenhum post para ser exibido"
    }  
    }catch(error){
        postArea.innerHTML = "Erro ao carregar os posts"
    }
}
async function addNewPost(title,body){

    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/posts",{
        method : "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            body,
            userId:5
        })
    })
    if (!response.ok) {
        throw new Error(`Erro ao adicionar post: ${response.status}`); 
    }
        document.querySelector(`#titletext`).value = "";
        document.querySelector(`#bodyText`).value = "";

        readPosts();
    }catch(error){
        alert("Ocorreu um erro ao adicionar um novo post, tente novamente!") 
    }
     
    
}
function insertField(){
    let title = document.querySelector(`#titletext`).value;
    let body = document.querySelector(`#bodyText`).value;

    if (title && body) {
        addNewPost(title,body)
    } else {
        
        alert(`campo vazio, preencha todos!`)
    }
}

document.querySelector(`#insertBtn`).addEventListener(`click`,insertField)

readPosts();