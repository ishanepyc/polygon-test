console.log("+[TEST]");
let playerStateC3 = 0;
let playerStateC5 = 0;
let c3Updating = false;
const settings = { settings: [], speed: { selected: 3 } };

document.addEventListener("DOMContentLoaded", () => {
    const playerC3 = new Vimeo.Player(document.querySelector("#player3"));
    const playerC5 = new Vimeo.Player(document.querySelector("#player5"));

    const players = {
        c1: {
            player: new Vimeo.Player(document.querySelector("#player1")),
            state: 0,
        },
        c2: {
            player: new Vimeo.Player(document.querySelector("#player2")),
            state: 0,
        },
        c4: {
            player: new Vimeo.Player(document.querySelector("#player4")),
            state: 0,
        },
    };

    [
        playerC3,
        playerC5,
        ...Object.values(players).map(({ player }) => player),
    ].forEach((player) => {
        player.setPlaybackRate(2);
    });

    Object.entries(players).forEach(([id, { player }]) => {
        player.on("timeupdate", async () => {
            const currentTime = await player.getCurrentTime();
            const duration = await player.getDuration();

            const halfDuration = duration / 2;
            if (players[id].state === 0 && currentTime >= 1.4) {
                await player.setCurrentTime(0);
            } else if (players[id].state === 1 && currentTime >= halfDuration) {
                await player.setCurrentTime(halfDuration - 1.6);
            } else if (players[id].state === 2 && currentTime >= 9.3) {
                players[id].state = 0;
                await player.setCurrentTime(0);
                await player.play();
            }
        });

        const elemState1 = document.getElementById(`${id}-state1`);
        console.log("elemState1", elemState1);
        elemState1.addEventListener("click", async () => {
            const currentTime = await player.getCurrentTime();
            const duration = await player.getDuration();

            if (players[id].state === 1) {
                players[id].state = 2;
                await player.setCurrentTime(duration - currentTime);
            }
        });

        const elemState2 = document.getElementById(`${id}-state2`);
        elemState2.addEventListener("click", async () => {
            const currentTime = await player.getCurrentTime();
            const duration = await player.getDuration();

            if (players[id].state === 0) {
                players[id].state = 1;
            }

            if (players[id].state === 2) {
                const newTime = duration - currentTime;
                await player.setCurrentTime(newTime);
                players[id].state = 1;
            }
        });
    });

    // -------------------------------------- Player C3 --------------------------------------
    playerC3.on("timeupdate", async () => {
        const currentTime = await playerC3.getCurrentTime();
        const duration = await playerC3.getDuration();

        //console.log({playerState});
        // If Button B has not been clicked, loop the first 3.2 seconds of the video.
        if (playerStateC3 === 0 && currentTime >= 1.4) {
            await playerC3.setCurrentTime(0); // Reset the video to the beginning to loop the first 3.2 seconds.
        }

        // If Button B has been clicked and the current time is within the last 3.2 seconds of Part 1,
        // reset the video to 3.2 seconds before the midpoint to loop the end of Part 1.
        if (playerStateC3 === 1 && currentTime >= 3.5) {
            await playerC3.setCurrentTime(3.2);
        }

        if (playerStateC3 === 2 && currentTime >= 6.9) {
            await playerC3.setCurrentTime(5.4);
        }

        if (playerStateC3 === 5 && currentTime >= duration - 3.4) {
            playerStateC3 = 1;
            await playerC3.setCurrentTime(3.2);
        }

        if ((playerStateC3 === 3 || playerStateC3 === 4) && currentTime >= 13.8) {
            playerStateC3 = 0;
            await playerStateC3.setCurrentTime(0);
        }
    });

    document.getElementById("c3-state1").addEventListener("click", async () => {

        const currentTime = await playerC3.getCurrentTime();
        const duration = await playerC3.getDuration();

        if (playerStateC3 === 1) {
            playerStateC3 = 3;
            const newtime = duration - currentTime;
            await playerC3.setCurrentTime(newtime);
        }

        if (playerStateC3 === 2) {
            playerStateC3 = 4;
            const newtime = duration - 0.5 - currentTime; //ishan change
            await playerC3.setCurrentTime(newtime);
        }

    });

    document.getElementById("c3-state2").addEventListener("click", async () => {

        const duration = await playerC3.getDuration();
        const currentTime = await playerC3.getCurrentTime();

        if (playerStateC3 === 0) {
            playerStateC3 = 1;
            console.log({ playerState: playerStateC3 });
        }

        if (playerStateC3 === 2) {
            playerStateC3 = 5;
            const newTime = duration - currentTime;
            await playerC3.setCurrentTime(newTime);
        }

        if (playerStateC3 === 3 || playerStateC3 === 4) {
            const newTime = duration - currentTime;
            await playerC3.setCurrentTime(newTime);
            playerStateC3 = 1;
        }

    });

    document.getElementById("c3-state3").addEventListener("click", async () => {

        const duration = await playerC3.getDuration();
        const currentTime = await playerC3.getCurrentTime();
        if (playerStateC3 === 0 || playerStateC3 === 1) {
            playerStateC3 = 2;
        }

        if (playerStateC3 === 4 || playerStateC3 === 5 || playerStateC3 === 3) {
            const newTime = duration - currentTime;
            await playerC3.setCurrentTime(newTime);
            playerStateC3 = 2;
        }

    });
    // -------------------------------------- Player C3 -----------------------------
    // -------------------------------------- Player C5 -----------------------------
    playerC5.on("timeupdate", async () => {
        const currentTime = await playerC5.getCurrentTime();

        if (playerStateC5 === 0 && currentTime >= 1.5) {
            await playerC5.setCurrentTime(0);
        } else if (playerStateC5 === 1 && currentTime >= 2.6) {
            await playerC5.pause();
        } else if (playerStateC5 === 2 && currentTime >= 3) {
            playerC5.setCurrentTime(0);
            playerStateC5 = 0;
        }
    });

    document.getElementById("c5-state1").addEventListener("click", async () => {
        const currentTime = await playerC5.getCurrentTime();
        if (playerStateC5 === 1 && currentTime < 1.8) {
            playerStateC5 = 0;
            return;
        }

        if (playerStateC5 === 1) {
            const newTime = 4.8 - currentTime;
            await playerC5.setCurrentTime(newTime);
            await playerC5.play();
            playerStateC5 = 2;
        }
    });

    document.getElementById("c5-state2").addEventListener("click", async () => {
        const currentTime = await playerC5.getCurrentTime();
        if (playerStateC5 === 0) {
            playerStateC5 = 1;
        }

        if (playerStateC5 === 2) {
            const newTime = 4.8 - currentTime;
            await playerC5.setCurrentTime(newTime);
            playerStateC5 = 1;
        }
    });

    // -------------------------------------- Player C5 -----------------------------
});

