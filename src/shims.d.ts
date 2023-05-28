// Fix the error when import the .vue file in .ts file.
declare module "*.vue" {
  import { type DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module "*"
