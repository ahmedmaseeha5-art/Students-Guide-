/*
  EDIT THIS FILE when you want to add or update learning resources.
  Keep this file's format (commas and quotation marks) as shown.

  Notes: add a public PDF/document link in "url".
  Audio: add a direct audio-file URL (MP3, M4A, or OGG) in "audioUrl".
  Use files you own or have permission to share.
*/
const subjects = [
  { name: "Fiqh", emoji: "📕", color: "pink" },
  { name: "Hadeeth", emoji: "💌", color: "blue" },
  { name: "Aqaaid", emoji: "🧭", color: "sage" },
  { name: "Audios", emoji: "🌱", color: "lav" },
  { name: "General Knowledge", emoji: "🌍", color: "pink" }
];

const resources = [
  {
    type: "note",
    title: "Getting started with study notes",
    subject: "General Knowledge",
    description: "A sample entry showing how a written learning resource will appear.",
    keywords: "study learning revision example",
    url: "#",
    icon: "📝"
  },
  {
    type: "audio",
    title: "Sample audio lesson",
    subject: "Languages",
    description: "Replace the sample audio link with your own hosted recording.",
    keywords: "listening audio lesson language",
    audioUrl: "",
    icon: "🎧"
  }
];
