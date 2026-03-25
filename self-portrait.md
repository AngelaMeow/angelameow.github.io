---
layout: self-portrait
title: Quantified Self-Portrait
description: A visualization where positive and negative sentiments compete based on custom rules derived from journal data.
permalink: /quantified-self-portrait/
---

## Turning my Journal entries into a Living Grid

### The concept 

It started with the simple idea of visualizing positive and negative emotions based on a sentiment analysis from custom rules derived from my journal data.

Initially I had planned to have a frame-by-frame animation of the daily entries visualization to have a subtle non-static representation of the way the emotions where changing across time. But after exploring P5.js capabilities and understanding my data, I thought displaying all the entries data on a single canvas additional to including generative behavior will work better. That's when I decided to stablish some rules inspired by [Conway's Game of Life](https://p5js.org/examples/math-and-physics-game-of-life/), where the visuals carry emotions: positive, negative, and neutral and spread or influence other emotions across the canvas. And conceptually it connected perfectly to the idea that emotions are not static but fluid, and over a period of time other emotions can have that behavior in real life. 

### The Process

The foundation is a JSON file where each journal entry has been analyzed for sentiment. Each entry contains counts of positive, negative, and neutral words. For example:

`{
  "date": "2026-03-05",
  "counts": { "positive": 2, "negative": 8, "neutral": 2 }
}`

These counts become the initial population of cells on an 8×8 grid. The dominant sentiment (whichever has more original cells) gets an advantage — it spawns faster and its cells kill the opposition. Ten entries run simultaneously as individual tiles, each with its own ecosystem.
