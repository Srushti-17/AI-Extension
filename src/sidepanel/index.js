document.getElementById('button-prompt').onclick = (e) => {
    alert("hello world");
};

if ('ai' in self && 'summarizer' in self.ai) {
    console.log("Supported");
} else {
    console.log("not supported");
}

const options = {
    sharedContext: 'This is a scientific article',
    type: 'key-points',
    format: 'markdown',
    length: 'medium',
};
  


const available = (await self.ai.summarizer.capabilities()).available;
let summarizer;
if (available === 'no') {
    console.log("The Summarizer API isn't usable.")
}
if (available === 'readily') {
    console.log("The Summarizer API can be used immediately.")
    summarizer = await self.ai.summarizer.create(options);
} else {
    console.log("The Summarizer API can be used after the model is downloaded.")
    summarizer = await self.ai.summarizer.create(options);
    summarizer.addEventListener('downloadprogress', (e) => {
    console.log(e.loaded, e.total);
});
await summarizer.ready;
}

const someUserText2 = `Air pollution is the contamination of air due to the presence of substances called pollutants in the atmosphere that are harmful to the health of humans and other living beings, or cause damage to the climate or to materials.[1] It is also the contamination of the indoor or outdoor environment either by chemical, physical, or biological agents that alters the natural features of the atmosphere.[1] There are many different types of air pollutants, such as gases (including ammonia, carbon monoxide, sulfur dioxide, nitrous oxides, methane and chlorofluorocarbons), particulates (both organic and inorganic) and biological molecules. Air pollution can cause diseases, allergies, and even death to humans; it can also cause harm to other living organisms such as animals and crops, and may damage the natural environment (for example, climate change, ozone depletion or habitat degradation) or built environment (for example, acid rain).[2] Air pollution can be caused by both human activities[3] and natural phenomena.[4]

Air quality is closely related to the Earth's climate and ecosystems globally. Many of the contributors of air pollution are also sources of greenhouse emission i.e., burning of fossil fuel.[1]

Air pollution is a significant risk factor for a number of pollution-related diseases, including respiratory infections, heart disease, chronic obstructive pulmonary disease (COPD), stroke, and lung cancer.[5] Growing evidence suggests that air pollution exposure may be associated with reduced IQ scores, impaired cognition,[6] increased risk for psychiatric disorders such as depression[7] and detrimental perinatal health.[8] The human health effects of poor air quality are far reaching, but principally affect the body's respiratory system and the cardiovascular system.[9][10] Individual reactions to air pollutants depend on the type of pollutant a person is exposed to,[11][12] the degree of exposure, and the individual's health status and genetics.[13]

Air pollution is the largest environmental risk factor for disease and premature death[5][14] and the fourth largest risk factor overall for human health.[15] Air pollution causes the premature deaths of around 7 million people worldwide each year,[5] or a global mean loss of life expectancy (LLE) of 2.9 years,[16] and there has been no significant change in the number of deaths caused by all forms of pollution since at least 2015.[14][17][18] Outdoor air pollution attributable to fossil fuel use alone causes ~3.61 million deaths annually,[19] making it one of the top contributors to human death.[5] Anthropogenic ozone causes around 470,000 premature deaths a year and fine particulate (PM2.5) pollution around another 2.1 million.[20] The scope of the air pollution crisis is large: In 2018, WHO estimated that "9 out of 10 people breathe air containing high levels of pollutants."[21] Although the health consequences are extensive, the way the problem is handled is considered largely haphazard[22][21][23] or neglected.[14]

The World Bank has estimated that welfare losses (premature deaths) and productivity losses (lost labour) caused by air pollution cost the world economy $5 trillion per year.[24][25][26] The costs of air pollution are generally an externality to the contemporary economic system and most human activity, although they are sometimes recovered through monitoring, legislation, and regulation.[27][28]

Many different technologies and strategies are available for reducing air pollution.[29] Although a majority of countries have air pollution laws, according to UNEP, 43 percent of countries lack a legal definition of air pollution, 31 percent lack outdoor air quality standards, 49 percent restrict their definition to outdoor pollution only, and just 31 percent have laws for tackling pollution originating from outside their borders.[30] National air quality laws have often been highly effective, notably the 1956 Clean Air Act in Britain and the US Clean Air Act, introduced `;

const result2 = await summarizer.summarize(someUserText2);
console.log(result2);

// Destroy the summarizer to release resources
summarizer.destroy();

  