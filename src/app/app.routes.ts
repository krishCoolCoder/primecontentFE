import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingHeaderComponent } from './landing-page/header/header.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard, noAuthGuard } from './auth.guard';
import { ContentComponent } from './content/content.component';
import { CreateContentPageComponent } from './create-content-page/create-content-page.component';
import { ViewContentPageComponent } from './view-content-page/view-content-page.component';
import { EditContentPageComponent } from './edit-content-page/edit-content-page.component';
import { ContentTypePageComponent } from './content-type-page/content-type-page.component';
import { CreateContentTypePageComponent } from './create-content-type-page/create-content-type-page.component';
import { CreateTagsPageComponent } from './create-tags-page/create-tags-page.component';
import { TagsPageComponent } from './tags-page/tags-page.component';
import { ViewTagPageComponent } from './view-tag-page/view-tag-page.component';
import { EditTagPageComponent } from './edit-tag-page/edit-tag-page.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { CreateCollectionPageComponent } from './create-collection-page/create-collection-page.component';
import { EditCollectionPageComponent } from './edit-collection-page/edit-collection-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { CreateUserPageComponent } from './create-user-page/create-user-page.component';
import { UserAccessPageComponent } from './user-access-page/user-access-page.component';
import { UserRolePageComponent } from './user-role-page/user-role-page.component';
import { CreateUserRolePageComponent } from './create-user-role-page/create-user-role-page.component';
import { ViewContentTypePageComponent } from './view-content-type-page/view-content-type-page.component';
import { EditContentTypePageComponent } from './edit-content-type-page/edit-content-type-page.component';
import { ViewCollectionPageComponent } from './view-collection-page/view-collection-page.component';
import { ToastTestingComponent } from './toast-testing/toast-testing.component';

export const routes: Routes = [
    {
        path : "", 
        component : LandingPageComponent,
        canActivate: [noAuthGuard]
    },
    {
        path : "test",
        component : LandingHeaderComponent,
        canActivate : [authGuard]
    }, 
    {
        path : "signIn", 
        component : SignInPageComponent,
        canActivate: [noAuthGuard]
    }, 
    {
        path : "signUp",
        component : SignUpPageComponent,
        canActivate : [noAuthGuard]
    }, 
    {
        path : "dashboard",
        component : DashboardComponent,
        canActivate : [authGuard]
    }, 
    {
        path : "content",
        component : ContentComponent,
        canActivate : [authGuard]
    }, 
    {
        path : "createContent",
        component : CreateContentPageComponent,
        canActivate : [authGuard]
    }, 
    {
        path : "viewContent/:id",
        component : ViewContentPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "editContent/:id",
        component : EditContentPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "contentType",
        component : ContentTypePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "createContentType",
        component : CreateContentTypePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "viewContentType/:id",
        component : ViewContentTypePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "editContentType/:id",
        component : EditContentTypePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "tag",
        component : TagsPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "viewTag/:id",
        component : ViewTagPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "editTag/:id",
        component : EditTagPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "createTagPage",
        component : CreateTagsPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "collection",
        component : CollectionPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "createCollection",
        component : CreateCollectionPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "editCollection/:id",
        component : EditCollectionPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "viewCollection/:id",
        component : ViewCollectionPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "users",
        component : UsersPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "createUsers",
        component : CreateUserPageComponent ,
        canActivate : [authGuard]
    },
    {
        path : "editUser/:id",
        component : CreateUserPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "userAccess",
        component : UserAccessPageComponent,
        canActivate : [authGuard]
    },
    {
        path : "userRole",
        component : UserRolePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "createUserRole",
        component : CreateUserRolePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "viewUserRole/:id",
        component : CreateUserRolePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "editUserRole/:id",
        component : CreateUserRolePageComponent,
        canActivate : [authGuard]
    },
    {
        path : "settings",
        component : DashboardComponent,
        canActivate : [authGuard]
    },
    {
        path : "toastTesting",
        component : ToastTestingComponent,
        canActivate : [authGuard]
    },
];
