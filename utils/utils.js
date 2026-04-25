export function farewellMessages(languages) {
  const options = [
    `Farewell, ${languages}`,
    `Adios, ${languages}`,
    `R.I.P ${languages}`,
    `We'll miss you ${languages}`,
    `Oh no, not ${languages}`,
    `${languages} bites the dust`,
    `Gone but not forgotten, ${languages}`,
    `The end of ${languages} as we know it`,
    `Off to the sunset, ${languages}`,
    `${languages}, it's been real`,
    `${languages}, your watch has ended`,
    `${languages} has left the building`,
  ];
  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
}