document.addEventListener("DOMContentLoaded", function () {
    // Adding a single event listener to the document to handle clicks for both types of elements.
    document.addEventListener("click", function (event) {
        // Check if the clicked element is a `.button`
        if (event.target.classList.contains("button")) {
            // Navigate up to the closest `.button-wrap` container
            const buttonWrap = event.target.closest(".button-wrap");
            if (buttonWrap) {
                // Find any `.button.is-active` within the container and remove its class if it's not the clicked button
                const activeButton = buttonWrap.querySelector(".button.is-active");
                if (activeButton && activeButton !== event.target) {
                    activeButton.classList.remove("is-active");
                }
                // Set the clicked button as active
                event.target.classList.add("is-active");
            }
        }
        // Check if the clicked element is an `.animation-state`
        else if (event.target.classList.contains("animation-state")) {
            // Navigate up to the closest `.animation-states` container
            const animationStates = event.target.closest(".animation-states");
            if (animationStates) {
                // Find any `.animation-state.is-active` within the container and remove its class if it's not the clicked one
                const activeAnimationState = animationStates.querySelector(
                    ".animation-state.is-active",
                );
                if (activeAnimationState && activeAnimationState !== event.target) {
                    activeAnimationState.classList.remove("is-active");
                }
                // Set the clicked animation state as active
                event.target.classList.add("is-active");
            }
        }
    });
});

//Chat GPT code here

document.addEventListener('DOMContentLoaded', function () {
    const mappings = [
        { buttons: ['#c1-state1', '#c2-state2', '#c3-state2', '#c4-state1', '#c5-state1'], animationStateId: '#Defi' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state3', '#c4-state2', '#c5-state1'], animationStateId: '#Gaming' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state1', '#c4-state1', '#c5-state2'], animationStateId: '#DePin' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state1', '#c4-state1', '#c5-state1'], animationStateId: '#Tokenization' },
        { buttons: ['#c1-state2', '#c2-state2', '#c3-state3', '#c4-state1', '#c5-state1'], animationStateId: '#NFTs' },
        { buttons: ['#c1-state2', '#c2-state1', '#c3-state1', '#c4-state2', '#c5-state1'], animationStateId: '#Payments' }
    ];

    // Function to update .animation-state based on .button states
    function updateAnimationState() {
        const currentActiveButtons = [...document.querySelectorAll('.button.is-active')];
        const activeButtonsIds = currentActiveButtons.map(button => `#${button.id}`);

        let matchingMapping = mappings.find(mapping =>
            mapping.buttons.sort().join(',') === activeButtonsIds.sort().join(',')
        );

        // Find the container of .animation-states
        const animationStatesContainer = document.querySelector('.animation-states');

        if (animationStatesContainer) {
            // Remove the .is-active class from all .animation-states
            animationStatesContainer.querySelectorAll('.animation-state').forEach(animationState => {
                animationState.classList.remove('is-active');
            });

            // Apply the .is-active class to the matched .animation-state
            if (matchingMapping) {
                animationStatesContainer.querySelector(matchingMapping.animationStateId).classList.add('is-active');
                animationStatesContainer.querySelector('#Custom').classList.remove('is-active');
            } else {
                // If no match is found, set .animation-state custom as active
                animationStatesContainer.querySelector('#Custom').classList.add('is-active');
            }
        }
    }

    // Function to update .button states based on .animation-state
    function updateButtonsForAnimationState(animationStateId) {
        const matchingMapping = mappings.find(mapping => mapping.animationStateId === animationStateId);

        if (matchingMapping) {
            matchingMapping.buttons.forEach(buttonId => {
                // Remove .is-active class from the button's siblings
                const button = document.querySelector(buttonId);
                const buttonWrap = button.closest('.button-wrap');
                if (buttonWrap) {
                    buttonWrap.querySelectorAll('.button').forEach(button => button.classList.remove('is-active'));
                }
                // Add .is-active class to the button
                button.classList.add('is-active');
                button.click();
            });
        }
    }

    // The existing click event listener with new logic added
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('button')) {
            // ... existing .button click logic ...

            // Call function to update the .animation-state based on .button states
            updateAnimationState();
        }
        else if (event.target.classList.contains('animation-state')) {
            // ... existing .animation-state click logic ...

            // Call function to update the .button states based on .animation-state
            updateButtonsForAnimationState(`#${event.target.id}`);
        }
    });
});

