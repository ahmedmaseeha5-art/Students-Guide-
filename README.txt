STUDENTS GUIDE — STARTER WEBSITE
================================

WHAT IS INCLUDED
- index.html: the website pages and layout
- styles.css: pastel colours, layout and mobile styling
- resources.js: the subjects and learning materials you can edit
- script.js: search, subject filters and resource display

PREVIEW ON A COMPUTER
1. Extract the ZIP file.
2. Open the students-guide folder.
3. Double-click index.html to preview it in your browser.
   Internet is needed for the optional Google Fonts.

HOW TO ADD STUDY NOTES
1. Upload your PDF to a file host that provides a public viewing link.
2. Open resources.js in a text editor.
3. Add a new object inside the resources array, following this example:

{
  type: "note",
  title: "Fractions: introduction",
  subject: "Mathematics",
  description: "An introduction to fractions and equivalent fractions.",
  keywords: "fractions numerator denominator maths",
  url: "PASTE_PUBLIC_DOCUMENT_LINK_HERE",
  icon: "📝"
},

HOW TO ADD AUDIO
1. Upload your audio to an audio host that provides an embeddable/direct audio file URL.
2. Add an object inside the resources array, following this example:

{
  type: "audio",
  title: "Introduction to algebra",
  subject: "Mathematics",
  description: "A short introduction to algebra.",
  keywords: "algebra variables equations",
  audioUrl: "PASTE_AUDIO_FILE_URL_HERE",
  icon: "🎧"
},

The audio player hides its download button in supported browsers, but this is not
strong copy protection. Anyone who can listen may still record or capture audio.
Do not upload copyrighted material unless you have permission to share it.

HOW TO ADD A SUBJECT
Add a subject object inside the subjects array in resources.js:
{ name: "Geography", emoji: "🌍", color: "sage" }

Available pastel color names: lav, pink, blue, sage.

PUBLISH THE WEBSITE WITH GITHUB PAGES
1. Create/sign in to a GitHub account.
2. Create a new PUBLIC repository named students-guide.
3. Upload index.html, styles.css, script.js, resources.js and README.txt
   to the top level of the repository (not inside another folder).
4. In the repository, open Settings > Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Choose branch main and folder /(root), then Save.
7. Wait for GitHub Pages to publish. Your website address will be shown
   on the Pages settings screen.

EDITING FROM PHONE OR COMPUTER
- Sign in to GitHub using the account that owns the repository.
- Open the students-guide repository.
- Open resources.js and choose the pencil/Edit button to add or change resources.
- Commit/save the changes. GitHub Pages republishes the website automatically.
- You can also edit the HTML or CSS files to change the design.

OWNER ACCESS
Keep your GitHub account secure and do not share your password.
Only give repository write access to people you trust. Visitors to the public
website do not get permission to edit the repository.

IMPORTANT
This is a starter template with sample placeholder entries. Replace them with
your own notes and audio links before sharing it publicly. The website itself
does not store uploaded files; it displays links to resources hosted elsewhere.
