let player_element: HTMLElement | null = document.getElementById("player");
let resource_element: HTMLElement | null = document.getElementById("resource");
let count_element : HTMLElement | null = document.getElementById("count");
let add_health_btn: HTMLElement | null = document.getElementById("add_health");
let increase_speed_btn: HTMLElement | null = document.getElementById("increase_speed");
let error_message_element:  HTMLElement | null  = document.querySelector(".error");
let health_element: HTMLElement | null = document.getElementById("health");

interface Coordinate {
  x: number;
  y: number;
}

let header_height:number =50;
let step:number = 10;
let health:number = 100;
let count_of_collected_resources: number =100;
let helth_increase_coast: number = 10;
let speed_increase_coast: number = 25;
let player_size: Coordinate = { x: 50, y: 50 };
let resource_size: Coordinate = { x: 20, y: 20 };

function generateCoordinate(axis: number): number {
  let coordinate: number = Math.floor(Math.random() * axis);
  if (coordinate < 100+header_height) {
    return coordinate + 100 + header_height;
  } else if (coordinate - resource_size.x) {
    return coordinate - resource_size.x;
  }
  return coordinate;
}

let window_size: Coordinate = { x: window.innerWidth, y: window.innerHeight };
let player_coordinate: Coordinate = { x: 0, y: 50 };

let resource_coordinate: Coordinate = {
  x: generateCoordinate(window_size.x),
  y: generateCoordinate(window_size.y),
};

function setPositionByCoordinate(
  x: number,
  y: number,
  element: HTMLElement | null
): void {
  if (element) {
    element.style.top = y + "px";
    element.style.left = x + "px";

  }
}

initializationOfGameEnvironment();

document.addEventListener("keydown", function (event): void {
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

  if (
    player_coordinate.x < 0 ||
    player_coordinate.x > window_size.x - player_size.x ||
    player_coordinate.y < header_height ||
    player_coordinate.y > window_size.y - player_size.y
  ) {
    // alert("you cant go outside the map");
    returnPlayerToMap();
  } else {
    setPositionByCoordinate(
      player_coordinate.x,
      player_coordinate.y,
      player_element
    );
    checkIsResourceCollected();
  }
});

function returnPlayerToMap(): void {
  if (player_element && player_coordinate.x < 0) {
    player_coordinate.x = 0;
  } else if (player_element && player_coordinate.y < header_height) {
    player_coordinate.y = header_height;
  } else if (
    player_element &&
    player_coordinate.x > window_size.x - player_size.x
  ) {
    player_coordinate.x = window_size.x - player_size.x;
  } else if (
    player_element &&
    player_coordinate.y > window_size.y - player_size.y
  ) {
    player_coordinate.y = window_size.y - player_size.y;
  }
}

function checkIsResourceCollected(): void {
  let condition =
    player_coordinate.x < resource_coordinate.x + resource_size.x &&
    player_coordinate.x + player_size.x > resource_coordinate.x &&
    player_coordinate.y < resource_coordinate.y + resource_size.x &&
    player_coordinate.y + player_size.x > resource_coordinate.y;
  if (condition) {
    resource_coordinate.x = generateCoordinate(window_size.x);
    resource_coordinate.y = generateCoordinate(window_size.y);
    setPositionByCoordinate(
      resource_coordinate.x,
      resource_coordinate.y,
      resource_element
    );
    if(error_message_element?.classList.contains("visible")){
      toggleErrorMessageVisibility();
    }
    showCollectedResourcesCount();
  }
}

function takeAwayPoints(points_count:number):void {
  count_of_collected_resources = count_of_collected_resources - points_count;
  console.log(count_of_collected_resources);
}

add_health_btn?.addEventListener("click", function(){
  if(count_of_collected_resources>=10){
    takeAwayPoints(helth_increase_coast);
    helth_increase_coast++;
    health+=5;
    initializationOfPlayerData();
  }else if(!error_message_element?.classList.contains("visible")){
    toggleErrorMessageVisibility()
  }
});

increase_speed_btn?.addEventListener("click", function(){
  if(count_of_collected_resources>=25){
    takeAwayPoints(speed_increase_coast);
    speed_increase_coast+=5;
    step+=10;
    initializationOfPlayerData();
  }else if(!error_message_element?.classList.contains("visible")){
    toggleErrorMessageVisibility();
  }
});

function toggleErrorMessageVisibility():void{
    error_message_element?.classList.toggle("visible");
};

function showCollectedResourcesCount(){
  if(count_element){
    count_of_collected_resources++;
    count_element.textContent = (count_of_collected_resources).toString();
  }
}

function showHealth(){
  if(health_element) health_element.textContent = health.toString();
}

function initializationOfGameEnvironment(){
  initializationOfPlayerData()
  setPositionByCoordinate(
    player_coordinate.x,
    player_coordinate.y,
    player_element
  );

  setPositionByCoordinate(
    resource_coordinate.x,
    resource_coordinate.y,
    resource_element
  );
}

function initializationOfPlayerData(){
  showCollectedResourcesCount()
  showHealth()
}