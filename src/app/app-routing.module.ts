import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/page/home/home.component';
import { APP_ROUTES } from './utils/appRoutes';

const routes: Routes = [
  {
    path: APP_ROUTES.home,
    component: HomeComponent,
  },
  // { path: APP_ROUTES.error.internal, component: InternalErrorComponent },
  // { path: APP_ROUTES.error.notFound, component: NotFoundComponent }, // 404 always goes at last.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
