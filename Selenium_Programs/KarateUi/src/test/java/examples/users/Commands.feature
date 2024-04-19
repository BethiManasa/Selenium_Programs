Feature: Browser feature for switching page
  Karate function to switch page

  Scenario: Browser Function
   
    * configure driver = { type: 'chrome', addOptions: ["--remote-allow-origins=*"]}
    Given driver "https://www.amazon.com/"
    * fullscreen()
    * delay(3000)
    And driver.maximize()
    * delay(3000)
    Then match driver.url == "https://www.amazon.com/"
    * def amazonTitle = driver.title
    * print amazonTitle
    * driver.script("window.open('https://reqres.in/','_BLANK').name")
    * delay(10000)
    * def reqTitle = driver.title
    * print reqTitle
    * delay(5000)
    * switchPage('Amazon.com. Spend less. Smile more.')
    * delay(2000)
    And scroll("//span[@class='a-truncate-cut'][contains(.,'Explore now')]").click()
    * delay(3000)
    * back()
    * delay(2000)
    * reload()
    * delay(2000)
    * quit()
