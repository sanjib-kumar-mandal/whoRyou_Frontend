import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { OnboardingComponentsSharedModule } from 'src/app/components/onboarding/onboarding-components-shared.module';
import { LottieComponent, LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieComponent,
    OnboardingPageRoutingModule,
    OnboardingComponentsSharedModule
  ],
  // providers: [
  //   provideLottieOptions({
  //     player: () => import('lottie-web'),
  //   }),
  // ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
