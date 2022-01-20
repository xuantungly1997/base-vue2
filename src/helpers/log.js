export default function log() {
  if (process.env.NODE_ENV !== "production") {
    console.log.apply(console, arguments);
  } else {
    // product don't log
  }
}
