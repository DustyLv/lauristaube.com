import { onRequestDelete as __api_projects__id__js_onRequestDelete } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\projects\\[id].js"
import { onRequestDelete as __api_timeline__id__js_onRequestDelete } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\timeline\\[id].js"
import { onRequestGet as __api_media___path___js_onRequestGet } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\media\\[[path]].js"
import { onRequestDelete as __api_auth_js_onRequestDelete } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\auth.js"
import { onRequestGet as __api_auth_js_onRequestGet } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\auth.js"
import { onRequestPost as __api_auth_js_onRequestPost } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\auth.js"
import { onRequestGet as __api_content_js_onRequestGet } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\content.js"
import { onRequestPut as __api_order_js_onRequestPut } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\order.js"
import { onRequestPost as __api_projects_js_onRequestPost } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\projects.js"
import { onRequestPut as __api_projects_js_onRequestPut } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\projects.js"
import { onRequestPost as __api_timeline_js_onRequestPost } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\timeline.js"
import { onRequestPut as __api_timeline_js_onRequestPut } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\timeline.js"
import { onRequestPost as __api_upload_js_onRequestPost } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\upload.js"

export const routes = [
    {
      routePath: "/api/projects/:id",
      mountPath: "/api/projects",
      method: "DELETE",
      middlewares: [],
      modules: [__api_projects__id__js_onRequestDelete],
    },
  {
      routePath: "/api/timeline/:id",
      mountPath: "/api/timeline",
      method: "DELETE",
      middlewares: [],
      modules: [__api_timeline__id__js_onRequestDelete],
    },
  {
      routePath: "/api/media/:path*",
      mountPath: "/api/media",
      method: "GET",
      middlewares: [],
      modules: [__api_media___path___js_onRequestGet],
    },
  {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_auth_js_onRequestDelete],
    },
  {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_js_onRequestGet],
    },
  {
      routePath: "/api/auth",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_js_onRequestPost],
    },
  {
      routePath: "/api/content",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_content_js_onRequestGet],
    },
  {
      routePath: "/api/order",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_order_js_onRequestPut],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_projects_js_onRequestPost],
    },
  {
      routePath: "/api/projects",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_projects_js_onRequestPut],
    },
  {
      routePath: "/api/timeline",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_timeline_js_onRequestPost],
    },
  {
      routePath: "/api/timeline",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_timeline_js_onRequestPut],
    },
  {
      routePath: "/api/upload",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_upload_js_onRequestPost],
    },
  ]