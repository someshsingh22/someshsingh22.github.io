---
title: "BPGC at SemEval-2020 Task 11: Propaganda Detection in News Articles with Multi-Granularity Knowledge Sharing and Linguistic Features based Ensemble Learning"
collection: publications
permalink: /publication/2020-05-31-bpgc-at-semeval-2020
excerpt: 'News Propaganda, High granularity, Imbalanced Classification, Contextual Embeddings'
date: 2020-05-31
venue: 'SemEval-2020 International Workshop on Semantic Evaluation Sponsored by SIGLEX'
paperurl: 'https://arxiv.org/abs/2006.00593'
citation: 'patil2020bpgc'

---

Propaganda spreads the ideology and beliefs of like-minded people, brainwashing their audiences, and sometimes leading to violence. SemEval 2020 Task-11 aims to design automated systems for news propaganda detection. Task-11 consists of two sub-tasks, namely, Span Identification - given any news article, the system tags those specific fragments which contain at least one propaganda technique; and Technique Classification - correctly classify a given propagandist statement amongst 14 propaganda techniques. For sub-task 1, we use contextual embeddings extracted from pre-trained transformer models to represent the text data at various granularities and propose a multi-granularity knowledge sharing approach. For sub-task 2, we use an ensemble of BERT and logistic regression classifiers with linguistic features. Our results reveal that the linguistic features are the strong indicators for covering minority classes in a highly imbalanced dataset.