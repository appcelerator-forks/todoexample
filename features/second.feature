Feature: Second Feature

@second
Scenario: Second Scenario
  Given the app has launched
  And I swipe left on a reminder
  And I delete a reminder
  Then the item is removed from the list
