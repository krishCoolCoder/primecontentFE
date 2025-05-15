import { Component } from '@angular/core';
import { FeaturesComponent } from './features/features.component';
import { DocumentsComponent } from './documents/documents.component';
import { SupportComponent } from './support/support.component';
import { PricingComponent } from './pricing/pricing.component';
import { SolutionsComponent } from './solutions/solutions.component';

@Component({
  selector: 'landingPageHeader',
  standalone: true,
  imports: [FeaturesComponent, DocumentsComponent, SupportComponent, PricingComponent, SolutionsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class LandingHeaderComponent {

}
