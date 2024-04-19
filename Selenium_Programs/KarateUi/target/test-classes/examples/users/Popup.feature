Feature: Testing Popups

  Scenario: Automating Popups
    * configure driver = { type: 'msedge', addOptions: ["--remote-allow-origins=*"]}
    Given driver 'https://testautomationpractice.blogspot.com/'
    And driver.maximize()
    * delay(5000)
    And click("//button[@onclick='myFunctionAlert()']")
    * delay(5000) 
    And dialog(true)
    * delay(5000)
    And rightOf("//button[@onclick='myFunctionAlert()']").find("{button}Confirm Box").click()
    * delay(5000)
    And dialog(true)
    * delay(5000)
    * def check = text("#demo")
    And print check
    And match check == "You pressed OK!"
    And rightOf("{button}Confirm Box").find("{button}Prompt").click()
    * delay(5000)
    And dialog(true,"Manasa Bethi")
    * def checkprompt = text("#demo")
    And print checkprompt
    And match checkprompt == "Hello Manasa Bethi! How are you today?"
    * delay(5000)
