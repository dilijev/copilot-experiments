# copilot-experiments

This is an experiments repo for me to see what GitHub Copilot can do and documenting the developer experience via a series of commits for anyone who finds it useful or interesting.


# How to read this repo

I recommend reading the commit history for any file you are interested in, which will show the development process.

The final versions of the files are not the interesting part of this repository, rather the history is likely more interesting. The commit history will show some history that doesn't make it to the final version.

I'll try to use the convention of indicating where the HUMAN (me) had to step in and make some adjustments that COPILOT would not or if it was simpler to do what I wanted instead of trying to communicate what I wanted to COPILOT.

I'll try to use the convention of leaving in place anywhere that I made comments to prompt COPILOT. I will further indicate my own commentary about what went wrong or needed adjustment with a different kind of comment prefix (if the language's comment is `//` then I'll use `// #` to indicate my commentary, for example).


# First Impressions

I've been very impressed at Copilot's ability to make solid suggestions a surprisingly large percentage of the time, both in green-field code files like are in this repo, as well as in larger projects with many files and lines of code that already exist.

Copilot has served for me so far (just a couple of days at time of writing) as a means to shortcut numerous web searches and queries to StackOverflow in a single prompt. I typically work in a lot of different languages (though mainly, C++ and Python, with some shell scripting), and mainly in well-established work projects where one mostly works with APIs created inside of the project, so I don't do a great job of remembering the specific names and semantics of functions in various languages' standard libraries, but if I've seen it before, and I know what I'm looking for, I can find it relatively quickly with a web search. Maybe AI can get there faster than me...?

What about when I know what I want to do but I don't know what to look for? It's nice to have someone to ask. Why not an AI? ChatGPT gives text reponses that are reasonably helpful most of the time. Maybe Copilot can give equal or better code snippet suggestions?

ChatGPT has impressed me with synthesizing from various sources mostly-correct or at least helpful-to-light-the-way answers to queries, so I figured Copilot could do the same. In just a couple of days, Copilot has managed to save me lots of web searches and code spelunking.

I used to write templates for IDEs like Eclipse or Visual Studio for patterns that I used to write a lot. But adding a template is a big overhead so it has to be something I'll use a lot. Copilot feels like it has N templates all at once, on-demand, as needed, and with minimal configuration, all I need to do is open up a code file which might have some code Copilot can use for context and give it a natural language prompt, and those templates show up as suggestions really quickly.

To be fair, a lot of the time it suggests things are aren't so helpful, but you can generally recognize pretty quickly when a suggestion is not helpful and dismiss it and go back to prompting. It's probably a better hit rate than this, but I imagine maybe 90% of the time in real code it won't provide something super useful the first time and will require a lot more work to prompt it correctly. I'm convinced it's not going to replace human programmers anytime soon because there's a lot of cases where it has had nothing useful to suggest.

It seems to be a lot more versatile in a greenfield small project than in well-established code where edits tend to be small overall, but it has still been helpful in writing some boilerplate and saving me significant time on the copy-paste-edit loop when modeling new code after existing code patterns. I can focus on my design and let the code suggestions keep me focused in the function that matters instead of bouncing around to other places that have done similar patterns with different specifics.


# Short Examples

## Remove a given class from all elements on a webpage

```
// Remove the class "content-hidden" from each div on the page with that class.
for (let div of document.querySelectorAll('.content-hidden')) {
    div.classList.remove('content-hidden');
}
```

I stopped typing after `for` and Copilot suggested the rest.

Off the top of my head I knew I could write suitable JS in a few minutes to do this, perhaps via a few trial-and-error steps, but I wanted to see what Copilot would produce. I may be overstating the point in terms of raw time saved on research, but it produced immediately, obviously correct code on the first try (or, close enough, maybe I meant specifically div's whereas Copilot interpreted that as a variable loop name, but this was more than good enough for a quick hack I needed to check something, and I didn't have to look up (or bugfix) any of the following:

- The difference between `of` and `in` for `for` loops over lists in JS.
- The specific name of the `<element>.classList` property.
- The choice to use `querySelectorAll` instead of `getElementsByClassName` (which is more a stylistic thing, maybe, I haven't used `querySelectorAll` as often but I usually save it for more complicated CSS-selector type queries than this).

