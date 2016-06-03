And(/^I click on add a reminder$/) do
    touch("TiUITextField index:0")
end

And(/^I add a reminder$/) do
    wait_for_keyboard
    keyboard_enter_text("Run Calabash test")
    tap_keyboard_action_key
end

Then(/^the reminder list should update$/) do
    wait_for_element_exists("view marked: 'Run Calabash test'")
end
