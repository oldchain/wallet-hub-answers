/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<form>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" (keyup)='email=$event.target.value' [value]="email" name="email" />
                    <br/>
                    <input type="password" (keyup)='password=$event.target.value' [value]="password" name="password" />
                    <button type="submit" (click)="handleSubmit($event)">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})

export class Test03Component {

    email:string = "";
    password:string = "";
    strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    emailRegex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");

    logged_in = false;
    
    handleSubmit(e){
        e.preventDefault();
        this.validateUser();
        
    }
    validateUser() 
    {
        if (this.emailRegex.test(this.email))
        {
            if(this.strongRegex.test(this.password)){
                this.logged_in = true;
                return true
            }
            else(
                alert("You have entered an invalid passrod")
            )
            return false
        }
        alert("You have entered an invalid email address!")
        return false
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};