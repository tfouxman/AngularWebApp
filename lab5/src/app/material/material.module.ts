import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material';

const material = [
  MatDialogModule
]

@NgModule({
  imports: [ material ],
  exports: [ material ]
})
export class MaterialModule {}
