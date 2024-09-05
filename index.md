---
layout: base
title: Travis Website
description: Welcome.
image: /images/mario_animation.png
hide: true
---

<!-- Liquid:  statements -->

<!-- Include submenu from _includes to top of pages -->
{% include nav_home.html %}
<!--- Concatenation of site URL to frontmatter image  --->
{% assign sprite_file = site.baseurl | append: page.image %}
<!--- Has is a list variable containing mario metadata for sprite --->
{% assign hash = site.data.mario_metadata %}  
<!--- Size width/height of Sprit images --->
{% assign pixels = 256 %} 

<!--- HTML for page contains <p> tag named "Mario" and class properties for a "sprite"  -->

<p id="mario" class="sprite"></p>
  
<!--- Embedded Cascading Style Sheet (CSS) rules, 
        define how HTML elements look 
--->
<style>

  /*CSS style rules for the id and class of the sprite...
  */
  .sprite {
    height: {{pixels}}px;
    width: {{pixels}}px;
    background-image: url('{{sprite_file}}');
    background-repeat: no-repeat;
  }

  /*background position of sprite element
  */
  #mario {
    background-position: calc({{animations[0].col}} * {{pixels}} * -1px) calc({{animations[0].row}} * {{pixels}}* -1px);
  }
</style>
<body>
  <p id='speech' style='display: none; background-position: -2816px -3072px; padding: 5px; position: absolute; background-color: #00000088; border-radius: 10px 10px 10px 10px'>HELLO!</p>     
