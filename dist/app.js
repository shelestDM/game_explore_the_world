var player_element = document.getElementById("player");
var resource_element = document.getElementById("resource");
var player_size = { x: 50, y: 50 };
var resource_size = { x: 20, y: 20 };
function generateCoordinate(axis) {
    var coordinate = Math.floor(Math.random() * axis);
    if (coordinate < 100) {
        return coordinate + 100;
    }
    else if (coordinate - resource_size.x) {
        return coordinate - resource_size.x;
    }
    return coordinate;
}
var window_size = { x: window.innerWidth, y: window.innerHeight };
var player_coordinate = { x: 0, y: 0 };
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
setPositionByCoordinate(player_coordinate.x, player_coordinate.y, player_element);
setPositionByCoordinate(resource_coordinate.x, resource_coordinate.y, resource_element);
document.addEventListener("keydown", function (event) {
    // console.log(event.key);
    switch (event.key.toLocaleLowerCase()) {
        case "w":
            player_coordinate.y -= 10;
            break;
        case "s":
            player_coordinate.y += 10;
            break;
        case "a":
            player_coordinate.x -= 10;
            break;
        case "d":
            player_coordinate.x += 10;
            break;
    }
    if (player_coordinate.x < 0 ||
        player_coordinate.x > window_size.x - player_size.x ||
        player_coordinate.y < 0 ||
        player_coordinate.y > window_size.y - player_size.y) {
        alert("you cant go outside the map");
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
    else if (player_element && player_coordinate.y < 0) {
        player_coordinate.y = 0;
        console.log(player_coordinate);
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
    }
}
