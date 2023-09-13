import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from './services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { fetchEventSource } from '@microsoft/fetch-event-source';

// Registering Swiper
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly authService: AuthService
  ) {
    this.authService.validateAuthentication();

    // const eventSource = new EventSource(`${environment.apiBasePath}/api/v1/users/sse`, {
    // //  withCredentials: true
    //   headers: {
    //     'Authorization': `Bearer ${this.authService?.getToken()}`
    //   }
    // });
    // eventSource.onmessage = ({ data }) => {
    //   console.log('New message', JSON.parse(data));
    // };

  // fetchEventSource(`${environment.apiBasePath}/api/v1/users/sse`, {
  //     mode: 'no-cors',
  //     headers: {
  //      // 'Content-Type': 'text/event-stream',
  //     },
  //     onmessage(ev) {
  //         console.log(ev.data);
  //     },
  //     onerror(err) {
  //       console.log(err)
  //   }
  // });
  }
}
