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
  // reset values
  numWinsFirst = 0;
  numCardsInPool = 0;
  numCardsOnMissionSuccess = 1;
  missionSuccessPercent = 50;
  monsterCardCost = 500;
  abilityCardCost = 500;
  characterCardCost = 500;
  cardRefundAmount = 100;
  onlySellDuplicates = false;
  totalMissions = 0;

  cardCollection = {};

  // gather data from form
  gatherData();

  // run the sims
  for(var x = 0; x < numSims; x++)
  {
    runSingleSim();
  }

  var innerHTMLString = "";
  for(var x = 0; x < numCardsInPool; x++)
  {
    var numCards = getNumCardsOwned(x);
    innerHTMLString += "" + numCards + x + ": " + numCards +"<br />";
  }

  document.getElementById("result").innerHTML = innerHTMLString;

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

function runSingleSim() {  
  // was the mission a success?
  if(runMission())
  {
    // it was! give 'em a card
    getCard(selectCardId());
  }
}

function runMission()
{
  return Math.floor(Math.random() * 101) >= missionSuccessPercent;
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