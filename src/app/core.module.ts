import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AuthInterceptor } from './auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { ConfigData } from './shared/config.data';
import { ShoppingListService } from './shopping-list/shopping-list.service';

/**
 * Core module per la gestione dei servizi
 */
@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    RecipesResolverService,
    { provide: 'ApiRestEndpoint', useValue: ConfigData.ApiRestEndpoint },
    { provide: 'SignInApiRestEndpoint', useValue: ConfigData.SignInApiRestEndpoint },
    { provide: 'SignUpApiRestEndpoint', useValue: ConfigData.SignUpApiRestEndpoint },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
