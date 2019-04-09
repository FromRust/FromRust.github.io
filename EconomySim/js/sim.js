// setting up global vars

// settings - sim globals
var numSims = 1000;
var numCardsInPool = 0;
var missionSuccessPercent = 50;
var sellCards = false;
var onlySellDuplicates = false;

// settings - card costs
var characterCardCost = 2000;
var abilityCardCost = 500;
var augmentCardCost = 100;
var blueprintCardCost = 500;
var monsterCardCost = 250;

// settings - refunds
var characterCardRefund = 200;
var abilityCardRefund = 100;
var augmentCardRefund = 10;
var blueprintCardRefund = 100;
var monsterCardRefund = 25;

// settings - reward data
var numCardsOnMissionSuccess = 1;
var missionSuccessCrowns = 0;
var missionFailureCrowns = 0;

// sim results data
var totalMissions = 0;
var totalMissionsWon = 0;
var totalArray = [];
var totalCrowns = 0;

// card collection data
// structure: {id: {numOwned}}
var cardCollection = {};

// card data
// structure: {id (XYZ): { name: "xyz", type: XYZ }}
var cardData = {};
cardData[1] = { name: "TestCharacterCard", type: 1 };
cardData[2] = { name: "TestAbilityCard", type: 2 };
cardData[3] = { name: "TestAugmentCard", type: 3 };
cardData[4] = { name: "TestBlueprintCard", type: 4 };
cardData[5] = { name: "TestMonsterCard", type: 5 };

// card types:
// character - 1
// ability - 2
// augment - 3
// blueprint - 4
// monster - 5

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
  numCardsInPool = getFormValue("numCardsInPool");
  missionSuccessPercent = getFormValue("missionSuccessPercent");

  numCardsOnMissionSuccess = getFormValue("missionSuccessCards");
  missionSuccessCrowns = getFormValue("missionSuccessCrowns");
  missionFailureCrowns = getFormValue("missionFailureCrowns");

  sellCards = document.getElementById("sellCards").checked;
  onlySellDuplicates = document.getElementById("onlySellDuplicates").checked;

  characterCardCost = getFormValue("characterCardCost");
  characterCardRefund = getFormValue("characterCardRefund");
  abilityCardCost = getFormValue("abilityCardCost");
  abilityCardRefund = getFormValue("abilityCardRefund");
  augmentCardCost = getFormValue("augmentCardCost");
  augmentCardRefund = getFormValue("augmentCardRefund");
  blueprintCardCost = getFormValue("blueprintCardCost");
  blueprintCardRefund = getFormValue("blueprintCardRefund");
  monsterCardCost = getFormValue("monsterCardCost");
  monsterCardRefund = getFormValue("monsterCardRefund");
}

function runSims() {
  totalArray = [];

  for(var s = 0; s < numSims; s++)
  {
    // for each sim, we...
    // reset values
    var safetyCheck = 10000; // we dont do more than this many runs
    var stopCondition = false;

    totalMissions = 0;
    totalMissionsWon = 0;
    totalCrowns = 0;
    cardCollection = {};

    // gather data from form
    gatherData(); // this is inefficient - we only need to do this once. TODO: refactor this

    // run the missions
    for(var x = 0; (x < safetyCheck) && !stopCondition; x++)
    {
      stopCondition = runSingleSim();
      // if we didn't get the card we want, let's see if we can buy it here
      if(!stopCondition)
      {
        //TODO: change "characterCardCost" to the appropriate card type
        if(totalCrowns >= characterCardCost)
        {
          // we can! we are done
          stopCondition = true;
        }
      }
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
    // and some crowns!
    totalCrowns += missionSuccessCrowns;
    for(var x = 0; x < numCardsOnMissionSuccess; x++)
    {
      getCard(selectCardId());
    }
  }
  else
  {
    // give 'em crowns on failure
    totalCrowns += missionFailureCrowns;
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

  // after we receive a card, if we're selling cards, do that here
  if(sellCards)
  {
    if(onlySellDuplicates)
    {
      if(getNumCardsOwned(cardId) > 1)
      {
        cardCollection[cardId]--;
        totalCrowns += cardRefundAmount;
      }
    }
    else
    {
      cardCollection[cardId]--;
      if(cardCollection[cardId] == 0) { delete cardCollection[cardId]; }
      totalCrowns += cardRefundAmount;
    }
  }
}