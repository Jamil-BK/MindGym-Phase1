# MindGym – Phase 2

Train Your Brain – With Click and Trick  
CPAN-144 – Advanced Front-End Programming  
Solo Developer: Jamil Khalil (N01752206)



##### Project Overview

MindGym is a multi-tool web application designed to offer a combination of quick entertainment, learning, and mental stimulation through interactive tools. Users can access games like memory challenges, riddles, math quizzes, and utilities like a joke generator and movie search — all through a clean, responsive interface. This project demonstrates core front-end skills, including routing, state management, modular components, styling, and API integration using Next.js.



##### Application Routes

* /              : Landing page / welcome screen
* /menu          : Central dashboard for accessing all tools
* /jokes         : Joke generator with save-to-favorites option
* /quiz          : 5-question math quiz with score and feedback
* /memory        : Emoji sequence memory game with scoring
* /riddle        : Riddle of the day with answer checking
* /movies        : Search movies using public API



##### Components Summary

* ToolPage        : Shared layout wrapper for each tool page
* HeaderBlock     : Combined navbar and hero banner section
* Footer          : Site-wide footer component
* Note: Additional UI logic is still inside the main page files. In Phase 3, these will be refactored into smaller reusable components such as JokeCard, QuizQuestion, etc.



##### State Management Overview

* Jokes Tool uses: joke, favorites, showSaveMsg
* Quiz Tool uses: questions, score, selected, feedback
* Memory Game uses: sequence, userInput, message, correct
* Riddle Tool uses: riddle, userAnswer, score
* Movies Tool uses: searchTerm, results, error



##### Styling and Theming

* Each tool has its own CSS file (e.g., jokes.css, quiz.css)
* Dark theme with accent colors: black, golden, orange, red, ash
* Responsive layout using flexbox, rem, %, and media queries
* Conditional styling is applied to buttons, feedback messages, and game states



##### Features Demonstrated

* Modular layout using shared components (ToolPage, HeaderBlock, Footer)
* Routing for all tools using Next.js App Router
* useState and useEffect used throughout the tools
* API integration in Jokes and Movies pages
* LocalStorage usage for saving joke favorites
* Responsive design and visual styling for interactive tools



##### Planned Features for Phase 3

* Add a user comment feature for selected tools
* Create a Contact Us page with form handling
* Implement dynamic movie detail view at /movies/\[id]
* Refactor large pages into smaller components
* Add performance optimizations (lazy loading, code cleanup)
* Prepare slides and video walkthrough for final presentation



##### Screenshots

Screenshots of all tools and interface views are included in the attached Word report (Phase 2 Completion Report.docx).



##### Repository Notes

The GitHub repository was originally created during Phase 1 and retains its original name. All Phase 2 updates have been added to the same repo for continuity.



##### Submission Includes

* Full project source code with all tools
* This README file
* Word document with Phase 2 summary and screenshots





