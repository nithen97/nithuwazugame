(() => {
  const scores = { wazu: 0, nithu: 0 };
  const $ = (id) => document.getElementById(id);
  const result = $('result');
  let busy = false;
  function kiss(recipient, giver) {
    if (busy) return;
    busy = true;
    scores[giver] += 1;
    $(`${giver}-count`).textContent = scores[giver];
    const target = $(recipient);
    const garden = document.querySelector('.garden');
    garden.classList.remove('kiss-scene', 'kiss-wazu', 'kiss-nithu');
    void garden.offsetWidth;
    garden.classList.add('kiss-scene', `kiss-${giver}`);
    const bubble = $('kiss-overlay');
    bubble.classList.remove('visible');
    void bubble.offsetWidth;
    bubble.classList.add('visible');
    window.setTimeout(() => { garden.classList.remove('kiss-scene', 'kiss-wazu', 'kiss-nithu'); busy = false; }, 500);
    window.setTimeout(() => bubble.classList.remove('visible'), 650);
  }

  $('wazu').addEventListener('click', () => kiss('nithu', 'wazu'));
  $('nithu').addEventListener('click', () => kiss('wazu', 'nithu'));

  const moon = $('moon-button');
  const moonMessage = $('moon-message');
  let moonTaps = 0;
  let moonResetTimer;
  let moonReactionTimer;
  moon.addEventListener('click', () => {
    if (!result.hidden && $('result-card').classList.contains('result-tie')) {
      window.clearTimeout(moonReactionTimer);
      moonMessage.textContent = 'the heavens are rejoicing!';
      moonMessage.classList.add('moon-message-visible');
      moonReactionTimer = window.setTimeout(() => {
        moonMessage.classList.remove('moon-message-visible');
        moonMessage.textContent = 'dont tickle me ill bite';
      }, 2500);
      return;
    }
    if (moon.classList.contains('moon-biting')) return;
    moonTaps += 1;
    window.clearTimeout(moonResetTimer);
    if (moonTaps === 1) {
      moon.classList.remove('moon-nudged');
      void moon.offsetWidth;
      moon.classList.add('moon-nudged');
      moonResetTimer = window.setTimeout(() => { moonTaps = 0; moon.classList.remove('moon-nudged'); }, 1300);
      return;
    }
    moonTaps = 0;
    window.clearTimeout(moonReactionTimer);
    moon.classList.remove('moon-nudged');
    moon.classList.add('moon-biting');
    moon.setAttribute('aria-pressed', 'true');
    moonMessage.classList.add('moon-message-visible');
    moonReactionTimer = window.setTimeout(() => {
      moon.classList.remove('moon-biting');
      moon.setAttribute('aria-pressed', 'false');
      moonMessage.classList.remove('moon-message-visible');
    }, 2500);
  });

  function endGame() {
    const tie = scores.wazu === scores.nithu;
    const winner = scores.wazu > scores.nithu ? 'Hazu' : 'Nithu';
    const card = $('result-card');
    card.classList.remove('result-tie', 'result-hazu', 'result-nithu');
    card.classList.add(tie ? 'result-tie' : `result-${winner.toLowerCase()}`);
    moon.classList.toggle('moon-celebrating', tie);
    $('result-title').textContent = tie ? 'It’s a tie!' : `${winner} won!`;
    const loser = winner === 'Hazu' ? 'Nithu' : 'Hazu';
    $('result-copy').textContent = tie
      ? 'you both love each other the most! the moon is celebrating.' : `${winner} loves ${loser} the most in the entire world.`;
    result.hidden = false;
    $('play-again').focus();
  }

  $('end-game').addEventListener('click', endGame);
  $('close-result').addEventListener('click', () => { result.hidden = true; moon.classList.remove('moon-celebrating'); $('end-game').focus(); });
  $('play-again').addEventListener('click', () => {
    scores.wazu = 0; scores.nithu = 0;
    $('wazu-count').textContent = '0'; $('nithu-count').textContent = '0';
    result.hidden = true; moon.classList.remove('moon-celebrating'); $('wazu').focus();
  });
  result.addEventListener('click', (event) => { if (event.target === result) { result.hidden = true; moon.classList.remove('moon-celebrating'); } });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !result.hidden) { result.hidden = true; moon.classList.remove('moon-celebrating'); } });
})();

