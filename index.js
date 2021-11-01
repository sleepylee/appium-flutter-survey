const wdio = require('webdriverio');
const find = require('appium-flutter-finder');

const osSpecificOps = {
  platformName: 'Android',
  deviceName: 'emulator-5554',
  app: __dirname + '/app-staging-debug.apk',
};

const opts = {
  port: 4723,
  path: '/wd/hub',
  capabilities: {
    ...osSpecificOps,
    automationName: 'Flutter',
  }
};

(async () => {
  console.log('Initial app testing')
  const driver = await wdio.remote(opts);
  driver.setImplicitTimeout(5000);
  driver.connectionRetryTimeout = 3000

  assert.strictEqual(await driver.execute('flutter:checkHealth'), 'ok');
  await driver.execute('flutter:clearTimeline');
  await driver.execute('flutter:forceGC');
  await driver.execute('flutter:waitFor', find.byText('Email'));
  
  
  await driver.elementSendKeys(find.byValueKey('tfEmail'), 'flutter@nimblehq.co')
  await driver.elementSendKeys(find.byValueKey('tfPassword'), '1235678')
  await driver.elementClick(find.byValueKey('btLogin'))

  await sleep(5000)
  driver.deleteSession();
})();