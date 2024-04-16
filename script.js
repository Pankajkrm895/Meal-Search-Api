const searchInput = document.getElementById("search-btn");
const mealList=document.getElementById('meal');
const mealDetailsContent = document.getElementById("meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

searchInput.addEventListener('click', getMealList);
mealList.addEventListener('click', getRecipeMeal);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe')
});




function getMealList(){
   let searchInputTxt = document.getElementById("search-input").value.trim();
//    console.log(searchInputTxt);
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
   .then(response => response.json())
   .then(data=>{
        let html='';
            if(data.meals){
                data.meals.forEach(meal=>{
                    html += `<div class="meal-item" data-id="${meal.idMeal}">
                                <div class="meal-img">
                                    <img src="${meal.strMealThumb}" alt="">
                                </div>
                                <div class="meal-name">
                                    <h3>${meal.strMeal}</h3>
                                    <a href="#" class="recipe-btn">Get Recipe</a>
                                </div>
                            </div>
                    `;
                })
              mealList.classList.remove('notfound');
            }else{
                html="Sorry, we did not find any meal";
                mealList.classList.add('notfound')
            }
            mealList.innerHTML=html;
    })


}

function getRecipeMeal(e){
    e.preventDefault();
//   console.log(e.target);
 if(e.target.classList.contains('recipe-btn')){
  let mealItem = e.target.parentElement.parentElement;
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    .then(response => response.json())
    .then(data => mealRecipeModal(data.meals));
 }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal=meal[0];
    let html = `

      <h2 class="recipe-title">${meal.strMeal}</h2>
      <p class="recipe-category">${meal.strCategory}</p>
      <div class="recipe-instruct">
         <h3>instructions:</h3>
         <p>${meal.strInstructions}</p>
      </div>
      <div class="recipe-meal-img">
       <img src="${meal.strMealThumb}">
      </div>
      <div class="recipe-link>
       <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
      </div>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe')
}