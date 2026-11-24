// "Send feedback about this page": a small box on every page; the note goes to the shop's back-office form inbox.
(function(){
  const CLIENT = "cc40edea-1299-4afb-b87f-dd336a1dca83", FORM = "a2c77b57-741f-4dff-8031-1a422f2a3cfd";
  const S = {
    EN:{link:"Send feedback about this page", title:"Send feedback about this page", head:"Help us improve this page", intro:"Found an error on this page? A broken button, a missing photo, a wrong price, a translation mistake, a problem at the checkout? Or do you have an idea to make it better? Tell us, it takes one minute.", ph:"For example: an error on the page, something that does not work, a mistake in the text, a problem paying, or a suggestion…", email:"Your email, if you would like a reply (optional)", send:"Send", cancel:"Cancel", ok:"Thank you! Your feedback has been sent.", err:"Sorry, that did not go through. Please email info@littleowlshut.com."},
    DE:{link:"Feedback zu dieser Seite senden", title:"Feedback zu dieser Seite senden", head:"Hilf uns, diese Seite zu verbessern", intro:"Einen Fehler auf dieser Seite gefunden? Ein Button funktioniert nicht, ein Foto fehlt, ein Preis stimmt nicht, ein Übersetzungsfehler, ein Problem an der Kasse? Oder hast du eine Idee, wie es besser geht? Schreib uns, es dauert nur eine Minute.", ph:"Zum Beispiel: ein Fehler auf der Seite, etwas funktioniert nicht, ein Fehler im Text, ein Problem beim Bezahlen oder ein Vorschlag…", email:"Deine E-Mail, falls du eine Antwort möchtest (freiwillig)", send:"Senden", cancel:"Abbrechen", ok:"Danke! Dein Feedback wurde gesendet.", err:"Das hat leider nicht geklappt. Bitte schreib an info@littleowlshut.com."},
    NL:{link:"Feedback over deze pagina sturen", title:"Feedback over deze pagina sturen", head:"Help ons deze pagina te verbeteren", intro:"Een fout op deze pagina gevonden? Een knop die niet werkt, een foto die ontbreekt, een verkeerde prijs, een vertaalfout, een probleem bij het afrekenen? Of heb je een idee om het beter te maken? Laat het ons weten, het kost één minuut.", ph:"Bijvoorbeeld: een fout op de pagina, iets dat niet werkt, een fout in de tekst, een probleem met betalen of een suggestie…", email:"Je e-mail, als je een antwoord wilt (niet verplicht)", send:"Versturen", cancel:"Annuleren", ok:"Bedankt! Je feedback is verstuurd.", err:"Dat is helaas niet gelukt. Mail naar info@littleowlshut.com."},
    DA:{link:"Send feedback om denne side", title:"Send feedback om denne side", head:"Hjælp os med at forbedre denne side", intro:"Har du fundet en fejl på denne side? En knap der ikke virker, et billede der mangler, en forkert pris, en oversættelsesfejl, et problem ved betalingen? Eller har du en idé til at gøre den bedre? Skriv til os, det tager et minut.", ph:"For eksempel: en fejl på siden, noget der ikke virker, en fejl i teksten, et problem med betalingen eller et forslag…", email:"Din e-mail, hvis du gerne vil have svar (valgfrit)", send:"Send", cancel:"Annuller", ok:"Tak! Din feedback er sendt.", err:"Det lykkedes desværre ikke. Skriv til info@littleowlshut.com."},
    IT:{link:"Invia un commento su questa pagina", title:"Invia un commento su questa pagina", head:"Aiutaci a migliorare questa pagina", intro:"Hai trovato un errore in questa pagina? Un pulsante che non funziona, una foto mancante, un prezzo sbagliato, un errore di traduzione, un problema al pagamento? Oppure hai un’idea per migliorarla? Scrivicelo, basta un minuto.", ph:"Per esempio: un errore nella pagina, qualcosa che non funziona, un errore nel testo, un problema nel pagamento o un suggerimento…", email:"La tua email, se desideri una risposta (facoltativa)", send:"Invia", cancel:"Annulla", ok:"Grazie! Il tuo commento è stato inviato.", err:"Purtroppo non è andato a buon fine. Scrivi a info@littleowlshut.com."},
    PL:{link:"Wyślij opinię o tej stronie", title:"Wyślij opinię o tej stronie", head:"Pomóż nam ulepszyć tę stronę", intro:"Widzisz błąd na tej stronie? Przycisk nie działa, brakuje zdjęcia, cena jest zła, błąd w tłumaczeniu, problem przy płatności? A może masz pomysł, jak ją ulepszyć? Napisz do nas, to zajmie minutę.", ph:"Na przykład: błąd na stronie, coś nie działa, błąd w tekście, problem z płatnością albo sugestia…", email:"Twój e-mail, jeśli chcesz dostać odpowiedź (opcjonalnie)", send:"Wyślij", cancel:"Anuluj", ok:"Dziękujemy! Opinia została wysłana.", err:"Niestety nie udało się wysłać. Napisz na info@littleowlshut.com."},
    FR:{link:"Envoyer un avis sur cette page", title:"Envoyer un avis sur cette page", head:"Aide-nous à améliorer cette page", intro:"Tu as trouvé une erreur sur cette page ? Un bouton qui ne marche pas, une photo manquante, un prix incorrect, une erreur de traduction, un problème au paiement ? Ou tu as une idée pour l’améliorer ? Dis-le-nous, cela prend une minute.", ph:"Par exemple : une erreur sur la page, quelque chose qui ne marche pas, une faute dans le texte, un problème de paiement ou une suggestion…", email:"Ton e-mail, si tu souhaites une réponse (facultatif)", send:"Envoyer", cancel:"Annuler", ok:"Merci ! Ton avis a bien été envoyé.", err:"Désolé, l’envoi n’a pas abouti. Écris à info@littleowlshut.com."}
  };
  const prefs = () => { try{ return JSON.parse(localStorage.getItem("hubPrefs")) || {}; }catch(e){ return {}; } };
  const str = () => S[prefs().ui] || S.EN;
  window.feedbackText = () => str();
  async function post(path, body, tok){
    const r = await fetch("https://www.wixapis.com/" + path, { method:"POST", headers: Object.assign({"Content-Type":"application/json"}, tok ? {Authorization: tok} : {}), body: JSON.stringify(body) });
    if(!r.ok) throw new Error(path + " " + r.status); return r.json();
  }
  let dlg;
  function build(){
    const css = document.createElement("style");
    css.textContent = "#fbDlg{border:0;border-radius:16px;padding:22px;width:min(460px,calc(100vw - 32px));box-sizing:border-box;background:#fffdf9;color:#2b2420;font:16px/1.5 system-ui,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.3)}#fbDlg::backdrop{background:rgba(30,20,14,.55)}#fbDlg h2{font:700 1.3rem/1.25 Georgia,serif;margin:0 0 .4em}#fbDlg p{margin:0 0 .9em;font-size:.95rem}#fbDlg textarea,#fbDlg input{width:100%;box-sizing:border-box;font:inherit;color:inherit;background:#fff;border:1px solid #cdb9a6;border-radius:10px;padding:.6em .7em;margin:0 0 .7em}#fbDlg textarea{min-height:140px;resize:vertical}#fbDlg label{display:block;font-size:.85rem;margin:0 0 .25em}#fbDlg .row{display:flex;gap:10px;justify-content:flex-end}#fbDlg button{font:700 1rem system-ui,sans-serif;border-radius:999px;padding:.65em 1.3em;border:1px solid #2b2420;background:transparent;color:#2b2420;cursor:pointer}#fbDlg button.go{background:#c8643b;border-color:#c8643b;color:#fff}#fbDlg button:disabled{opacity:.5}#fbDlg .msg{font-weight:700;margin:.2em 0 .9em}";
    document.head.append(css);
    dlg = document.createElement("dialog"); dlg.id = "fbDlg";
    dlg.innerHTML = '<form><h2 id="fbT"></h2><p id="fbI"></p><textarea id="fbM" required maxlength="2000"></textarea><label for="fbE" id="fbEL"></label><input id="fbE" type="email" maxlength="200" autocomplete="email"><p class="msg" id="fbMsg" hidden></p><div class="row"><button type="button" id="fbC"></button><button class="go" id="fbS"></button></div></form>';
    document.body.append(dlg);
    const q = id => dlg.querySelector(id);
    q("#fbC").onclick = () => dlg.close();
    dlg.querySelector("form").onsubmit = async ev => {
      ev.preventDefault(); const s = str(), b = q("#fbS"), m = q("#fbMsg"); b.disabled = true; m.hidden = true;
      try{
        const tok = (await post("oauth2/token", { clientId: CLIENT, grantType: "anonymous" })).access_token, p = prefs();
        const sub = { message: q("#fbM").value.trim().slice(0, 2000), page: location.href.slice(0, 400),
          details: [p.ui, p.cur, innerWidth + "x" + innerHeight, navigator.userAgent].filter(Boolean).join(" | ").slice(0, 400) };
        if(q("#fbE").value.trim()) sub.reply_email = q("#fbE").value.trim();
        await post("form-submission-service/v4/submissions", { submission: { formId: FORM, submissions: sub } }, tok);
        dlg.querySelector("form").innerHTML = '<h2></h2><div class="row"><button type="button" class="go">OK</button></div>';
        dlg.querySelector("h2").textContent = s.ok; dlg.querySelector("button").onclick = () => { dlg.close(); dlg.remove(); dlg = null; };
      }catch(e){ m.textContent = s.err; m.hidden = false; b.disabled = false; }
    };
  }
  window.openFeedback = function(){
    if(!dlg) build(); const s = str(), q = id => dlg.querySelector(id);
    q("#fbT").textContent = s.title; q("#fbI").textContent = s.intro; q("#fbM").placeholder = s.ph; q("#fbEL").textContent = s.email;
    q("#fbC").textContent = s.cancel; q("#fbS").textContent = s.send; dlg.showModal(); q("#fbM").focus();
  };
  document.querySelectorAll("[data-feedback]").forEach(el => { const t = str();
    el.innerHTML = '<h2></h2><p></p><button type="button"></button>'; el.children[0].textContent = t.head; el.children[1].textContent = t.intro;
    el.children[2].textContent = "💬 " + t.link; el.children[2].onclick = window.openFeedback; el.hidden = false; });
})();
