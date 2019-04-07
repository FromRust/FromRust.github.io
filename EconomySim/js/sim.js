// setting up global vars
var numSims = 1000;
var numCardsInPool = 0;
var numCardsOnMissionSuccess = 1;
var missionSuccessPercent = 50;
var monsterCardCost = 500;
var abilityCardCost = 500;
var characterCardCost = 500;
var cardRefundAmount = 100;
var onlySellDuplicates = false;

// sim results data
var totalMissions = 0;
var totalMissionsWon = 0;
var totalArray = [];

// card collection data
// structure: {id: {numOwned}}
var cardCollection = {};

function getFormValue(id) {
  return parseInt((document.getElementById(id)).value);
}

function getNumCardsOwned(cardId) {
  if(cardCollection[cardId] != null)
  {
    return cardCollection[cardId].numOwned;
  }

  return 0;
}

function gatherData() {
  //numCardsInPool = getFormValue("numCardsInPool");
  numCardsInPool = document.getElementById("numCardsInPool").value;
  missionSuccessPercent = getFormValue("missionSuccessPercent");
  numCardsOnMissionSuccess = getFormValue("missionSuccessCards");

  monsterCardCost = getFormValue("monsterCardCost");
  abilityCardCost = getFormValue("abilityCardCost");
  characterCardCost = getFormValue("characterCardCost");
  cardRefundAmount = getFormValue("cardRefundAmount");
}

function runSims() {
  totalArray = [];

  for(var s = 0; s < numSims; s++)
  {
    // for each sim, we...
    // reset values
    var safetyCheck = 10000; // we dont do more than this many runs
    var stopCondition = false;

    numCardsInPool = 0;
    numCardsOnMissionSuccess = 1;
    missionSuccessPercent = 50;
    monsterCardCost = 500;
    abilityCardCost = 500;
    characterCardCost = 500;
    cardRefundAmount = 100;
    onlySellDuplicates = false;
    totalMissions = 0;
    totalMissionsWon = 0;

    cardCollection = {};

    // gather data from form
    gatherData(); // this is inefficient - we only need to do this once. TODO: refactor this

    // run the missions
    for(var x = 0; (x < safetyCheck) && !stopCondition; x++)
    {
      stopCondition = runSingleSim();
    }

    var innerHTMLString = "";
    if(stopCondition)
    {
      // we hit our actual condition instead of a safety check, so
      // count this sim
      // not sure what to do with safety check sims but we'll figure that out later
      totalArray.push(totalMissions);
    }
    else
    {
      totalArray.push(safetyCheck);
    }
  }

  // display results
  displayResults();

  /*innerHTMLString += "Total missions: " + totalMissions + "<br />";
  innerHTMLString += "Total missions won: " + totalMissionsWon + "<br />";

  innerHTMLString += getCardCollectionString();

  document.getElementById("result").innerHTML = innerHTMLString;*/

  // gather up results
  /*
  
  var innerHTMLString = "";
  innerHTMLString += "GOING FIRST: <br />";
  innerHTMLString += "Wins: " + numWinsFirst + " || Losses: " + numLossesFirst + " || Rate: " + winRateFirst + "% || Avg. Injuries: " + avgInjuriesFirst + " || Avg. Rounds: " + avgRoundsFirst;
  innerHTMLString += "<br />";
  innerHTMLString += "GOING SECOND: <br />";
  innerHTMLString += "Wins: " + numWinsSecond + " || Losses: " + numLossesSecond + " || Rate: " + winRateSecond + "% || Avg. Injuries: " + avgInjuriesSecond + " || Avg. Rounds: " + avgRoundsSecond;
  document.getElementById("result").innerHTML = innerHTMLString;

  */
}

function displayResults()
{
  var innerHTMLString = "";
  innerHTMLString += "Average missions to get 1 specific card: " + getAvgMissions() + "<br />";
  document.getElementById("result").innerHTML = innerHTMLString;
}

function getAvgMissions()
{
  var total = 0;
  for(var x = 0; x < totalArray.length; x++)
  {
    total += totalArray[x];
  }

  total /= numSims;
  return total;
}

function getCardCollectionString()
{
  var string = "";
  for(var x = 0; x < numCardsInPool; x++)
  {
    var numCards = getNumCardsOwned(x);
    if(numCards > 0)
    {
      string += "" + x + ": " + numCards + "<br />";
    }
  }

  return string;
}

function runSingleSim() {  
  // was the mission a success?
  if(runMission())
  {
    // it was! give 'em a card
    totalMissionsWon++;
    for(var x = 0; x < numCardsOnMissionSuccess; x++)
    {
      getCard(selectCardId());
    }
  }

  //check for condition
  return checkStopCondition();
}

function checkStopCondition()
{
  // for testing, we just check to see if we have card ID #77
  return (getNumCardsOwned(77) > 0);
}

function runMission()
{
  totalMissions++;
  return (Math.floor(Math.random() * 101) <= missionSuccessPercent);
}

function selectCardId()
{
  return Math.floor(Math.random() * numCardsInPool);
}

function getCard(cardId)
{
  if(cardCollection[cardId] == null)
    {
      cardCollection[cardId] = {};
      cardCollection[cardId].numOwned = 1;
    }
    else
    {
      cardCollection[cardId].numOwned++;
    }
}