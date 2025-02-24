let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });
    
  form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  };
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
    .then(response => response.json())
    .then(createdToy => {
      createToyCard(createdToy);
      e.target.reset();
    })
    .catch(error => console.error("Error adding toy:", error));
});
  

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    // For each toy in the array, call a function to create and render its card.
    toys.forEach(toy => {
      createToyCard(toy);
    });
  })
  .catch(error => console.error("Error fetching toys:", error))

});

function createToyCard(toyObj){
  const divCard = document.createElement('div');
  divCard.className = 'card'

  const header = document.createElement('h2')
  header.textContent = toyObj.name;
  divCard.appendChild(header);

  const img = document.createElement('img')
  img.src= toyObj.image
  img.className = "toy-avatar"
  divCard.appendChild(img);

  const likesParagraph = document.createElement("p");
  likesParagraph.textContent = `${toyObj.likes} Likes`;
  divCard.appendChild(likesParagraph);

  const btn = document.createElement('button')
  btn.className = 'like-btn';
  btn.id = toyObj.id;
  btn.textContent = 'Like ❤️'
  divCard.appendChild(btn);
  
  
  btn.addEventListener("click", () => {
    const newLikes = toyObj.likes + 1;
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: newLikes })
  })
    .then(response => response.json())
    .then(updatedToy => {
      
      likesParagraph.textContent = `${updatedToy.likes} Likes`;
      toyObj.likes = updatedToy.likes;
    })
    .catch(error => console.error("Error updating likes:", error));

});
const toyCollection = document.getElementById("toy-collection");
  toyCollection.appendChild(divCard);
}

