<script src="https://cdn.plyr.io/3.6.8/plyr.polyfilled.js"></script>

<script>
let playerStateC3 = 0;
document.addEventListener("DOMContentLoaded", () => {
	const playerC3 = new Plyr("#player3", { settings: [] });
  const players = {
    c1: { player: new Plyr("#player1", { settings: [] }), state: 0 },
    c2: { player: new Plyr("#player2", { settings: [] }), state: 0 },
    c4: { player: new Plyr("#player4", { settings: [] }), state: 0 },
    c5: { player: new Plyr("#player5", { settings: [] }), state: 0 },
  };

  Object.entries(players).forEach(([id, { player }]) => {
    player.on("timeupdate", () => {
      const halfDuration = player.duration / 2;
      if (players[id].state === 0 && player.currentTime >= 3.2) {
        player.currentTime = 0;
      } else if (players[id].state === 1 && player.currentTime >= halfDuration) {
        player.currentTime = halfDuration - 3.2;
      }
    });

    document.getElementById(`${id}-state1`).addEventListener("click", () => {
      if (players[id].state === 1) {
        players[id].state = 2;
        player.currentTime = player.duration - player.currentTime;
        player.on("ended", () => {
          if (players[id].state === 2) {
            players[id].state = 0;
            player.currentTime = 0;
            player.play();
          }
        });
      }
    });

 document.getElementById(`${id}-state2`).addEventListener("click", () => {
      if (players[id].state === 0) {
        players[id].state = 1;
      }

      if (players[id].state === 2) {
        const newTime = player.duration - player.currentTime;
        player.currentTime = newTime;
        players[id].state = 1;
      }
    });
  });

 // -------------------------------------- Player C3 --------------------------------------
playerC3.on("timeupdate", () => {
    //console.log({playerState});
    // If Button B has not been clicked, loop the first 3.2 seconds of the video.
    if (playerStateC3 === 0 && playerC3.currentTime >= 3.2) {
      playerC3.currentTime = 0; // Reset the video to the beginning to loop the first 3.2 seconds.
    }

    // If Button B has been clicked and the current time is within the last 3.2 seconds of Part 1,
    // reset the video to 3.2 seconds before the midpoint to loop the end of Part 1.
    if (playerStateC3 === 1 && playerC3.currentTime >= 8) {
      playerC3.currentTime = 4.8;
    }

    if (playerStateC3 === 2 && playerC3.currentTime >= playerC3.duration / 2) {
      playerC3.currentTime = 9.6;
    }

    if (
      playerStateC3 === 5 &&
      playerC3.currentTime >= playerC3.duration - 4.8
    ) {
      playerC3.currentTime = 4.8;
      playerStateC3 = 1;
    }
  });

  document.getElementById("c3-state1").addEventListener("click", () => {
    if (playerStateC3 === 1) {
      playerStateC3 = 3;
      const newtime = playerC3.duration - playerC3.currentTime;
      playerC3.currentTime = newtime;

      playerC3.once("ended", () => {
        if (playerStateC3 === 3) {
          playerStateC3 = 0;
          playerC3.currentTime = 0;
          playerC3.play();
        }
      });
    }

    if (playerStateC3 === 2) {
      playerStateC3 = 4;
      const newtime = playerC3.duration - playerC3.currentTime;
      playerC3.currentTime = newtime;

      playerC3.once("ended", () => {
        if (playerStateC3 === 4) {
          playerStateC3 = 0;
          playerC3.currentTime = 0;
          playerC3.play();
        }
      });
    }
  });

   document.getElementById("c3-state2").addEventListener("click", () => {
    if (playerStateC3 === 0) {
      playerStateC3 = 1;
      console.log({ playerState: playerStateC3 });
    }

    if (playerStateC3 === 2) {
      playerStateC3 = 5;
      const newTime = playerC3.duration - playerC3.currentTime;

      playerC3.currentTime = newTime;
    }

    if (playerStateC3 === 3 || playerStateC3 === 4) {
      const newTime = playerC3.duration - playerC3.currentTime;
      playerC3.currentTime = newTime;
      playerStateC3 = 1;
    }
  });

  document.getElementById("c3-state3").addEventListener("click", () => {
    if (playerStateC3 === 0 || playerStateC3 === 1) {
      playerStateC3 = 2;
      console.log({ playerState: playerStateC3 });
    }

    if (playerStateC3 === 4 || playerStateC3 === 5 || playerStateC3 === 3) {
      const newTime = playerC3.duration - playerC3.currentTime;
      playerC3.currentTime = newTime;
      playerStateC3 = 2;
    }
  });
 // -------------------------------------- Player C3 --------------------------------------
});

</script>

<script>
// Listen for clicks on each `.button-wrap` container
document.querySelectorAll('.button-wrap').forEach(buttonWrap => {
  buttonWrap.addEventListener('click', function(event) {
    // Check if the clicked element is a `.button`
    if (event.target.classList.contains('button')) {
      // Find any `.button` within the same `.button-wrap` that has the `.is-active` class
      const activeButton = buttonWrap.querySelector('.button.is-active');
      // If there's an active button and it's not the clicked one, remove the `.is-active` class
      if (activeButton && activeButton !== event.target) {
        activeButton.classList.remove('is-active');
      }
      // Add the `.is-active` class to the clicked button
      event.target.classList.add('is-active');
    }
  });
});
</script>


<script>
document.addEventListener('DOMContentLoaded', () => {
    // Define the mapping based on the given conditions
    const mappings = [
        { buttons: ['#c1-state1', '#c2-state2', '#c3-state2', '#c4-state1', '#c5-state1'], animationStateId: '#Defi' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state3', '#c4-state2', '#c5-state1'], animationStateId: '#Gaming' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state1', '#c4-state1', '#c5-state2'], animationStateId: '#DePin' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state1', '#c4-state1', '#c5-state1'], animationStateId: '#Tokenization' },
        { buttons: ['#c1-state2', '#c2-state2', '#c3-state3', '#c4-state1', '#c5-state1'], animationStateId: '#NFTs' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state1', '#c4-state1', '#c5-state1'], animationStateId: '#Payments' }
    ];
    const customStateId = '#Custom';

    // MutationObserver callback to update states based on .is-active changes
    const observerCallback = mutationsList => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                updateActiveStates();
                break;
            }
        }
    };

    // Create a MutationObserver instance to observe class changes
    const observer = new MutationObserver(observerCallback);
    const observerOptions = { attributes: true, attributeFilter: ['class'] };

    // Function to update the active states based on the current active buttons
    function updateActiveStates() {
        let matchedMapping = mappings.find(mapping => 
            mapping.buttons.every(selector => document.querySelector(selector)?.classList.contains('is-active'))
        );
        const activeAnimationStateId = matchedMapping ? matchedMapping.animationStateId : customStateId;

        document.querySelectorAll('.animation-state.is-active').forEach(elem => {
            elem.classList.remove('is-active');
        });
        document.querySelector(activeAnimationStateId)?.classList.add('is-active');
    }

    // Function to setup observers on button elements
    function setupObservers() {
        document.querySelectorAll('.button, .animation-state').forEach(element => {
            observer.observe(element, observerOptions);
        });
    }
    setupObservers();
    updateActiveStates();
});
</script>
