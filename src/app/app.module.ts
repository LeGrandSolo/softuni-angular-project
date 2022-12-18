import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CourseModule } from './course/course.module';
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, ProfileComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule,HttpClientModule,BrowserAnimationsModule,CourseModule,SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
