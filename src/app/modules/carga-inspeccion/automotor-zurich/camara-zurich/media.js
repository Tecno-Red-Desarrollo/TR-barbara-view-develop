let mediaRecorder;
let recordedBlobs;
let codecPreference = 'video/webm;codecs=vp9,opus';

const video = document.querySelector('#cameraVideo');
video.width = 320;
video.height = 240;
const canvas = window.canvas = document.querySelector('#photoCanvas');
canvas.width = 320;
canvas.height = 240;

const recordedVideo = document.querySelector('#recordedVideo');
recordedVideo.width = 320;
recordedVideo.height = 240;

const sharedScreenVideo = document.querySelector('#sharedScreenVideo');
sharedScreenVideo.width = 320;
sharedScreenVideo.height = 240;

const recordButton = document.querySelector('#recordButton');
recordButton.addEventListener('click', () => {
    if (recordButton.textContent === 'Grabar') {
        startRecording();
    } else {
        stopRecording();
        recordButton.textContent = 'Grabar';
        playButton.disabled = false;
        downloadButton.disabled = false;
    }
});

const playButton = document.querySelector('#playButton');
playButton.addEventListener('click', () => {
    const mimeType = codecPreference;
    const superBuffer = new Blob(recordedBlobs, { type: mimeType });
    recordedVideo.src = null;
    recordedVideo.srcObject = null;
    recordedVideo.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.controls = true;
    recordedVideo.play();
});

const downloadButton = document.querySelector('#downloadButton');
downloadButton.addEventListener('click', () => {
    const blob = new Blob(recordedBlobs, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
});

function handleDataAvailable(event) {
    console.log('handleDataAvailable', event);
    if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
    }
}

function startRecording() {
    recordedBlobs = [];
    const mimeType = codecPreference;
    const options = { mimeType };

    try {
        mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
        console.error('Exception while creating MediaRecorder:', e);
        errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
        return;
    }

    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    recordButton.textContent = 'Dejar de grabar';
    playButton.disabled = true;
    downloadButton.disabled = true;
    mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
    mediaRecorder.stop();
}

const button = document.querySelector('#takePictureButton');
button.onclick = function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
};

const constraints = window.constraints = {
    audio: true,
    video: true
};

function handleSuccess(stream) {
    recordButton.disabled = false;
    callButton.disabled = false;
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
}

function handleSuccessSharing(stream) {
    startCameraButton.disabled = true;
    sharedScreenVideo.srcObject = stream;

    // demonstrates how to detect that the user has stopped
    // sharing the screen via the browser UI.
    stream.getVideoTracks()[0].addEventListener('ended', () => {
        errorMsg('El usuario dejó de compartir pantalla.');
        startCameraButton.disabled = false;
    });
}

function handleError(error) {
    if (error.name === 'OverconstrainedError') {
        const v = constraints.video;
        errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'NotAllowedError') {
        errorMsg('Permissions have not been granted to use your camera and ' +
            'microphone, you need to allow the page access to your devices in ' +
            'order for the demo to work.');
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
}

function handleErrorSharing(error) {
    errorMsg(`getDisplayMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}

const shareScreenButton = document.getElementById('shareScreenButton');
shareScreenButton.addEventListener('click', () => {
    navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(handleSuccessSharing, handleErrorSharing);
});

if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
    shareScreenButton.disabled = false;
} else {
    errorMsg('getDisplayMedia is not supported');
}