STUDENTS GUIDE — ISLAMIC LEARNING WEBSITE
========================================

WEBSITE SECTIONS
- Fiqh
- Aqaaid
- Hadeeth
- Islamic History
- Surah Audios
- Dua Audios

Each section opens its own page. The home page has six pastel cards. Students can search the resources you add. There are no grade categories.

HOW TO ADD YOUR OWN MATERIAL
Your materials are kept in resources.js. You are the person who controls this file through your private GitHub account. Visitors can view the website but cannot edit your GitHub files.

To add a written note, upload your PDF/document to a host that gives you a public viewing link, then add an entry inside the resources array in resources.js, like this:

{
  type: "note",
  title: "Wudhu",
  subject: "Fiqh",
  description: "Important points about Wudhu.",
  keywords: "wudhu, ablution, tahaarah",
  url: "PASTE_PUBLIC_DOCUMENT_LINK_HERE",
  icon: "📝"
},

To add a Surah audio, add:

{
  type: "surah",
  title: "Surah Al-Faatihah",
  subject: "Surah Audios",
  description: "Listen to the recitation.",
  keywords: "faatihah quran recitation",
  audioUrl: "PASTE_DIRECT_AUDIO_FILE_LINK_HERE",
  icon: "🎧"
},

To add a Dua audio, add:

{
  type: "dua",
  title: "Morning Dua",
  subject: "Dua Audios",
  description: "Listen and practise this Dua.",
  keywords: "morning dua supplication",
  audioUrl: "PASTE_DIRECT_AUDIO_FILE_LINK_HERE",
  icon: "🤲"
},

For Aqaaid, Hadeeth and Islamic History notes, use those exact subject names in the subject field. Use a direct MP3, M4A or OGG audio-file link for audio. The website displays your hosted files; it does not upload/store them itself. Audio controls hide the download button in supported browsers, but cannot prevent recording or copying.

PUBLISHING THE UPDATED WEBSITE
1. Extract this ZIP file.
2. Open the students-guide folder inside it.
3. In your GitHub repository, replace the existing index.html, styles.css, script.js, resources.js and README.txt with the updated versions. Upload the files to the repository's top level (root), not inside another folder.
4. Commit the changes. GitHub Pages will publish the update automatically.
5. Open your website and refresh it.

EDITING LATER
When you want to add or change content, open resources.js in your GitHub repository, tap the pencil/Edit icon, make your changes in the resources array, and commit the file. Only people with repository write access can do this. Keep your GitHub account password private.

IMPORTANT
The website is public, so anything you publish can be viewed by visitors. Do not put private student information on the website. Only upload content you own or have permission to share.
