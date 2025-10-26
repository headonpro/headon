/**
 * Umami Analytics Type Definitions
 * Documentation: https://umami.is/docs/tracker-functions
 */

interface UmamiEventData {
  [key: string]: string | number | boolean | undefined
}

interface Umami {
  /**
   * Track a custom event
   * @param eventName - Name of the event to track
   * @param eventData - Optional data associated with the event
   *
   * @example
   * window.umami?.track('button-click', { location: 'hero', action: 'contact' })
   */
  track: (eventName: string, eventData?: UmamiEventData) => void
}

interface Window {
  umami?: Umami
}
