const translations = new Map();

function buildTranslationKey(text, languageCode) {
  return `${text}-${languageCode}`;
}

function getCachedTranslation(text, languageCode) {
  const key = buildTranslationKey(text, languageCode);
  return translations.get(key);
}

function cacheTranslation(text, languageCode, translation) {
  const key = buildTranslationKey(text, languageCode);
  translations.set(key, translation);
}

function handleTranslationError(error) {
  console.log('An error occurred while translating, error:', error);
}

function fetchTranslation(text, toLanguage) {
  const encodedText = encodeURIComponent(text);
  const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${toLanguage}&dt=t&q=${encodedText}`;

  return fetch(apiUrl)
}

async function translateTextApiCall(text, toLanguage, element) {


  const cachedTranslation = getCachedTranslation(text, settings.languageCode);

  if (cachedTranslation) {
    element.textContent = cachedTranslation;
  } else {
    fetchTranslation(text, toLanguage)
    .then(response => {
      if (!response.ok) {
        throw new Error('Translation request failed');
      }
      return response.json();
    })
    .then(data => {
      if (data && data[0] && data[0][0] && data[0][0][0]) {
        const translation = data[0][0][0];
        cacheTranslation(text, settings.languageCode, translation);
        element.textContent = translation;
      } else {
        throw new Error('Translation not available');
      }
    })
    .catch(handleTranslationError)
  }
}

function translateTextsOnPage(toLanguage) {
  const textElements = document.querySelectorAll('p, a, h2, h3, h4, h5');

  for (let index = 0; index < textElements.length; index++) {
    const element = textElements[index];
    const originalText = element.textContent.trim();
    const isUntranslatable = element.hasAttribute("data-untranslatable");

    if (isUntranslatable || !originalText) continue;

    translateTextApiCall(originalText, toLanguage, element);
  }
}

async function checkAndTranslateText() {
  const defaultLanguage = "pt"
  const shouldTranslate = settings.languageCode !== defaultLanguage;

  if (shouldTranslate) {
    if (selectLanguage.value !== defaultLanguage) {
      settings.languageCode = selectLanguage.value;
    }
    selectLanguage.value = settings.languageCode;
    translateTextsOnPage(selectLanguage.value);
  }
}