---
title: 'Globle'
description: 'Search engine implementation for CIS 555: Internet and Web Systems. Set of services to crawl, index, rank, query, and visualize assets across the web.'
path: '/projects/globle'
technologies: ['Java', 'jQuery', 'AWS', 'S3', 'Apache Spark', 'MySQL', 'DynamoDB']
start: 'April 2018'
end: 'April 2018'
image: '../../images/projects/globle.png'
color: '#83c9c6'
tags: ['class', 'web']
collaborators:
  [
    '<a href="https://www.linkedin.com/in/niharpatil/" target="_BLANK">Nihar Patil</a>',
    '<a href="https://www.linkedin.com/in/somilgo/" target="_BLANK">Somil Govani</a>',
    '<a href="https://www.linkedin.com/in/vibhav-jagwani-a12797135/" target="_BLANK">Vibhav Jagwani</a>',
  ]
order: 2
status: 'Dead'
---

Globle was a group project I build out at the end of my Junior year at UPenn. The major components were a web crawler, page indexer, page ranker, and API/web interface. We additionally built out an autocomplete engine for keeping track of the most common queries submitted by users.

Implemented an aggressive in-memory cache and multi-threaded API handler for computing scores to match indexed pages to a user's search query. I also implemented integrations with other data sources like Wikipedia and YouTube for supplementing our search engine results.

All of our tools were deployed across AWS and built on AWS's Java SDKs. I ran performance tests to evaluate performance benefits from sharding work between machines and upgrading machine hardware. This was a great exercise in getting better working with cloud infrastructure and wiring together a variety of services.

The next semester, I was fortunate enough to be a TA for the course.
