# User Adaptive Textbook

A prototype and authoring workflow for adapting textbook presentation to reader preferences while preserving the instructional content.

## Live prototype

The current demonstration is hosted at [BYUICourseDev](https://scottdouglasrey.github.io/BYUICourseDev/?present=1#4.2). The project source in this repository is being organized from the authoring files used for that prototype.

## Methodology

1. **Establish authoritative source content.** Capture the chapter text and structure, document the source and any normalization, and retain stable source blocks as the reference version.
2. **Define adaptation boundaries.** Identify which explanatory narrative can vary and which material must remain fixed, such as learning outcomes, definitions, procedures, lists, quantitative data, worked examples, and assessment criteria.
3. **Author alternatives against learning goals.** Prepare a small set of clearly distinct explanations and optional supports (for example analogies or expanded explanations). Each alternative should convey the same required concepts and should not assume a learner's ability from a preference.
4. **Review and validate.** Compare every alternative with its source passage; check factual accuracy, completeness, accessibility, and combinations of preferences. Show users what changed and make the original available.
5. **Keep personalization transparent and under user control.** Let readers select or change presentation preferences. Explain that preferences affect presentation and optional practice, not learning objectives, grades, or inferred traits.
6. **Evaluate learning separately.** User preference and engagement are not proof of learning. Evaluate comprehension, transfer, and retention with appropriate learners and revise based on evidence and subject-expert review.

## Prototype scope

The Chapter 4 prototype uses prepared adaptations; the reader does not call a language model. Its interface supports original and adapted views, comparison, practice supports, local notes, and reading progress. Notes and preferences are stored locally in the browser and do not synchronize. This is a prototype, not evidence that adaptation improves learning. Subject-expert review and classroom evaluation are needed before instructional deployment.

## Build and preview

See the project files and authoring notes in this repository. The standalone reader can be opened locally; for a local web preview, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:8765/chapter-4-dynamic.html#4.2`.

## Source attribution

The demonstration adapts Chapter 4 of Jeremy Slade, *Agricultural Commodity Marketing*. Consult the source manifest and project documentation for capture details and attribution.
