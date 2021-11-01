# Band Together
This project was the winner of HackNJIT 2020

## Inspiration
Many times when you are on Zoom or any similar software, what an individual says will always have some type of delay for someone else listening. During this difficult time, people that love playing music with their friends can not do that using this software to play music synchronously and practice their abilities. Also, bands that want to practice music together can't do that with the current pandemic.

We wanted to build a platform that allows people that love playing music with friends or band members a space to play different instruments at the same time that gets inputted and heard at the same time. This will help those who may be sad around this time being stuck at home and those who love to play music with friends through a fun collaborative manner.

## What it does
### Band Member or Music Enthusiest Interface
- People can pick instruments they want to play for the music or band session they are in
- Then music will start appearing on the screen, for the user to play the correct notes
- If the correct notes are played, the user can get some points to make this web application more fun 
- Also, the scoring system can be disregard

## How we built it
We built it using a React frontend and a basic Flask backend.
Because we needed a real time bidirectional mode of communication, we knew sockets were the way to go. We added socket listeners for when users click a key, and emitted them to all other users in the room. Suddenly, we had a working project where every user could broadcast sounds to all other users in a room.
- We used a javascript synthesizer framework called SoundFontPlayer
- For the piano UI, we use a React component called React-Piano

## Challenges we ran into
Our main issue was figuring out how to play multiple sounds at once. This task seemed to be more difficult than we originally assumed it to be. What we had to do was create different sound objects for each instrument, and play the instrument corresponding to the correct sound instrument. 
In addition, we had a lot of trouble linking the discord bot with our application. 
- We used a javascript synthesizer framework called SoundFontPlayer
- For the piano UI, we use a React component called React-Piano

## Accomplishments that we're proud of
-We proposed a solution to a common issue musicians have these days. 
- The scoring system to make playing music more fun
- Different music notes are played depending on what instruments you use

## What we learned
- How to use the React framework more and connect a backend through the use of python
- Creating a scoring system where, when the user clicks the approved piano key at the right time to get 5 points

## What's next for BandTogether
- A system where users can upload music, for them to play using our scoring mechanism 
- Making the website more user friendly, and have session ids, for people to join different groups to play music
- Creating more Instruments UI components instead of buttons for people to use on the website
-  Allowing, people to connect their own instruments to play music on our website
