
// aquí mostramos la url general de cada llamada
export const URL_CATEGORIAS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchPrograms{programs(type:"';
export const URL_SPEAKERS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchSpeakers{speakers(locale:%22es%22)';
export const URL_ROOMS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchRooms{rooms(locale:%22es%22)';
export const URL_EVENTS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchEvents{events(locale:%22es%22)';
export const URL_BREAKINGNEWS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchBreakingnews{breakingnews(locale:%22es%22)';
export const URL_INFOGENERAL = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchInfogenerals{infogenerals(locale:%22es%22)';
export const URL_UBICACION = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchMaps{maps(locale:%22es%22)';
export const URL_INFO_ITEMS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchInfoitems{infoitems(locale:%22es%22)';
export const URL_SPONSORS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchSponsor';
export const URL_SPONSORS_CATEGORIAS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchSponsorCategories{sponsorcategories';
export const URL_ORGANIZATIONS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchOrganizations';
export const URL_PRIVACIDAD = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchInfoitems{infoitems(id:"1",locale:"es")';


export const URL_SALAS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchPrograms{programs';
export const URL_CAT_SALAS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchPrograms{programs(type:"0';
export const URL_CAT_ORALES = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchPrograms{programs(type:"1';


// programas url general
export const URL_PROGRAMAS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchPrograms{programs(locale:%22es%22)';

// Poster general
export const URL_POSTER = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchPosterCategories{postercategories';


// aquí mostramos los campos que solicitamos
export const ITEMS_CATEGORIAS = '",locale:"es"){type_id,id,name,categories{id,name,';
export const ITEMS_SALAS = '{type_id,id,name,categories{id,name,days{id,name,events{id,state,title,description,room_id,';
export const ITEMS_SALAS_SPEAKERS = 'speakers{id,name,surname,organization,url_photo},hour_ini,hour_end}}}}}';
export const ITEMS_DIAS = 'days{id,name,events{id,state,title,description,room_id,room{name},parent,type_id,url,url_pdf,';
export const ITEM_SESSIONS = 'sessions{id, title,description,hour_ini,hour_end,hour_end,state,room{name},room_id,speakers{id,name,surname,organization,url_photo}},';
export const ITEMS_CAT_SPEAKERS = 'speakers{id,name,surname,organization,url_photo},hour_ini,hour_end}}}}}';
export const ITEMS_INFO_ITEMS = '{id,name,description,type,body_html,url}}';
export const ITEMS_SPONSORS = '{sponsors{id,name,url_photo,url_web,stand,area}}';
export const ITEMS_SPONSORS_CATEGORIAS = '(locale:"es"){id,name,order,sponsors{name,order,url_photo,url_web,stand,area}}}';
export const ITEMS_ORGANIZATIONS = '{organizations(locale:%22es%22){id,name,description,body_html}}';
export const ITEMS_PRIVACIDAD = '{id,name,description,type,body_html,url}}';


// POSTER SOLICITUDES
export const ITEMS_POSTERS = '(locale:%22es%22){id, name, posters{id,title,authors,description, body_html,url,url_pdf}}}';

export const ITEMS_SPEAKERS = '{city,biography,id,name,surname,organization,url_photo,phone,email,twitter,twitter_id,facebook,linkedin,';
export const ITEMS_SPEAKERS_EVENTS = 'events{id,title,description,state,day_id,type_id,category_id,room_id,hour_ini,hour_end,room{name},';
export const ITEMS_SPEAKERS_SPEAKERS = 'speakers{id,name,surname,organization,url_photo}}}}';
export const ITEMS_ROOMS = '{id,name,description}}';
export const ITEMS_EVENTS = '{title,description,state,authors,body_html,url,url_pdf,id,';
export const ITEMS_EVENTS_2 = 'cid,name,day_id,type_id,category_id,room_id,hour_ini,hour_end,parent}}';
export const ITEMS_BREAKINGNEWS = '{id,title,description,url_image,url_news,body_html,date}}';
export const ITEMS_INFOGENERAL = '{title,description,date,place,url_photo,organization,twitter,facebook,web,email,phone,';
export const ITEMS_INFOGENERAL_FOTOS = 'url_photo_banner,url_photo_menu,url_photo_home,url_photo_sponsors,';
export const ITEMS_INFOGENERAL_COLORES = 'main_color,secondary_color}}';
export const ITEMS_UBICACION = '{id,lat,lon,title,space,address,image}}';

// aquí mostramos los campos que solicitamos para las categorias de los programas
export const ITEMS_CATPROGRAMAS = '{id,name,type_id}}';

// todos los eventos cargados

export const ALL_EVENTS = 'https://senrcpanel.tramasolutions.com/graphql?query=query+FetchPrograms';
export const ALL_EVENTS_PARAMS = '{events{id,state,title,description,room_id,room{name}';
export const ALL_SPEAKERS_PARAMS = 'speakers{id,name,surname,organization,url_photo}hour_ini,hour_end}}';
