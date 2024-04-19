package examples.users;

import com.intuit.karate.junit5.Karate;

class UsersRunner {
    
    @Karate.Test
    Karate testUsers() {
      // return Karate.run("udemy").relativeTo(getClass());
       return Karate.run("UdemyLogin").relativeTo(getClass());
    }    

}
