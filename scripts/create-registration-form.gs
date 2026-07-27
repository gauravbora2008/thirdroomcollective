/**
 * Third Room — create the shared registration Google Form
 *
 * How to run:
 * 1. Go to https://script.google.com → New project
 * 2. Delete any stub code; paste this entire file
 * 3. Save → Run → select createRegistrationForm
 * 4. Authorize when prompted (your Google account)
 * 5. View → Logs — copy the form URL
 * 6. Send that URL here so it can be wired into the site
 *
 * One form for all Saturday events (name + email → Sheets).
 */
function createRegistrationForm() {
  const form = FormApp.create("Third Room — Event Registration");

  form
    .setDescription(
      "Register for a Third Room Saturday discussion (12:00 noon IST, online).\n\n" +
        "We’ll email the Zoom link before the session. One registration works for upcoming events; " +
        "mention which date/series you’re joining if you know it.",
    )
    .setConfirmationMessage(
      "Thanks for registering. We’ll share the Zoom link by email before the event.",
    )
    .setAllowResponseEdits(false)
    .setCollectEmail(false); // we ask for email as a field below (works without Google sign-in)

  form
    .addTextItem()
    .setTitle("Name")
    .setRequired(true);

  form
    .addTextItem()
    .setTitle("Email")
    .setRequired(true)
    .setValidation(
      FormApp.createTextValidation()
        .requireTextIsEmail()
        .setHelpText("Enter a valid email address")
        .build(),
    );

  form
    .addListItem()
    .setTitle("Which session are you registering for?")
    .setChoiceValues([
      "1 Aug 2026 — Vegan Philosophy: Can speciesism be justified?",
      "8 Aug 2026 — Atheism & Philosophy of Religion: Does the problem of evil make theism unreasonable?",
      "15 Aug 2026 — Continental Philosophy: What is phenomenology asking us to do?",
      "22 Aug 2026 — Indian Philosophy: Is the self real?",
      "Not sure yet / general interest",
    ])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle("Anything you want to raise in the discussion? (optional)")
    .setRequired(false);

  form
    .addParagraphTextItem()
    .setTitle("How did you hear about Third Room? (optional)")
    .setRequired(false);

  // Linked Sheet for responses
  const ss = SpreadsheetApp.create("Third Room — Registrations");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  const editUrl = form.getEditUrl();
  const publishedUrl = form.getPublishedUrl();

  Logger.log("Edit (yours): " + editUrl);
  Logger.log("Share / Register link: " + publishedUrl);
  Logger.log("Responses Sheet: " + ss.getUrl());

  // Also surface in a UI dialog when run from the editor
  try {
    SpreadsheetApp.getUi(); // may fail outside Sheets
  } catch (e) {
    // ignore
  }

  return publishedUrl;
}
