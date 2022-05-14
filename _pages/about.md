---
permalink: /
title: "About me"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---
I am a Senior Year, Computer Science Undergraduate with a minor in Data Science at [BITS Pilani, Goa](https://www.bits-pilani.ac.in/Goa/index.aspx){:target="_blank"}. I am doing my undergraduate thesis on Commonsense Reasoning advised by [Prof. Tirtharaj Dash](https://tirtharajdash.github.io/){:target="_blank"} and [Prof. Ashwin Srinivasan](https://www.bits-pilani.ac.in/goa/ashwin/profile){:target="_blank"}. My research focuses on Natural Language Processing, Adversarial Machine Learning, Speech Processing, and Cognitive Neuroscience.

Currently, I am a machine learning research associate at [Adobe](https://research.adobe.com/) where I am working on content optimisation and causal modelling. Previously, I was a data scientist (Intern) at [CommerceIQ](https://www.commerceiq.ai/) where I worked on advertisement optimization on e-commerce platforms and recieved the Q4 award (Digital Shelf Enamblers) for working on "Digital Shelves". I have been a research intern at [MIDAS Labs](http://midas.iiitd.edu.in/){:target="_blank"} where I was working with automatic text scoring systems, and investigating effects of morphology on Transformers and biases in machine learning.

While at BITS, I had the opportunity of working with [APPCAIR](https://www.bits-pilani.ac.in/appcair/), [MySmartPrice](https://www.mysmartprice.com){:target="_blank"} along with the [CS Department, BITS Goa](https://www.bits-pilani.ac.in/goa/ComputerScienceInformationsSystems/ComputerScienceandInformationSystems){:target="_blank"} where I was also a [teaching assistant](/teaching). I have been a part of [CTE](https://bpgc-cte.org/){:target="_blank"}, [SAiDL](https://www.saidl.in/){:target="_blank"}, and [LRG](http://lrg.saidl.in/){:target="_blank"}. I love to play casual chess as well!

# News

<div style="overflow-y:scroll; height:12em;">
<ul>
  <li class="a"><strong>MAY, 2022</strong>: Will join <a href="https://research.adobe.com/" target="_blank">Adobe</a> as a machine learning research associate!</li>
  
  <li class="a"><strong>JAN, 2022</strong>: Joined <a href="https://research.adobe.com/" target="_blank">Adobe</a> as a research Intern!</li>
  
  <li class="a"><strong>DEC, 2021</strong>: Voila! Our work on <a href="https://arxiv.org/abs/2109.12406" target="_blank">MINIMAL, Crafting Data Free Adversaries</a> got accepted in <a href="https://aaai.org/Conferences/AAAI-22/" target="_blank">AAAI-2022</a> ! </li>

  <li class="a"><strong>OCT, 2021</strong>: Check our work on <a href="https://arxiv.org/abs/2109.12406" target="_blank">MINIMAL, Crafting Data Free Adversaries</a></li>
  
  <li class="a"><strong>SEP, 2021</strong>: Check our work on <a href="https://arxiv.org/abs/2109.11728" target="_blank">Overstability and Oversensitivity in AES Systems</a></li>

  <li class="a"><strong>JUL, 2021</strong> - I will be a teaching assistant for the course <a href="https://bpgc-csf429.github.io/" target="_blank">CS F429: Natural Language Processing</a>.</li>

  <li class="a"><strong>JUL, 2021</strong> - Big move! Joining as a Data Scientist at <a href="https://www.commerceiq.ai/" target="_blank">CommerceIQ</a></li>

  <li class="a"><strong>DEC, 2020</strong> - Our work on <a href="https://aclanthology.org/2020.semeval-1.226/" target="_blank">News Propaganda detection</a> was presented in the SemEval 2020 Proceedings held along with COLING 2020, Spain.</li>
  
  <li class="a"><strong>AUG, 2020</strong> - I will be the lead and head of duties at <a href="http://lrg.saidl.in/" target="_blank">LRG</a></li>
  
  <li class="a"><strong>JUN, 2020</strong> - Completed my Data Science summer internship at <a href="https://www.mysmartprice.com/" target="_blank">MySmartPrice</a>.</li>
  
  <li class="a"><strong>JUN, 2020</strong> - I delivered a talk on research in Computer Science, organized by <a href="https://www.bits-pilani.ac.in/goa/chapters" target="_blank">IEEE</a>, BITS Pilani. <a href="https://www.youtube.com/watch?v=kQMy1-9fBTE" target="_blank">Recording</a>.</li>
  
  <li class="a"><strong>JUN, 2020</strong> - My first paper got accepted for publication at SemEval 2020 - <a href="https://aclanthology.org/2020.semeval-1.226/" target="_blank">Link to Paper</a></li>
  
  <li class="a"><strong>MAY, 2020</strong> - I will be working at <a href="http://midas.iiitd.edu.in/team/Somesh-Kumar-Singh.html" target="_blank">MIDAS</a> as a remote intern under Dr. Rajiv Shah&#39;s guidance.</li>
</ul>
</div>
<br>

# Work Experience

<ul>
{% for item in site.data.workex.experiences %}
<li class="a">
  <table class="a"><tr>
  <td class="a" width="20%"><img class="padded-image" src="/images/{{ item.img-path }}" alt="{{ item.name }}" style="width:100%"></td>
  <td class="a" width="80%">
  <span class="designation">{{ item.designation }}</span><br>
  <a class="company" href="{{ item.url }}" target="_blank">{{ item.name }}</a><br>
  <span class="date">{{item.date}}</span><br>
  <p class="desc">
  <br>
  {{item.desc}}
  </p><br>
  </td>
  </tr></table>
  </li>
{% endfor %}
</ul>

<br>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-178463347-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-178463347-2');
</script>
