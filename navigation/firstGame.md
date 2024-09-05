---
toc: false
comments: false
layout: post
title: Week 7 Final Game
description: Cool Game
type: collab
courses: { csse: {week: 7} }
---










## Click on game to full screen!









<style>
    #canvas {
        margin: 0;
        border: 1px solid white;
        background: skyblue;
    }
</style>
<canvas id="canvas"></canvas>
<script>
    // Create empty canvas
    let canvas = document.getElementById('canvas');
    let c = canvas.getContext('2d');
    let fullScreen = false;
    // Set the canvas dimensions
    if(fullScreen == true){
    }else{
        canvas.width = 650;
        canvas.height = 400;
    }
    canvas.style.webkitFilter = "blur(0.25px)";
    // Set gravity value
    let gravity = 1.5;
    // Facing Value | true = right, false = left
    let facing = false;
    // Game start
    let gamestarted = false;
    // Score
    let score = 0;
    let highscore = 0;
    // Spawn Location
    let pSpawnX = 100;
    let pSpawnY = 200;
    // Health
    let lives = 3;
    let dmgDebounce = 0;
    let swordSound = 0;
    // Ultimate
    let ultActive = false;
    let ultPercentage = 0;
    let ultMaxPercentage = 100;
    let ultPercentageInc = 20;
    let ultBind = "f";
    let ultBlurDebounce = 0;
    //Menu debounce
    let menuDebounce = 0;
    // Enemy Speed
    let enemySpeed = 0.25;
    let enemyCap = 3;
    // Define the Player class
    class Player {
        constructor() {
            // Initial position and velocity of the player
            this.position = {
                x: pSpawnX,
                y: pSpawnY
            };
            this.velocity = {
                x: 0,
                y: 0
            };
            // Dimensions of the player
            this.width = 30;
            this.height = 30;
        }
        // Method to draw the player on the canvas
        draw() {
            c.fillStyle = 'yellow';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        // Method to update the player position and velocity
        update() {
            this.draw();
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            // Apply gravity if player is not at the bottom
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
                this.velocity.y += gravity;
            else
                this.velocity.y = 0;
        }
    }
    class Enemy {
        constructor(image) {
            // Initial position and velocity of the enemy
            this.position = {
                x: 500,
                y: 200
            };
            this.velocity = {
                x: 0,
                y: 0
            };
            // Dimensions of the enemy
            this.image = image;
            this.width = 30;
            this.height = 30;
        }
        // Method to draw the enemy on the canvas
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y);
        }
        // Method to update the enemy position and velocity
        update() {
            this.draw();
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            // Apply gravity if enemy is not at the bottom
            if (this.position.y + this.height + this.velocity.y <= canvas.height - 35)  /////////////////CHANGE BACK TO this.position.y + this.height + this.velocity.y <= canvas.height ONCE GAME DONE
                this.velocity.y += gravity;
            else
                this.velocity.y = 0;
        }
    }
    //Make Sword
    class Sword {
        constructor(){
            this.position = {
                x: 100,
                y: 200
            };
            // Dimensions of the sword
            this.width = 5;
            this.height = 35;
        }
         // Method to draw the player on the canvas
        draw() {
            c.fillStyle = 'purple';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        // Method to update the player position and velocity
        update() {
            this.draw();
        }
    }
    //Text
    var ctx = canvas.getContext("2d");
    // Set the font style
    ctx.font = "20px monospace"; // You can customize the font size and type
    // Set the text color
    ctx.fillStyle = "black"; // You can customize the text color
    // Define the Platform class
    class Platform {
        constructor() {
            // Initial position of the platform
            this.position = {
                x: 0,
                y: 360
            }
            //this.image = image;
            this.width = 50000;
            this.height = 40;
        }
        // Method to draw the platform on the canvas
        draw() {
            c.fillStyle = 'green';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        update() {
            this.draw()
        }
    }
    //hearts
    class Heart {
        constructor(image) {
            // Initial position of the platform
            this.position = {
                x: 0,
                y: 0
            }
            this.image = image;
            this.width = 25;
            this.height = 25;
        }
        // Method to draw the platform on the canvas
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y);
        }
        update() {
            this.draw()
        }
    }
    //healthpowerup
    class healthpowerup {
        constructor(image) {
            // Initial position of the platform
            this.position = {
                x: -100,
                y: -100
            }
            this.image = image;
            this.width = 25;
            this.height = 25;
        }
        // Method to draw the platform on the canvas
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y);
        }
        update() {
            this.draw()
        }
    }
    // Define the Tube class
    class Tube {
        constructor(image) {
            // Initial position of the tube
            this.position = {
                x: 500,
                y: 180
            }
            this.image = image;
            this.width = 100;
            this.height = 120;
        }
        // Method to draw the tube on the canvas
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    }
    // Define the BlockObject class
    class BlockObject {
         constructor() {
            // Initial position of the platform
            this.position = {
                x: 0,
                y: 0
            }
            //this.image = image;
            this.width = 100;
            this.height = 1000;
        }
        // Method to draw the platform on the canvas
        draw() {
            c.fillStyle = 'brown';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        update() {
            this.draw()
        }
    }
    //--
    // NEW CODE - CREATE GENERICOBJECT CLASS FOR THE BACKGROUND IMAGES
    //--
    class GenericObject {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y
            };
            this.image = image;
            this.width = 760;
            this.height = 82;
        }
        // Method to draw the generic object on the canvas
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y);
        }
    }
        // Load image sources
    let image = new Image();
    let imageTube = new Image();
    let imageBlock = new Image();
    //--
    // NEW CODE - ADD IMAGES FOR BACKGROUND
    //--
    let imageBackground = new Image();
    let imageHills = new Image();
    let imageEnemy = new Image();
    let imageHeart = new Image();
    image.src = 'https://samayass.github.io/samayaCSA/images/platform.png';
    imageTube.src = 'https://samayass.github.io/samayaCSA/images/tube.png';
    imageBlock.src = 'https://samayass.github.io/samayaCSA/images/box.png';
    imageHeart.src = '{{site.baseurl}}/images/8bitheartfix-removebg-preview.png';
    imageEnemy.src = '{{site.baseurl}}/images/8bitslime.png';
    //--
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    // NEW CODE - IMAGE URLS FOR BACKGROUND IMAGES
    //--
    imageBackground.src = 'https://samayass.github.io/samayaCSA/images/background.png';
    imageHills.src = '{{site.baseurl}}/images/Sonic_hedgehog_background.png'
    // Create instances of platform, tube, block object, and generic objects
    let platform = new Platform(image);
    let tube = new Tube(imageTube);
    let blockObject = new BlockObject(imageBlock);
    let sword = new Sword();
    //--
    // NEW CODE - CREATE ARRAY FOR GENERIC OBJECTS THEN ADD THE HILLS AND BACKGROUND
    //--
    let genericObjects = [
        new GenericObject({
            x:0, y:0, image: imageBackground
        }),
        new GenericObject({
            x:0, y:-150, image: imageHills
        }),
    ];
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
    }
    player = new Player();
    enemy1 = new Enemy(imageEnemy);
    let enemyHealth1 = 3;
    enemy1.position.x = 800;
    enemy2 = new Enemy(imageEnemy);
    enemy2.position.x = 500;
    let enemyHealth2 = 3;
    enemy3 = new Enemy(imageEnemy);
    enemy3.position.x = 700;
    let enemyHealth3 = 3;
    enemy4 = new Enemy(imageEnemy);
    enemy4.position.x = 1000;
    let enemyHealth4 = 3;
    enemy5 = new Enemy(imageEnemy);
    enemy5.position.x = 1200;
    let enemyHealth5 = 3;
    sword = new Sword();
    heart1 = new Heart(imageHeart);
    heart1.position.x = 500;
    heart1.position.y = 40;
    heart2 = new Heart(imageHeart);
    heart2.position.x = 540;
    heart2.position.y = 40;
    heart3 = new Heart(imageHeart);
    heart3.position.x = 580;
    heart3.position.y = 40;
    healthpowerup1 = new healthpowerup(imageHeart);
    healthpowerup1Enabled = false;
    healthpowerup2 = new healthpowerup(imageHeart);
    healthpowerup2Enabled = false;
    healthpowerup3 = new healthpowerup(imageHeart);
    healthpowerup3Enabled = false;
    border1 = new BlockObject();
    border1.position.x = 0;
    border2 = new BlockObject();
    border2.position.x = 1240;
    let attackSound;
    let pickupSound;
    let damageSound;
    let swordhitSound;
    let loseSound;
    let gameMusic;
    let ultReadySound;
    let ultSound;
    let musicPlayed = false;
    // Define keys and their states
    let keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    };
    //Sounds
    attackSound = new sound("{{site.baseurl}}/images/swinging-staff-whoosh.mp3");
    pickupSound = new sound("{{site.baseurl}}/images/pickup.mp3");
    damageSound = new sound("{{site.baseurl}}/images/ough.mp3");
    swordhitSound = new sound("{{site.baseurl}}/images/sword-hit.mp3");
    swordhitSound2 = new sound("{{site.baseurl}}/images/sword-hit.mp3");
    loseSound = new sound("{{site.baseurl}}/images/lose-sound.wav");
    ultReadySound = new sound("{{site.baseurl}}/images/ultimate-ready.mp3");
    ultSound = new sound("{{site.baseurl}}/images/ultimate.mp3");
    ultSound.volume = 2;
    gameMusic = new sound('{{site.baseurl}}/images/Dragon-Castle.mp3');
    gameMusic.loop = true;
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        if(gamestarted == false){
            c.beginPath();
            c.roundRect(50, 50, 550, 300,3);
            c.stroke();
            c.lineWidth = 3;
            c.fillStyle = '#000000aa';
            c.fill();
            c.fillStyle = 'black';
            c.font = "30px monospace";
            c.textAlign = "center";
            c.fillText("Welcome To Alex and Travis' Game",canvas.width/2,100);
            c.fillText("Press SPACE to continue",canvas.width/2,200);
            c.fillText("Highscore: " + highscore,canvas.width/2,270);
            c.fillText("Score: " + score,canvas.width/2,300);
            if(menuDebounce > 0){
                menuDebounce--;
            }
            addEventListener('keydown', ({ keyCode }) => {
                switch (keyCode) {
                    case 32:
                        if(gamestarted == false && menuDebounce == 0){
                        console.log('space');
                        gamestarted = true;
                        heart1.position.x = 500;
                        heart1.position.y = 40;
                        heart2.position.x = 540;
                        heart2.position.y = 40;
                        heart3.position.x = 580;
                        heart3.position.y = 40;
                        player.position.x = pSpawnX;
                        player.position.y = pSpawnY;
                        lives = 3;
                        enemyHealth1 = 3;
                        enemyHealth2 = 3;
                        enemyHealth3 = 3;
                        enemyHealth4 = 3;
                        enemyHealth5 = 3;
                        enemy1.position.y = 100;
                        enemy2.position.y = 1000;
                        enemy3.position.y = 1000;
                        enemy4.position.y = 1000;
                        enemy5.position.y = 1000;
                        enemy1.velocity.x = 0;
                        enemy1.velocity.y = 0;
                        enemy2.velocity.x = 0;
                        enemy2.velocity.y = 0;
                        enemy3.velocity.x = 0;
                        enemy3.velocity.y = 0;
                        enemy4.velocity.x = 0;
                        enemy4.velocity.y = 0;
                        enemy5.velocity.x = 0;
                        enemy5.velocity.y = 0;
                        healthpowerup1Enabled = false;
                        healthpowerup2Enabled = false;
                        healthpowerup3Enabled = false;
                        healthpowerup1.position.y = 1000;
                        healthpowerup2.position.y = 1000;
                        healthpowerup3.position.y = 1000;
                        ultPercentage = 0;
                        score = 0;
                        gameMusic.stop();
                        gameMusic.play();
                        break;
                        }
                }
            });
        }
        else if(gamestarted == true){
        //--
        // NEW CODE - DRAW GENERIC OBJECTS WITH FOR EACH LOOP
        //--
        genericObjects.forEach(genericObject => {
            genericObject.draw()
        });
        // Draw platform, player, tube, and block object
        player.update();
        sword.update();
        enemy1.update();
        enemy2.update();
        enemy3.update();
        enemy4.update();
        enemy5.update();
        border1.update();
        border2.update();
        platform.draw();
        c.fillStyle = "#000000aa";
        c.beginPath();
        c.roundRect(492.5,32.5,120,40,5);
        c.stroke();
        c.fill();
        heart1.update();
        heart2.update();
        heart3.update();
        healthpowerup1.update();
        healthpowerup2.update();
        healthpowerup3.update();
        //
        //Enemy AI
        enemyAI(enemy1);
        enemyAI(enemy2);
        enemyAI(enemy3);
        enemyAI(enemy4);
        enemyAI(enemy5);
        function enemyAI(enemy){
            if((player.position.x + player.width/2) > (enemy.position.x + enemy.width/2) && enemy.velocity.x < enemyCap){
                enemy.velocity.x += enemySpeed;
            }if((player.position.x + player.width/2) < (enemy.position.x + enemy.width/2) && enemy.velocity.x >-enemyCap){
                enemy.velocity.x -= enemySpeed;
            }
        }
        enemyHealthBar(enemy1,enemyHealth1);
        enemyHealthBar(enemy2,enemyHealth2);
        enemyHealthBar(enemy3,enemyHealth3);
        enemyHealthBar(enemy4,enemyHealth4);
        enemyHealthBar(enemy5,enemyHealth5);
        function enemyHealthBar(enemy,enemyHealth){
            c.fillStyle = "#000000aa";
            c.beginPath();
            c.roundRect(enemy.position.x + enemy.width/2 - 50/2, enemy.position.y - 10, 50, 7.5,5);
            c.stroke();
            c.fill();
            c.fillStyle = "lime";
            c.beginPath();
            c.roundRect(enemy.position.x + enemy.width/2 - 50/2, enemy.position.y - 9, 48 * (enemyHealth/3), 5, 5);
            c.stroke();
            c.fill();
        }
        //Player damage
        enemyCollision(enemy1);
        enemyCollision(enemy2);
        enemyCollision(enemy3);
        enemyCollision(enemy4);
        enemyCollision(enemy5);
        if(dmgDebounce > 0){
            dmgDebounce--;
        }
        function enemyCollision(enemy){
            if(isColliding(player, enemy) && dmgDebounce <=0){
                const enemypos = (enemy.position.x + enemy.width/2);
                const playerpos = (player.position.x + player.width/2);
                dmgDebounce = 15;
                //enemy.position.y = 200;
                //enemy.position.x = 500;
                player.velocity.y = -22.5;
                enemy.velocity.y = -20;
                if(enemypos > playerpos){
                    console.log("Contact Left");
                    player.velocity.x = -5;
                    enemy.velocity.x = 12;
                }else if(enemypos <= playerpos){
                    player.velocity.x = 5;
                    enemy.velocity.x = -12;
                    console.log("Contact Right");
                }
                damageSound.play();
                if(lives == 3){
                    heart3.position.y = -45;
                }else if (lives == 2){
                    heart2.position.y = -45
                }else if (lives == 1){
                    heart1.position.y = -45;
                    loseSound.play();
                    gameMusic.stop();
                    gameMusic.currentTime = 0;
                    if(score>highscore){
                        highscore = score;
                    }
                    gamestarted = false;
                    menuDebounce = 100;
                }
                lives--;
            }
        }
        healthpowerup1Enabled = healthCollision(healthpowerup1, healthpowerup1Enabled);
        healthpowerup2Enabled = healthCollision(healthpowerup2, healthpowerup2Enabled);
        healthpowerup3Enabled = healthCollision(healthpowerup3, healthpowerup3Enabled);
        function healthCollision(healthP, healthPActive){
            if(isColliding(player,healthP)){
                if(lives < 3){
                    pickupSound.play();
                    if(lives == 2){
                        healthP.position.y = -100;
                        heart3.position.y = 40;
                        healthPActive = false
                    }else if(lives == 1){
                        healthP.position.y = -100;
                        heart2.position.y = 40;
                        healthPActive = false
                    }
                    lives++;
                }
                console.log(lives);
                console.log(healthPActive);
            }
            return healthPActive;
        }
        //Move sword;
        if(facing == true){
            sword.position.y = player.position.y - 2;
            sword.position.x = (player.position.x + player.width/2) + 15;
        }else if(facing == false){
            sword.position.y = player.position.y - 2;
            sword.position.x = (player.position.x + player.width/2) - 15;
        }
        // Score
        // Set the text content and position
        c.fillStyle = "#000000aa";
        c.beginPath();
        c.roundRect(45,25,125,40,5);
        c.stroke();
        c.fill();
        c.fillStyle = 'white';
        c.textAlign = 'left';
        c.font = "20px monospace";
        var text = "Score: "+score;
        var x = 50; // X-coordinate
        var y = 50; // Y-coordinate
        // Draw the text on the canvas
        ctx.fillText(text, x, y);
        // ULTIMATE ABILITY
        c.fillStyle = "#000000aa";
        c.beginPath();
        c.roundRect(canvas.width/2 - 85,30,200,30,5);
        c.stroke();
        c.fill();
        c.fillStyle = "#0088ffee";
        c.beginPath();
        c.roundRect(canvas.width/2 - 85,30,(ultPercentage/ultMaxPercentage) * 200,30,5);
        c.stroke();
        c.fill();
        if(ultPercentage >= ultMaxPercentage){
            c.fillStyle = 'black';
            c.textAlign = 'left';
            c.font = "15px monospace";
            ctx.fillText("ULTIMATE READY", canvas.width/2 - 85,50)
            c.font = "12px monospace";
            ctx.fillText("Press: " + ultBind, canvas.width/2 + 50,48)
        }
        if(ultBlurDebounce > 1){
            canvas.style.webkitFilter = "blur(5px)";
            ctx.filter = 'invert(1)';
            ultBlurDebounce--;
        }else if(ultBlurDebounce == 1){
            ultBlurDebounce = 0;
            canvas.style.webkitFilter = "blur(0.25px)";
            ctx.filter = 'invert(0)';
            gameMusic.play();
        }
        //Collisions
        collision(platform, player);
        collision(platform, enemy1);
        collision(platform, enemy2);
        collision(platform, enemy3);
        collision(platform, enemy4);
        collision(platform, enemy5);
        //Respawn enemy
        //collision(blockObject);
        //console.log(enemy.position);
        // Handle collisions and interactions
        // Handle collision between player and block object
        function collision(funcObject, objectToCollide){
            if (
                objectToCollide.position.y + objectToCollide.height <= funcObject.position.y &&
                objectToCollide.position.y + objectToCollide.height + objectToCollide.velocity.y >= funcObject.position.y &&
                objectToCollide.position.x + objectToCollide.width >= funcObject.position.x &&
                objectToCollide.position.x <= funcObject.position.x + funcObject.width
            )
            {
                objectToCollide.velocity.y = 0;
            }
        }
        function isColliding(spriteA, spriteB) {
            const collision =
                spriteA.position.x < spriteB.position.x + spriteB.width &&
                spriteA.position.x + spriteA.width > spriteB.position.x &&
                spriteA.position.y < spriteB.position.y + spriteB.height &&
                spriteA.position.y + spriteA.height > spriteB.position.y;
            return collision;
        }
        //prevent form going too high
        if(
            player.position.y + player.height <= 30
        ){
            player.velocity.y = 0;
            player.position.y = 30+player.height
        }
        checkEnemyWall(enemy1);
        checkEnemyWall(enemy2);
        checkEnemyWall(enemy3);
        checkEnemyWall(enemy4);
        checkEnemyWall(enemy5);
        function checkEnemyWall(enemy){
            if(isColliding(enemy, border1)){
                enemy.velocity.x = -enemy.velocity.x
            }else if(isColliding(enemy, border2)){
                enemy.velocity.x = -enemy.velocity.x
            }
        }
        // Move the player horizontally and adjust other objects
        if (keys.right.pressed && player.position.x < 500) {
            player.velocity.x = 15;
        }
        else if (keys.left.pressed && player.position.x > 100) {
            player.velocity.x = -15;
        }else if (player.velocity.y < 0 && player.position.x < 500 && player.position.x > 100){
        }
        //--
        // NEW CODE - PARALLAX SCROLLING EFFECT (MAKE THE BACKGROUND MOVE TO CREATE ILLUSION OF PLAYER MOVING)
        //--
        else {
            player.velocity.x = 0;
            if (keys.right.pressed && !keys.left.pressed && genericObjects[0].position.x > -700) {
                // make the background move slower for a cooler effect
                genericObjects.forEach(genericObject => {
                    genericObject.position.x -= 5;
                });
                enemy1.position.x -= 5;
                enemy2.position.x -= 5;
                enemy3.position.x -= 5;
                enemy4.position.x -= 5;
                enemy5.position.x -= 5;
                border1.position.x -= 5;
                border2.position.x -= 5;
                healthpowerup1.position.x -= 5;
                healthpowerup2.position.x -= 5;
                healthpowerup3.position.x -= 5;
            }
            else if (keys.left.pressed && !keys.right.pressed && genericObjects[0].position.x < 0) {
                genericObjects.forEach(genericObject => {
                    genericObject.position.x += 5;
                });
                enemy1.position.x += 5;
                enemy2.position.x += 5;
                enemy3.position.x += 5;
                enemy4.position.x += 5;
                enemy5.position.x += 5;
                border1.position.x += 5;
                border2.position.x += 5;
                healthpowerup1.position.x += 5;
                healthpowerup2.position.x += 5;
                healthpowerup3.position.x += 5;
            }
        }
        }
    }
    // Start the animation loop
    animate();
    // Event listener for key presses
    addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log('left');
                keys.left.pressed = true;
                facing = false;
                break;
            case 83:
                console.log('down');
                break;
            case 68:
                console.log('right');
                keys.right.pressed = true;
                facing = true;
                break;
            case 87:
                console.log('up');
                if(player.velocity.y == 0){player.velocity.y = -20;}
                break;
            case 32:
                break;
        }
    });
    // Event listener for key releases
    function powerupAdd(enemyPosX, enemyPosY){
        const randNum = getRandomInt(2);
        if(randNum == 1){
            console.log("Add")
            if (healthpowerup1Enabled == false){
                healthpowerup1Enabled = true;
                healthpowerup1.position.x = enemyPosX
                healthpowerup1.position.y = enemyPosY
            }else if (healthpowerup2Enabled == false){
                healthpowerup2Enabled = true;
                healthpowerup2.position.x = enemyPosX
                healthpowerup2.position.y = enemyPosY
            }else if (healthpowerup3Enabled == false){
                healthpowerup3Enabled = true;
                healthpowerup3.position.x = enemyPosX
                healthpowerup3.position.y = enemyPosY
            }
        }else if(randNum <= 0){
            console.log("Nothin");
        }
    }
    function respawnEnemy(enemy){
            enemy.position.x = Math.random() * ((border2.position.x - 100) - (border1.position.x+100)) + (border1.position.x+100);
            enemy.position.y = 200;
            enemy.velocity.x = 0;
            enemy.velocity.y = 0;
        }
    addEventListener('keyup', ({ keyCode }) => {
        switch (keyCode) {
            case 65:
                console.log('left');
                keys.left.pressed = false;
                player.velocity.x = 0;
                break;
            case 83:
                console.log('down');
                break;
            case 68:
                console.log('right');
                player.velocity.x = 0;
                keys.right.pressed = false;
                break;
            case 87:
                console.log('up');
                //if(player.velocity.y == 0){player.velocity.y = -20;}
                break;
            case 70:
                console.log('f');
                if(ultPercentage >= ultMaxPercentage){
                    gameMusic.stop();
                    ultSound.play();
                    ultPercentage = 0;
                    dmgDebounce = 50;
                    ultBlurDebounce = 40;
                    if(score == 5){
                        respawnEnemy(enemy2);
                    }else if(score >= 15 && score < 27){
                        respawnEnemy(enemy3);
                    }else if(score >= 25 && score < 53){
                        respawnEnemy(enemy4);
                    }else if(score >= 50 && score < 55){
                        respawnEnemy(enemy5);
                    }
                    if(facing == false){
                        enemyHealth1 = checkLeftEnemy(enemy1,enemyHealth1);
                        enemyHealth2 = checkLeftEnemy(enemy2,enemyHealth2);
                        enemyHealth3 = checkLeftEnemy(enemy3,enemyHealth3);
                        enemyHealth4 = checkLeftEnemy(enemy4,enemyHealth4);
                        enemyHealth5 = checkLeftEnemy(enemy5,enemyHealth5);
                    }else if(facing == true){
                        enemyHealth1 = checkRightEnemy(enemy1,enemyHealth1);
                        enemyHealth2 = checkRightEnemy(enemy2,enemyHealth2);
                        enemyHealth3 = checkRightEnemy(enemy3,enemyHealth3);
                        enemyHealth4 = checkRightEnemy(enemy4,enemyHealth4);
                        enemyHealth5 = checkRightEnemy(enemy5,enemyHealth5);
                    }
                }
                function checkRightEnemy(enemy){
                    if(enemy.position.x > player.position.x && enemy.position.y < 500){
                        enemyHealth = 0;
                        if(enemyHealth == 0){
                            enemyHealth = 3;
                            powerupAdd(enemy.position.x, enemy.position.y);
                            respawnEnemy(enemy);
                            score++;
                        }
                    }
                    return enemyHealth;
                }
                function checkLeftEnemy(enemy){
                    if(enemy.position.x < player.position.x && enemy.position.y < 500){
                        enemyHealth = 0;
                        if(enemyHealth == 0){
                            enemyHealth = 3;
                            powerupAdd(enemy.position.x, enemy.position.y);
                            respawnEnemy(enemy);
                            score++;
                        }
                    }
                    return enemyHealth;
                }
                break;
            case 32: ///////////////FIX GAME OVER BUG TRAVIS YK WHAT IM TALKIN ABOUT.
                console.log('space');
                enemyHealth1 = enemyDamage(enemy1,enemyHealth1);
                enemyHealth2 = enemyDamage(enemy2,enemyHealth2);
                enemyHealth3 = enemyDamage(enemy3,enemyHealth3);
                enemyHealth4 = enemyDamage(enemy4,enemyHealth4);
                enemyHealth5 = enemyDamage(enemy5,enemyHealth5);
                attackSound.play();
                function enemyDamage(enemy,enemyHealth){
                    if (facing == false && player.position.x + player.width/2 - enemy.position.x + enemy.width/2 < 100 && player.position.x + player.width/2 - enemy.position.x + enemy.width/2 > 0 && player.position.y + player.height/2 - 10 < enemy.position.y + enemy.height/2 && player.position.y + player.height/2 + 10 > enemy.position.y + enemy.height/2){ //left
                        enemy.velocity.y = -20;
                        enemy.velocity.x = -5;
                        if(swordSound == 0){
                            swordSound = 1;
                            swordhitSound.play();
                        }else{
                            swordSound = 0;
                            swordhitSound2.play();
                        }
                        enemyHealth--;
                        console.log(enemyHealth);
                        console.log(player.position.x + player.width/2 - enemy.position.x + enemy.width/2);
                        if(enemyHealth == 0){
                            enemyHealth = 3;
                            powerupAdd(enemy.position.x, enemy.position.y);
                            respawnEnemy(enemy);
                            if(ultPercentage < ultMaxPercentage){
                                ultPercentage += ultPercentageInc;
                                if(ultPercentage >= ultMaxPercentage){
                                    ultReadySound.play();
                                }
                            }
                            score++;
                            if(score == 5){
                                respawnEnemy(enemy2);
                            }else if(score == 15){
                                respawnEnemy(enemy3);
                            }else if(score == 25){
                                respawnEnemy(enemy4);
                            }else if(score == 50){
                                respawnEnemy(enemy5);
                            }
                        }
                    }else if (facing == true && enemy.position.x + enemy.width/2 - player.position.x + player.width/2 < 100 && enemy.position.x + enemy.width/2 - player.position.x + player.width/2 > 0 && player.position.y + player.height/2 - 10 < enemy.position.y + enemy.height/2 && player.position.y + player.height/2 + 10 > enemy.position.y + enemy.height/2){ //right
                        enemy.velocity.y = -20;
                        enemy.velocity.x = 5;
                        if(swordSound == 0){
                            swordSound = 1;
                            swordhitSound.play();
                        }else{
                            swordSound = 0;
                            swordhitSound2.play();
                        }
                        enemyHealth--;
                        console.log(enemyHealth);
                        console.log(enemy.position.x + enemy.width/2 - player.position.x + player.width/2);
                        if(enemyHealth == 0){
                            enemyHealth = 3;
                            powerupAdd(enemy.position.x, enemy.position.y);
                            respawnEnemy(enemy);
                            if(ultPercentage < ultMaxPercentage){
                                ultPercentage += ultPercentageInc;
                                if(ultPercentage >= ultMaxPercentage){
                                    ultReadySound.play();
                                }
                            }
                            score++;
                            if(score == 5){
                                respawnEnemy(enemy2);
                            }else if(score == 15){
                                respawnEnemy(enemy3);
                            }else if(score == 25){
                                respawnEnemy(enemy4);
                            }else if(score == 50){
                                respawnEnemy(enemy5);
                            }
                        }
                    }
                    return enemyHealth;
                }
                break;
        }
    });
    function fullscreen(){
        var el = document.getElementById('canvas');
           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }            
        }
    document.getElementById('canvas').addEventListener("click",fullscreen)