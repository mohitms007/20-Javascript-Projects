const videoElement = document.getElementById("video");
const button = document.getElementById('button');

// Prompt to select media stream pass to video element, then play

async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;  // passing the user selection to video's source object
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    }catch(error) {
        // Catch error here
        console.log('whoops error here:', err);
    }
    
}
button.addEventListener('click',async () => {
    //Disable the button
    button.disabled = true;
    //  Start Picture in Picture
    await videoElement.requestPictureInPicture();
    //  Reset Button
    button.disabled = false;
});

//on load 
selectMediaStream();