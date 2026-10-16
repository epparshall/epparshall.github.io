---
title: "Naked Statistics: Stripping the Dread from the Data"
author: "Charles Wheelan"
image: "/images/books/naked-statistics.jpg"
rating: 3
---

*Naked Statistics: Stripping the Dread from the Data* by Charles Wheelan is the kind of book I wish I had read when I was taking statistics. It is a casual, easy to read tour through the most important concepts in statistics, told with enough humor and real world examples that you do not need to be hunched over a notebook to follow along. I could read this one before bed or during lunch and still walk away learning something, which is rare for a math book.

The chapter that stuck with me most was the one on the Central Limit Theorem (CLT). Wheelan calls the CLT chapter "The LeBron James of statistics," which is honestly a fair title. The CLT is one of those concepts that almost every stats student technically learns but most never fully understand. Wheelan lays it out with a story about a missing bus of marathon runners somewhere in a city that is also hosting an international sausage festival. If you find a bus full of heavyset people, is the bus more likely to be the marathon bus or the sausage bus? The CLT lets you answer that question precisely, and the way he sets it up makes it feel like you are figuring out the math yourself rather than being lectured at.

He also uses the CLT to walk through a 2011 study that linked brain volume to autism spectrum disorder. The study only had 97 subjects, which sounds small, but Wheelan uses the CLT to show why a well sampled study of that size can still produce findings you can trust. That is the kind of example that makes the CLT feel useful instead of abstract. There is also a great [3Blue1Brown video on the same topic](https://www.youtube.com/watch?v=zeJD6dqJ5lo) that pairs really well with the chapter if you want a visual companion.

If you want a casual, funny, surprisingly substantive introduction to statistics, *Naked Statistics* is hard to beat. It does not replace a proper textbook, and it is not trying to. What it does is give you the intuition behind the concepts that textbooks usually present as formulas, and that intuition is what actually sticks years later.

One more thing for the math nerds: Wheelan does not get into this in the book, but the way the CLT really clicked for me was realizing that adding two independent random variables is the same as convolving their probability density functions. A Gaussian convolved with a Gaussian is always another Gaussian, which makes the Gaussian a kind of fixed point of the convolution operation. So when you keep adding more and more independent random variables together, the distribution gets pulled toward the Gaussian no matter what shape it started in (as long as it has finite variance). That is the underlying mechanism for why so many things in nature end up looking bell shaped.
