const assert = require('assert');

describe('login', function() {

  it('user should be login the application successfully', async function() {

    const userEmail = 'jane_doe@google.com';
    const userPassword = '123456';
    const userName = 'Jane Doe';

    const username = await $('//android.widget.EditText[@resource-id="com.example.creativedock:id/username"]');
    await username.waitForDisplayed();
    await username.click();
    await username.setValue(userEmail);

    /*
     * The follwoing code is needed because if we simply insert the value in username field via automation then validation error does not disappear.
     * To get rid of validation error we need to send some event from keyboard.
     * For that just pressing right arrow key then space key and then pressing backspace key so the effect will be neutral.
    */

    driver.pressKeyCode(22); // Right Key
    driver.pressKeyCode(62); // Space Key
    driver.pressKeyCode(67); // Backspace Key
    
    const password = await $('//android.widget.EditText[@resource-id="com.example.creativedock:id/password"]');
    await password.waitForDisplayed();
    await password.click();
    await password.setValue(userPassword);

    /*
     * The following code is needed because if we simply insert the value in password field via automation then validation error does not disappear.
     * To get rid of validation error we need to send some event from keyboard.
     * For that just pressing right arrow key then space key and then pressing backspace key so the effect will be neutral.
    */

    driver.pressKeyCode(22); // Right Key
    driver.pressKeyCode(62); // Space Key
    driver.pressKeyCode(67); // Backspace Key

    const loginOrRegisterButton = await $('//android.widget.Button[@resource-id="com.example.creativedock:id/login"]');
    await loginOrRegisterButton.waitForDisplayed();
    await loginOrRegisterButton.waitForEnabled();
    await loginOrRegisterButton.click();

    const welcomeToastMessage = await $(`//hierarchy/android.widget.Toast`);
    await welcomeToastMessage.waitForExist({timeout: 3000});
    const welcomeToastMessagetext = await welcomeToastMessage.getText();
    console.log(welcomeToastMessagetext);
    assert.equal(`Welcome !${userName}`, welcomeToastMessagetext);

  });

});