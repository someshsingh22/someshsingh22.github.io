# Measuring and Improving Persuasiveness of Large Language Models

## 1. Introduction: The Power of Persuasion

Persuasion lies at the heart of effective communication. From Apple’s iconic ["Think Different"](#ref-think-different) campaign to Nike’s ["Just Do It"](#ref-just-do-it), carefully crafted messages have the power to shape public perception, drive engagement, and build lasting connections. These examples highlight the interplay of language, tone, and visuals in influencing audiences.

But can machines replicate this ability to persuade? As large language models (LLMs) like GPT-4 continue to revolutionize content creation, their role in persuasion raises important opportunities and challenges. While these models excel at generating coherent and fluent text, their ability to create impactful content that drives action remains largely unmeasured.

In this work, we introduce the novel task of **transsuasion** — transforming non-persuasive language into impactful, persuasive content while retaining key contextual factors like sender, audience, and timing. To achieve this, we evaluate and improve the persuasive capabilities of LLMs by leveraging natural experiments conducted through marketing efforts spanning over a decade and billions of dollars of investment. By analyzing this wealth of real-world data, we systematically assess how AI can reshape the art of persuasion.

**PersuasionBench** and **PersuasionArena** aim to address this gap. These frameworks are designed to systematically evaluate and enhance LLMs’ persuasive capabilities. With a focus on real-world applications like advertising and behavioral interventions, they provide a structured way to measure and optimize the ability of models to generate content that resonates with audiences and achieves tangible outcomes.

### Key Findings
- Research often assumes that larger models are inherently more capable. However, our study demonstrates otherwise. For instance:
  - **Our fine-tuned 13B model** achieves an Elo score of **1304**, outperforming much larger models like **LLaMA-3-70B** (1187) and **GPT-4** (1213).
  - A **7B model** surpasses **GPT-3.5** (1099 vs. 1092).

This shows that persuasive capability is not solely a matter of scale. Instead, targeted training and strategic optimization can enable smaller models to match or exceed the performance of their larger counterparts.

---

## 2. What Makes Content Persuasive?

Why do some tweets, ads, or campaigns resonate while others fall flat? Persuasion isn’t just about what you say—it’s about how, when, and to whom you say it. Groundbreaking research, like the [Xerox "because" experiment](#ref-xerox-because), has shown that minor changes in phrasing can yield dramatic shifts in outcomes.

Our work introduces a new task, **transsuasion**, to explore this phenomenon in LLMs. Transsuasion involves transforming non-persuasive language into impactful content while preserving key factors like the sender, audience, and timing. Unlike traditional content optimization methods, this approach systematically isolates and enhances the persuasive elements of a message.

### Key Insights
- **Minimal Impact of Superficial Features:** Superficial features like emojis, hashtags, and sentiment have minimal influence on engagement. For example, the correlation between tweet length and persuasiveness was negligible (**0.04**, p-value: **4.88e-65**).
- **Brand-Specific Strategies:** Persuasion depends heavily on contextual and brand-specific factors. By clustering tweets using RoBERTa embeddings and summarizing insights with GPT-4o-mini, we identified key strategies:
  - **Bulgari:** Focus on emotional engagement, vivid imagery, and product features.
  - **Starbucks:** Leverage seasonal promotions and personal experiences.
  - **Nike:** Emphasize urgency, cultural relevance, and historical significance.
  - **Airbnb:** Highlight nature-centric experiences and specific locations.

### Examples
- Starbucks transformed *“Relish the sweetness in every sip”* into *“Celebrate #AStarbucksDiwali at your nearest store”*, aligning with the cultural context of Diwali.
- Nike’s tweets successfully tapped into historical moments like #MambaDay, linking products with Kobe Bryant’s legacy.

#### Illustration Placeholder:
Include side-by-side comparisons of original and transsuaded tweets (from **fig1-reb.pdf**).

---

## 3. The Framework: Measuring Persuasion with AI

Traditional methods of optimizing persuasive content—like A/B testing—are labor-intensive, time-consuming, and often limited in scale. Our solution? Automated frameworks that leverage LLMs to simulate, generate, and evaluate persuasive content at unprecedented scale.

### Harnessing Natural Experiments: Building the Dataset
Our dataset is built on natural experiments from Twitter, where enterprises frequently post variations of marketing messages. By identifying tweets with similar content but varying engagement metrics, we created a dataset of **1.57 million transsuasion pairs**. These pairs capture the nuances of persuasive messaging in real-world scenarios.

**How We Did It:**
- **Tweet Collection:** Over 10 years of Twitter data was analyzed, amounting to 180 million tweets.
- **Filtering for Relevance:** Tweets were refined to ensure meaningful comparisons, such as ensuring proximity in posting time and similarity in content.
- **Semantic Similarity:** Tools like RoBERTa embeddings and LLaVA captions ensured accurate pairings of persuasive and non-persuasive content.

For further details, see [Making data for transsuasion.pdf](#ref-transsuasion-data).

### PersuasionBench: A Comprehensive Benchmark
**PersuasionBench** is the first large-scale automated benchmark for assessing LLMs’ ability to persuade. It includes two primary types of tasks:
1. **Simulative Tasks:** Measure a model’s ability to predict human responses to content (e.g., which version of a tweet will perform better).
2. **Generative Tasks:** Test a model’s ability to enhance content persuasiveness through tasks like **transsuasion**.

### PersuasionArena: A Real-Time Evaluation Platform
Building on the benchmark, **PersuasionArena** is an open platform where models compete in real-time to optimize persuasive content.
- Models are evaluated using a mix of metrics, including **Oracle evaluation**, human judgment, and domain transfer tests.
- Oracle models like Vicuna-1.5-13B are fine-tuned on both training and testing data, providing an authoritative assessment of generated content.

### Domain Transfer Experiments
Our framework’s strength lies in its ability to transfer learned persuasion skills to new domains. For instance:
- **Marketing Blogs:** Improved dwell time and views prediction by **19%** and **22%**, respectively.
- **Audience-Specific Transcreation:** Achieved a **2x performance improvement** compared to the baseline.
- **Human Evaluations:** Demonstrated enhanced understanding and impact in upvote/downvote prediction and reasoning tasks.

#### Illustration Placeholder:
A pipeline diagram illustrating data collection, task design, evaluation metrics, and insights from **Protocol.pdf** and **Win_Rate_Comparison_Models_Topics (1).pdf**.

---

## 4. Results: Scaling, Fine-Tuning, and Transferability

### Scaling Trends in Persuasive AI
Our findings challenge the common belief that model size alone determines effectiveness. By fine-tuning smaller models, we demonstrated that persuasive capabilities can be significantly enhanced without the need for massive parameter counts:
- **13B Model vs. Larger Models:** Our fine-tuned 13B model outperforms **LLaMA-3-70B** and **GPT-4** in generative persuasion tasks, with Elo scores of **1304**, **1187**, and **1213**, respectively.
- **7B Model Success:** Even our 7B model surpassed GPT-3.5, showing that smaller, optimized models can achieve remarkable results.

### Transfer of Persuasion Across Domains
Persuasion capabilities refined on Twitter data were tested on diverse tasks to assess their adaptability:
- **Marketing Blogs:** Improved dwell time and views prediction by **19%** and **22%**, respectively.
- **Audience-Specific Transcreation:** Achieved a **2x performance improvement** compared to the baseline.
- **Human Evaluations:** Improved classification of upvotes/downvotes by **15%**, reasoning classification by **20%**, and feedback perplexity by **50%**.
- **Anthropic Study Alignment:** Rank correlation improved by **6.5x** over the base model.

**Key Finding Highlight:**
PersuasionBench and PersuasionArena’s evaluations showed consistent rankings across tasks, with a mean Kendall Tau coefficient of **0.69**, validating the robustness of our framework.

---

## 5. Ethical Implications and Broader Applications

### The Ethical Landscape of Persuasion in AI
While AI-generated persuasion offers immense potential for marketing and social good, it also raises significant ethical concerns. Misuse of persuasive AI could lead to manipulation, misinformation, and erosion of trust. To address these risks, our work emphasizes:
- **Truthfulness:** Ensuring that transsuaded content remains grounded in factual information.
- **Transparency:** Providing clear benchmarks like PersuasionBench to foster accountability.
- **Fairness:** Avoiding bias in content generation across demographics and contexts.

### Broader Applications of Persuasive AI
Beyond social media, persuasive AI can transform:
- **Education:** Customizing learning materials to engage diverse student populations.
- **Healthcare:** Encouraging behavioral changes, such as vaccination uptake or healthier lifestyles.
- **Public Policy:** Crafting clear, compelling messages for campaigns addressing public health or climate change.

---

## 6. Conclusion: Shaping the Future of Persuasive AI

We introduce **PersuasionBench** and **PersuasionArena** as the first large-scale automated frameworks for evaluating and enhancing the persuasive capabilities of language models. These tools address critical gaps in:
1. **Simulative Capabilities:** Measuring how well models can predict behavior over content.
2. **Generative Capabilities:** Assessing models’ ability to transform low-engagement content into high-engagement content.

### Key Contributions
- **Benchmarking and Evaluation:** A comprehensive framework to evaluate persuasion systematically through **four regimes**: conventional metrics, Oracle-as-judge, Human-as-judge, and domain-shift tasks.
- **Notable Trends:** Smaller fine-tuned models outperforming larger counterparts in persuasion tasks, demonstrating that effective training regimes can challenge the assumption that bigger is always better.
- **Domain Transfer:** Persuasive capabilities developed on one platform successfully transferring to diverse domains like marketing blogs, transcreation, and human evaluations.

We invite the community to contribute by testing more models and hosting this platform as an open, collaborative resource.

---

## References
- [Think Different](#ref-think-different)
- [Just Do It](#ref-just-do-it)
- [Xerox "because" experiment](#ref-xerox-because)
- [Making data for transsuasion.pdf](#ref-transsuasion-data)

