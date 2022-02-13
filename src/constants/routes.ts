export class Route {
  /* ------------------------------------------------------------------------ *
   * Internal routes
   * ------------------------------------------------------------------------ */

  static HOME = '/'
  static FREELANCE = '/freelance'
  static PROJECTS = '/projects'
  static THOUGHTS = '/thoughts'

  /**
   * Path to the page for all books
   */
  static BOOKS = '/books'

  /**
   * Path to the page for a book
   */
  static BOOK = (slug: string): string => `/books/${slug}`
  static DESIGN = '/design'
  static RSS = '/rss.xml'

  /* ------------------------------------------------------------------------ *
   * File routes
   * ------------------------------------------------------------------------ */

  static RESUME = '/resume.pdf'

  /* ------------------------------------------------------------------------ *
   * External routes
   * ------------------------------------------------------------------------ */

  static CONTACT = 'mailto:cameroncabo@gmail.com'
  static INSTAGRAM = 'https://www.instagram.com/cameroncabo'
  static GITHUB = 'https://www.github.com/cacabo'
  static FACEBOOK = 'https://www.facebook.com/cam.cabo'
  static LINKEDIN = 'https://www.linkedin.com/in/cameroncabo'
  static TWITTER = 'https://www.twitter.com/cameroncabo'
}
