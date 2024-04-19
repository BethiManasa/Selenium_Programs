Feature: Drag And Drop

  Scenario: Automating Drag And Drop Function
    * configure driver = { type: 'msedge', addOptions: ["--remote-allow-origins=*"]}
    Given driver "http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html"
    And driver.maximize()
    * mouse().move("#box4").down().move("#box104").up()
    * delay(2000)
    * def capital = text("#box4")
    * delay(3000)
    * screenshot()
    * print capital
    And match capital == "Copenhagen"
