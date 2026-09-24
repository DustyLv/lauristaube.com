import { onRequestDelete as __api_admin_projects__id__js_onRequestDelete } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\projects\\[id].js"
import { onRequestDelete as __api_admin_timeline__id__js_onRequestDelete } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\timeline\\[id].js"
import { onRequestGet as __api_admin_content_js_onRequestGet } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\content.js"
import { onRequestPut as __api_admin_order_js_onRequestPut } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\order.js"
import { onRequestPost as __api_admin_projects_js_onRequestPost } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\projects.js"
import { onRequestPut as __api_admin_projects_js_onRequestPut } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\projects.js"
import { onRequestPost as __api_admin_timeline_js_onRequestPost } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\timeline.js"
import { onRequestPut as __api_admin_timeline_js_onRequestPut } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\timeline.js"
import { onRequestPost as __api_admin_upload_js_onRequestPost } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\upload.js"
import { onRequestGet as __api_media___path___js_onRequestGet } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\media\\[[path]].js"
import { onRequestGet as __api_content_js_onRequestGet } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\content.js"
import { onRequest as __api_admin__middleware_js_onRequest } from "D:\\_Files\\Dev\\lauristaube.com\\functions\\api\\admin\\_middleware.js"

export const routes = [
    {
      routePath: "/api/admin/projects/:id",
      mountPath: "/api/admin/projects",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_projects__id__js_onRequestDelete],
    },
  {
      routePath: "/api/admin/timeline/:id",
      mountPath: "/api/admin/timeline",
      method: "DELETE",
      middlewares: [],
      modules: [__api_admin_timeline__id__js_onRequestDelete],
    },
  {
      routePath: "/api/admin/content",
      mountPath: "/api/admin",
      method: "GET",
      middlewares: [],
      modules: [__api_admin_content_js_onRequestGet],
    },
  {
      routePath: "/api/admin/order",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_order_js_onRequestPut],
    },
  {
      routePath: "/api/admin/projects",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_projects_js_onRequestPost],
    },
  {
      routePath: "/api/admin/projects",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_projects_js_onRequestPut],
    },
  {
      routePath: "/api/admin/timeline",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_timeline_js_onRequestPost],
    },
  {
      routePath: "/api/admin/timeline",
      mountPath: "/api/admin",
      method: "PUT",
      middlewares: [],
      modules: [__api_admin_timeline_js_onRequestPut],
    },
  {
      routePath: "/api/admin/upload",
      mountPath: "/api/admin",
      method: "POST",
      middlewares: [],
      modules: [__api_admin_upload_js_onRequestPost],
    },
  {
      routePath: "/api/media/:path*",
      mountPath: "/api/media",
      method: "GET",
      middlewares: [],
      modules: [__api_media___path___js_onRequestGet],
    },
  {
      routePath: "/api/content",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_content_js_onRequestGet],
    },
  {
      routePath: "/api/admin",
      mountPath: "/api/admin",
      method: "",
      middlewares: [__api_admin__middleware_js_onRequest],
      modules: [],
    },
  ]