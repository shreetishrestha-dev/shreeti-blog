export const siteConfig = {
  title: "Serendipitous Soul",
  subtitle: "Here goes my thoughts, my little journal, my photographs, and the expressions I keep leaving behind.",
  intro:
    "A soft corner for poems, memories, wandering feelings, and all the small things I wanted to hold onto a little longer.",
  mediumFeedUrl:
    process.env.MEDIUM_FEED_URL || process.env.NEXT_PUBLIC_MEDIUM_FEED_URL || "",
  instagram: {
    poemsHandle: "serendipitoussoul",
    photographyHandle: "shreeti_nmzz",
    photographyPostUrls: [] as string[],
  },
};

export const manualPoems = [
  {
    slug: "manual-open-window",
    title: "Open Window",
    excerpt: "A placeholder poem space for manual additions when Instagram is being difficult.",
    lines: [
      "Leave a window open for the poems that arrive without warning.",
      "This space already knows how to hold them softly.",
    ],
    tags: ["manual", "poetry"],
    publishedAt: "2026-03-31",
    sourceLabel: "Manual addition",
  },
];

export const manualArticles = [
  {
    slug: "is-artificial-intelligence-the-next-scientific-revolution",
    title: "Is Artificial Intelligence the Next Scientific Revolution?",
    excerpt:
      "A reflective 2017 piece on AI as both a life-changing technological leap and a force that still demands human responsibility and restraint.",
    paragraphs: [
      "“Necessity is the mother of inventions” has long felt true, not because it sounds wise, but because so many technological shifts begin exactly there: in need, in curiosity, and in the desire to make life better. Artificial Intelligence emerged from that same impulse, as part of the larger momentum of a world that keeps changing through innovation.",
      "The twenty-first century has become an age of rapid technological change. Computers have evolved far beyond mere calculating devices, and AI stands out as one of the most astonishing extensions of that progress. Human beings remain remarkable for logic, planning, creativity, problem solving, and self-awareness, but one of our defining qualities is curiosity. It is that restlessness that drives us to build what did not exist before.",
      "Artificial intelligence grew from the human desire to recreate, in some form, our own capacities for learning and reasoning. Instead of machines that only perform rigid sequences, AI imagines devices that can observe, evaluate, and decide. In that sense, AI is not just machinery made more complex, but machinery given a new kind of extraordinariness.",
      "Its rise has not simply been about fantasy becoming real. AI was pursued because it promised greater efficiency and a more capable world. By introducing learning, understanding, and decision-making into computing systems, people expanded what technology could do and how deeply it could support everyday life.",
      "What makes the field so fascinating is its breadth. AI stretches from robotics to neural networks, from machine learning to natural language processing, from speech recognition to expert systems, biometrics, computer vision, and genetic algorithms. It is less a single invention than an entire universe of directions.",
      "In that sense, AI has already become a scientific and technological revolution. Tasks that once demanded enormous human labor can now be automated with speed and consistency. Machines do not tire in the way people do, and they do not pause for emotion, fatigue, or distraction. That power changes what industries can produce and how quickly they can move.",
      "Its impact is not only industrial. AI has also deeply shaped daily life through smart technologies. Phones, sensors, home systems, navigation, voice recognition, and other familiar tools all show how AI has quietly entered ordinary routines. The idea of smart homes and AI assistants no longer belongs only to science fiction.",
      "Beyond convenience, AI has carried transformative potential in accessibility, medicine, and disability support. Prosthetics, screen readers, assistive devices, autonomous mobility tools, and text-to-speech systems point toward a future where technology can restore independence and improve lives for many who were once left without practical solutions.",
      "And yet, the promise of AI has always been accompanied by unease. Thinkers like Stephen Hawking and Bill Gates warned that intelligence created without wisdom could become a danger. Machines are still governed by human decisions, human code, and human judgment, and even a small misstep can have far-reaching consequences.",
      "So the question is not only whether AI is revolutionary, but what kind of future human beings choose to build with it. AI has already changed the world. Whether it becomes a breakthrough toward a better one depends, ultimately, on the intelligence and responsibility of the people shaping it.",
    ],
    tags: ["artificial-intelligence", "technology", "science", "archive"],
    publishedAt: "2017-01-08T00:00:00.000Z",
    sourceLabel: "The Zerone / Medium",
    sourceUrl:
      "https://medium.com/zerone-magazine/is-artificial-intelligence-the-next-scientific-revolution-b6e0d0924412",
  },
  {
    slug: "unveiling-the-potentials-with-the-worlds-largest-battery",
    title: "Unveiling the Potentials with the World’s Largest Battery",
    excerpt:
      "A 2017 reflection on Tesla’s Hornsdale battery project and what large-scale energy storage could mean for sustainable power systems, especially in Nepal.",
    paragraphs: [
      "While many brilliant minds around the world continue searching for sustainable energy solutions, Tesla Inc. moved from theory to implementation by building what was then the world’s largest lithium-ion battery. The project arrived at a time when the shift away from nonrenewable energy had already become urgent, not only because fossil fuels are hazardous, but because they cannot sustain humanity forever.",
      "Renewable sources such as solar, wind, hydro, and geothermal energy are often seen as clean and perpetual, yet they still depend heavily on nature. Weather patterns and topography vary from place to place and season to season, and that unpredictability can make exclusive reliance difficult. On top of that, excess energy is often wasted when supply is high, while shortages appear when generation falls, creating a cycle of abundance and scarcity.",
      "That is why storage matters so much. Tesla’s answer to this challenge came through a battery installation with a capacity initially described around 100 MW and later known for storing 129 MWh of energy. Built in South Australia in just one hundred days, the system fulfilled Elon Musk’s public promise that it would either be delivered on time or provided free of cost.",
      "Officially called the Hornsdale Energy Reserve, the installation was not a single towering battery cell, but a massive network of Tesla Powerpacks arranged across a footprint roughly comparable to a football field. Inside those units were battery layers and cells produced through Tesla’s Gigafactory in Nevada. Its scale was impressive, but its significance went far beyond spectacle.",
      "The battery was expected to support roughly thirty thousand homes for over an hour at full capacity and, more importantly, to strengthen a struggling electricity grid. South Australia had experienced blackouts, grid failures, and the pressure of load shedding, and the project was introduced as a practical response to those vulnerabilities ahead of a harsh summer.",
      "What made this development truly revolutionary was not simply its size, but the technology and timing behind it. Large-scale energy storage demonstrated that renewable energy could become not only cleaner, but more dependable. As Elon Musk argued, systems like this could help build more resilient grids with fewer interruptions.",
      "For countries like Nepal, that idea carries particular weight. A nation that has known long hours of load shedding and deep dependence on neighboring countries for energy supply cannot think only about generation. Storage must also become part of the conversation if power is to remain reliable and evenly distributed.",
      "Nepal has extraordinary natural potential, from sunlight to high-current rivers, tributaries, and terrain suited for hydro, solar, and wind projects. If energy generated in times of abundance can be stored rather than wasted, it could improve self-reliance, stabilize supply, and even strengthen the national economy through energy trade.",
      "Hydropower remains a major priority in Nepal, but such projects often require substantial time, cost, and construction effort. In contrast, Tesla’s battery project became an eye-opener precisely because it was built so quickly. It suggested that storage infrastructure could, in some contexts, be deployed more rapidly and with less complexity than traditional generation projects.",
      "In that sense, Tesla’s project did more than create the largest battery of its time. It opened a wider conversation about energy resilience, sustainability, and the practical future of renewable power. For places like Nepal, it offered not just a technological headline, but a glimpse of how energy independence might be shaped in the years ahead.",
    ],
    tags: ["energy", "tesla", "sustainability", "nepal", "archive"],
    publishedAt: "2017-12-01T00:00:00.000Z",
    sourceLabel: "Personal archive (2017)",
  },
];

export const featuredPhotographyNotes = [
  {
    id: "photo-placeholder-01",
    title: "Photography feed ready",
    alt: "Photography placeholders awaiting Instagram post URLs.",
    imageUrl:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Add curated Instagram post URLs in content/site-content.ts to replace this placeholder with your photography.",
    postUrl: "https://www.instagram.com/shreeti_nmzz/",
  },
];
