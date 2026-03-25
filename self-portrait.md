---
layout: self-portrait
title: Quantified Self-Portrait
description: A visualization where positive and negative sentiments compete based on custom rules derived from journal data.
permalink: /quantified-self-portrait/
---

## Turning my Journal entries into a Living Grid

### The concept 

It started with the simple idea of visualizing positive and negative emotions based on a sentiment analysis from custom rules derived from my journal data.

Initially I had planned to have a frame-by-frame animation of the daily entries visualization to have a subtle non-static representation of the way the emotions where changing across time. But after exploring P5.js capabilities and understanding my data, I thought displaying all the entries data on a single canvas additional to including generative behavior will work better. That's when I decided to stablish some rules inspired by (Conway's Game of Life)[https://p5js.org/examples/math-and-physics-game-of-life/], where the visuals carry emotions: positive, negative, and neutral and spread or influence other emotions across the canvas. And conceptually it connected perfectly to the idea that emotions are not static but fluid, and over a period of time other emotions can have that behavior in real life. 
