import { empty } from "./lib/elements.js";
import { renderDetails, renderFrontpage, searchAndRender } from "./lib/ui.js";

/**
 * Fall sem keyrir við leit.
 * @param {SubmitEvent} e
 * @returns {Promise<void>}
 */
async function onSearch(e) {
  e.preventDefault();

  if (!e.target || !(e.target instanceof Element)) {
    return;
  }

  const { value } = e.target.querySelector("input") ?? {};

  if (!value) {
    return;
  }

  await searchAndRender(document.body, e.target, value);
  // bætir við URL þannig að það sýni leit fyrir eftirfarandi hlut
  window.history.pushState({}, "", `/?query=${value}`);
}

/**
 * Athugar hvaða síðu við erum á út frá query-string og birtir.
 * Ef `id` er gefið er stakt geimskot birt, annars er forsíða birt með
 * leitarniðurstöðum ef `query` er gefið.
 */
function route() {
  const { search } = window.location;
  const qs = new URLSearchParams(search); // tekur við streng og skilar query og id gildi

  // finnum þessi query og id gildi
  const query = qs.get("query") ?? undefined; // ef query er null eða undefined þá gerist það sem er eftir ??
  const id = qs.get("id");

  const parentElement = document.body;

  if (id) {
    renderDetails(parentElement, id);
  } else if (query) {
    // vantar eitthvað hér? bætti þessu við því synilausnin gerði það líka
  } else {
    renderFrontpage(parentElement, onSearch, query);
  }
}

// Bregst við því þegar við notum vafra til að fara til baka eða áfram.
window.onpopstate = () => {
  /* TODO bregðast við */
  // þurfum að nota empty hér. sýnilausnirnar gera það og empty er importað frá elements.js efst uppi
  empty(/* vantar eitthvað hér */);
  route();
};

// Athugum í byrjun hvað eigi að birta.
route();
