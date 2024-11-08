import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrbVisionComponent} from "./brb-vision.component";

const routes: Routes = [
  { path: '', component: BrbVisionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrbVisionRoutingModule { }
