package com.chessfull.chessfull.UserManagement;
// this file is used to sava user data. It'll save JSON/text data to a file and send it over 
public class UserJWT {
    // variable that determines whether user is logged in or not
    // variable that determines if user data is updated or not
      // if user logged in and data is updated, then compile data as a JSON file and send it over to the data
            // Considerations
                // user JWT/Cookies to transfer, secure user data
    private boolean Credentials; // checks credentials to determine whether user is signed in 
    private boolean DataUpdated; // checks if user data is updated. JWT is not used to perform this criteria
    
    private Boolean CredentialCheck(){
        if(Credentials == true){
            return true;
        }
        else{
            return false;
        }
    }
    private Boolean DataUpdateCheck(){
        if(DataUpdated == true){
            return true;
        }
        else{
            return false;
        }
    }
    public void UserJWT(){
        this.Credentials = Credentials;
        this.DataUpdated = DataUpdated;
    }
}
