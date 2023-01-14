peter_pan_song = "";
harry_potter_song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
score_left_wrist = 0;
song_peter_pan = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");
    song_peter_pan = peter_pan_song.isPlaying();
    console.log(song_peter_pan);

    if(score_left_wrist > 0.2) {
        circle(leftWristx,leftWristy,20);
        harry_potter_song.stop();
        if(song_peter_pan == false) {
            peter_pan_song.play();
        }
        else {
            document.getElementById("song").innerHTML = "Song name : Peter Pan Song"
        }
    }
}

function preload() {
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_song = loadSound("music.mp3");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("Score_Left_Wrist = "+ score_left_wrist);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("LeftWristx = "+ leftWristx +"LeftWristy = "+ leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("RightWristx = "+ rightWristx +"RightWristy = "+ rightWristy);
    }
}