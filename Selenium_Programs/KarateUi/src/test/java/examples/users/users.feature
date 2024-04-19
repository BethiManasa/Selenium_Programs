Feature: Testing of Demo UI Website

  Scenario: Automating The OrangeHRM Login
   # * configure driver = {type: 'chromedriver',executable:'C://Users//BEMANASA//Pictures//chromedriver-win64//chromedriver.exe'}
    * configure driver = { type: 'msedge', addOptions: ["--remote-allow-origins=*"]}
    Given driver 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    And driver.maximize()
    * delay(5000)
    And waitFor("//input[@name='username']")
    * delay(5000)
    And input("//input[@name='username']","Admin")
    * delay(5000)
    And waitFor("//input[@name='password']")
    * delay(5000)
    And input("//input[@name='password']","admin123")
    * delay(5000)
    And click("//button[@type='submit']")
