(() => {
  const scores = { wazu: 0, nithu: 0 };
  const $ = (id) => document.getElementById(id);
  const result = $('result');
  let resultTimer;

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

  function endGame() {
    const winner = scores.wazu > scores.nithu ? 'Wazu' : 'Nithu';
    $('result-title').textContent = scores.wazu === scores.nithu ? 'It’s a tie!' : `${winner} won!`;
    const loser = winner === 'Wazu' ? 'Nithu' : 'Wazu';
    $('result-copy').textContent = scores.wazu === scores.nithu
      ? 'Wazu loves Nithu and Nithu loves Wazu the most in the entire world.' : `${winner} loves ${loser} the most in the entire world.`;
    result.hidden = false;
    $('play-again').focus();
  }

  $('end-game').addEventListener('click', endGame);
  $('close-result').addEventListener('click', () => { result.hidden = true; $('end-game').focus(); });
  $('play-again').addEventListener('click', () => {
    scores.wazu = 0; scores.nithu = 0;
    $('wazu-count').textContent = '0'; $('nithu-count').textContent = '0';
    result.hidden = true; $('wazu').focus();
  });
  result.addEventListener('click', (event) => { if (event.target === result) result.hidden = true; });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !result.hidden) result.hidden = true; });
})();

