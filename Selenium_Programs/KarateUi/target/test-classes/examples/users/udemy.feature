Feature: Testing of Udemy Website

  Scenario: Automating The Udemy Login
   # * configure driver = {type: 'chromedriver',executable:'C://Users//BEMANASA//Pictures//chromedriver-win64//chromedriver.exe'}
    * configure driver = { type: 'chrome', addOptions: ["--remote-allow-origins=*"]}
    Given driver 'https://www.udemy.com/'
    And driver.maximize()
    * delay(5000)
    And click("//span[text()='Sign up']")
    * delay(5000)
    And waitFor("//input[@name='fullname']")
    * delay(5000)
    And input("//input[@name='fullname']","Manasa")
    * delay(5000)
    And waitFor("//input[@name='email']")
    * delay(5000)
    And input("//input[@name='email']","Manasa@gmail.com")
    * delay(5000)
     And waitFor("//input[@name='password']")
    * delay(5000)
    And input("//input[@name='password']","Manasa@123")
    * delay(5000)
    And click("//*[@id='udemy']/div[1]/div[2]/div/div/form/button")
     * delay(5000)
     And click("//span[text()='Log in']")
     * delay(3000)
     