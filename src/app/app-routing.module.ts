import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './providers/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'categorias',
    loadChildren: './categorias/categorias.module#CategoriasPageModule'
},
  { path: 'speakers', loadChildren: './speakers/speakers.module#SpeakersPageModule' },
  { path: 'informacion', loadChildren: './informacion/informacion.module#InformacionPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'ubicacion', loadChildren: './ubicacion/ubicacion.module#UbicacionPageModule' },
  { path: 'programa', loadChildren: './programa/programa.module#ProgramaPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'catdetalles/:id', loadChildren: './catdetalles/catdetalles.module#CatdetallesPageModule' },
  { path: 'micongreso', loadChildren: './micongreso/micongreso.module#MicongresoPageModule' },
  { path: 'misnotas', loadChildren: './misnotas/misnotas.module#MisnotasPageModule' },
  { path: 'misprogramas', loadChildren: './misprogramas/misprogramas.module#MisprogramasPageModule' },
  { path: 'misponentes', loadChildren: './misponentes/misponentes.module#MisponentesPageModule' },
  { path: 'ponentesdetalles/:id', loadChildren: './ponentesdetalles/ponentesdetalles.module#PonentesdetallesPageModule' },
  { path: 'newsdetail/:id', loadChildren: './newsdetail/newsdetail.module#NewsdetailPageModule' },
  { path: 'rooms', loadChildren: './rooms/rooms.module#RoomsPageModule' },
  { path: 'roomslist', loadChildren: './roomslist/roomslist.module#RoomslistPageModule' },
  { path: 'posters', loadChildren: './posters/posters.module#PostersPageModule' },
  { path: 'postersdetalles/:id', loadChildren: './postersdetalles/postersdetalles.module#PostersdetallesPageModule' },
  { path: 'orales', loadChildren: './orales/orales.module#OralesPageModule' },
  { path: 'informaciondetalles/:id', loadChildren: './informaciondetalles/informaciondetalles.module#InformaciondetallesPageModule' },
  { path: 'sponsors', loadChildren: './sponsors/sponsors.module#SponsorsPageModule' },
  { path: 'organizadores', loadChildren: './organizadores/organizadores.module#OrganizadoresPageModule' },
  { path: 'organizadoresdetail/:id', loadChildren: './organizadoresdetail/organizadoresdetail.module#OrganizadoresdetailPageModule' },
  { path: 'privacidad', loadChildren: './privacidad/privacidad.module#PrivacidadPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  {
    path: 'details/:id',
    loadChildren: './details/details.module#DetailsPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'preguntas/:id',
    loadChildren: './preguntas/preguntas.module#PreguntasPageModule',
    canActivate: [AuthService]
  },
  {
    path: 'preguntamodal',
    loadChildren: './preguntamodal/preguntamodal.module#PreguntamodalPageModule'
  },
  {
    path: 'respondermodal',
    loadChildren: './respondermodal/respondermodal.module#RespondermodalPageModule'
  },
  {
    path: 'pantalla',
    loadChildren: './pantalla/pantalla.module#PantallaPageModule'
 },
  { path: 'recordar',
  loadChildren: './recordar/recordar.module#RecordarPageModule'
  },
  { path: 'catpreguntas',
  loadChildren: './catpreguntas/catpreguntas.module#CatpreguntasPageModule',
  canActivate: [AuthService]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
