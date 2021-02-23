import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import EditEmployee from "@/components/EditEmployee";
import NewEmployee from "@/components/NewEmployee";
import ViewEmployee from "@/components/ViewEmployee";
import SignupForm from "@/components/SignupForm";
import LoginForm from "@/components/LoginForm";

import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/signup",
      name: "signup-form",
      component: SignupForm,
      meta: {
        requireGuest: true
      }
    },
    {
      path: "/login",
      name: "login-form",
      component: LoginForm,
      meta: {
        requireGuest: true
      }
    },
    {
      path: "/edit/:employee_id",
      name: "edit-employee",
      component: EditEmployee,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/new",
      name: "new-employee",
      component: NewEmployee,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/:employee_id",
      name: "view-employee",
      component: ViewEmployee,
      meta: {
        requireAuth: true
      }
    }
  ]
});

//nav guards
router.beforeEach((to, from, next) => {
  //check for required auth guard
  if (to.matched.some(record => record.meta.requireAuth)) {
    //check if user is not logged in
    if (!firebase.auth().currentUser) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requireGuest)) {
    //check if user is logged in
    if (firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      //proceed to route
      next();
    }
  } else {
    //proceed to route
    next();
  }
});

export default router;
