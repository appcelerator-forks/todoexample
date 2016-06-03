Feature: First Feature

@first
Scenario: First Scenario
  Given the app has launched
  And I click on add a reminder
  And I add a reminder
  Then the item is added to the list