</body>
<!--- Embedded executable code--->
<script>
  ////////// convert YML hash to javascript key:value objects /////////
  var wordList = ["Hello Im Mario!", "Travis is the best coder", "You should give Travis an A+ for his hard work!", "Did you know racecar spelled backwards is racecar?", "Canvas is annoying to code in.", "Guess what...     CHICKEN BUTT!", "This is fun.", 'Hola, hi, hallo, Privet, Nǐ hǎo, Ciao, Anyoung', "How are you doing today?", "My favorite color is blue", "I think Travis should get at least 101% on this project.. PLEASE", "This is probably the best project, right?", "Fun Fact: Giraffes are 30 times more likely to get hit by lightning than people", "Fun Fact: The largest piece of fossilised dinosaur poo discovered is over 30cm long and over two litres in volume. ","Fun Fact: Animals can experience time differently from humans.","Fun Fact: All the world’s bacteria stacked on top of each other would stretch for 10 billion light-years. ","Fun Fact: The fear of long words is called Hippopotomonstrosesquippedaliophobia. ","Fun Fact: Competitive art used to be an Olympic sport.","Fun Fact: The longest English word is 189,819 letters long.","Fun Fact: The circulatory system is more than 60,000 miles long.","Fun Fact: It’s impossible to hum while holding your nose.","Fun Fact: Finland has more saunas than cars.","Fun Fact: McDonald’s once made bubblegum-flavored broccoli."];
  function getCSS(element) {
    var text = document.getElementById("speech");
    let css_data = '';
    let css_obj = getComputedStyle(element);
    for (let i = 0; i < css_obj.length; i++) {
        css_data +=
            css_obj[i] + ':' +
            css_obj.getPropertyValue(css_obj[i])
            + ';<br>';
        if(css_obj[i] == "top"){
          console.log("RAN CODE");
          var currentValue = css_obj.getPropertyValue(css_obj[i]);
          var currentValueAsNumber = parseInt(currentValue);
          var newValue = currentValueAsNumber + 70;
          console.log(currentValue);
          console.log(newValue);
          text.style.top = newValue + 'px';
        }
        if(css_obj[i] == "left"){
          var currentValue = css_obj.getPropertyValue(css_obj[i]);
          var currentValueAsNumber = parseInt(currentValue);
          var newValue = currentValueAsNumber + 100;
          console.log(newValue + 'px');
          text.style.left = newValue + 'px';
        }
    }
  }
  function toggleText() {
    var text = document.getElementById("speech");
    if (text.style.display === "none") {
      text.style.display = "block";
      var speech = wordList[Math.floor(Math.random()*wordList.length)];
      console.log(speech);
      text.innerHTML = speech;
      getCSS(document.getElementById('mario'));
    } else {
      text.style.display = "none";
    }
  }

  var mario_metadata = {}; //key, value object
  {% for key in hash %}  
  
  var key = "{{key | first}}"  //key
  var values = {} //values object
  values["row"] = {{key.row}}
  values["col"] = {{key.col}}
  values["frames"] = {{key.frames}}
  mario_metadata[key] = values; //key with values added

  {% endfor %}

  ////////// game object for player /////////

  class Mario {
    constructor(meta_data) {
      this.tID = null;  //capture setInterval() task ID
      this.positionX = 0;  // current position of sprite in X direction
      this.currentSpeed = 0;
      this.marioElement = document.getElementById("mario"); //HTML element of sprite
      this.pixels = {{pixels}}; //pixel offset of images in the sprite, set by liquid constant
      this.interval = 100; //animation time interval
      this.obj = meta_data;
      this.marioElement.style.position = "absolute";
    }

    animate(obj, speed) {
      let frame = 0;
      const row = obj.row * this.pixels;
      this.currentSpeed = speed;

      this.tID = setInterval(() => {
        const col = (frame + obj.col) * this.pixels;
        this.marioElement.style.backgroundPosition = `-${col}px -${row}px`;
        this.marioElement.style.left = `${this.positionX}px`;

        this.positionX += speed;
        frame = (frame + 1) % obj.frames;

        const viewportWidth = window.innerWidth;
        if (this.positionX > viewportWidth - this.pixels) {
          document.documentElement.scrollLeft = this.positionX - viewportWidth + this.pixels;
        }
      }, this.interval);
    }

    startWalking(speed) {
      this.stopAnimate();
      this.animate(this.obj["Walk"], speed);
    }

    startRunning() {
      this.stopAnimate();
      this.animate(this.obj["Run1"], 6);
    }

    startPuffing() {
      this.stopAnimate();
      this.animate(this.obj["Puff"], 0);
    }

    startCheering() {
      this.stopAnimate();
      this.animate(this.obj["Cheer"], 0);
    }

    startFlipping() {
      this.stopAnimate();
      this.animate(this.obj["Flip"], 0);
    }

    startResting() {
      this.stopAnimate();
      this.animate(this.obj["Rest"], 0);
    }

    stopAnimate() {
      clearInterval(this.tID);
    }
  }

  const mario = new Mario(mario_metadata);

  ////////// event control /////////

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (event.repeat) {
        mario.startCheering();
      } else {
        if (mario.currentSpeed <= 0) {
          mario.startWalking(3);
        } else if (mario.currentSpeed === 3) {
          mario.startRunning();
        }
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        if(mario.currentSpeed >= 0){
          mario.startWalking(-3);
        }else if(mario.currentSpeed === -3){
          mario.startPuffing();
        }
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startFlipping();
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (event.repeat) {
        mario.stopAnimate();
      } else {
        mario.startCheering();
        toggleText();
      }
    }
  });

  //touch events that enable animations
  window.addEventListener("touchstart", (event) => {
    event.preventDefault(); // prevent default browser action
    if (event.touches[0].clientX > window.innerWidth / 2) {
      // move right
      if (currentSpeed <= 0) { // if at rest, go to walking
        mario.startWalking(3);
      } else if (currentSpeed === 3) { // if walking, go to running
        mario.startRunning();
      }
    } else {
      // move left
      if(mario.currentSpeed >= 0){
        mario.startWalking(-3);
      }else if(mario.currentSpeed === -3){
        mario.startPuffing();
      }
    }
  });

  //stop animation on window blur
  window.addEventListener("blur", () => {
    mario.stopAnimate();
  });

  //start animation on window focus
  window.addEventListener("focus", () => {
     mario.startFlipping();
  });

  //start animation on page load or page refresh
  document.addEventListener("DOMContentLoaded", () => {
    // adjust sprite size for high pixel density devices
    const scale = window.devicePixelRatio;
    const sprite = document.querySelector(".sprite");
    sprite.style.transform = `scale(${0.2 * scale})`;
    mario.startResting();
  });

</script>
{% include aboutme_home.html %}