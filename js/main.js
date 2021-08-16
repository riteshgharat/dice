var dice1 = document.getElementById('dice1');
var dice2 = document.getElementById('dice2');
var txt = document.getElementById('output-txt');

var diceone = document.querySelector('.d-one');

const colors = [
"#FF6C6C",
"#7B6BFF",

/* Custom Colors
"#60d394", "#d36060", "#c060d3", "#d3d160","#606bd3","#60c2d3" */
];
let colorIndex = 0;

/*Dice Main Function */
function btn() {
  //function to get random numbers
  var digits1 = Math.floor(Math.random() * 6) + 1;
  var digits2 = Math.floor(Math.random() * 6) + 1;

  var option = document.getElementById('option').value;

  //function to define numbers of option
  switch (option) {
    case "1":
      dice2.style.display = 'none';
      //dice1.style.height = '250px';
      //dice1.style.width = '250px';
      //dice1.style.fontSize = '150px';
      diceone.classList.add('dice-one');
      total = digits1;
      digits2 = 0;

      if (digits1 == 6) {
        total = 'One More Change!';
        txt.style.visibility = "visible";
        txt.style.backgroundColor = "Red";
        txt.style.color = '#fff';
        document.getElementById('ohyeah').play();
      }
      else {
        txt.style.visibility = "hidden";
      }
      console.log(total, digits1, digits2);
      break;

    case "2":
      dice2.style.display = 'block';
      dice1.style.display = 'block';
      diceone.classList.remove('dice-one');

      total = 'Number is: ' + (digits1 + digits2);

      if (digits1 == digits2) {
        total = 'One More Change!';
        txt.style.visibility = "visible";
        txt.style.backgroundColor = "Red";
        txt.style.color = '#fff';
        document.getElementById('ohyeah').play();
      } else {
        total;
        txt.style.visibility = "visible";
        txt.style.backgroundColor = "#FDFF57";
        txt.style.color = '#000';
      }
      console.log(total, digits1, digits2);
      break;
  }

  //dice output
  dice1.innerHTML = digits1;
  dice2.innerHTML = digits2;

  txt.innerHTML = total;

  var audio = document.getElementById('audio').play();

  //function to chanhe background color
  document.querySelector('body').style.backgroundColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
}
// Acceleration detection 

window.addEventListener('devicemotion', function(ev) {
  if (ev.acceleration.x > 10 || ev.acceleration.y > 10) {
    btn();
    //txt.innerHTML = 'acceleration works!';
  }
else{
console.log('acceleration not work')
}
})
/*Sharing Function*/
function share() {
  if (navigator.share) {
    navigator.share({
        title: 'Crazy Dices Vs1.5',
        text: 'Crazy Dices Vs1.5. Check it now!',
        url: 'https://crazydice.netlify.app',
      }).then(() => {
        //console.log('Thanks for sharing!');
        txt.innerHTML = 'Thanks for sharing!';
        txt.style.visibility = "visible";
      })
      .catch(console.error);
  } else {
    console.log('Unable to Share!');
    txt.innerHTML = 'Unable to Share!';
    txt.style.visibility = "visible";
    txt.style.backgroundColor = "Red";
    txt.style.color = '#fff';
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(reg) {
    console.log('Successfully registered service worker', reg);
  }).catch(function(err) {
    console.warn('Error whilst registering service worker', err);
  });
}


  let installPromptEvent;

  window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    installPromptEvent = event;
    // Update the install UI to notify the user app can be installed
    document.querySelector('#install-button').disabled = false;
  });

  btnInstall.addEventListener('click', () => {
    // Update the install UI to remove the install button
    document.querySelector('#install-button').disabled = true;
    // Show the modal add to home screen dialog
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      installPromptEvent = null;
    });
  })
  
