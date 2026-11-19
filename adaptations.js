// Prepared presentation variants. No student data or textbook text leaves the browser.
const LESSONS = [
  {
    short: 'Introduction', focus: 'Use information to support a decision.',
    anchor: 'This chapter introduces one of the fundamental skills',
    voices: [
      'Agricultural marketing starts with evaluating information and deciding whether it is reliable. Pricing, storage, and risk management depend on accurate, timely, relevant information from credible sources: government reports, futures data, local cash bids, weather, export statistics, and farm production records. This chapter explains how each source can inform a marketing decision.',
      'Before you decide when to price a crop, store it, or manage its risk, you need information you can trust. We will work through government reports, futures data, local cash bids, weather information, export statistics, and farm production records. You will learn how to check whether that information is accurate, timely, and relevant to the decision in front of you.',
      'More market information does not automatically mean a better decision. First, check its reliability. Pricing, storage, and risk management need accurate, timely, relevant information from credible sources—not just a busy news feed. Government reports, futures data, local cash bids, weather, export statistics, and farm records each have a role. This chapter helps you decide what that role is.'
    ]
  },
  {
    short: 'Information sources', focus: 'Check credibility, timing, and relevance.',
    anchor: 'National reports and futures prices provide broad market information',
    voices: [
      'Use national reports and futures prices for the broad market picture. Use local cash bids to understand conditions in your marketing area. Together, they help you evaluate the opportunities available to you.',
      'Think about the market at two scales. National reports and futures prices help you see the bigger picture, while local cash bids show conditions closer to your operation. Bringing both together helps you evaluate marketing opportunities.',
      'A national price story cannot tell you everything about your local selling opportunity. National reports and futures prices give the broad picture; local cash bids reflect your marketing area. Check both before drawing a conclusion.'
    ],
    analogies: {
      everyday: ['Check the date on the advice', 'Imagine choosing a route to campus. A reliable traffic report from yesterday may be accurate about yesterday and useless for today. You still need a credible source, current information, and a route that actually applies to you.', 'Traffic information illustrates the three filters; commodity prices also reflect expectations, supply, and demand.'],
      gaming: ['Choose the right information feed', 'An official update, the current state of a match, and your own inventory answer different questions. A rumor in chat should not automatically outweigh verified information. Market reports, prices, and farm records likewise have distinct roles.', 'A game can have fixed rules and full state information. Real markets remain uncertain and only partly observable.'],
      business: ['A national trend is not your cash register', 'An industry report can show broad demand while a shop’s own sales records show what customers buy locally. Both matter, but neither answers every question. National market reports and local cash bids also describe different scales.', 'A retailer’s sales are not a direct substitute for a producer’s cash bid or futures reference price.']
    },
    deeper: 'Ask the three questions separately. A credible source can publish information that is already reflected in prices. A timely story can concern the wrong crop or location. A relevant claim can still lack evidence. Passing one filter does not mean the information passes the others.',
    question: ['A reputable report is current but concerns a commodity you do not market. Which filter most directly limits its use for your decision?', ['Credibility', 'Relevance', 'Publication format'], 1, 'Relevance connects information to the commodity, location, and decision you actually face. Credibility and timing alone are insufficient.'],
    challenge: ['A widely shared post says local crop conditions are poor. National estimates remain favorable. What is the most disciplined next step?', ['Treat popularity as verification', 'Reject all local evidence', 'Verify the local evidence and assess its relevance and scale'], 2, 'Local evidence may matter, but its credibility, timing, and relevance need evaluation. Neither popularity nor national averages settles the local question.'],
    hint: 'Ask whether the information applies to the decision—not just whether it is trustworthy.'
  },
  {
    short: 'USDA reports', focus: 'Compare the report with what the market expected.',
    anchor: 'Agricultural commodity markets are influenced by a continuous flow',
    voices: [
      'Agricultural markets receive information from government agencies, private analysts, industry organizations, exchanges, and market participants. These sources differ in credibility, timeliness, and price influence. USDA reports are widely regarded as authoritative because they use standardized survey methods, statistical analysis, and public reporting procedures. Producers, processors, merchandisers, traders, lenders, and policymakers use them to assess conditions and make marketing decisions.',
      'You will encounter market information from government agencies, private analysts, industry organizations, exchanges, and other participants. Its credibility, timeliness, and effect on prices will vary. USDA reports provide an important reference: standardized surveys, statistical analysis, and publicly available reporting procedures make them widely trusted. That is why people throughout agriculture—from producers and processors to merchandisers, traders, lenders, and policymakers—use them when assessing markets and making decisions.',
      'Not every market claim deserves the same weight. Government agencies, private analysts, industry organizations, exchanges, and participants supply information with different credibility, timing, and price influence. USDA reports carry weight because of standardized surveys, statistical analysis, and public reporting procedures. Producers, processors, merchandisers, traders, lenders, and policymakers rely on that foundation to assess markets and make decisions.'
    ],
    analogies: {
      everyday: ['The surprise changes the plan', 'If you expect a long line and find a long line, little has changed in your plan. If the line is much longer than expected, you reassess. A market report matters partly because of what it changes relative to expectations.', 'Queues illustrate surprise; they do not determine a commodity’s price response.'],
      gaming: ['Read the update against expectations', 'Suppose players expect an update to add a modest supply of a tradable item. An unexpectedly large supply changes their assessment more than an update that matches expectations. USDA inventory surprises similarly require a revised supply assessment.', 'In-game items may have artificial scarcity and rules. Crop inventories involve physical production, storage, and real demand.'],
      business: ['Actual inventory versus the plan', 'A business budgets around expected inventory. Discovering more stock than expected changes its assessment of availability. In the corn example below, the important comparison is reported inventory against the trade estimate.', 'The analogy explains an inventory surprise. It does not imply an automatic selling decision or a known price change.']
    },
    deeper: 'Keep three steps distinct: calculate the difference from expectations, interpret what it means for the supply-and-demand outlook, and evaluate your response against your own plan. The report can change the outlook without requiring an immediate sale. Inventory buffers and supply-and-demand responsiveness influence the market’s sensitivity.',
    question: ['The market expected 8.0 billion bushels and the report showed 8.4 billion. What is the inventory surprise?', ['400 million bushels more than expected', '400 million bushels less than expected', '8.4 billion bushels more than expected'], 0, '8.4 − 8.0 = 0.4 billion, or 400 million bushels above expectations. This is a supply surprise; the example does not specify an exact price change.'],
    challenge: ['Inventories exceed expectations by 400 million bushels. Which conclusion goes beyond the evidence in the example?', ['Available supply is greater than expected', 'The outlook deserves reassessment', 'Every producer must sell immediately'], 2, 'A bearish supply surprise does not establish the best action for every operation. Local relevance, objectives, positions, and decision triggers still matter.'],
    hint: 'Subtract expected inventory from reported inventory. Both are measured in billions of bushels.'
  },
  {
    short: 'Seasonality', focus: 'A historical tendency is not a promise.',
    anchor: 'Seasonal analysis is most valuable when incorporated',
    voices: [
      'Use seasonal analysis as one part of a complete marketing strategy, alongside fundamental analysis, basis evaluation, storage economics, and risk management. These ideas prepare you for later work on storage decisions, market carry, basis behavior, and long-term marketing planning.',
      'You can make better use of seasonal analysis by connecting it with fundamentals, basis, storage economics, and risk management. Keep those connections in mind: they will support your later study of storage decisions, market carry, basis behavior, and long-term marketing plans.',
      'A seasonal chart cannot carry an entire marketing strategy. Combine it with fundamental analysis, basis evaluation, storage economics, and risk management. That broader approach leads into the later chapters on storage decisions, market carry, basis behavior, and long-term planning.'
    ],
    analogies: {
      everyday: ['A seasonal pattern, with exceptions', 'You might expect more demand for winter coats in cold months. That is a useful planning tendency, but unusual weather or a supply disruption can change the outcome. Agricultural seasonal patterns also need to be checked against current conditions.', 'Retail demand illustrates recurrence. Crop seasonality also involves harvest supply, storage, transportation, and basis.'],
      gaming: ['A familiar cycle is not a script', 'A recurring game event may create familiar supply patterns for items. An unexpected rule change can disrupt that pattern. Seasonal market history is also a reference that current evidence can overturn.', 'Agricultural cycles are biological and economic; their timing and outcomes are not controlled by a game designer.'],
      business: ['Plan for the season, check this year', 'A seasonal retailer uses several years of sales history to plan inventory, then adjusts for current demand and supply conditions. A producer can similarly use historical price windows while checking current fundamentals.', 'Retail sales cycles do not establish grain futures or basis behavior; analyze those separately.']
    },
    deeper: 'Separate futures seasonality from basis seasonality. A stronger futures price may be offset by weaker local basis, so the cash result may differ from the futures pattern. Historical averages also conceal variation between years. Examine the crop year, broad windows, ranges, and individual years before relying on a tendency.',
    question: ['A seasonal chart suggests post-harvest strength, but a new report changes the supply outlook. What should you do?', ['Follow the historical average regardless', 'Integrate the report with the seasonal evidence', 'Assume seasonality has no value'], 1, 'Seasonality is historical guidance. Current fundamentals, local basis, and other conditions can reinforce or override it.'],
    challenge: ['Futures improve during a historically favorable window, but local basis weakens. What can you conclude?', ['Cash prices must rise equally', 'Cash outcomes require evaluating futures and basis together', 'Basis has no seasonal component'], 1, 'Cash prices reflect both futures and basis. A favorable futures movement alone does not establish the same improvement in the cash bid.'],
    hint: 'Look for the option that uses both historical tendencies and current evidence.'
  },
  {
    short: 'Forecasts & uncertainty', focus: 'Prepare for several outcomes.',
    anchor: 'Agricultural production and marketing decisions must frequently',
    voices: [
      'Agricultural production and marketing decisions often precede the outcomes they depend on. Biological production takes time, so producers, merchandisers, and others use forecasts to evaluate future conditions and develop strategies. Forecasts cannot guarantee future prices, but their structured estimates use available information to reduce uncertainty in production, storage, pricing, and risk-management decisions.',
      'You often have to make an agricultural decision before you know how the market will turn out. Biological production takes time, so producers, merchandisers, and other participants use forecasts to think ahead and develop strategies. A forecast cannot promise a future price. It can organize the available information into estimates that reduce uncertainty when planning production, storage, pricing, and risk management.',
      'Waiting for certainty is rarely an available agricultural strategy. Biological production needs lead time, and production and marketing choices often come before outcomes are known. Producers, merchandisers, and others therefore use forecasts to assess future conditions. Those estimates cannot guarantee prices, but they structure available information to reduce uncertainty in production, storage, pricing, and risk management.'
    ],
    analogies: {
      everyday: ['Pack for a range of weather', 'A weather forecast helps you prepare for plausible conditions even though it cannot guarantee the weather. Preparing a response for more than one outcome is more useful than acting as though one prediction is certain.', 'A weather forecast’s probability is not a commodity-price probability. This analogy concerns planning under uncertainty.'],
      gaming: ['Have a response to more than one move', 'A strategy player prepares for several plausible opponent actions and sets conditions for changing course. Scenario planning likewise prepares responses before uncertainty is resolved.', 'Markets have many participants, physical constraints, and shocks; they are not a single opponent with a knowable strategy.'],
      business: ['Budget more than one revenue case', 'A business may prepare baseline, weaker-demand, and stronger-demand budgets. Each case has a planned response. Agricultural scenario planning similarly connects plausible outcomes to decisions and triggers.', 'A business budget is an illustration of scenario planning, not a forecast of commodity prices.']
    },
    deeper: 'Confidence describes the certainty expressed by a forecaster; accuracy concerns correspondence with later outcomes. Evaluate them separately. For scenario planning, state the assumptions, estimate economic implications, consider partial actions, and define objective triggers. Update the plan when new evidence changes those assumptions.',
    question: ['An analyst sounds certain about a price forecast. What does that establish?', ['The forecast will be accurate', 'The analyst expresses high confidence', 'Uncertainty has been eliminated'], 1, 'Confidence is expressed certainty. Accuracy is assessed against subsequent outcomes. One does not guarantee the other.'],
    challenge: ['Which plan best uses a forecast range of $4.80 to $5.40 per bushel?', ['Treat $5.40 as guaranteed', 'Wait until all uncertainty disappears', 'Evaluate several outcomes and set response triggers'], 2, 'Scenario planning uses plausible alternatives, economic implications, partial actions, and predetermined triggers. The range is a planning estimate, not a guarantee.'],
    hint: 'Separate what the forecaster expresses now from what actually happens later.'
  },
  {
    short: 'Behavioral biases', focus: 'Examine the reasoning behind the decision.',
    anchor: 'Successful agricultural marketing depends not only',
    voices: [
      'Sound agricultural marketing requires accurate information and objective interpretation. Participants use government reports, production estimates, export demand, weather forecasts, and price movements to make decisions. The value of those tools depends on the decision process: cognitive and emotional biases can distort interpretation and lead decisions away from sound economic reasoning.',
      'Finding accurate information is an important start. The next step is interpreting it objectively. Even when you use government reports, production estimates, export demand, weather forecasts, and price movements, cognitive and emotional biases can affect your reasoning. Learning to examine your decision process helps you use those analytical tools more effectively.',
      'Good data cannot make a decision objective by itself. Agricultural marketers can consult government reports, production estimates, export demand, weather forecasts, and price movements and still interpret them poorly. Cognitive and emotional biases can distort that interpretation. The usefulness of the tools depends on the reasoning used to apply them.'
    ],
    analogies: {
      everyday: ['The first price can stick', 'After seeing an unusually low price for a product, you may judge every later offer against it, even when conditions have changed. That illustrates anchoring. In the textbook’s agricultural example, the sticky reference is an early corn futures price.', 'An ordinary purchase illustrates one bias. Agricultural decisions also involve production, exposure, and changing market fundamentals.'],
      gaming: ['A win does not prove the decision was sound', 'A risky move can succeed through luck, and a well-reasoned move can fail. Reviewing only the result can hide weaknesses in the original reasoning. Review what was knowable when the choice was made.', 'Games differ from real agricultural risk. The shared idea is evaluating decision process separately from outcome.'],
      business: ['Do not make the old target the evidence', 'A business owner can keep chasing an old sales target after demand changes. If the target shapes which evidence they accept, anchoring and confirmation bias may reinforce each other.', 'A sales target is an analogy for a reference point; a producer must assess the actual supply-and-demand outlook.']
    },
    deeper: 'Distinguish the mechanisms. Anchoring clings to a reference point; confirmation bias favors supporting evidence; recency bias overweights recent events. Overconfidence exaggerates predictive ability, while hindsight makes a past outcome seem obvious. Loss aversion and regret avoidance can also make inaction feel easier. Several can operate together.',
    question: ['A soybean producer reads only bullish reports and dismisses evidence of growing global supply. Which bias is most directly illustrated?', ['Confirmation bias', 'Seasonality', 'Forecast accuracy'], 0, 'The producer favors evidence supporting an existing belief while discounting contradictory information.'],
    challenge: ['A well-reasoned sale is followed by an unexpected rally. Which review is most useful?', ['The bad outcome proves the decision was bad', 'Judge the evidence and reasoning available when the sale was made', 'Assume the rally was obvious beforehand'], 1, 'An unfavorable outcome does not by itself establish a poor decision process. Evaluate the contemporaneous evidence and assumptions; avoid hindsight bias.'],
    hint: 'Notice how the producer selects evidence that agrees with an existing belief.'
  },
  {
    short: 'Signal & noise', focus: 'Verified information still needs a decision filter.',
    anchor: 'Agricultural markets generate a continuous flow',
    voices: [
      'Agricultural markets receive constant information from government agencies, exchanges, weather services, industry organizations, financial media, and private analysts. Digital communication has expanded access and volume, making it harder to identify developments that justify changing a strategy. Effective marketing distinguishes meaningful changes in fundamentals from distracting information.',
      'With reports arriving from government agencies, exchanges, weather services, industry organizations, financial media, and private analysts, you have plenty to read. Digital communication gives you more access, but also more to sort through. Your task is to identify meaningful changes in market fundamentals and decide whether they warrant a strategy change.',
      'A busier feed is not necessarily a better market outlook. Government agencies, exchanges, weather services, industry organizations, financial media, and private analysts all supply information. Digital access has increased the volume and made important developments harder to isolate. Evaluate whether something changes fundamentals enough to justify a strategy change, rather than reacting to the distraction.'
    ],
    analogies: {
      everyday: ['Notifications are not priorities', 'A loud notification can be less important than a quiet message with a deadline. Attention and decision value are different things. Check the evidence, its timing, its importance, and what it reasonably supports doing.', 'The analogy concerns attention and filtering. It does not establish whether any particular market story is material.'],
      gaming: ['A loud chat message is not a verified update', 'A dramatic claim in chat can attract more attention than a verified change to a game’s conditions. Evaluate the evidence behind the claim before changing a strategy. In markets, the test is its effect on relevant fundamentals.', 'A game’s updates can be fully specified. Real market information is often incomplete and requires judgment.'],
      business: ['A viral post is not a demand forecast', 'A shop owner should distinguish online excitement from evidence that changes actual demand or inventory needs. A commodity marketer similarly checks whether information is credible, current, material, and actionable.', 'Social attention can sometimes affect demand. The point is to verify its implications rather than dismiss or accept it automatically.']
    },
    deeper: 'Passing the information filter does not require an immediate transaction. A verified signal may support a revised cash position, a risk-management adjustment, or maintaining the plan. Ask whether the existing strategy already accounts for the development. More activity is not the same as better decision quality.',
    question: ['A verified development is already reflected in prices and covered by your plan. Which response can be appropriate?', ['Maintain the existing strategy', 'Trade because every signal requires action', 'Ignore all future reports'], 0, 'A genuine signal does not necessarily require an adjustment. Evaluate its implications within the existing plan.'],
    challenge: ['Which statement confuses the information filter with the action decision?', ['Check whether information is verifiable', 'Every credible report requires a new trade', 'Consider whether the plan already covers the event'], 1, 'Credibility is necessary to evaluate information, but it does not establish the materiality, local relevance, or appropriate response.'],
    hint: 'Ask whether the current plan already addresses this kind of development.'
  },
  {
    short: 'Information routine', focus: 'Monitor → evaluate → compare → implement or maintain.',
    anchor: 'Effective agricultural marketing requires more than access',
    voices: [
      'Effective agricultural marketing needs a consistent process for evaluating timely information and implementing decisions. Participants monitor government reports, weather forecasts, local cash bids, futures markets, and industry news. Without an organized process, that volume can lead to inconsistent choices, emotional reactions, and excessive attention to short-term fluctuations.',
      'Once you can find timely information, the next step is building a routine for evaluating it and acting consistently. Government reports, weather forecasts, local cash bids, futures markets, and industry news all compete for attention. An organized decision process helps you avoid inconsistent choices, emotional reactions, and too much focus on short-term fluctuations.',
      'Access to timely information is only the start. Government reports, weather forecasts, local cash bids, futures markets, and industry news can fill the day without producing a consistent decision. An organized evaluation and implementation process helps prevent emotional reactions, inconsistent choices, and excessive attention to short-term market fluctuations.'
    ],
    analogies: {
      everyday: ['A routine beats checking constantly', 'Checking your bank balance every few minutes does not create a budget. A scheduled review, clear spending rules, and a record of decisions are more useful. Market monitoring likewise needs a purpose and a connection to planned actions.', 'A household budget illustrates a routine; agricultural exposure and reporting schedules require their own review intervals.'],
      gaming: ['Review decisions, not just the scoreboard', 'A useful post-match review records what you knew, what you assumed, and why you chose an action. A decision log provides the same kind of record for a producer, making it harder to rewrite the reasoning after seeing the outcome.', 'Market outcomes are not game scores. The analogy illustrates documenting reasoning and reviewing it fairly.'],
      business: ['Different decisions need different review intervals', 'A business might review daily cash, weekly sales trends, and seasonal inventory needs on different schedules. Agricultural routines likewise separate daily awareness, weekly trend review, and seasonal strategy reassessment.', 'These are examples of review cadence, not prescribed market-report publication schedules.']
    },
    deeper: 'A useful log captures the date and conditions, interpretation, assumptions, planned action, decision triggers, and later evaluation. Write the assumptions before the outcome is known. The routine ends with either implementing an action or deliberately maintaining the strategy; it does not require a transaction every time.',
    question: ['Which item makes a decision log especially useful for avoiding hindsight bias?', ['Recording assumptions before the outcome', 'Recording only whether the price later rose', 'Removing unsuccessful decisions'], 0, 'Contemporaneous assumptions let you review the information and reasoning available at decision time.'],
    challenge: ['Daily monitoring finds no development that meets your predetermined triggers. What completes the decision cycle?', ['Invent a trade to demonstrate activity', 'Maintain the strategy and document why', 'Abandon scheduled reviews'], 1, 'Implementing or maintaining the strategy are both valid outcomes of the monitor–evaluate–compare cycle.'],
    hint: 'A log should preserve what you knew before you could see the result.'
  },
  {short: 'Wrapping up', focus: 'Judge the process as well as the outcome.'}
];
