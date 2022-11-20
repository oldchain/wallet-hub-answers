/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, Input, NgModule, ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" (keyup)="newTitle()" /> <p>{{field}}</p>'
})
export class TextField {
    @Output() newTitleCreated = new EventEmitter<string>();

    field:string;

    newTitle() {
        this.newTitleCreated.emit(this.field);
      }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title: {{newTitle}}<h2><br/><textfield (newTitleCreated)=onCreateTitle($event)></textfield>`
})
export class ChildComponent {
   
    newTitle:string;

      onCreateTitle(title:string) {
        this.newTitle = title;
      }   
    }


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (keyup)=changeTitle()></child-component> <br/>
                    Title is {{appTitle}}
                </div>`
})
export class Test02Component {
    
    @ViewChild(ChildComponent) child: ChildComponent;
    appTitle:string 
    changeTitle(){
        this.appTitle = this.child.newTitle
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};