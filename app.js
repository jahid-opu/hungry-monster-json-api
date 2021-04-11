
const searchMeal = () => {
    const mealName = document.getElementById('input').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMeals(data);
        });
}
const displayMeals = data => {
    const mealsDiv = document.getElementById('mealsArea');
    const infoDiv = document.getElementById('info');
    const list = document.getElementById('list');
    infoDiv.innerHTML = "";
    list.innerHTML = "";
    mealsDiv.innerHTML = "";
    data.meals.forEach(element => {
        div = document.createElement('div');
        div.className = 'meal';
        const mealInfo = `
        <img src=${element.strMealThumb} alt="">
        <h3>${element.strMeal}</h3>
        <button onclick="mealDetails('${element.strMeal}')" class="btn">Details </button>
        `;
        div.innerHTML = mealInfo;
        mealsDiv.appendChild(div);

    });
}
const mealDetails = meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayIngredients(data);
        })
}

const displayIngredients = data => {
    const ul = document.getElementById('list');
    const div = document.getElementById('info');
    ul.innerHTML = "";
    div.innerHTML = "";
    const name = data.meals[0].strMeal;
    const flag = data.meals[0].strMealThumb;
    const ingredient = `
    <img src=${flag} alt="">
    <h3> ${name} </h3>
    <h5>Ingredient</h5>
    `;
    div.innerHTML = ingredient;
    const part = [];
    let i = 0;
    for (const [key, value] of Object.entries(data.meals[0])) {
        part.push(key.slice(3, 13));
        let element = part[i++];
        if (element == 'Ingredient') {
            if (value != "" && value != null) {
                const li = document.createElement('li');
                li.innerText = value;
                ul.appendChild(li);
            }
        }
    }
}
