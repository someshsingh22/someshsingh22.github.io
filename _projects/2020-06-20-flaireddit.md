---
title: "FlaiReddit"
collection: projects
type: "project"
permalink: /projects/2020-06-20-flaireddit
date: 2020-06-20
header :
  teaser : TCWA/Redditlogo.png
  image : TCWA/RedditWide.png
  caption: Reddit [RedditLogo](https://www.reddit.com/).
permalink: /projects/2020/06/flaireddit/

comments : false
tags:
  - NLP
  - Web Application
  - Flask
  - Text Classification
  - Web Scraping
  - Reddit
  - Code from scratch
  - Pytorch
---

The data extractor extracts posts from a wide time period to eliminate the Bias towards some hot topics.
* You can save and load your progress at checkpoints too (especially useful for online collection and storage),  
* All logs are made in crawler.log, warnings are displayed.
* To optimize space removed, empty flairs are removed batch wise.

# RedditCrawler - Web Scraper

We will use the pushlift.io API instead to make calls and extract JSON packages.

You can visit the project's github repository at : [FlaiReddit](https://github.com/someshsingh22/FlaiReddit-MIDAS)
You can check the deployed webapp at : [FlaiReddit Heroku](https://flaireddittest.herokuapp.com)