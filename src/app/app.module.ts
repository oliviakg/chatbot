import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageItemComponent } from './message-item/message-item.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { DialogFlowService } from './services/dialog-flow.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from './services/utility.service';

@NgModule({
  declarations: [AppComponent, MessageListComponent, MessageItemComponent, MessageFormComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [DialogFlowService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule {}
