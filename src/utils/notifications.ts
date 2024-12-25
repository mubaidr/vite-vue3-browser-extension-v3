import { createNotivue } from "notivue"

import "notivue/notification.css" // Only needed if using built-in notifications
import "notivue/animations.css" // Only needed if using built-in animations

export const notivue = createNotivue({
  position: "bottom-center",
})
