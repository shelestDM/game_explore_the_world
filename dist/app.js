var player_element = document.getElementById("player");
var resource_element = document.getElementById("resource");
var count_element = document.getElementById("count");
var add_health_btn = document.getElementById("add_health");
var increase_speed_btn = document.getElementById("increase_speed");
var error_message_element = document.querySelector(".error");
var health_element = document.getElementById("health");
var header_height = 50;
var step = 10;
var health = 100;
var count_of_collected_resources = 100;
var helth_increase_coast = 10;
var speed_increase_coast = 25;
var player_size = { x: 50, y: 50 };
var resource_size = { x: 20, y: 20 };
function generateCoordinate(axis) {
    var coordinate = Math.floor(Math.random() * axis);
    if (coordinate < 100 + header_height) {
        return coordinate + 100 + header_height;
    }
    else if (coordinate - resource_size.x) {
        return coordinate - resource_size.x;
    }
    return coordinate;
}
var window_size = { x: window.innerWidth, y: window.innerHeight };
var player_coordinate = { x: 0, y: 50 };
var resource_coordinate = {
    x: generateCoordinate(window_size.x),
    y: generateCoordinate(window_size.y)
};
function setPositionByCoordinate(x, y, element) {
    if (element) {
        element.style.top = y + "px";
        element.style.left = x + "px";
    }
}
initializationOfGameEnvironment();
document.addEventListener("keydown", function (event) {
    switch (event.key.toLocaleLowerCase()) {
        case "w":
            player_coordinate.y -= step;
            break;
        case "s":
            player_coordinate.y += step;
            break;
        case "a":
            player_coordinate.x -= step;
            break;
        case "d":
            player_coordinate.x += step;
            break;
    }
    if (player_coordinate.x < 0 ||
        player_coordinate.x > window_size.x - player_size.x ||
        player_coordinate.y < header_height ||
        player_coordinate.y > window_size.y - player_size.y) {
        // alert("you cant go outside the map");
        returnPlayerToMap();
    }
    else {
        setPositionByCoordinate(player_coordinate.x, player_coordinate.y, player_element);
        checkIsResourceCollected();
    }
});
function returnPlayerToMap() {
    if (player_element && player_coordinate.x < 0) {
        player_coordinate.x = 0;
    }
    else if (player_element && player_coordinate.y < header_height) {
        player_coordinate.y = header_height;
    }
    else if (player_element &&
        player_coordinate.x > window_size.x - player_size.x) {
        player_coordinate.x = window_size.x - player_size.x;
    }
    else if (player_element &&
        player_coordinate.y > window_size.y - player_size.y) {
        player_coordinate.y = window_size.y - player_size.y;
    }
}
function checkIsResourceCollected() {
    var condition = player_coordinate.x < resource_coordinate.x + resource_size.x &&
        player_coordinate.x + player_size.x > resource_coordinate.x &&
        player_coordinate.y < resource_coordinate.y + resource_size.x &&
        player_coordinate.y + player_size.x > resource_coordinate.y;
    if (condition) {
        resource_coordinate.x = generateCoordinate(window_size.x);
        resource_coordinate.y = generateCoordinate(window_size.y);
        setPositionByCoordinate(resource_coordinate.x, resource_coordinate.y, resource_element);
        if (error_message_element === null || error_message_element === void 0 ? void 0 : error_message_element.classList.contains("visible")) {
            toggleErrorMessageVisibility();
        }
        showCollectedResourcesCount();
    }
}
function takeAwayPoints(points_count) {
    count_of_collected_resources = count_of_collected_resources - points_count;
    console.log(count_of_collected_resources);
}
add_health_btn === null || add_health_btn === void 0 ? void 0 : add_health_btn.addEventListener("click", function () {
    if (count_of_collected_resources >= 10) {
        takeAwayPoints(helth_increase_coast);
        helth_increase_coast++;
        health += 5;
        initializationOfPlayerData();
    }
    else if (!(error_message_element === null || error_message_element === void 0 ? void 0 : error_message_element.classList.contains("visible"))) {
        toggleErrorMessageVisibility();
    }
});
increase_speed_btn === null || increase_speed_btn === void 0 ? void 0 : increase_speed_btn.addEventListener("click", function () {
    if (count_of_collected_resources >= 25) {
        takeAwayPoints(speed_increase_coast);
        speed_increase_coast += 5;
        step += 10;
        initializationOfPlayerData();
    }
    else if (!(error_message_element === null || error_message_element === void 0 ? void 0 : error_message_element.classList.contains("visible"))) {
        toggleErrorMessageVisibility();
    }
});
function toggleErrorMessageVisibility() {
    error_message_element === null || error_message_element === void 0 ? void 0 : error_message_element.classList.toggle("visible");
}
;
function showCollectedResourcesCount() {
    if (count_element) {
        count_of_collected_resources++;
        count_element.textContent = (count_of_collected_resources).toString();
    }
}
function showHealth() {
    if (health_element)
        health_element.textContent = health.toString();
}
function initializationOfGameEnvironment() {
    initializationOfPlayerData();
    setPositionByCoordinate(player_coordinate.x, player_coordinate.y, player_element);
    setPositionByCoordinate(resource_coordinate.x, resource_coordinate.y, resource_element);
}
function initializationOfPlayerData() {
    showCollectedResourcesCount();
    showHealth();
}
