Given(/^I click edit$/) do
  wait_for_element_exists("view marked: 'edit'")
  touch("view marked: 'edit'")
end

And /^I swipe left on a reminder$/ do
  swipe :left, query: "view marked: 'run Calabash test'", offset: {:x => 40, :y => 0}, 'swipe-delta': {:horizontal => {:dx=> 120, :dy=> 0} }
end

Given(/^I delete a reminder$/) do
  wait_for_element_exists("view marked: 'DELETE'")
  touch("view marked: 'DELETE'")
end

Then(/^the item is removed from the list$/) do
  wait_for do
    query("view marked:'run Calabash test'").empty?
  end
end
