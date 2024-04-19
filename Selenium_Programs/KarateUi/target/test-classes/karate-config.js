function fn() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);
  if (!env) {
    env = 'dev';
  }
  var config = {
     host: 'https://www.udemy.com/',
     email: 'TestKarateUIII@gmail.com',
     password: 'Test@123',
     pageTitle: 'Online Courses - Learn Anything, On Your Schedule | Udemy',
    env: env,
    myVarName: 'someValue'
  }
  if (env == 'dev') {
    // customize
    // e.g. config.foo = 'bar';
  } else if (env == 'e2e') {
    // customize
    
  }
  karate.configure('driver', { type: 'chrome', port: 9222, executable: 'C://Program Files//Google//Chrome//Application//chrome.exe' });
  			karate.configure('driver',{ type: 'msedge', port: 9222, executable: 'C://Program Files (x86)//Microsoft//Edge//Application//msedge.exe'});
  return config;
}