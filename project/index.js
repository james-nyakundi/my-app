
let form = document.querySelector(".mb-3")
console.log(form)
form.addEventListener('submit', handleSubmit)
function handleSubmit(e){
  e.preventDefault()
  let formData = {
    workout:e.target.Workout.value,
    duration:e.target.duration.value,
    calories:e.target.caloriesBurned.value,
    
  }
  console.log(formData)
  e.target.reset()
  //POST

  fetch('http://localhost:3000/Exercises', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => 
    console.log(data))
    }
//GET
function getExercises(){
    fetch('http://localhost:3000/Exercises')
  .then(response => {
   if (!response.ok) {
    throw new Error('Network response was not ok');
   }
  return response.json();
 })
  .then(data => {
    data.map((item)=>{
      AddExercise(item)
    })
    
    
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

}
getExercises()


function AddExercise(Exercise){
  let listExercise = document.querySelector( "#exercise-list")
console.log(listExercise)

let card = document.createElement('li')
card.className ="card col-2 m-2"
card.innerHTML =`
<img src="..." class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${Exercise.workout}</h5>
  <p>duration:${Exercise.duration}  </p>
  <P>CaloriesBurned:${Exercise.calories}</p>
  <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
</div>

`
listExercise.append(card)


card.querySelector('.delete-btn').addEventListener('click',()=>{
  card.remove()
  deleteExercise(Exercise.id)
  })


}
card.querySelector('.edit-btn').addEventListener('click',()=>{
  
})
//UPDATE
function updateExercise(){}
fetch('http://localhost:3000/Exercises/1063', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
},
  body: JSON.stringify({ 
  "workout":'weightlifting',
    "duration": '600',
    "calories": '250'

  
  }),
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


//DELETE
function deleteExercise(id){
fetch('http://localhost:3000/Exercises', {
    method: 'DELETE',
    headers: {
     'Content-Type': 'application/json',
    },
    
  })
    .then(response => response.json())
   .then(data => console.log(data))
   .catch(error => console.error('Error:', error));
}