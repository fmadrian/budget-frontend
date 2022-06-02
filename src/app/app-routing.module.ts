import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/page/home/home.component';
import { InternalErrorComponent } from './component/page/internal-error/internal-error.component';
import { NotFoundComponent } from './component/page/not-found/not-found.component';
import { ReportComponent } from './component/page/report/report/report.component';
import { SearchReportComponent } from './component/page/report/search-report/search-report.component';
import { APP_ROUTES } from './utils/appRoutes';

const routes: Routes = [
  {
    path: APP_ROUTES.home,
    component: HomeComponent,
  },
  {
    path: APP_ROUTES.report.create,
    component: ReportComponent,
  },
  {
    path: APP_ROUTES.report.update,
    component: ReportComponent,
  },
  {
    path: APP_ROUTES.report.search,
    component: SearchReportComponent,
  },
  { path: APP_ROUTES.error.internal, component: InternalErrorComponent },
  { path: APP_ROUTES.error.notFound, component: NotFoundComponent }, // 404 always goes at last.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
