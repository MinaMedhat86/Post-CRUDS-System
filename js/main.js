
let postTitle = document.getElementById("title");
let postDesc = document.getElementById("description");
let postPrice = document.getElementById("price");
let searchInput = document.getElementById("search"); 
// ============================== get all data ============================
let posts =  [];
async function getPosts() {
    const response = await fetch("https://post-crud-system.vercel.app/getPosts");
    const {result} = await response.json();
    posts = result;
// console.log(result);
    let box = ``; 
    for (let index = 0; index < posts.length; index++) {
        
        box += `
        <tr>
        <td>${posts[index].id}</td>
        <td>${posts[index].title}</td>
        <td>${posts[index].description}</td>
        <td>${posts[index].price}  </td>
        <td>
        <button class="btn btn-warning py-1 px-3 text-white fw-bold " onclick="setData(${index})"> Update
        <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn btn-danger py-1 px-3 text-white fw-bold" onclick = "deletePost(${index})"> Delete
        <i class="fa-solid fa-trash"></i>
        </button>
        </td>
        
        </tr>
        `

    }
    document.getElementById("tbody").innerHTML = box;
  }
getPosts();


// =========================== add Post ======================================

async function addPost (){
const response = await fetch("https://post-crud-system.vercel.app/addPost",
{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    method: "POST",
    body: JSON.stringify({ title : postTitle.value,
        description : postDesc.value,
        price : postPrice.value})
})
const data = await response.json();
console.log(data);
getPosts()
}

// ======================== update Post ==============================
let globalId = '';
function setData (index){
    globalId = posts[index].id ;
     postTitle.value = posts[index].title ;
         postDesc.value =  posts[index].description;
         postPrice.value = posts[index].price ;

         document.getElementById("add").style.display = "none";
         document.getElementById("update").style.display = "block";
}

async function updatePost (){
    const response = await fetch("https://post-crud-system.vercel.app/updatePost",
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "PUT",
        body: JSON.stringify({ 
            id : globalId ,
            title : postTitle.value,
            description : postDesc.value,
            price : postPrice.value})
    })
    const data = await response.json();
    getPosts()
    clearData ()
    document.getElementById("add").style.display = "block";
    document.getElementById("update").style.display = "none";
    }


// ================= clear data =======================

function clearData (){
    postTitle.value = "" ;
         postDesc.value = "" ;
         postPrice.value = ""
}

// ===================== delete post ====================


async function deletePost (index){
    const response = await fetch("https://post-crud-system.vercel.app/deletePost",
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        method: "DELETE",
        body: JSON.stringify({ 
            id : posts[index].id })
    })
    const data = await response.json();
    getPosts()
    }

//===================== search =======================



function getSearch(){
    let searchArray = [];
    let box = ``;
// console.log(searchInput);
    for (let i = 0; i < posts.length; i++) {
        if(posts[i].title.toLowerCase().includes(searchInput.value.toLowerCase()) == true){
            searchArray.push(posts[i])
        }
       
        
    }

    for (let index = 0; index < searchArray.length; index++) {
        box += `
        <tr>
        <td>${searchArray[index].id}</td>
        <td>${searchArray[index].title}</td>
        <td>${searchArray[index].description}</td>
        <td>${searchArray[index].price}  </td>
        <td>
        <button class="btn btn-warning py-1 px-3 text-white fw-bold " onclick="setData(${index})"> Update
                <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn btn-danger py-1 px-3 text-white fw-bold" onclick = "deletePost(${index})"> Delete
        <i class="fa-solid fa-trash"></i>
        </button>
        </td>
        
        </tr>
        `
        
    }
    document.getElementById("tbody").innerHTML = box;

}