//chat GPT code ends here



//hide show img based on buttonS.is active
document.addEventListener('DOMContentLoaded', function () {
    // Function to update image display based on active status
    function updateImageDisplay(toggle, isActive) {
        const imgClass = toggle.id + '-img'; // Generates class name to target images
        document.querySelectorAll('.' + imgClass).forEach(image => {
            image.style.display = isActive ? 'block' : 'none';
        });
        console.log(`Updated display for ${toggle.id} to ${isActive ? 'block' : 'none'}`);
    }

    // Configuration for components and their states
    const components = {
        'c1': 2,
        'c2': 2,
        'c3': 3,
        'c4': 2,
        'c5': 2  // Ensure this is correctly set
    };

    Object.keys(components).forEach(component => {
        for (let i = 1; i <= components[component]; i++) {
            const toggleID = `${component}-state${i}`;
            const toggleElement = document.getElementById(toggleID);

            if (toggleElement) {
                new MutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        if (mutation.attributeName === 'class') {
                            const isActive = toggleElement.classList.contains('is-active');
                            updateImageDisplay(toggleElement, isActive);
                        }
                    });
                }).observe(toggleElement, { attributes: true });

                // Initial check in case the element is already active on page load
                updateImageDisplay(toggleElement, toggleElement.classList.contains('is-active'));
            } else {
                console.log(`Element with ID ${toggleID} not found.`);
            }
        }
    });
});



//hide-show image instead of vimeo if video doesnt autoplay
document.addEventListener('DOMContentLoaded', function () {
    const autoplayThreshold = 5000; // Milliseconds to check if playing genuinely started
    const players = [];
    const autoplayStatus = new Array(5).fill(false); // Track autoplay success for each player

    for (let i = 1; i <= 5; i++) {
        const iframe = document.getElementById(`player${i}`);
        const player = new Vimeo.Player(iframe);
        players.push(player);

        player.on('play', function () {
            console.log(`Player ${i} started playing.`);
            setTimeout(() => {
                player.getCurrentTime().then(time => {
                    if (time > 0) {
                        console.log(`Player ${i} is playing successfully.`);
                        autoplayStatus[i - 1] = true; // Mark as successfully autoplayed
                        updateDisplayForAutoplayStatus();
                    }
                });
            }, autoplayThreshold);
        });

        player.on('pause', function () {
            console.log(`Player ${i} is paused. Checking autoplay...`);
            player.getCurrentTime().then(time => {
                if (time < 1) {
                    console.log(`Player ${i} autoplay failed.`);
                    autoplayStatus[i - 1] = false; // Mark as autoplay failed
                    updateDisplayForAutoplayStatus();
                }
            });
        });
    }

    function updateDisplayForAutoplayStatus() {
        if (autoplayStatus.every(status => status === true)) {
            console.log('All videos autoplayed successfully.');
            document.querySelectorAll('.cdk-anim-comp .vimeo-embed').forEach(elem => elem.style.display = 'block');
            document.querySelectorAll('.cdk-anim-comp .cdk-anim-img-wrapper').forEach(elem => elem.style.display = 'none');
        } else if (autoplayStatus.includes(false)) {
            console.log('At least one video failed to autoplay.');
            document.querySelectorAll('.cdk-anim-comp .vimeo-embed').forEach(elem => elem.style.display = 'none');
            document.querySelectorAll('.cdk-anim-comp .cdk-anim-img-wrapper').forEach(elem => elem.style.display = 'block');
        }
    }
});
