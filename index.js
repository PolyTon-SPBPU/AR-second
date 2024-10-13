function getQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return {
        "access_token": urlParams.get("access_token"),
        "task_id": urlParams.get("task_id"),
    };

}

function AR(price) {
    AFRAME.registerComponent('diceAnim', {
        schema: {},
        init: function () {
        },
        update: function () {
        },
        tick: function () {
            console.log("tick");
            while (this.el.object3D.position.z < -0.5) {
                this.el.object3D.position.z += 0.01;
            }

        },
        remove: function () {
        },
        pause: function () {
        },
        play: function () {
        }
    });
    document.addEventListener("DOMContentLoaded", () => {
        let marker = document.querySelector("#marker");
        let soundDice = document.querySelector("#sound_dice");
        let soundVictory = document.querySelector("#sound_victory");
        let dice1 = document.querySelector("#dice1");

        let text = document.querySelector("#text_price");
        text.setAttribute("value", "You have got " + price + " ITokens!");

        marker.addEventListener('markerLost', function () {
            soundDice.pause();
        });
        marker.addEventListener('markerFound', function () {
            soundDice.play();
            soundVictory.play();
        });
        soundDice.addEventListener('soundEnded', function () {
            soundVictory.play();
        });
    });

}

function getTaskInfo(accessToken, taskId, listener) {

    fetch("https://polytones.online/api/task/" + taskId, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        }
    })
        .then(
            res => {
                if(res.ok) {
                    res.json().then(
                        resJsonData => {
                            console.log("Successful fetch!!!");
                            listener(resJsonData.price_tokens);
                        }
                    )
                }
            })

}


let queryParams = getQueryString();
let accessToken = queryParams.access_token;
let taskId = queryParams.task_id
console.log("Task id got: " + taskId);
getTaskInfo(accessToken, taskId,
    price => {
        AR(price);
    }
);




