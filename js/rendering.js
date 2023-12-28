function createDayCard(date, dayData) {
  const card = document.createElement("li");
  card.classList.add("c-card");

  card.innerHTML = `
    <div class="c-card__title">
      <h2 data-untranslatable>${date}</h2>
    </div>
    <ul class="c-card__content">
      <li>
        <p>Iniciou:</p> 
        <div>
          ${dayData.sections[dayData.sections.length - 1].screenOn}
        </div>
      </li>
      <li>
        <p>Finalizou:</p>
        <div>
          ${dayData.sections[0].screenOff}
        </div>
      </li>
      <li>
        <p>Usado:</p>
        <div>
          ${formatTimeFromMs(dayData.totalHoursMs)}
        </div>
      </li>
      <li>
        <p>Desbloqueios:</p>
        <div>
          ${dayData.sections.length}
        </div>
      </li>
    </ul>
    <div class="c-card__buttons">
      <button class="btn" data-delete="${date}">
        <div class="icon"></div>
        <p>Deletar</p>
      </button>
      <button class="btn" data-unlocks="${date}">
        <div class="icon"></div>
        <p>Desbloqueios</p>
      </button>
    </div>
  `;

  return card;
}

async function renderDayCards() {
  cardsContainer.innerHTML = `<div class="loading"></div>`;
  
  await sleep(200)
  
  const dayCards = Object.keys(usageData)
    .reverse()
    .map((date) => createDayCard(date, usageData[date]));
  
  cardsContainer.innerHTML = ""
  if (dayCards.length) {
    cardsContainer.append(...dayCards);
    return
  }
  
  cardsContainer.innerHTML = `
  <div class='placeholder'>
    <p>Ainda não existe nenhum dado de uso salvo.</p>
    <p>Desliga e liga a tela do celular para salvar o primeiro dado de uso...</p>
  </div>
  `;
}

function createSectionCard(section, sectionCount, index) {
  const sectionCard = document.createElement("li");
  sectionCard.classList.add("c-card");

  sectionCard.innerHTML = `
    <ul class="c-card__content">
      <li>
        <p>Desbloqueio:</p>
        <div>${sectionCount - index}</div>
      </li>
      <li>
        <p>Ligada:</p>
        <div>${section.screenOn}</div>
      </li>
      <li>
        <p>Desligada:</p>
        <div>${section.screenOff}</div>
      </li>
      <li>
        <p>Duração:</p>
        <div>${section.duration}</div>
      </li>
    </ul>
  `;

  return sectionCard;
}

function createBackButton(date) {
  const backButton = document.createElement("button");
  backButton.classList.add("c-back");
  backButton.classList.add("btn");

  backButton.innerHTML = `
  <img src="${environment.path}/assets/back-${theme.name}.png" /> 
  <p data-untranslatable>${date}</p>
  `;

  return backButton;
}

async function renderSectionInfo(date, dayData) {
  cardsContainer.innerHTML = `<div class="loading"></div>`;

  await sleep(200)

  const sectionInfoDiv = document.createElement("div");
  sectionInfoDiv.classList.add("card-select");

  const sectionCards = dayData.sections.map((section, index) =>
    createSectionCard(section, dayData.sections.length, index)
  );

  const backButton = createBackButton(date);

  async function handleBackClick() {
    await sleep(250);
    await renderDayCards();

    graph.classList.remove("hide")
    timeToday.parentNode.classList.remove("hide")

    checkAndTranslateText()
  }
  backButton.addEventListener("click", handleBackClick);

  cardsContainer.innerHTML = "";
  cardsContainer.append(backButton, ...sectionCards);
}