// Islamic Studies header block injected at top of prompt when subject is Islamic Studies

export function getIslamicStudiesBlock() {
  return `IMPORTANT ISLAMIC STUDIES REQUIREMENTS — Follow these exactly:

1. Use Arabic script (not transliteration) for ALL Islamic terms, topic names, subtopics, and keywords throughout the lesson and quiz.
2. For ALL Quran verses, use ONLY "The Clear Quran" by Dr. Mustafa Khattab as the translation source. Present each verse as:
   - Arabic ayah (full text)
   - English translation (Mustafa Khattab)
   - Surah name and ayah number
3. For ALL duas, provide:
   - Arabic text (full)
   - English translation from an authentic Sunni hadith source
   - Name of the hadith collection it is sourced from (e.g., Sahih al-Bukhari, Sahih Muslim, Jami' at-Tirmidhi, Sunan Abu Dawud)
4. All Islamic teachings must be from a Sunni (أهل السنة والجماعة) perspective.
5. End the lesson with a "Something I can practice this week:" takeaway — one specific, actionable behavior the student can apply.
6. Connect teachings to real daily-life situations a 4th/5th grader would encounter.
7. Never include transliteration (Latin-script phonetic spelling of Arabic). Arabic terms appear in Arabic script only, with English translation provided where needed.`;
}

export function getIslamicVocabularyInstruction() {
  return `For Islamic Studies vocabulary: Use the Arabic term (in Arabic script), followed by the English meaning, followed by a one-sentence example. Example format: التَّوَكُّل — Reliance on Allah — When you study hard for a test and then trust that Allah will help you, that is التَّوَكُّل.`;
}
