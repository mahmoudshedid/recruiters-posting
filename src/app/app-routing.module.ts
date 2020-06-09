import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostingsListComponent } from './postings-list/postings-list.component';
import { PostingDetailsComponent } from './posting-details/posting-details.component';


const routes: Routes = [
  { path: '', component: PostingsListComponent },
  { path: 'details/:postingId', component: PostingDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
