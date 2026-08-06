---
layout: post
title: Generative Art and p5js Experiments 
tag: Generative Art
excerpt: Generative art pieces created during my Creative computing program at SHIFTA
image: ../images/img-p5-art.png
---

<div class="about-project">
  <div class="col-1">
    <h2>Graphic Design and Illustration</h2>
  </div>
  <div class="col-2">
    <h3> About the project</h3>
    <p>These pieces are part of the assignments I've worked on my Creative Computing Master's Program.</p>
    <ul>
      <li>
        <h5>Tech specs</h5>
        <p>p5js · Conceptual/Generative art </p>
      </li>
      <li>
        <h5>Project type</h5>
        <p>Assignments · Personal Projects </p>
      </li>
    </ul>  
  </div>

  <iframe src="https://editor.p5js.org/AngelaMeow/full/ZSGQ48Kz_"></iframe>

  <iframe src="https://editor.p5js.org/AngelaMeow/full/J6jzPhxtU"></iframe>
</div>


### Math Art

The main goal for this assignment is to create a portrait of a mathematical idea. A piece of generative art where math is the subject, the material, and the form. I’m using trigonometry and Recursion as the tools for making my piece. Combined with mapping to generate a warm color palette.


### Generative Poster

The main concept for this final assignment is a Generative Piece of art using my personal style. It evolved into a fun unique printable.

It’s partly inspired by a previous personal project. It’s related at two levels, first the code part as the old projects was experimenting with pure CSS illustrations1 and a second part which is drawing characters with code. When I created the CSS illustrations the inspiration came from the capabilities of HTML and CSS to create visuals from scratch, as a blank digital canvas. I created a few interactive pieces of minimalistic characters with a switch button to toggle between day and night, just like a light and dark mode for interfaces. Nowadays the dark and light theme is a common pattern, but at the moment (more than 10 years ago) it felt new and refreshing. The entire experience of experimenting with CSS felt whimsical and powerful. A few lines of properties, attributes and values were enough to generate interactive visuals. I decided to build on top of that original idea, and mix it with the generative concepts I’ve learned so far. That’s how I ended up with: “All my friends”.

#### The System

The main functionality is defined through a single function to generate the characters: function drawFriends(col, row, cell,h,s) I’m passing the column, row, cell, hue and saturation through the function:
- col and row are used in the Loop inside the Draw function from p5.js to define the grid.
- cell it’s the core value that defines proportions, sizing and spacing of the characters.
- h and s are hue and saturation. I’m using HSL mode for defining color and maintaining a cohesive colorful palette.

As mentioned above, the function is called inside a nested loop to define the columns and rows of the grid inside the Draw function. There are 3 interactive elements.
1. Radio buttons to change colors, this implies a change in the hue, which provides a diﬀerent mood to the piece.
2. Sound implementation, simple but according to the tone of my piece, there’s a barking sound mapped with the mouseY and windowHeight position.
3. Printing the piece, handled by a keyPressed function, to allow the viewer to take a snapshot of a unique set of Friends to print as a poster, postcard, or just to save it digitally for their own use.





