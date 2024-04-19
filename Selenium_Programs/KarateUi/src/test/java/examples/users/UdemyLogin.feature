Feature: Testing of Udemy Website

  Scenario: Automating The Udemy Login
   # * configure driver = {type: 'chromedriver',executable:'C://Users//BEMANASA//Pictures//chromedriver-win64//chromedriver.exe'}
    * configure driver = { type: 'chrome', addOptions: ["--remote-allow-origins=*"]}
    Given driver 'https://www.udemy.com/'
    And driver.maximize()
    * delay(5000)
    And click("//span[text()='Log in']")
    * delay(3000)
    And input("//input[@name='email']",email)
    * delay(3000)
    And input("//input[@name='password']",password)
    * delay(3000)
    And click("//*[@id='udemy']/div[1]/div[2]/div/div/form/button")
    * delay(5000)
    And input("input[name~='q']","Karate UI").submit()
    * delay(2000)
    And click("{}Karate framework - API & UI Automation")
    * delay(4000)
   And scroll("//button[@type='button'][contains(.,'Buy this course')]").click()
    * delay(5000)
    And click("{}Go to cart")
    * delay(5000)
    And click("//button[@data-purpose='shopping-cart-checkout']")
    * delay(5000)
    And select("//select[contains(@id,'form-group--3')]", 'DD')
    * delay(4000)
    And click("//span[contains(.,'Complete Checkout')]")
    * delay(12000)
     