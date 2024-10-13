function getQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return {
        "access_token": urlParams.get("access_token"),
        "task_id": urlParams.get("task_id"),
    };

}

function AR(price) {
    let marker = document.querySelector("#marker");
    let video = document.querySelector("#video_writer");

    marker.addEventListener('markerLost', function () {
        console.log("video pause");
        video.pause();
    });

    marker.addEventListener('markerFound', function () {
        console.log("video start");
        video.play();
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
                if (res.ok) {
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
    }
);




