document.addEventListener("DOMContentLoaded", (event) => {
    const rootDiv = document.getElementById("root");

    const url = "https://league-of-legends-esports.p.rapidapi.com/teams";
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "25b4fddf65mshce37710dfcf438ep115a68jsnf350e46ec2ae",
            "X-RapidAPI-Host": "league-of-legends-esports.p.rapidapi.com",
        },
    };

    console.log("Starting fetch method");
    fetch(url, options)
        .then((result) => {
            return result.json();
        })
        .then((data) => {
            console.log(data);

            console.log("Teams list: ", data.data.teams);
            createCard(data.data.teams);
        })
        .catch((error) => {
            console.log(error);
        });

    function createCard(teamsList) {
        let divCardContainer;
        // let count = 0;
        let condition = false;

        for (let index = 0; index < teamsList.length; index++) {
            console.log("Team: ", teamsList[index]);

            condition =
                teamsList[index].homeLeague &&
                teamsList[index].homeLeague.region != "INTERNATIONAL";

            console.log("Condition: ", condition);

            if (condition) {
                divCardContainer = document.createElement("div");
                divCardContainer.setAttribute("class", "card text-left");
                let playersListEl = "";
                teamsList[index].players.forEach((element) => {
                    playersListEl += `<li class="list-group-item">${element.name}</li>`;
                });

                divCardContainer.innerHTML = `<div class="card text-left">
                <img class="card-img-top" src="${
                    teamsList[index].image ? teamsList[index].image : ""
                }" alt="">
                <div class="card-body">
                  <h4 class="card-title">${teamsList[index].name}</h4>
                  <p class="card-text">Playeyrs</p>

                    <ul class="list-group">
                        ${playersListEl}
                    </ul>

                </div>
              </div>`;
            }

            /* 
            if (count % 3 == 0 && condition) {
                console.log("Index: ", index);
                divCardContainer = document.createElement("div");
                divCardContainer.setAttribute("class", "card-columns");

                divCardContainer.innerHTML += `
                    <div class="card">
                        <img class="card-img-top" src="${
                            teamsList[index].image ? teamsList[index].image : ""
                        }" alt="">
                        <div class="card-body">
                            <h4 class="card-title">${teamsList[index].name}</h4>
                            <p class="card-text">Players</p>
                            
                            
                        </div>
                    </div>`;

                count++;
            } else {
                console.log("Index: ", index);

                if (condition) {
                    divCardContainer.innerHTML += `
                        <div class="card">
                            <img class="card-img-top" src="${
                                teamsList[index].image
                                    ? teamsList[index].image
                                    : ""
                            }" alt="">
                            <div class="card-body">
                                <h4 class="card-title">${
                                    teamsList[index].name
                                }</h4>
                                <p class="card-text">Text</p>
                            </div>
                        </div>`;
                    count++;
                }
            } */

            if (divCardContainer) rootDiv.appendChild(divCardContainer);
        }
    }
});
