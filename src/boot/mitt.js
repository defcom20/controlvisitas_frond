
import mitt from 'mitt'

const emitter = mitt()
export default async ({ app }) => {
  app.provide('emitter', emitter);
}
export { mitt }
